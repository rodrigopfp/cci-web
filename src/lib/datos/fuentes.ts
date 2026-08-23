// ============================================================================
// FUENTES — Record<string, DataSource> (fuente única en el repo)
// ============================================================================
// Contenido migrado TAL CUAL de las líneas "Fuente:" ya verificadas del sitio
// (CCI Data y los instrumentos de la portada). No se reescriben ni se inventan.
// Los títulos en inglés son nombres propios de la fuente y se conservan.
// ============================================================================

import type { DataSource } from "./tipos-indicadores";

const ACCESSED = "2026-08-22"; // fecha de verificación de esta migración inicial

export const FUENTES: Record<string, DataSource> = {
  "mgi-2017": {
    id: "mgi-2017",
    shortLabel: "McKinsey Global Institute (2017)",
    organization: "McKinsey Global Institute",
    title: "Reinventing Construction / Improving construction productivity",
    url: "https://www.mckinsey.com/capabilities/operations/our-insights/improving-construction-productivity",
    publicationDate: "2017",
    accessedAt: ACCESSED,
    documentType: "informe",
    geography: "internacional",
  },
  "dodge-2020": {
    id: "dodge-2020",
    shortLabel: "Dodge Data & Analytics (2020)",
    organization: "Dodge Data & Analytics",
    title: "Prefabrication and Modular Construction 2020 SmartMarket Report",
    url: "https://www.construction.com/resource/prefabrication-modular-construction-2020/",
    publicationDate: "2020",
    accessedAt: ACCESSED,
    documentType: "informe",
    geography: "internacional",
  },
  "asce-2024": {
    id: "asce-2024",
    shortLabel: "ASCE · JME (2024)",
    organization: "Journal of Management in Engineering (ASCE)",
    title: "Construction Waste Reduction in Buildings through Modular and Offsite Construction",
    url: "https://ascelibrary.org/doi/10.1061/JMENEA.MEENG-5828",
    publicationDate: "2024",
    accessedAt: ACCESSED,
    documentType: "estudio",
    geography: "internacional",
  },
  "censo-2024": {
    id: "censo-2024",
    shortLabel: "MINVU · Censo 2024",
    organization: "MINVU · Centro de Estudios (INE)",
    title: "Déficit Habitacional Cuantitativo, Censo 2024",
    url: "https://centrodeestudios.minvu.gob.cl/deficit-habitacional-censo-2024/",
    publicationDate: "2025",
    accessedAt: ACCESSED,
    documentType: "censo",
    geography: "Chile",
  },
  "peh-2025": {
    id: "peh-2025",
    shortLabel: "MINVU · Plan de Emergencia Habitacional",
    organization: "Ministerio de Vivienda y Urbanismo",
    title: "Plan de Emergencia Habitacional, reporte agosto 2025",
    url: "https://www.minvu.gob.cl/plan-de-emergencia-habitacional/",
    publicationDate: "2025",
    accessedAt: ACCESSED,
    documentType: "registro_oficial",
    geography: "Chile",
  },
  "iplc-2025": {
    id: "iplc-2025",
    shortLabel: "Estudio IPLC 2025",
    organization: "Observatorio de Productividad · CChC · CDT (Construye2025)",
    title: "Estudio y análisis del Indicador de Productividad Laboral de la Construcción 2025",
    url: "https://www.cdt.cl/bibliotecatecnica/estudio-y-analisis-del-indicador-de-productividad-laboral-de-la-construccion-2025",
    publicationDate: "2025",
    accessedAt: ACCESSED,
    documentType: "estudio",
    geography: "Chile",
    notes: "Edificación en altura; 74 proyectos 2023-2024; 25 empresas.",
  },
  "matrix-2020": {
    id: "matrix-2020",
    shortLabel: "Matrix 2020 (en IPLC 2025)",
    organization: "Matrix Consulting",
    title: "Impulsar la productividad de la industria de la Construcción en Chile a estándares mundiales",
    // Se enlaza a la reproducción pública (Estudio IPLC 2025); el original no está en línea.
    url: "https://www.cdt.cl/bibliotecatecnica/estudio-y-analisis-del-indicador-de-productividad-laboral-de-la-construccion-2025",
    publicationDate: "2020",
    accessedAt: ACCESSED,
    documentType: "estudio",
    geography: "Chile",
    notes: "Reproducido en el Estudio IPLC 2025 (Observatorio de Productividad CChC · CDT).",
  },
  construye2025: {
    id: "construye2025",
    shortLabel: "Construye2025",
    organization: "Construye2025",
    title: "Observatorio de Productividad — resultados IPLC",
    url: "https://construye2025.cl/",
    publicationDate: "2025",
    accessedAt: ACCESSED,
    documentType: "informe",
    geography: "Chile",
  },
  "ditec-minvu": {
    id: "ditec-minvu",
    shortLabel: "MINVU · DITEC",
    organization: "MINVU · División Técnica de Estudio y Fomento Habitacional (DITEC)",
    title: "Construcción Industrializada · Listado de empresas industrializadoras y fichas VIT",
    url: "https://www.minvu.gob.cl/construccion-industrializada/",
    publicationDate: "2026",
    accessedAt: ACCESSED,
    documentType: "registro_oficial",
    geography: "Chile",
  },
  "inn-nch3744": {
    id: "inn-nch3744",
    shortLabel: "INN · NCh3744:2023",
    organization: "Instituto Nacional de Normalización (INN)",
    title: "NCh3744:2023 — Construcción industrializada y prefabricada",
    accessedAt: ACCESSED,
    documentType: "norma",
    geography: "Chile",
    notes:
      "Norma oficial; nació de un anteproyecto impulsado por el CCI, Construye2025 y el MINVU.",
  },
  "guia-cci-2024": {
    id: "guia-cci-2024",
    shortLabel: "Guía CCI 2024",
    organization: "Consejo de Construcción Industrializada (CCI)",
    title: "Guía Práctica de Integración Temprana en Construcción Industrializada",
    url: "/recursos/guia-integracion-temprana-cci-2024.pdf",
    publicationDate: "2024",
    accessedAt: ACCESSED,
    documentType: "guia",
    geography: "Chile",
  },
};
