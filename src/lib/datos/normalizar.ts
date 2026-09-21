/**
 * Utilidades de texto sin datos ni dependencias, para que el componente de
 * cliente del buscador pueda importarlas sin arrastrar el registro completo
 * de comunas.
 */

/** Sin tildes, minúsculas, apóstrofos unificados y espacios simples. */
export function normalizarNombre(s: string): string {
  return s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Regiones cuyo nombre largo no sigue el patrón "Región de …". */
const REGION_LARGA: Record<string, string> = {
  "Metropolitana de Santiago": "Región Metropolitana de Santiago",
  Maule: "Región del Maule",
  Biobío: "Región del Biobío",
  "O'Higgins": "Región del Libertador General Bernardo O'Higgins",
};

/** "Coquimbo" → "Región de Coquimbo"; "Maule" → "Región del Maule"; etc. */
export function regionLarga(region: string): string {
  return REGION_LARGA[region] ?? `Región de ${region}`;
}
