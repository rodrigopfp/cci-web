// ============================================================================
// GOBERNANZA DE DATOS — tipos de la fuente única de CIFRAS del sitio (Paso 1)
// ============================================================================
// Registro tipado de indicadores y sus fuentes. Se valida en cada build
// (scripts/validar-datos.ts + prebuild) y se consume vía src/lib/datos/indice.ts.
// Regla absoluta: ninguna cifra sin fuente; nada se inventa.
// ============================================================================

export const DOCUMENT_TYPES = [
  "estudio",
  "censo",
  "norma",
  "guia",
  "registro_oficial",
  "informe",
  "otro",
] as const;
export type DocumentType = (typeof DOCUMENT_TYPES)[number];

export const SOURCE_TYPES = [
  "official_chile",
  "cci_data",
  "academic",
  "international",
  "documented_case",
  "survey",
  "estimate",
] as const;
export type IndicatorSourceType = (typeof SOURCE_TYPES)[number];

export const CATEGORIES = [
  "vivienda",
  "productividad",
  "residuos",
  "plazos",
  "bim",
  "adopcion",
  "casos",
  "normativa",
  "otro",
] as const;
export type IndicatorCategory = (typeof CATEGORIES)[number];

export const VERIFICATION_STATUSES = [
  "draft",
  "pending_verification",
  "verified",
  "outdated",
  "replaced",
  "archived",
] as const;
export type VerificationStatus = (typeof VERIFICATION_STATUSES)[number];

export const VISUALIZATION_TYPES = ["contador", "velocimetro", "duelo", "texto", "otro"] as const;
export type VisualizationType = (typeof VISUALIZATION_TYPES)[number];

export interface DataSource {
  id: string;
  organization: string; // p. ej. "MINVU"
  title: string; // título exacto del documento
  /** Etiqueta corta para la línea "Fuente:" de las tarjetas. */
  shortLabel?: string;
  url?: string;
  publicationDate?: string; // ISO o año
  accessedAt: string; // ISO — cuándo se verificó
  documentType: DocumentType;
  geography?: string;
  notes?: string;
}

export interface DataIndicator {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  value: number | string;
  unit?: string;
  prefix?: string;
  suffix?: string;
  geography: string; // "Chile", "Latam", "internacional"
  period?: string; // p. ej. "2023-2024"
  cutoffDate: string; // fecha de corte del dato (ISO)
  category: IndicatorCategory;
  tags: string[];
  sourceId: string; // debe existir en fuentes.ts
  sourceType: IndicatorSourceType;
  methodology?: string;
  scope: string; // OBLIGATORIO — universo del dato
  caveat?: string;
  verificationStatus: VerificationStatus;
  lastVerifiedAt: string; // ISO
  nextReviewAt?: string; // ISO
  owner: string; // "editor CCI"
  version: number;
  visualizationType?: VisualizationType;
  featured?: boolean;
}

export interface DataRevision {
  indicatorSlug: string;
  previousValue?: string | number;
  newValue?: string | number;
  changedAt: string; // ISO
  changedBy: string;
  reason: string;
  sourceId: string;
}
