/**
 * Geocodificación de las plantas industrializadoras registradas (Nominatim /
 * OpenStreetMap). Se ejecuta A MANO (no corre en el build):
 *
 *   npx tsx scripts/rutas/geocodificar-plantas.ts
 *
 * Reglas: un request por segundo, User-Agent que identifica al CCI, sin
 * dependencias. Para cada planta se prueban variantes de la misma dirección,
 * de la más específica a la más general (calle → localidad). La primera que
 * responde se toma y se registra QUÉ consulta respondió, para que el método
 * quede a la vista en src/lib/datos/plantas.ts. Si ninguna variante responde,
 * el resultado queda en null y la planta debe usar la cabecera de su comuna
 * con origen "aproximado, centro de la comuna".
 *
 * Salida: scripts/rutas/plantas-geocodificadas.json (provenance) y el mismo
 * JSON por stdout.
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const UA = "cci-hub/1.0 (Consejo de Construccion Industrializada; https://construccionindustrializada.cl)";
const NOMINATIM = "https://nominatim.openstreetmap.org/search";

/**
 * Una consulta. `soloLugar` = la variante ya no lleva calle: solo se acepta un
 * resultado de categoría "place" (localidad, aldea, barrio) cuyo nombre sea el
 * de la localidad buscada. Evita falsos positivos como una CALLE homónima en
 * otra parte de la comuna (p. ej. la calle "Pan de Azúcar" dentro de la ciudad
 * de Coquimbo, que no es la localidad Pan de Azúcar de la Ruta 43).
 */
type Consulta = { q: string; soloLugar?: string };
type Planta = { id: string; empresa: string; nombre: string; comuna: string; consultas: Consulta[] };

// Direcciones LITERALES de las resoluciones Res. Ex. N°52 (o confirmación de
// la empresa), con variantes progresivas. No se inventa nada: cada variante es
// un subconjunto de la misma dirección.
const PLANTAS: Planta[] = [
  {
    id: "tecnotruss-colina",
    empresa: "Tecnotruss S.A.",
    nombre: "Planta Tecno Panel",
    comuna: "Colina",
    consultas: [
      { q: "Avenida José de San Martín, Loteo Industrial Los Libertadores, Colina, Región Metropolitana, Chile" },
      { q: "Loteo Industrial Los Libertadores, Colina, Región Metropolitana, Chile" },
      { q: "Los Libertadores, Colina, Región Metropolitana, Chile", soloLugar: "Los Libertadores" },
      { q: "Avenida José de San Martín, Colina, Región Metropolitana, Chile" },
    ],
  },
  {
    id: "tecnofast-lampa",
    empresa: "Tecno Fast S.A.",
    nombre: "Planta Lampa",
    comuna: "Lampa",
    consultas: [
      { q: "Avenida La Montaña 692, Lampa, Región Metropolitana, Chile" },
      { q: "Av. La Montaña 692, Lampa, Chile" },
      { q: "Avenida La Montaña, Lampa, Región Metropolitana, Chile" },
    ],
  },
  {
    id: "tecnofast-colina",
    empresa: "Tecno Fast S.A.",
    nombre: "Planta Colina",
    comuna: "Colina",
    consultas: [
      { q: "Avenida Presidente Eduardo Frei Montalva 17000, Colina, Región Metropolitana, Chile" },
      { q: "Panamericana Norte 17000, Colina, Región Metropolitana, Chile" },
      { q: "Ruta 5 Norte 17000, Colina, Chile" },
      { q: "Avenida Presidente Eduardo Frei Montalva, Colina, Región Metropolitana, Chile" },
    ],
  },
  {
    id: "prefabricadas-premium-coquimbo",
    empresa: "Prefabricadas Premium SpA",
    nombre: "Planta Pan de Azúcar",
    comuna: "Coquimbo",
    consultas: [
      { q: "Fundo Santa Amalia Lote 5A, Pan de Azúcar, Coquimbo, Chile" },
      { q: "Santa Amalia, Pan de Azúcar, Coquimbo, Chile" },
      { q: "Ruta 43, Pan de Azúcar, Coquimbo, Chile" },
      { q: "Pan de Azúcar, Coquimbo, Región de Coquimbo, Chile", soloLugar: "Pan de Azúcar" },
      { q: "Pan de Azúcar, Elqui, Chile", soloLugar: "Pan de Azúcar" },
    ],
  },
];

const dormir = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Hit = { lat: number; lon: number; display: string; tipo: string; nombre: string };

async function buscar(c: Consulta): Promise<Hit | null> {
  const url = `${NOMINATIM}?format=jsonv2&limit=5&countrycodes=cl&addressdetails=1&q=${encodeURIComponent(c.q)}`;
  const res = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "es" } });
  if (!res.ok) throw new Error(`Nominatim HTTP ${res.status} para "${c.q}"`);
  const data = (await res.json()) as Array<{ lat: string; lon: string; display_name: string; type: string; category: string; name?: string }>;
  const norm = (s: string) => s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
  const candidatos = c.soloLugar
    ? data.filter((d) => d.category === "place" && norm(d.name ?? "") === norm(c.soloLugar as string))
    : data.slice(0, 1);
  if (!candidatos.length) return null;
  const d = candidatos[0];
  return { lat: Number(d.lat), lon: Number(d.lon), display: d.display_name, tipo: `${d.category}/${d.type}`, nombre: d.name ?? "" };
}

async function main() {
  const hoy = new Date().toISOString().slice(0, 10);
  const salida: Record<string, unknown> = { fecha: hoy, motor: "Nominatim · OpenStreetMap", userAgent: UA, plantas: [] as unknown[] };
  const plantas = salida.plantas as unknown[];

  for (const p of PLANTAS) {
    let resultado: Hit | null = null;
    let consultaUsada: Consulta | null = null;
    const intentos: { consulta: string; hit: boolean }[] = [];
    for (const c of p.consultas) {
      await dormir(1100); // un request por segundo (política de uso de Nominatim)
      const r = await buscar(c);
      intentos.push({ consulta: c.q, hit: Boolean(r) });
      console.error(`${p.id} · "${c.q}" → ${r ? `${r.lat}, ${r.lon} (${r.tipo} · ${r.display})` : "sin resultado"}`);
      if (r) { resultado = r; consultaUsada = c; break; }
    }
    // Nivel de precisión, según la categoría que devolvió Nominatim: una
    // dirección con número puede resolverse solo a la CALLE (highway/*).
    const precision = !resultado ? "sin resultado"
      : resultado.tipo.startsWith("place/") ? "localidad"
      : resultado.tipo.startsWith("highway/") ? "calle (sin número)"
      : resultado.tipo.startsWith("building/") || resultado.tipo.startsWith("amenity/") || resultado.tipo.startsWith("landuse/") ? "predio o edificio"
      : resultado.tipo;
    plantas.push({
      id: p.id, empresa: p.empresa, nombre: p.nombre, comuna: p.comuna,
      lat: resultado?.lat ?? null, lon: resultado?.lon ?? null,
      consultaUsada: consultaUsada?.q ?? null, nivel: resultado?.tipo ?? null, precision,
      displayName: resultado?.display ?? null,
      esPrimeraVariante: consultaUsada?.q === p.consultas[0].q,
      intentos,
    });
  }

  const ruta = resolve(__dirname, "plantas-geocodificadas.json");
  writeFileSync(ruta, JSON.stringify(salida, null, 2) + "\n", "utf8");
  console.log(JSON.stringify(salida, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
