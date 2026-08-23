// ============================================================================
// PANORAMA LATAM — capa de datos por país (Fase 2 · paso 8)
// ============================================================================
// Regla de oro: NADA se publica sin fuente verificable. Los países sin
// levantamiento quedan en "en_levantamiento" con secciones vacías; el sitio
// muestra "Información en levantamiento". Prohibidas estimaciones, rankings e
// índices de madurez. Toda cifra visible sale del registro (obtenerIndicador).
// ============================================================================

import { FUENTES } from "./fuentes";
import { INDICADORES } from "./indicadores";

export interface FichaPais {
  codigo: string; // "cl", "br", "mx", "co", "pe", "ar"
  nombre: string;
  estadoFicha: "completa" | "parcial" | "en_levantamiento";
  resumen?: string;
  ultimoHito?: string;
  secciones: {
    panorama?: string;
    lenguaje?: string[];
    politicaPublica?: string;
    marcoNormativo?: string;
    ecosistema?: { nombre: string; tipo: string; url?: string }[];
    casos?: string[];
    /** Enlaces contextuales de la sección Casos (evidencia, guía). */
    casosEnlaces?: { label: string; href: string }[];
    indicadores?: string[]; // slugs de indicadores.ts
  };
  fuentes: string[]; // ids de fuentes.ts
  fechaCorte?: string;
  ultimaActualizacion: string;
  editor: string;
  limitaciones?: string;
}

const CHILE: FichaPais = {
  codigo: "cl",
  nombre: "Chile",
  estadoFicha: "completa",
  resumen:
    "El mayor ecosistema de construcción industrializada de Latinoamérica, con norma oficial de términos y un procedimiento del MINVU para viviendas industrializadas.",
  ultimoHito: "NCh3744:2023 y el mecanismo de Viviendas Industrializadas Tipo del MINVU.",
  secciones: {
    panorama:
      "El Consejo de Construcción Industrializada (CCI) articula a empresas, profesionales, instituciones y academia en torno a un objetivo común: elevar la productividad y la sustentabilidad de la construcción a través de la industrialización. Es el mayor ecosistema de construcción industrializada de Latinoamérica.",
    lenguaje: [
      "Construcción industrializada (NCh3744:2023)",
      "Prefabricación",
      "Métodos modernos de construcción (MMC)",
    ],
    politicaPublica:
      "El Plan de Emergencia Habitacional 2022-2026 del MINVU fija una meta habitacional nacional. Además, el Ministerio habilitó el mecanismo de Viviendas Industrializadas Tipo (VIT) para incorporar soluciones industrializadas en programas habitacionales.",
    marcoNormativo:
      "La NCh3744:2023 (INN) establece los términos y definiciones de la construcción industrializada y prefabricada. El MINVU, a través de la DITEC, evalúa y aprueba empresas industrializadoras y tipologías VIT mediante un procedimiento oficial (resoluciones exentas N°52, para empresas industrializadoras, y N°59, para proyectos VIT).",
    ecosistema: [
      { nombre: "Consejo de Construcción Industrializada (CCI)", tipo: "Consejo técnico", url: "https://construccionindustrializada.cl" },
      { nombre: "Corporación de Desarrollo Tecnológico (CDT)", tipo: "Secretaría ejecutiva", url: "https://www.cdt.cl" },
      { nombre: "Cámara Chilena de la Construcción (CChC)", tipo: "Gremio", url: "https://cchc.cl" },
      { nombre: "Construye2025", tipo: "Programa (Corfo)", url: "https://construye2025.cl" },
      { nombre: "Planbim", tipo: "Programa (Corfo)", url: "https://www.planbim.cl" },
      { nombre: "Centro Tecnológico para la Innovación en la Construcción (CTEC)", tipo: "Centro tecnológico", url: "https://ctecinnovacion.cl" },
    ],
    casos: [
      "Baumax — paneles de hormigón en cinco edificios",
      "Socovesa Sur · BIM Lab · Spoerer — Olimpia II",
      "Boetsch · Spoerer Ingenieros — optimización estructural temprana",
    ],
    casosEnlaces: [
      { label: "Ver la evidencia en CCI Data", href: "/data/#cap7" },
      { label: "Ver la Guía de Integración Temprana", href: "/conocimiento/guia-integracion-temprana-cci" },
    ],
    indicadores: [
      "deficit-habitacional",
      "meta-habitacional",
      "productividad-sectorial-crecimiento",
      "productividad-empresas-remedidas",
      "industrializadoras-certificadas",
      "tipologias-vit",
      "convenios-ditec",
      "iplc-p10",
      "iplc-p90",
      "iplc-brecha-deciles",
    ],
  },
  fuentes: ["censo-2024", "peh-2025", "inn-nch3744", "ditec-minvu", "iplc-2025", "guia-cci-2024"],
  fechaCorte: "2026-06-03",
  ultimaActualizacion: "2026-08-23",
  editor: "Equipo CCI",
  limitaciones:
    "Las resoluciones exentas N°52 y N°59 se referencian por su nombre oficial; su detalle vive en el sitio del MINVU (DITEC).",
};

function stub(codigo: string, nombre: string): FichaPais {
  return {
    codigo,
    nombre,
    estadoFicha: "en_levantamiento",
    secciones: {},
    fuentes: [],
    ultimaActualizacion: "2026-08-23",
    editor: "Equipo CCI",
  };
}

// Orden de declaración = orden de despliegue en la lista.
const LISTA: FichaPais[] = [
  CHILE,
  stub("br", "Brasil"),
  stub("mx", "México"),
  stub("co", "Colombia"),
  stub("pe", "Perú"),
  stub("ar", "Argentina"),
];

export const FICHAS_PAIS: Record<string, FichaPais> = Object.fromEntries(LISTA.map((f) => [f.codigo, f]));
export const PAISES_LATAM: FichaPais[] = LISTA;

export function getFichaPais(codigo: string): FichaPais | undefined {
  return FICHAS_PAIS[codigo];
}

/** Nº de fuentes de una ficha (para el mapa/lista). */
export function numFuentes(f: FichaPais): number {
  return f.fuentes.length;
}

// --- Validación (se integra a scripts/validar-datos.ts) --------------------
export function validarLatam(): string[] {
  const errores: string[] = [];
  const vistos = new Set<string>();
  for (const f of PAISES_LATAM) {
    if (vistos.has(f.codigo)) errores.push(`País duplicado: "${f.codigo}".`);
    vistos.add(f.codigo);

    if ((f.estadoFicha === "completa" || f.estadoFicha === "parcial") && f.fuentes.length === 0)
      errores.push(`"${f.codigo}" es "${f.estadoFicha}" pero no tiene fuentes.`);

    for (const id of f.fuentes)
      if (!FUENTES[id]) errores.push(`"${f.codigo}".fuentes referencia una fuente inexistente: "${id}".`);

    for (const slug of f.secciones.indicadores ?? [])
      if (!INDICADORES[slug]) errores.push(`"${f.codigo}".indicadores referencia un slug inexistente: "${slug}".`);
  }
  return errores;
}
