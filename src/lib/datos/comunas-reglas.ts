// ============================================================================
// REGLAS DE LA ZONIFICACIÓN TÉRMICA POR COMUNA — funciones puras, sin datos
// ============================================================================
// Las usa el generador (scripts/rutas/generar-comunas.ts) para calcular la zona
// del centro urbano y las condiciones en palabras, y el validador (comunas.ts)
// para RECALCULARLAS y comparar con lo que quedó escrito en comunas-zonas.ts.
// Así el build falla si el archivo generado se edita a mano o queda desfasado.
// ============================================================================

export interface ReglaZona {
  zona: string;
  /** Regla literal de la Ditec, p. ej. "> 71°15'" (longitud oeste). */
  meridiano?: string;
  /** Regla literal de la Ditec, p. ej. "< 3.000", "≥ 3.000", "1.100 ≤ altitud < 3.000". */
  altitud?: string;
}

export const METODO_CENTRO_URBANO =
  "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec";

/** Bajo cuántos minutos de arco la cabecera se considera "al filo" del meridiano. */
export const MINUTOS_AL_FILO = 2;

/**
 * Correcciones puntuales al dataset provisional de coordenadas, por CUT, cada
 * una con su fuente. El generador las aplica y el validador exige que sigan
 * aplicadas (coordenadas iguales y nota presente).
 */
export const CORRECCIONES_COORDENADAS: Record<string, { lat: number; lon: number; nota: string }> = {
  "14104": {
    lat: -39.8634009,
    lon: -72.8129655,
    nota: "La coordenada del dataset provisional (−41,92, −72,14) cae en la cordillera de la Región de Los Lagos, a 16,6 km de la red vial, y no en la comuna Los Lagos (Los Ríos). Se reemplaza por el centro de la ciudad de Los Lagos según OpenStreetMap (Nominatim, relación 1785707, consulta del 21.09.2026).",
  },
};

/** Prefijo (código de región) de los CUT de 5 dígitos, por región tal como la rotula la Ditec. */
export const CUT_PREFIJO_REGION: Record<string, string> = {
  "Arica y Parinacota": "15",
  Tarapacá: "01",
  Antofagasta: "02",
  Atacama: "03",
  Coquimbo: "04",
  Valparaíso: "05",
  "Metropolitana de Santiago": "13",
  "O'Higgins": "06",
  Maule: "07",
  Ñuble: "16",
  Biobío: "08",
  "La Araucanía": "09",
  "Los Ríos": "14",
  "Los Lagos": "10",
  Aysén: "11",
  Magallanes: "12",
};

/** "≥ 70°", "> 71°15'", "≤ 70°44'" → { op, w: grados oeste decimales } */
export function parseMeridiano(s: string): { op: string; w: number } | null {
  const m = s.match(/^([<>≤≥])\s*(\d+)°(?:\s*(\d+)')?$/);
  if (!m) return null;
  return { op: m[1], w: Number(m[2]) + (m[3] ? Number(m[3]) / 60 : 0) };
}

/** "< 1.100" → [0,1100) · "1.100 ≤ altitud < 3.000" → [1100,3000) · "≥ 3.000" / "> 1.000" → [n,∞). Vacío → [0,∞). */
export function parseAltitud(s: string | undefined): { lo: number; hi: number } {
  if (!s) return { lo: 0, hi: Infinity };
  const n = (x: string) => Number(x.replace(/\./g, ""));
  let m = s.match(/^([\d.]+)\s*≤\s*altitud\s*<\s*([\d.]+)$/);
  if (m) return { lo: n(m[1]), hi: n(m[2]) };
  m = s.match(/^<\s*([\d.]+)$/);
  if (m) return { lo: 0, hi: n(m[1]) };
  m = s.match(/^[≥>]\s*([\d.]+)$/);
  if (m) return { lo: n(m[1]), hi: Infinity };
  throw new Error(`Condición de altitud no reconocida: "${s}"`);
}

/** Convención: "> 71°" = longitud oeste mayor que 71°, es decir, más al oeste. */
export function cumpleMeridiano(cond: string | undefined, lon: number): boolean {
  if (!cond) return true;
  const p = parseMeridiano(cond);
  if (!p) throw new Error(`Condición de meridiano no reconocida: "${cond}"`);
  const w = -lon; // longitud oeste en grados positivos
  switch (p.op) {
    case ">": return w > p.w;
    case "≥": return w >= p.w;
    case "<": return w < p.w;
    case "≤": return w <= p.w;
  }
  return false;
}

export function meridianoEnPalabras(cond: string): string {
  const p = parseMeridiano(cond);
  if (!p) return cond;
  const lado = p.op === ">" || p.op === "≥" ? "al oeste" : "al este";
  return `${lado} del meridiano ${cond.replace(/^[<>≤≥]\s*/, "")}`;
}

export function altitudEnPalabras(cond: string): string {
  let m = cond.match(/^([\d.]+)\s*≤\s*altitud\s*<\s*([\d.]+)$/);
  if (m) return `entre ${m[1]} y ${m[2]} msnm`;
  m = cond.match(/^<\s*([\d.]+)$/);
  if (m) return `bajo ${m[1]} msnm`;
  m = cond.match(/^[≥>]\s*([\d.]+)$/);
  if (m) return `sobre ${m[1]} msnm`;
  return cond;
}

/** La regla completa de una zona, en palabras ("al este del meridiano 70° y bajo 3.000 msnm"). */
export function condicionEnPalabras(z: { meridiano?: string; altitud?: string }): string {
  return [z.meridiano ? meridianoEnPalabras(z.meridiano) : "", z.altitud ? altitudEnPalabras(z.altitud) : ""].filter(Boolean).join(" y ");
}

/**
 * Zona del centro urbano de una comuna partida: 1) quedan las zonas cuya regla
 * de meridiano se cumple con la longitud de la cabecera (o no tienen regla);
 * 2) de ellas, la franja de altitud más baja (empate → orden de la tabla).
 * Devuelve null si ninguna regla de meridiano se cumple.
 */
export function zonaCentroUrbano(zonas: ReglaZona[], lon: number): string | null {
  const candidatas = zonas.filter((z) => cumpleMeridiano(z.meridiano, lon));
  if (!candidatas.length) return null;
  let mejor = candidatas[0];
  for (const z of candidatas) if (parseAltitud(z.altitud).lo < parseAltitud(mejor.altitud).lo) mejor = z;
  return mejor.zona;
}

/** Distancia angular mínima (minutos) entre la cabecera y los meridianos de la regla, si los hay. */
export function minutosAlMeridiano(zonas: ReglaZona[], lon: number): { minutos: number; meridiano: string } | null {
  let mejor: { minutos: number; meridiano: string } | null = null;
  for (const z of zonas) {
    const p = z.meridiano ? parseMeridiano(z.meridiano) : null;
    if (!p) continue;
    const minutos = Math.abs(-lon - p.w) * 60;
    if (!mejor || minutos < mejor.minutos) mejor = { minutos, meridiano: z.meridiano!.replace(/^[<>≤≥]\s*/, "") };
  }
  return mejor;
}

/** Texto de la marca "verificar" para una cabecera al filo del meridiano. */
export function textoVerificar(minutos: number, meridiano: string): string {
  const m = minutos.toFixed(1).replace(".", ",");
  return `La cabecera queda a ${m} minutos del meridiano ${meridiano}; la zona del centro urbano se debe verificar en terreno.`;
}
