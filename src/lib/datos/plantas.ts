// ============================================================================
// PLANTAS INDUSTRIALIZADORAS — solo las declaradas como planta en la
// resolución de autorización Res. Ex. N°52, o confirmadas por la empresa
// ============================================================================
// Decisión (21.09.2026): las demás industrializadoras quedan SIN planta. Sus
// domicilios de resolución no se usan como planta (Baumax y Promet declaran
// oficinas; Patagual, un departamento). El sitio muestra "planta por
// confirmar" para sus viviendas.
//
// Coordenadas: geocodificación con Nominatim (OpenStreetMap) mediante
// scripts/rutas/geocodificar-plantas.ts (un request por segundo, User-Agent
// del CCI), el 21.09.2026. Cuando la dirección no geocodificó, la planta usa
// la cabecera de su comuna (misma fuente que el buscador) y lo declara como
// "aproximado, centro de la comuna"; el validador exige que esas coordenadas
// sean exactamente las del registro de comunas. Provenance completa en
// scripts/rutas/plantas-geocodificadas.json.
// ============================================================================

import { COMUNAS_POR_CUT } from "./comunas";

export const ORIGENES_COORDENADAS = ["geocodificada", "aproximado, centro de la comuna"] as const;
export type OrigenCoordenadas = (typeof ORIGENES_COORDENADAS)[number];

export interface Planta {
  id: string;
  /** Clave que usan las viviendas en vit-zonas.ts. */
  industrializadoraId: string;
  industrializadora: string;
  /** Nombre visible de la planta (sin la palabra "Planta": el rótulo la aporta). */
  nombre: string;
  /** Dirección tal como la declara la resolución (o la empresa), con sus grafías. */
  direccionLiteral: string;
  /** Aclaraciones a la dirección literal (grafías, complementos). */
  direccionNota?: string;
  comuna: string;
  cut: string;
  lat: number;
  lon: number;
  /** Cómo se obtuvieron lat/lon. */
  origenCoordenadas: OrigenCoordenadas;
  /** Fuente de las coordenadas: Nominatim (geocodificada) o el registro de comunas (aproximado). */
  fuenteCoordenadasId: "osm-nominatim" | "coordenadas-comunas-altazor";
  metodo: string;
  fechaCoordenadas: string;
  /** Fuente de que ESTA dirección es una planta. */
  fuenteId: string;
  fuenteTexto: string;
  confirmacionEmpresa?: string;
}

const FECHA_GEO = "2026-09-21";
const NOMINATIM = "Nominatim · OpenStreetMap, 21.09.2026";

/** Cabecera comunal del registro (fallback declarado como aproximado). */
function cabecera(cut: string): { lat: number; lon: number } {
  const c = COMUNAS_POR_CUT[cut];
  if (!c) throw new Error(`[plantas] No existe la comuna con CUT ${cut} en el registro.`);
  return { lat: c.lat, lon: c.lon };
}

export const PLANTAS: Planta[] = [
  {
    id: "tecnotruss-colina",
    industrializadoraId: "tecnotruss",
    industrializadora: "Tecnotruss S.A.",
    nombre: "Tecno Panel (Colina)",
    direccionLiteral: "Av. José de San Martín sin número, sitio 98, Loteo Industrial Los Libertadores, Colina, Región Metropolitana",
    comuna: "Colina",
    cut: "13301",
    ...cabecera("13301"),
    origenCoordenadas: "aproximado, centro de la comuna",
    fuenteCoordenadasId: "coordenadas-comunas-altazor",
    metodo: `${NOMINATIM}: ninguna variante de la dirección devolvió resultado (loteo industrial sin calle numerada en OSM); se usa la cabecera comunal de Colina del registro de comunas`,
    fechaCoordenadas: FECHA_GEO,
    fuenteId: "minvu-res-ex-1093",
    fuenteTexto: "Res. Ex. N°1.093 de 14.06.2023",
  },
  {
    id: "tecnofast-lampa",
    industrializadoraId: "tecnofast",
    industrializadora: "Tecno Fast S.A.",
    nombre: "Lampa",
    direccionLiteral: "Av. La Montaña N°692, Lampa, Región Metropolitana",
    comuna: "Lampa",
    cut: "13302",
    lat: -33.3136952,
    lon: -70.7248201,
    origenCoordenadas: "geocodificada",
    fuenteCoordenadasId: "osm-nominatim",
    metodo: `${NOMINATIM}: consulta "Avenida La Montaña 692, Lampa, Región Metropolitana, Chile"; coincidencia a nivel de calle (highway/secondary), sin número`,
    fechaCoordenadas: FECHA_GEO,
    fuenteId: "minvu-res-ex-1092",
    fuenteTexto: "Res. Ex. N°1.092 de 14.06.2023",
  },
  {
    id: "tecnofast-colina",
    industrializadoraId: "tecnofast",
    industrializadora: "Tecno Fast S.A.",
    nombre: "Colina",
    direccionLiteral: "Av. Pdte. Eduardo Frey Montalva N°17000, Colina, Región Metropolitana",
    direccionNota: "La resolución escribe \"Frey Montalva\"; la avenida es Presidente Eduardo Frei Montalva (Panamericana Norte), que es como se geocodificó.",
    comuna: "Colina",
    cut: "13301",
    lat: -33.3240948,
    lon: -70.7187081,
    origenCoordenadas: "geocodificada",
    fuenteCoordenadasId: "osm-nominatim",
    metodo: `${NOMINATIM}: consulta "Avenida Presidente Eduardo Frei Montalva 17000, Colina, Región Metropolitana, Chile"; coincidencia a nivel de calle (highway/secondary), sin número`,
    fechaCoordenadas: FECHA_GEO,
    fuenteId: "minvu-res-ex-1092",
    fuenteTexto: "Res. Ex. N°1.092 de 14.06.2023",
  },
  {
    id: "prefabricadas-premium-coquimbo",
    industrializadoraId: "prefabricadas-premium",
    industrializadora: "Prefabricadas Premium SpA",
    nombre: "Pan de Azúcar (Coquimbo)",
    direccionLiteral: "Fundo Santa Amalia Lote 5A, Pan de Azúcar, Coquimbo",
    comuna: "Coquimbo",
    cut: "04102",
    ...cabecera("04102"),
    origenCoordenadas: "aproximado, centro de la comuna",
    fuenteCoordenadasId: "coordenadas-comunas-altazor",
    metodo: `${NOMINATIM}: ninguna variante de la dirección devolvió resultado (Nominatim solo ofrece una calle homónima "Pan de Azúcar" dentro de la ciudad, descartada); se usa la cabecera comunal de Coquimbo del registro de comunas`,
    fechaCoordenadas: FECHA_GEO,
    fuenteId: "minvu-res-ex-1657",
    fuenteTexto: "Res. Ex. N°1.657 de 04.10.2023 · ubicación de planta confirmada por la empresa el 21.09.2026",
    confirmacionEmpresa: "2026-09-21",
  },
];

export const PLANTAS_POR_ID: Record<string, Planta> = Object.fromEntries(PLANTAS.map((p) => [p.id, p]));

export function plantasDe(industrializadoraId: string): Planta[] {
  return PLANTAS.filter((p) => p.industrializadoraId === industrializadoraId);
}

// --- Validación (se integra a scripts/validar-datos.ts) --------------------
export function validarPlantas(fuentes: Record<string, unknown>): string[] {
  const errores: string[] = [];
  const hoy = new Date().toISOString().slice(0, 10);
  const ids = new Set<string>();
  for (const p of PLANTAS) {
    const d = `planta "${p.id}"`;
    if (ids.has(p.id)) errores.push(`${d}: id repetido.`);
    ids.add(p.id);
    if (!fuentes[p.fuenteId]) errores.push(`${d}: fuenteId inexistente "${p.fuenteId}".`);
    if (!fuentes[p.fuenteCoordenadasId]) errores.push(`${d}: fuenteCoordenadasId inexistente "${p.fuenteCoordenadasId}".`);
    if (!p.fuenteTexto.trim()) errores.push(`${d}: sin texto de fuente.`);
    if (!p.nombre.trim() || /^planta\b/i.test(p.nombre)) errores.push(`${d}: el nombre no debe empezar con "Planta" (el rótulo lo aporta).`);
    if (!Number.isFinite(p.lat) || !Number.isFinite(p.lon)) errores.push(`${d}: sin coordenadas.`);
    else if (p.lat > -17 || p.lat < -56.5 || p.lon > -66 || p.lon < -110) errores.push(`${d}: coordenadas fuera de Chile.`);
    if (!(ORIGENES_COORDENADAS as readonly string[]).includes(p.origenCoordenadas)) errores.push(`${d}: origenCoordenadas fuera de catálogo "${p.origenCoordenadas}".`);
    if (!p.metodo.trim()) errores.push(`${d}: sin método de coordenadas.`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(p.fechaCoordenadas) || p.fechaCoordenadas > hoy) errores.push(`${d}: fechaCoordenadas inválida o futura (${p.fechaCoordenadas}).`);
    if (p.confirmacionEmpresa && (!/^\d{4}-\d{2}-\d{2}$/.test(p.confirmacionEmpresa) || p.confirmacionEmpresa > hoy)) errores.push(`${d}: confirmacionEmpresa inválida o futura.`);
    const comuna = COMUNAS_POR_CUT[p.cut];
    if (!comuna) errores.push(`${d}: CUT "${p.cut}" no existe en el registro de comunas.`);
    else {
      if (comuna.nombre !== p.comuna) errores.push(`${d}: la comuna "${p.comuna}" no coincide con el CUT ${p.cut} (${comuna.nombre}).`);
      if (p.origenCoordenadas === "aproximado, centro de la comuna") {
        if (p.lat !== comuna.lat || p.lon !== comuna.lon) errores.push(`${d}: declara "aproximado, centro de la comuna" pero sus coordenadas no son las de la cabecera del registro.`);
        if (p.fuenteCoordenadasId !== "coordenadas-comunas-altazor") errores.push(`${d}: la fuente de coordenadas de una planta aproximada debe ser la del registro de comunas.`);
      } else if (p.fuenteCoordenadasId !== "osm-nominatim") {
        errores.push(`${d}: una planta geocodificada debe citar a Nominatim como fuente de coordenadas.`);
      }
    }
    if (!p.direccionLiteral.trim()) errores.push(`${d}: sin dirección literal.`);
  }
  return errores;
}
