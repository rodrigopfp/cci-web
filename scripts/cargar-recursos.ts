/**
 * Carga inicial de la Biblioteca editorial (Fase 2 · paso 4).
 *
 * - Crea 4 recursos reales (createOrReplace, _id estable): Guía CCI 2024,
 *   NCh3744:2023, Estudio IPLC 2025 y Manual IPLC.
 * - Migra los 6 recursos placeholder existentes al nuevo modelo con su ESTADO
 *   real (en_preparacion, sin archivo → sin descarga), vía setIfMissing.
 *
 * No inventa cifras: las cifras de la Guía se citan por slug del registro de
 * indicadores (campo indicadoresDestacados) y se resuelven en la ficha.
 *
 * Uso:  npx tsx scripts/cargar-recursos.ts            (dry-run)
 *       npx tsx scripts/cargar-recursos.ts --apply    (escribe en Sanity)
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function cargarToken(): string {
  if (process.env.SANITY_WRITE_TOKEN) return process.env.SANITY_WRITE_TOKEN.trim();
  for (const archivo of [".env.local", ".env"]) {
    try {
      const txt = readFileSync(resolve(process.cwd(), archivo), "utf8");
      for (const linea of txt.split(/\r?\n/)) {
        const m = linea.match(/^\s*SANITY_WRITE_TOKEN\s*=\s*(.+?)\s*$/);
        if (m) return m[1].replace(/^["']|["']$/g, "").trim();
      }
    } catch {
      /* opcional */
    }
  }
  throw new Error("Falta SANITY_WRITE_TOKEN en .env.local (API > Tokens, permiso Editor).");
}

const client = createClient({
  projectId: "gt9dfhv2",
  dataset: "production",
  apiVersion: "2024-10-01",
  token: cargarToken(),
  useCdn: false,
});

let kc = 0;
const k = () => `k${kc++}`;
const parrafo = (text: string) => ({
  _type: "block",
  _key: k(),
  style: "normal" as const,
  markDefs: [],
  children: [{ _type: "span", _key: k(), text, marks: [] }],
});

type Doc = Record<string, unknown> & { _id: string; _type: "recurso" };

const NUEVOS: Doc[] = [
  {
    _id: "recurso-guia-integracion-temprana-cci",
    _type: "recurso",
    titulo: "Guía Práctica de Integración Temprana en Construcción Industrializada",
    slug: { _type: "slug", current: "guia-integracion-temprana-cci" },
    categoria: "guias",
    temas: ["integracion_temprana", "dfma", "productividad", "industrializacion"],
    bajada:
      "Cómo pasar de proyectos fragmentados a proyectos integrados desde el diseño: la Integración Temprana (ITCI) explicada con la experiencia medida de socios del CCI.",
    institucion: "Consejo de Construcción Industrializada (CCI)",
    autores:
      "CCI, con Colegio de Arquitectos, AICE, AOA, Programa Industrializa y Comisión de Productividad CChC",
    fechaPublicacion: "2024-01-01",
    version: "1.0",
    paginas: 101,
    formato: "PDF",
    estadoRecurso: "disponible",
    requiereFormulario: true,
    enlaceExterno: "/recursos/guia-integracion-temprana-cci-2024.pdf",
    intro: [
      parrafo(
        "La guía aborda cómo pasar de proyectos fragmentados a proyectos integrados desde el diseño. Define la Integración Temprana en Construcción Industrializada (ITCI) y reúne la experiencia de socios del CCI para incorporar oportunamente las restricciones de fabricación, logística y montaje."
      ),
      parrafo(
        "Es una publicación propia del CCI, elaborada junto al Colegio de Arquitectos, la AICE, la AOA, el Programa Industrializa y la Comisión de Productividad de la CChC."
      ),
    ],
    hallazgos: [
      "Reúne 14 casos de estudio de socios con resultados medidos en obra.",
      "Documenta casos de Baumax, Socovesa/BIM (Olimpia II) y Boetsch/Spoerer, entre otros.",
      "Presenta la norma NCh3744:2023 como lenguaje común del sector.",
    ],
    indicadoresDestacados: [
      "caso-baumax-productividad",
      "caso-baumax-residuos",
      "caso-baumax-retrabajos",
      "caso-socovesa-coordinacion",
      "caso-socovesa-adicionales",
      "caso-boetsch-ahorro",
    ],
    terminosGlosario: ["integracion-temprana", "dfma", "nch3744"],
    recursosRelacionados: ["estudio-iplc-2025", "nch3744-2023"],
    tipo: "Guía técnica",
    fecha: "2024-01-01",
    fechaActualizacion: "2026-08-23",
  },
  {
    _id: "recurso-nch3744-2023",
    _type: "recurso",
    titulo: "NCh3744:2023 — Construcción industrializada y prefabricada",
    slug: { _type: "slug", current: "nch3744-2023" },
    categoria: "normativa",
    temas: ["normativa", "industrializacion"],
    bajada:
      "Norma chilena que fija términos y definiciones para un lenguaje común de la construcción industrializada y prefabricada.",
    institucion: "Instituto Nacional de Normalización (INN)",
    fechaPublicacion: "2023-01-01",
    estadoRecurso: "disponible",
    requiereFormulario: false,
    enlaceExterno: "https://ecommerce.inn.cl/nch3744202386054",
    intro: [
      parrafo(
        "La NCh3744:2023 es la norma oficial chilena de construcción industrializada y prefabricada. Establece términos y definiciones para construir un lenguaje común en el sector. La norma se adquiere en el INN."
      ),
    ],
    terminosGlosario: ["nch3744"],
    tipo: "Normativa",
    fecha: "2023-01-01",
  },
  {
    _id: "recurso-estudio-iplc-2025",
    _type: "recurso",
    titulo: "Estudio y análisis del Indicador de Productividad Laboral de la Construcción 2025",
    slug: { _type: "slug", current: "estudio-iplc-2025" },
    categoria: "estudios",
    temas: ["productividad", "industrializacion"],
    bajada:
      "Análisis del IPLC en edificación en altura: 74 proyectos medidos entre 2023 y 2024.",
    institucion: "Observatorio de Productividad · CChC · CDT (Construye2025)",
    fechaPublicacion: "2025-01-01",
    estadoRecurso: "disponible",
    requiereFormulario: false,
    enlaceExterno:
      "https://www.cdt.cl/bibliotecatecnica/estudio-y-analisis-del-indicador-de-productividad-laboral-de-la-construccion-2025",
    intro: [
      parrafo(
        "El Estudio IPLC 2025 analiza la productividad laboral de la construcción en edificación en altura, con una base de 74 proyectos finalizados entre 2023 y 2024. El PDF se consulta en la Biblioteca Técnica de la CDT (no se aloja en este sitio)."
      ),
    ],
    indicadoresDestacados: ["productividad-sectorial-crecimiento", "iplc-brecha-deciles"],
    terminosGlosario: ["iplc", "m2-persona-dia"],
    recursosRelacionados: ["manual-iplc", "guia-integracion-temprana-cci"],
    tipo: "Estudio",
    fecha: "2025-01-01",
  },
  {
    _id: "recurso-manual-iplc",
    _type: "recurso",
    titulo: "Manual para la medición y análisis de Indicadores de Productividad Laboral de la Construcción",
    slug: { _type: "slug", current: "manual-iplc" },
    categoria: "herramientas",
    temas: ["productividad", "industrializacion"],
    bajada: "Metodología estándar para medir la productividad laboral en obra (m²/persona-día).",
    institucion: "CDT · Construye2025 · Compromiso PRO · CChC",
    fechaPublicacion: "2025-01-01",
    // Enlace no verificado a una URL estable → en revisión, sin descarga.
    estadoRecurso: "en_revision",
    requiereFormulario: false,
    intro: [
      parrafo(
        "El Manual IPLC define la metodología para medir y analizar la productividad laboral de la construcción de forma comparable. Estamos verificando el enlace oficial estable antes de publicarlo."
      ),
    ],
    terminosGlosario: ["iplc", "m2-persona-dia"],
    tipo: "Ficha",
    fecha: "2025-01-01",
  },
];

// Migración de los 6 placeholders existentes (setIfMissing, no destructivo).
const MIGRAR: { id: string; slug: string; categoria: string; temas: string[] }[] = [
  { id: "recurso-r1", slug: "guia-certificacion-sistemas-industrializados", categoria: "guias", temas: ["certificacion"] },
  { id: "recurso-r2", slug: "estudio-productividad-sectorial-2025", categoria: "estudios", temas: ["productividad"] },
  { id: "recurso-r3", slug: "matriz-homologacion-normativa", categoria: "fichas", temas: ["normativa"] },
  { id: "recurso-r4", slug: "normativa-vigente-construccion-offsite", categoria: "normativa", temas: ["normativa"] },
  { id: "recurso-r5", slug: "plantillas-coordinacion-bim-fabricacion", categoria: "plantillas", temas: ["bim", "fabricacion"] },
  { id: "recurso-r6", slug: "reporte-sostenibilidad-huella-carbono", categoria: "reportes", temas: ["sostenibilidad"] },
];

async function main() {
  const apply = process.argv.includes("--apply");
  console.log(`${apply ? "APLICANDO" : "DRY-RUN"}\n`);

  for (const d of NUEVOS) {
    const slug = (d.slug as { current: string }).current;
    console.log(`nuevo: ${d._id} [${d.categoria}] estado=${d.estadoRecurso} → /conocimiento/${slug}`);
    if (apply) await client.createOrReplace(d);
  }

  for (const m of MIGRAR) {
    console.log(`migra: ${m.id} → /conocimiento/${m.slug} [${m.categoria}] estado=en_preparacion`);
    if (apply) {
      await client
        .patch(m.id)
        .setIfMissing({
          slug: { _type: "slug", current: m.slug },
          categoria: m.categoria,
          temas: m.temas,
          estadoRecurso: "en_preparacion",
          requiereFormulario: false,
        })
        .commit({ autoGenerateArrayKeys: true });
    }
  }

  console.log(`\n${apply ? "✔ Aplicado." : "(DRY-RUN) Añade --apply para escribir."}`);
}

main().catch((err) => {
  console.error("Error al cargar recursos:", err instanceof Error ? err.message : err);
  process.exit(1);
});
