import type { Indicator } from "./types";
import { sources } from "./indicators";

// ============================================================================
// RADAR CCI — datos REALES extraídos del listado oficial del MINVU
// (https://www.minvu.gob.cl/construccion-industrializada/, consultado 08/2026).
//
// Fuente primaria: resoluciones exentas de la DITEC que aprueban empresas
// industrializadoras según Res. Ex. N°52. Cada registro apunta a su resolución.
//
// NOTA METODOLÓGICA: el listado contiene 26 resoluciones, pero ETERNA y
// TECNOTRUSS aparecen dos veces cada una (segunda resolución), por lo que las
// empresas únicas certificadas son 24.
// ============================================================================

export interface CertifiedCompany {
  name: string;
  resolution: string;
  date: string; // ISO
  year: number;
  /** true cuando es una segunda resolución de una empresa ya certificada */
  repeat?: boolean;
  /** empresa además en convenio con DITEC */
  convenio?: boolean;
}

export const certifiedCompanies: CertifiedCompany[] = [
  { name: "Patagual Home SpA", resolution: "Res. Ex. N°607", date: "2023-03-14", year: 2023, convenio: true },
  { name: "Santa Magdalena SpA", resolution: "Res. Ex. N°639", date: "2023-03-15", year: 2023, convenio: true },
  { name: "E2E S.A.", resolution: "Res. Ex. N°637", date: "2023-03-16", year: 2023, convenio: true },
  { name: "Promet Servicios SpA", resolution: "Res. Ex. N°679", date: "2023-03-27", year: 2023 },
  { name: "Baumax SpA", resolution: "Res. Ex. N°834", date: "2023-04-21", year: 2023, convenio: true },
  { name: "Syntheon Chile Ltda.", resolution: "Res. Ex. N°977", date: "2023-05-25", year: 2023 },
  { name: "Tecno Fast S.A.", resolution: "Res. Ex. N°1.092", date: "2023-06-14", year: 2023 },
  { name: "Tecnotruss S.A.", resolution: "Res. Ex. N°1.093", date: "2023-06-14", year: 2023, convenio: true },
  { name: "ATCO Sabinco S.A.", resolution: "Res. Ex. N°1.113", date: "2023-06-19", year: 2023 },
  { name: "Prefabricadas Premium SpA", resolution: "Res. Ex. N°1.657", date: "2023-10-04", year: 2023 },
  { name: "Co-ol Ltda.", resolution: "Res. Ex. N°233", date: "2024-02-06", year: 2024 },
  { name: "Cintac S.A.I.C.", resolution: "Res. Ex. N°254", date: "2024-02-12", year: 2024 },
  { name: "Imel Town House SpA", resolution: "Res. Ex. N°484", date: "2024-04-01", year: 2024 },
  { name: "Eterna SpA", resolution: "Res. Ex. N°835", date: "2024-06-11", year: 2024 },
  { name: "RCM Modular Chile S.A.", resolution: "Res. Ex. N°1.736", date: "2024-11-14", year: 2024 },
  { name: "RTA Casas SpA", resolution: "Res. Ex. N°1.737", date: "2024-11-15", year: 2024 },
  { name: "Aceros O'Higgins SpA", resolution: "Res. Ex. N°1.839", date: "2024-12-03", year: 2024 },
  { name: "Rivadeneira y Collao Ltda. (RC Tecnova)", resolution: "Res. Ex. N°171", date: "2025-01-31", year: 2025 },
  { name: "Eterna SpA", resolution: "Res. Ex. N°320", date: "2025-03-03", year: 2025, repeat: true },
  { name: "Grupo SCM SpA", resolution: "Res. Ex. N°578", date: "2025-04-24", year: 2025 },
  { name: "Prefabricados de Concreto Rodríguez SpA", resolution: "Res. Ex. N°1.196", date: "2025-08-27", year: 2025 },
  { name: "Canada House SpA", resolution: "Res. Ex. N°1.702", date: "2025-11-13", year: 2025 },
  { name: "Tecnotruss S.A.", resolution: "Res. Ex. N°1.823", date: "2025-12-02", year: 2025, repeat: true },
  { name: "Centro Industrializado Modular La Leonera SpA", resolution: "Res. Ex. N°33", date: "2026-01-12", year: 2026 },
  { name: "Viviendas Prefabricadas Andes SpA", resolution: "Res. Ex. N°234", date: "2026-02-11", year: 2026 },
  { name: "Steel Home SpA", resolution: "Res. Ex. N°785", date: "2026-05-26", year: 2026 },
];

/** Empresas únicas (descontando segundas resoluciones). */
export const uniqueCompanyCount = new Set(
  certifiedCompanies.filter((c) => !c.repeat).map((c) => c.name)
).size;

/** Resoluciones nuevas por año — serie temporal real. */
export const certificationsByYear = [2023, 2024, 2025, 2026].map((y) => ({
  year: y,
  count: certifiedCompanies.filter((c) => c.year === y).length,
}));

/** Empresas en convenio directo con la DITEC (listado MINVU). */
export const conveniosDitec = [
  "Constructora Santa Magdalena SpA",
  "E2E S.A.",
  "Patagual Home SpA",
  "Tecnotruss S.A.",
  "Easywood S.A.",
  "Baumax SpA",
];

// ---- Indicadores principales del Radar ----------------------------------
export const radarIndicators: Indicator[] = [
  {
    id: "empresas",
    value: String(uniqueCompanyCount),
    label: "Empresas industrializadoras certificadas",
    note: "Empresas únicas aprobadas por la DITEC del MINVU según Res. Ex. N°52, habilitadas para presentar proyectos de Vivienda Industrializada Tipo. El listado contiene 26 resoluciones; dos empresas tienen una segunda resolución.",
    status: "real",
    sourceType: "oficial",
    source: sources.minvuCI,
    lastUpdated: "2026-06-03",
    geography: "Chile",
  },
  {
    id: "tipologias",
    value: "42",
    label: "Tipologías VIT aprobadas",
    note: "Tipologías de Vivienda Industrializada Tipo aprobadas por la DITEC. El MINVU publica 24 fichas técnicas descargables de ese universo.",
    status: "real",
    sourceType: "oficial",
    source: sources.minvuCI,
    lastUpdated: "2026-06-03",
    geography: "Chile",
  },
  {
    id: "convenios",
    value: "6",
    label: "Industrializadoras en convenio con DITEC",
    note: "Empresas con convenio vigente con la División Técnica de Estudio y Fomento Habitacional, según el listado oficial del MINVU.",
    status: "real",
    sourceType: "oficial",
    source: sources.minvuCI,
    lastUpdated: "2026-06-03",
    geography: "Chile",
  },
  {
    id: "déficit-radar",
    value: "491.904",
    unit: "viviendas",
    label: "Déficit habitacional",
    note: "Requerimientos de nuevas viviendas estimados a partir del Censo 2024. Equivale al 7,5% de los hogares del país. Es el problema que la industrialización busca ayudar a resolver.",
    status: "real",
    sourceType: "oficial",
    source: sources.censo2024,
    lastUpdated: "2025-12-04",
    geography: "Chile",
  },
];

/** Indicadores que aún NO existen públicamente: se declaran vacíos. */
export const radarPending: Indicator[] = [
  {
    id: "viviendas-construidas",
    value: "En levantamiento",
    label: "Viviendas industrializadas construidas",
    note: "No existe un conteo público consolidado del parque industrializado nacional. El CCI trabaja en la metodología para cuantificarlo.",
    status: "pending",
    sourceType: "cci",
    geography: "Chile",
  },
  {
    id: "plantas",
    value: "En levantamiento",
    label: "Plantas productivas y su ubicación",
    note: "El MINVU certifica empresas, no publica un catastro georreferenciado de plantas. Dato en construcción a partir de fuentes propias.",
    status: "pending",
    sourceType: "cci",
    geography: "Chile",
  },
  {
    id: "capacidad",
    value: "En levantamiento",
    label: "Capacidad instalada (viviendas/año)",
    note: "Requiere declaración voluntaria de las empresas. No se publicará sin autorización de cada una.",
    status: "pending",
    sourceType: "empresa",
    geography: "Chile",
  },
];
