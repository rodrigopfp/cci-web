// ============================================================================
// TAXONOMÍA DE EVIDENCIA — fuente única del "tipo de evidencia" (Fase 3 · ajuste 6)
// ============================================================================
// Mapea cada sourceType del registro a su etiqueta pública + nota de
// interpretación. El texto distingue; el color NO juzga (un solo estilo neutro
// para los 8 tipos). Se consume vía <EtiquetaEvidencia> y la validación.
// ============================================================================

import type { IndicatorSourceType } from "./tipos-indicadores";

export interface InfoEvidencia {
  etiqueta: string;
  interpretacion: string;
  /** Si true, el indicador de este tipo DEBE traer caveat (validado en build). */
  requiereCaveat?: boolean;
  /** Si true, la nota de interpretación se muestra visible bajo la cifra. */
  notaVisible?: boolean;
}

export const EVIDENCIA: Record<IndicatorSourceType, InfoEvidencia> = {
  official_chile: {
    etiqueta: "Dato oficial",
    interpretacion: "Publicado por una institución pública u organismo oficial, con alcance y fecha identificables.",
  },
  academic: {
    etiqueta: "Estudio independiente",
    interpretacion: "Investigación con metodología explícita, autores y fuente verificable.",
  },
  cci_data: {
    etiqueta: "Medición CCI",
    interpretacion: "Levantamiento desarrollado o coordinado por el CCI, con metodología y universo visibles.",
  },
  survey: {
    etiqueta: "Muestra sectorial",
    interpretacion: "Resultado observado en un conjunto de proyectos o empresas; no representa necesariamente a todo el mercado.",
    notaVisible: true,
  },
  sector_survey: {
    etiqueta: "Encuesta sectorial",
    interpretacion: "Opinión declarada por profesionales del sector en una encuesta con muestra identificada; refleja percepción, no medición de obras.",
    requiereCaveat: true,
    notaVisible: true,
  },
  documented_case: {
    etiqueta: "Caso documentado",
    interpretacion: "Resultado de un proyecto específico, con alcance y participantes identificados; no es un promedio sectorial.",
    notaVisible: true,
  },
  declared_by_organization: {
    etiqueta: "Declarado por la organización",
    interpretacion: "Información entregada por la organización y no verificada de forma independiente; no implica certificación del CCI.",
    requiereCaveat: true,
    notaVisible: true,
  },
  international: {
    etiqueta: "Benchmark internacional",
    interpretacion: "Derivado de estudios externos; no necesariamente trasladable directamente a Chile.",
  },
  estimate: {
    etiqueta: "Estimación",
    interpretacion: "Rango o proyección; interpretar con cautela dentro de su alcance.",
  },
};

export function infoEvidencia(tipo: string): InfoEvidencia | undefined {
  return EVIDENCIA[tipo as IndicatorSourceType];
}

/** ¿Se muestra la nota de interpretación visible bajo la cifra? */
export function notaVisibleEvidencia(tipo: string): boolean {
  return Boolean(EVIDENCIA[tipo as IndicatorSourceType]?.notaVisible);
}
