// ============================================================================
// TIPOS — comunas y zonas térmicas (buscador por comuna de /data/vit)
// ============================================================================
// Separados del archivo generado (comunas-zonas.ts) y de los helpers
// (comunas.ts) para que ninguno importe al otro en círculo.
// ============================================================================

export const ZONAS_TERMICAS = ["A", "B", "C", "D", "E", "F", "G", "H", "I"] as const;
export type ZonaTermica = (typeof ZONAS_TERMICAS)[number];

export type TipoParticion = "ninguna" | "altitud" | "meridiano" | "meridiano y altitud";

/** Una fila de la tabla de la Ditec: una zona de una comuna, con su regla. */
export interface ZonaDeComuna {
  zona: string; // ZonaTermica (se valida en build)
  /** Regla literal de la Ditec, p. ej. "> 71°15'" (longitud oeste). */
  meridiano?: string;
  /** Regla literal de la Ditec, p. ej. "< 3.000" (msnm). */
  altitud?: string;
  /** La misma regla en palabras: "bajo 3.000 msnm", "al oeste del meridiano 71°". */
  condicion: string;
}

export interface ComunaZona {
  /** Código Único Territorial, 5 dígitos con cero a la izquierda. */
  cut: string;
  nombre: string;
  /** Otras grafías con que se busca la comuna (la oficial/INE cuando la Ditec escribe distinto: "Coyhaique", "Til Til"). */
  alias?: string[];
  /** Región tal como la rotula la tabla de la Ditec ("Coquimbo", "Metropolitana de Santiago"). */
  region: string;
  provincia: string;
  /** Cabecera comunal (grados decimales, WGS84). */
  lat: number;
  lon: number;
  /** Zonas en el orden de la tabla de la Ditec. */
  zonas: ZonaDeComuna[];
  tipoParticion: string; // TipoParticion (se valida en build)
  /** Zona por defecto: la única, o la del centro urbano si la comuna está partida. */
  zonaCentroUrbano: string;
  /** Método con que se obtuvo zonaCentroUrbano; null si la comuna tiene una sola zona. */
  metodoCentroUrbano: string | null;
  /** Caso al filo de la regla que conviene verificar en terreno. */
  verificar?: string;
  /** Corrección documentada a la coordenada del dataset provisional. */
  coordenadasNota?: string;
}
