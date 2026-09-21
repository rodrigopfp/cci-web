/**
 * Distancia POR CARRETERA desde cada planta registrada (src/lib/datos/
 * plantas.ts) hasta la cabecera de cada comuna (src/lib/datos/comunas-zonas.ts).
 * Escribe src/lib/datos/rutas-plantas.ts (dataset tipado, generado).
 *
 * Se ejecuta A MANO, nunca en el build:
 *   npx tsx scripts/rutas/calcular-rutas.ts
 *
 * Motor principal: OSRM público, servicio table, perfil driving
 *   router.project-osrm.org/table/v1/driving/{lon,lat;lon,lat;…}?sources=0&annotations=distance
 *   → metros. Máximo 100 coordenadas por request: la planta + lotes de hasta
 *   99 comunas. Un request por segundo, User-Agent del CCI, reintento simple.
 *
 * Plan B (si OSRM rechaza): OpenRouteService, servicio matrix, con clave en la
 * variable de entorno ORS_API_KEY:
 *   ORS_API_KEY=… MOTOR=ors npx tsx scripts/rutas/calcular-rutas.ts
 *
 * Reglas: km redondeado a entero; estado "sin_ruta" cuando el motor devuelve
 * null (Isla de Pascua, Juan Fernández…) o cuando ajustó la cabecera a un punto
 * de la red vial a más de 5 km (la ruta no llega a esa comuna). NUNCA se
 * sustituye por línea recta. Datos © OpenStreetMap contributors.
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { PLANTAS } from "../../src/lib/datos/plantas";
import { COMUNAS } from "../../src/lib/datos/comunas-zonas";

const UA = "cci-hub/1.0 (Consejo de Construccion Industrializada; https://construccionindustrializada.cl)";
const OSRM = "https://router.project-osrm.org";
const ORS = "https://api.openrouteservice.org/v2/matrix/driving-car";
const LOTE = 99; // 1 origen + 99 destinos = 100 coordenadas (tope de OSRM)
const SNAP_MAX_M = 5000;
const SALIDA = resolve(__dirname, "..", "..", "src/lib/datos/rutas-plantas.ts");

const MOTOR = process.env.MOTOR === "ors" ? "ors" : "osrm";
const ORS_KEY = process.env.ORS_API_KEY ?? "";

type Destino = { cut: string; lat: number; lon: number };
type Resultado = { plantaId: string; cut: string; km: number | null; estado: "ok" | "sin_ruta"; snapM?: number };

const dormir = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function conReintento<T>(fn: () => Promise<T>, etiqueta: string): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    console.error(`  ${etiqueta}: ${(e as Error).message} → reintento en 3 s`);
    await dormir(3000);
    return await fn();
  }
}

/** OSRM table: distancias (m) y distancia de ajuste a la red vial (m) de cada destino. */
async function tablaOsrm(origen: { lat: number; lon: number }, destinos: Destino[]): Promise<{ dist: (number | null)[]; snap: number[] }> {
  const coords = [origen, ...destinos].map((p) => `${p.lon},${p.lat}`).join(";");
  const url = `${OSRM}/table/v1/driving/${coords}?sources=0&annotations=distance`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`OSRM HTTP ${res.status}`);
  const j = (await res.json()) as { code: string; message?: string; distances?: (number | null)[][]; destinations?: { distance: number }[] };
  if (j.code !== "Ok" || !j.distances) throw new Error(`OSRM code ${j.code} ${j.message ?? ""}`);
  const fila = j.distances[0].slice(1);
  const snap = (j.destinations ?? []).slice(1).map((d) => d.distance);
  return { dist: fila, snap };
}

/** OpenRouteService matrix (plan B). */
async function tablaOrs(origen: { lat: number; lon: number }, destinos: Destino[]): Promise<{ dist: (number | null)[]; snap: number[] }> {
  if (!ORS_KEY) throw new Error("Falta ORS_API_KEY para usar OpenRouteService.");
  const locations = [origen, ...destinos].map((p) => [p.lon, p.lat]);
  const res = await fetch(ORS, {
    method: "POST",
    headers: { "User-Agent": UA, "Content-Type": "application/json", Authorization: ORS_KEY },
    body: JSON.stringify({ locations, sources: [0], metrics: ["distance"], units: "m" }),
  });
  if (!res.ok) throw new Error(`ORS HTTP ${res.status}`);
  const j = (await res.json()) as { distances: (number | null)[][]; destinations: { snapped_distance?: number }[] };
  const snap = j.destinations.slice(1).map((d) => {
    if (typeof d.snapped_distance !== "number") throw new Error("ORS no devolvió snapped_distance para un destino.");
    return d.snapped_distance;
  });
  return { dist: j.distances[0].slice(1), snap };
}

async function main() {
  const destinos: Destino[] = COMUNAS.map((c) => ({ cut: c.cut, lat: c.lat, lon: c.lon }));
  const resultados: Resultado[] = [];
  let requests = 0;
  // Provenance derivada del motor: fuente del registro y nombre del servicio.
  const motorTexto = MOTOR === "ors" ? "OpenRouteService · OpenStreetMap" : "OSRM · OpenStreetMap";
  const servidor = MOTOR === "ors" ? ORS : OSRM;
  const fuenteId = MOTOR === "ors" ? "osm-ors" : "osm-osrm";
  const servicio = MOTOR === "ors" ? "matrix" : "table";
  console.log(`Motor: ${motorTexto} · ${PLANTAS.length} plantas × ${destinos.length} comunas`);

  for (const p of PLANTAS) {
    console.log(`\n${p.nombre} (${p.lat}, ${p.lon})`);
    for (let i = 0; i < destinos.length; i += LOTE) {
      const lote = destinos.slice(i, i + LOTE);
      if (requests > 0) await dormir(1000);
      const { dist, snap } = await conReintento(
        () => (MOTOR === "ors" ? tablaOrs(p, lote) : tablaOsrm(p, lote)),
        `lote ${i / LOTE + 1}`,
      );
      requests++;
      lote.forEach((d, k) => {
        const m = dist[k];
        const s = Math.round(snap[k] ?? 0);
        const ok = m !== null && m !== undefined && Number.isFinite(m) && s <= SNAP_MAX_M;
        resultados.push({ plantaId: p.id, cut: d.cut, km: ok ? Math.round((m as number) / 1000) : null, estado: ok ? "ok" : "sin_ruta", snapM: s });
      });
      const okLote = lote.filter((_, k) => dist[k] !== null && (snap[k] ?? 0) <= SNAP_MAX_M).length;
      console.log(`  lote ${i / LOTE + 1}: ${lote.length} comunas · ${okLote} con ruta`);
    }
  }

  resultados.sort((a, b) => a.plantaId.localeCompare(b.plantaId) || a.cut.localeCompare(b.cut));
  const ok = resultados.filter((r) => r.estado === "ok").length;
  const sin = resultados.filter((r) => r.estado === "sin_ruta");
  const hoy = new Date().toISOString().slice(0, 10);

  const cabecera = `// ============================================================================
// RUTAS POR CARRETERA — ARCHIVO GENERADO. NO EDITAR A MANO.
// ============================================================================
// Generado por scripts/rutas/calcular-rutas.ts el ${hoy}.
// Motor: ${motorTexto} (${servidor}), perfil driving, servicio ${servicio}.
// ${PLANTAS.length} plantas × ${destinos.length} comunas = ${resultados.length} rutas: ${ok} "ok", ${sin.length} "sin_ruta".
// km enteros por carretera desde la planta hasta la cabecera comunal. "sin_ruta":
// el motor no encontró camino (islas) o ajustó la cabecera a más de ${SNAP_MAX_M / 1000} km de
// la red vial. Nunca se reemplaza por línea recta. Hacia Chiloé, Aysén y
// Magallanes las rutas pueden incluir transbordador o tramos por Argentina,
// tal como las calcula el motor. Datos © OpenStreetMap contributors.
// Tipos y validación: src/lib/datos/rutas.ts.
// ============================================================================

export const RUTAS_META = {
  fechaCalculo: "${hoy}",
  motor: "${motorTexto}",
  servidor: "${servidor}",
  perfil: "driving",
  servicio: "${servicio}",
  fuenteId: "${fuenteId}",
  requests: ${requests},
  plantas: ${PLANTAS.length},
  comunas: ${destinos.length},
  ok: ${ok},
  sinRuta: ${sin.length},
  snapMaxM: ${SNAP_MAX_M},
} as const;

export const RUTAS: { plantaId: string; cut: string; km: number | null; estado: "ok" | "sin_ruta"; snapM?: number }[] = [
`;
  const filas = resultados.map((r) => `  { plantaId: "${r.plantaId}", cut: "${r.cut}", km: ${r.km}, estado: "${r.estado}", snapM: ${r.snapM} },`).join("\n");
  writeFileSync(SALIDA, `${cabecera}${filas}\n];\n`, "utf8");

  console.log(`\n✔ ${resultados.length} rutas (${ok} ok · ${sin.length} sin_ruta) en ${requests} requests → ${SALIDA}`);
  if (sin.length) {
    console.log("sin_ruta:");
    for (const r of sin) {
      const c = COMUNAS.find((x) => x.cut === r.cut);
      console.log(`  ${r.plantaId} → ${c?.nombre} (${c?.region}) · snap ${r.snapM} m`);
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
