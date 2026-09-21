// ============================================================================
// RUTAS POR CARRETERA — planta → cabecera comunal (helpers y validación)
// ============================================================================
// Los datos viven en rutas-plantas.ts, GENERADO por scripts/rutas/calcular-
// rutas.ts con el servicio table de OSRM (perfil driving) sobre datos de
// OpenStreetMap, o con OpenRouteService (plan B, motor "ors"). Se ejecuta a
// mano, nunca en el build. Km enteros; "sin_ruta" cuando el motor no encuentra
// camino (islas) o la cabecera queda a más de snapMaxM de la red vial. NUNCA
// se sustituye por línea recta.
// ============================================================================

import { RUTAS, RUTAS_META } from "./rutas-plantas";
import { COMUNAS_POR_CUT } from "./comunas";
import { PLANTAS } from "./plantas";

export { RUTAS, RUTAS_META };

export interface RutaPlanta {
  plantaId: string;
  cut: string;
  /** Km por carretera, entero; null si estado = "sin_ruta". */
  km: number | null;
  estado: "ok" | "sin_ruta";
  /** Distancia (m) entre la cabecera y el punto de la red vial al que la ajustó el motor. */
  snapM?: number;
}

/** Motor → fuente del registro que lo describe. */
export const FUENTE_POR_MOTOR: Record<string, string> = {
  "OSRM · OpenStreetMap": "osm-osrm",
  "OpenRouteService · OpenStreetMap": "osm-ors",
};

/** Km por carretera de cada planta hacia una comuna (null = sin ruta). */
export function kmPorPlanta(cut: string): Record<string, number | null> {
  const out: Record<string, number | null> = {};
  for (const r of RUTAS) if (r.cut === cut) out[r.plantaId] = r.estado === "ok" ? r.km : null;
  return out;
}

// --- Validación (se integra a scripts/validar-datos.ts) --------------------
export function validarRutas(fuentes: Record<string, unknown>): string[] {
  const errores: string[] = [];
  const hoy = new Date().toISOString().slice(0, 10);
  const meta = RUTAS_META as { fechaCalculo: string; motor: string; servidor: string; perfil: string; servicio: string; fuenteId: string; plantas: number; comunas: number; ok: number; sinRuta: number; snapMaxM: number };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.fechaCalculo) || meta.fechaCalculo > hoy) errores.push(`rutas: meta con fechaCalculo inválida o futura (${meta.fechaCalculo}).`);
  if (!meta.motor?.trim()) errores.push("rutas: meta sin motor.");
  if (FUENTE_POR_MOTOR[meta.motor] !== meta.fuenteId) errores.push(`rutas: el motor "${meta.motor}" no corresponde a la fuente "${meta.fuenteId}".`);
  if (!fuentes[meta.fuenteId]) errores.push(`rutas: fuente inexistente "${meta.fuenteId}".`);
  if (meta.perfil !== "driving") errores.push(`rutas: perfil "${meta.perfil}" distinto de driving.`);
  if (!Number.isFinite(meta.snapMaxM) || meta.snapMaxM <= 0) errores.push("rutas: meta sin snapMaxM.");

  const plantas = new Set(PLANTAS.map((p) => p.id));
  const vistas = new Set<string>();
  const porPlanta: Record<string, number> = {};
  let ok = 0, sinRuta = 0;
  for (const r of RUTAS as RutaPlanta[]) {
    const d = `ruta ${r.plantaId} → ${r.cut}`;
    const k = `${r.plantaId}|${r.cut}`;
    if (vistas.has(k)) errores.push(`${d}: repetida.`);
    vistas.add(k);
    if (!plantas.has(r.plantaId)) errores.push(`${d}: planta inexistente.`);
    if (!COMUNAS_POR_CUT[r.cut]) errores.push(`${d}: CUT inexistente.`);
    if (r.estado !== "ok" && r.estado !== "sin_ruta") errores.push(`${d}: estado fuera de catálogo "${r.estado}".`);
    if (r.estado === "ok") {
      ok++;
      if (!Number.isInteger(r.km) || (r.km as number) < 0) errores.push(`${d}: km debe ser entero ≥ 0 cuando estado = ok.`);
      if (r.snapM !== undefined && r.snapM > meta.snapMaxM) errores.push(`${d}: estado ok con la cabecera a ${r.snapM} m de la red vial (máximo ${meta.snapMaxM}).`);
    }
    if (r.estado === "sin_ruta") {
      sinRuta++;
      if (r.km !== null) errores.push(`${d}: sin_ruta debe llevar km = null.`);
    }
    porPlanta[r.plantaId] = (porPlanta[r.plantaId] ?? 0) + 1;
  }
  const nComunas = Object.keys(COMUNAS_POR_CUT).length;
  for (const p of PLANTAS) {
    if ((porPlanta[p.id] ?? 0) !== nComunas) errores.push(`rutas: la planta "${p.id}" tiene ${porPlanta[p.id] ?? 0} rutas y debe tener ${nComunas} (una por comuna).`);
  }
  if (meta.plantas !== PLANTAS.length) errores.push(`rutas: la meta declara ${meta.plantas} plantas y el registro tiene ${PLANTAS.length}.`);
  if (meta.comunas !== nComunas) errores.push(`rutas: la meta declara ${meta.comunas} comunas y el registro tiene ${nComunas}.`);
  if (meta.ok !== ok || meta.sinRuta !== sinRuta) errores.push(`rutas: la meta declara ${meta.ok} ok / ${meta.sinRuta} sin_ruta y las filas suman ${ok} / ${sinRuta}.`);
  return errores;
}
