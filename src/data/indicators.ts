import type { Indicator, Study, Source } from "./types";

// ============================================================================
// FUENTES REALES verificadas por búsqueda web (agosto 2026).
// Cada cifra que se muestra en la plataforma apunta a una de estas fuentes.
// IMPORTANTE: son datos EXTERNOS reales. NO son mediciones propias del CCI.
// Todo lo que sea "dato CCI Chile" que aún no existe se marca status: "pending".
// ============================================================================

export const sources: Record<string, Source> = {
  mckinsey2019: {
    id: "mckinsey2019",
    title: "Modular construction: From projects to products",
    organization: "McKinsey & Company",
    year: 2019,
    url: "https://www.mckinsey.com/capabilities/operations/our-insights/modular-construction-from-projects-to-products",
    sourceType: "internacional",
  },
  mckinsey2023: {
    id: "mckinsey2023",
    title: "Making modular construction fit",
    organization: "McKinsey & Company",
    year: 2023,
    url: "https://www.mckinsey.com/capabilities/operations/our-insights/making-modular-construction-fit",
    sourceType: "internacional",
  },
  wef2025: {
    id: "wef2025",
    title: "How modular construction drives productivity and circularity",
    organization: "World Economic Forum",
    year: 2025,
    url: "https://www.weforum.org/stories/2025/01/modular-construction-productivity-circularity/",
    sourceType: "internacional",
  },
  jme2024: {
    id: "jme2024",
    title:
      "Construction Waste Reduction in Buildings through Modular and Offsite Construction",
    organization: "Journal of Management in Engineering (ASCE)",
    year: 2024,
    url: "https://ascelibrary.org/doi/10.1061/JMENEA.MEENG-5828",
    sourceType: "académica",
  },
  buildup2025: {
    id: "buildup2025",
    title: "Research Note on Offsite Construction",
    organization: "BUILD UP · Comisión Europea",
    year: 2025,
    url: "https://build-up.ec.europa.eu/",
    sourceType: "internacional",
  },
  minvuCI: {
    id: "minvuCI",
    title: "Construcción Industrializada · Listado de empresas industrializadoras y fichas VIT",
    organization: "MINVU · División Técnica de Estudio y Fomento Habitacional (DITEC)",
    year: 2026,
    url: "https://www.minvu.gob.cl/construccion-industrializada/",
    sourceType: "oficial",
  },
  normaVI2025: {
    id: "normaVI2025",
    title: "Norma de Construcción de Vivienda Industrializada",
    organization: "MINVU",
    year: 2025,
    url: "https://www.minvu.gob.cl/wp-content/uploads/2025/07/NORMA-CONSTRUCCION-INDUSTRIALIZADA-2025.pdf",
    sourceType: "oficial",
  },
  censo2024: {
    id: "censo2024",
    title: "Déficit Habitacional Cuantitativo, Censo 2024",
    organization: "MINVU · Centro de Estudios (INE)",
    year: 2025,
    url: "https://centrodeestudios.minvu.gob.cl/déficit-habitacional-censo-2024/",
    sourceType: "oficial",
  },
  peh2025: {
    id: "peh2025",
    title: "Plan de Emergencia Habitacional, reporte agosto 2025",
    organization: "Ministerio de Vivienda y Urbanismo",
    year: 2025,
    url: "https://www.minvu.gob.cl/plan-de-emergencia-habitacional/",
    sourceType: "oficial",
  },
};

// ---- Indicadores de la franja "El desafío" y "La evidencia" en la Home ----
// Mezclan un dato país oficial con evidencia internacional sólida.
export const indicators: Indicator[] = [
  {
    id: "déficit",
    value: "491.904",
    unit: "viviendas",
    label: "Déficit habitacional en Chile",
    note: "Requerimientos de nuevas viviendas estimados a partir del Censo 2024. Equivale al 7,5% de los hogares del país.",
    status: "real",
    sourceType: "oficial",
    source: sources.censo2024,
    lastUpdated: "2025-12-04",
    geography: "Chile",
  },
  {
    id: "plazo",
    value: "20–50%",
    label: "Reducción de plazo de obra",
    note: "Rango de aceleración de los plazos de proyecto de extremo a extremo que la construcción modular puede permitir frente a la construcción tradicional, según análisis internacional.",
    status: "real",
    sourceType: "internacional",
    source: sources.mckinsey2023,
    geography: "Internacional",
  },
  {
    id: "costo",
    value: "hasta 20%",
    label: "Ahorro potencial de costo",
    note: "Potencial de ahorro de costo total atribuible a las ganancias de productividad de la construcción modular en mercados de EE.UU. y Europa. Depende de logística y escala.",
    status: "real",
    sourceType: "internacional",
    source: sources.mckinsey2019,
    geography: "Internacional",
  },
  {
    id: "residuos",
    value: "~78%",
    label: "Menos residuos de obra",
    note: "Reducción promedio de residuos de construcción al adoptar construcción modular, en un análisis de 59 casos de edificación frente a construcción tradicional en sitio.",
    status: "real",
    sourceType: "académica",
    source: sources.jme2024,
    geography: "Internacional",
  },
];

// Indicadores país que el CCI aún NO ha levantado: se muestran honestamente vacíos.
export const pendingIndicators: Indicator[] = [
  {
    id: "viviendas-ind-cl",
    value: "En levantamiento",
    label: "Viviendas industrializadas en Chile",
    note: "El CCI está construyendo la metodología para cuantificar el parque industrializado nacional. Dato aún no disponible.",
    status: "pending",
    sourceType: "cci",
    geography: "Chile",
  },
  {
    id: "empresas-cl",
    value: "En levantamiento",
    label: "Empresas industrializadoras",
    note: "Catastro del ecosistema en construcción. Se publicara con su metodología.",
    status: "pending",
    sourceType: "cci",
    geography: "Chile",
  },
  {
    id: "plantas-cl",
    value: "En levantamiento",
    label: "Plantas productivas",
    note: "Infraestructura industrial instalada en el país. Dato en desarrollo.",
    status: "pending",
    sourceType: "cci",
    geography: "Chile",
  },
];

export const studies: Study[] = [
  {
    id: "s1",
    slug: "mckinsey-modular-projects-products",
    title: "Modular construction: From projects to products",
    organization: "McKinsey & Company",
    year: 2019,
    geography: "Internacional",
    topic: "Productividad y costo",
    keyFinding:
      "La construcción modular podría reducir los plazos totales de construcción hasta a la mitad y recortar costos hasta en un 20% en el entorno adecuado.",
    url: "https://www.mckinsey.com/capabilities/operations/our-insights/modular-construction-from-projects-to-products",
    sourceType: "internacional",
  },
  {
    id: "s2",
    slug: "asce-waste-reduction-offsite",
    title: "Construction Waste Reduction through Modular and Offsite Construction",
    organization: "Journal of Management in Engineering (ASCE)",
    year: 2024,
    geography: "Internacional",
    topic: "Residuos",
    keyFinding:
      "Sobre 59 casos de edificación, la construcción modular redujo en promedio cerca de un 79% los residuos de obra frente a la construcción tradicional en sitio.",
    url: "https://ascelibrary.org/doi/10.1061/JMENEA.MEENG-5828",
    sourceType: "académica",
  },
  {
    id: "s3",
    slug: "wef-modular-productivity-circularity",
    title: "How modular construction drives productivity and circularity",
    organization: "World Economic Forum",
    year: 2025,
    geography: "Internacional",
    topic: "Productividad y sostenibilidad",
    keyFinding:
      "Las ganancias de eficiencia y la menor necesidad de mano de obra en obra abren un potencial de hasta 20% de ahorro de costo total, además de habilitar la circularidad.",
    url: "https://www.weforum.org/stories/2025/01/modular-construction-productivity-circularity/",
    sourceType: "internacional",
  },
  {
    id: "s4",
    slug: "buildup-offsite-research-note",
    title: "Research Note on Offsite Construction",
    organization: "BUILD UP · Comisión Europea",
    year: 2025,
    geography: "Internacional",
    topic: "Plazo y calidad",
    keyFinding:
      "El entorno controlado de fabrica mejora el control de calidad y reduce el retrabajo, con estimaciones de reducción del tiempo de construcción de entre 20% y 60% frente al metodo tradicional.",
    url: "https://build-up.ec.europa.eu/",
    sourceType: "internacional",
  },
  {
    id: "s5",
    slug: "censo-2024-déficit-habitacional",
    title: "Déficit Habitacional Cuantitativo, Censo 2024",
    organization: "MINVU · Centro de Estudios",
    year: 2025,
    geography: "Chile",
    topic: "Politica habitacional",
    keyFinding:
      "El Censo 2024 estima 491.904 requerimientos de nuevas viviendas en Chile, equivalentes al 7,5% de los hogares del país.",
    url: "https://centrodeestudios.minvu.gob.cl/déficit-habitacional-censo-2024/",
    sourceType: "oficial",
  },
];
