// ============================================================================
// GLOSARIO TÉCNICO CCI — capa de datos tipada (Fase 2 · paso 3)
// ============================================================================
// Los 44 términos entran como BORRADOR (publicado: false). Se publican por
// bloques tras la revisión editorial de Rodrigo con Claude web. Las definiciones
// son EXACTAS: no se corrigen ni se mejoran aquí.
//
// `fuentes` son ids de fuentes.ts (Paso 1). Ese archivo aún no existe en el repo;
// mientras tanto las fuentes quedan en [] y se completan en la revisión.
// ============================================================================

export type CategoriaGlosario =
  | "fundamentos"
  | "sistemas_soluciones"
  | "diseno_integracion"
  | "produccion"
  | "digitalizacion"
  | "gestion_lean"
  | "regulacion_chilena"
  | "productividad_datos"
  | "sostenibilidad";

export interface TerminoGlosario {
  slug: string;
  titulo: string;
  categoria: CategoriaGlosario;
  definicionCorta: string; // 1-3 líneas
  explicacionSimple?: string;
  explicacionTecnica?: string;
  porQueImporta?: string;
  ejemplo?: string;
  noConfundirCon?: string[]; // slugs
  contextoChileno?: string;
  relacionados?: string[]; // slugs
  recursosRelacionados?: string[]; // slugs de /conocimiento
  fuentes: string[]; // ids de fuentes.ts
  fechaRevision?: string; // ISO
  publicado: boolean;
  destacado?: boolean;
}

// Orden y etiqueta legible de cada categoría (para índice y filtros).
export const CATEGORIAS: { value: CategoriaGlosario; label: string }[] = [
  { value: "fundamentos", label: "Fundamentos" },
  { value: "sistemas_soluciones", label: "Sistemas y soluciones" },
  { value: "diseno_integracion", label: "Diseño e integración" },
  { value: "produccion", label: "Producción" },
  { value: "digitalizacion", label: "Digitalización" },
  { value: "gestion_lean", label: "Gestión y Lean" },
  { value: "regulacion_chilena", label: "Regulación chilena" },
  { value: "productividad_datos", label: "Productividad y datos" },
  { value: "sostenibilidad", label: "Sostenibilidad" },
];

export const ETIQUETAS_CATEGORIA: Record<CategoriaGlosario, string> = Object.fromEntries(
  CATEGORIAS.map((c) => [c.value, c.label])
) as Record<CategoriaGlosario, string>;

// --- Grupos de términos relacionados (se cablean como clúster mutuo) ---------
const GRUPOS_RELACIONADOS: string[][] = [
  ["construccion-industrializada", "prefabricacion", "construccion-off-site", "mmc"],
  ["construccion-modular", "sistema-panelizado-2d", "modulo-volumetrico-3d", "sistema-hibrido"],
  ["integracion-temprana", "dfma", "estandarizacion"],
  ["bim", "openbim", "ifc", "cde"],
  ["lean-construction", "last-planner-system", "pull-planning", "takt-planning"],
  [
    "empresa-industrializadora-ditec",
    "vivienda-industrializada-tipo",
    "resolucion-exenta-52",
    "resolucion-exenta-59",
    "ditec",
  ],
  ["iplc", "m2-persona-dia", "desviacion-de-plazo"],
  ["acv", "dap-epd", "carbono-incorporado"],
];

// Los términos destacados en el índice (curación editorial, no contenido nuevo).
const DESTACADOS = new Set([
  "construccion-industrializada",
  "integracion-temprana",
  "bim",
  "lean-construction",
  "iplc",
  "vivienda-industrializada-tipo",
]);

// --- Definiciones EXACTAS de los 44 términos (borradores) --------------------
const BASE: Omit<TerminoGlosario, "publicado" | "fuentes" | "relacionados" | "destacado">[] = [
  {
    slug: "construccion-industrializada",
    titulo: "Construcción industrializada",
    categoria: "fundamentos",
    definicionCorta:
      "Metodología que organiza el diseño, la producción, la logística y la ejecución de un proyecto como un sistema integrado, con el objetivo de mejorar productividad, calidad, sostenibilidad, trazabilidad y certeza. Puede utilizar o no componentes prefabricados.",
    noConfundirCon: ["prefabricacion"],
  },
  {
    slug: "prefabricacion",
    titulo: "Prefabricación",
    categoria: "fundamentos",
    definicionCorta:
      "Fabricación anticipada de un elemento, componente o conjunto en un lugar distinto de su posición final, para transportarlo e instalarlo posteriormente. Es una herramienta que puede formar parte de un proceso industrializado, pero su sola utilización no convierte necesariamente un proyecto en industrializado.",
  },
  {
    slug: "construccion-off-site",
    titulo: "Construcción off-site",
    categoria: "fundamentos",
    definicionCorta:
      "Realización fuera del sitio definitivo de una parte de los procesos de fabricación o ensamblaje. Puede incluir componentes, paneles, instalaciones premontadas o módulos completos producidos en un entorno controlado.",
  },
  {
    slug: "mmc",
    titulo: "Métodos modernos de construcción (MMC)",
    categoria: "fundamentos",
    definicionCorta:
      "Conjunto amplio de sistemas, tecnologías y formas de gestión que buscan mejorar el desempeño de la construcción mediante estandarización, prefabricación, producción fuera de obra, digitalización, automatización y nuevas formas de ensamblaje.",
    // Nota original "no es un sistema constructivo específico": es una aclaración
    // en prosa, no un slug; se resolverá en la revisión editorial.
  },
  {
    slug: "construccion-modular",
    titulo: "Construcción modular",
    categoria: "sistemas_soluciones",
    definicionCorta:
      "Forma de construcción basada en unidades o módulos definidos mediante dimensiones, interfaces y reglas comunes. Los módulos pueden ser componentes, paneles o volúmenes tridimensionales.",
  },
  {
    slug: "sistema-panelizado-2d",
    titulo: "Sistema panelizado 2D",
    categoria: "sistemas_soluciones",
    definicionCorta:
      "Sistema en que muros, pisos, techos u otros elementos bidimensionales se producen anticipadamente y luego se transportan y ensamblan en la obra.",
  },
  {
    slug: "modulo-volumetrico-3d",
    titulo: "Módulo volumétrico 3D",
    categoria: "sistemas_soluciones",
    definicionCorta:
      "Unidad tridimensional fabricada con un grado relevante de terminación antes de llegar a la obra. Puede incorporar estructura, revestimientos, instalaciones, ventanas, artefactos o terminaciones interiores.",
  },
  {
    slug: "sistema-hibrido",
    titulo: "Sistema híbrido",
    categoria: "sistemas_soluciones",
    definicionCorta:
      "Solución que combina diferentes métodos, materiales o niveles de industrialización, por ejemplo paneles 2D, módulos 3D, estructuras prefabricadas y partidas ejecutadas en terreno.",
  },
  {
    slug: "preensamblaje",
    titulo: "Preensamblaje",
    categoria: "sistemas_soluciones",
    definicionCorta:
      "Unión anticipada de varios componentes antes de su instalación definitiva. Busca reducir operaciones en terreno, errores, tiempos y exposición a condiciones variables de obra.",
  },
  {
    slug: "plataforma-de-producto",
    titulo: "Plataforma de producto o kit de componentes",
    categoria: "sistemas_soluciones",
    definicionCorta:
      "Conjunto de componentes, interfaces, reglas de diseño y procesos reutilizables en distintos proyectos. Permite generar configuraciones diferentes a partir de una base común y controlada.",
  },
  {
    slug: "integracion-temprana",
    titulo: "Integración temprana",
    categoria: "diseno_integracion",
    definicionCorta:
      "Participación coordinada de los actores relevantes desde las primeras etapas del proyecto, antes de que las decisiones críticas queden cerradas. Permite incorporar oportunamente restricciones de diseño, fabricación, costos, logística, montaje, operación y normativa.",
  },
  {
    slug: "dfma",
    titulo: "DfMA — Diseño para Fabricación y Montaje",
    categoria: "diseno_integracion",
    definicionCorta:
      "Enfoque que incorpora desde el diseño la forma en que los elementos serán fabricados, transportados y ensamblados. Busca reducir complejidad, cantidad de componentes, operaciones innecesarias, tiempos de montaje, errores y desperdicios.",
  },
  {
    slug: "estandarizacion",
    titulo: "Estandarización",
    categoria: "diseno_integracion",
    definicionCorta:
      "Definición de reglas, dimensiones, interfaces, procesos o componentes repetibles. No significa que todos los edificios deban ser iguales; significa que aquello que se repite se resuelve de manera consistente.",
  },
  {
    slug: "modularizacion",
    titulo: "Modularización",
    categoria: "diseno_integracion",
    definicionCorta:
      "División de un sistema complejo en unidades funcionales con límites e interfaces definidos. Permite fabricar, sustituir, transportar o ensamblar partes con mayor independencia y control.",
  },
  {
    slug: "produccion-seriada",
    titulo: "Producción seriada, repetitiva y rítmica",
    categoria: "produccion",
    definicionCorta:
      "Organización del trabajo mediante una secuencia estable de operaciones que se repiten con un ritmo definido. Busca reducir variabilidad, equilibrar cargas y generar flujo continuo.",
  },
  {
    slug: "personalizacion-masiva",
    titulo: "Personalización masiva",
    categoria: "diseno_integracion",
    definicionCorta:
      "Capacidad de ofrecer configuraciones o alternativas diferentes utilizando una base estandarizada de componentes y procesos, combinando variedad para el usuario con eficiencia productiva.",
  },
  {
    slug: "bim",
    titulo: "BIM — Building Information Modeling",
    categoria: "digitalizacion",
    definicionCorta:
      "Metodología colaborativa para crear, gestionar e intercambiar información estructurada de un activo durante su ciclo de vida. BIM no es únicamente un modelo 3D ni el nombre de un software.",
  },
  {
    slug: "openbim",
    titulo: "openBIM",
    categoria: "digitalizacion",
    definicionCorta:
      "Enfoque de trabajo basado en estándares abiertos que permite compartir datos y colaborar entre diferentes plataformas, disciplinas y organizaciones sin depender exclusivamente de un proveedor tecnológico. buildingSMART identifica IFC, IDS y BCF entre los estándares que sostienen este ecosistema.",
  },
  {
    slug: "ifc",
    titulo: "IFC — Industry Foundation Classes",
    categoria: "digitalizacion",
    definicionCorta:
      "Modelo de datos abierto y estandarizado para describir digitalmente edificios e infraestructura. Permite intercambiar información sobre objetos, propiedades, relaciones, procesos y actores entre distintas aplicaciones.",
  },
  {
    slug: "cde",
    titulo: "Entorno Común de Datos (CDE)",
    categoria: "digitalizacion",
    definicionCorta:
      "Espacio y proceso acordado para recopilar, gestionar, revisar, compartir y conservar la información de un proyecto. Debe definir estados, responsabilidades, versiones y permisos.",
  },
  {
    slug: "interoperabilidad",
    titulo: "Interoperabilidad",
    categoria: "digitalizacion",
    definicionCorta:
      "Capacidad de diferentes sistemas, equipos y aplicaciones para intercambiar información y utilizarla de manera consistente sin perder su significado.",
  },
  {
    slug: "deteccion-de-interferencias",
    titulo: "Detección de interferencias",
    categoria: "digitalizacion",
    definicionCorta:
      "Proceso de identificación de conflictos geométricos, espaciales, funcionales o constructivos entre distintas disciplinas o sistemas antes de ejecutar el trabajo.",
  },
  {
    slug: "gemelo-digital",
    titulo: "Gemelo digital",
    categoria: "digitalizacion",
    definicionCorta:
      "Representación digital de un activo físico vinculada a información que puede actualizarse durante su operación. No todo modelo BIM es un gemelo digital: debe existir una relación definida con el activo y sus datos reales.",
  },
  {
    slug: "lean-construction",
    titulo: "Lean Construction",
    categoria: "gestion_lean",
    definicionCorta:
      "Enfoque de gestión que busca maximizar valor, minimizar pérdidas, mejorar el flujo, aprender continuamente y optimizar el desempeño global del proyecto en vez de mejorar solamente actividades aisladas.",
  },
  {
    slug: "last-planner-system",
    titulo: "Last Planner System (LPS)",
    categoria: "gestion_lean",
    definicionCorta:
      "Sistema colaborativo de planificación y control de la producción que busca generar un flujo de trabajo predecible mediante compromisos confiables, planificación anticipada, eliminación de restricciones, seguimiento semanal y aprendizaje.",
  },
  {
    slug: "pull-planning",
    titulo: "Pull planning",
    categoria: "gestion_lean",
    definicionCorta:
      "Planificación que parte desde un hito o resultado necesario y organiza hacia atrás las actividades, entregas y condiciones requeridas para alcanzarlo.",
  },
  {
    slug: "takt-planning",
    titulo: "Takt planning",
    categoria: "gestion_lean",
    definicionCorta:
      "Planificación de la producción basada en un ritmo común. Organiza equipos y actividades para que avancen de manera coordinada por zonas, unidades o estaciones.",
  },
  {
    slug: "balance-de-linea",
    titulo: "Balance de línea",
    categoria: "gestion_lean",
    definicionCorta:
      "Distribución de tareas y cargas entre estaciones, equipos o etapas para aproximar sus tiempos de ciclo y evitar acumulaciones, esperas o capacidad ociosa.",
  },
  {
    slug: "cuello-de-botella",
    titulo: "Cuello de botella",
    categoria: "gestion_lean",
    definicionCorta:
      "Etapa cuya capacidad limita el rendimiento total del sistema. Mejorar etapas que no son el cuello de botella puede no aumentar la producción global.",
  },
  {
    slug: "empresa-industrializadora-ditec",
    titulo: "Empresa industrializadora aprobada por DITEC",
    categoria: "regulacion_chilena",
    definicionCorta:
      "Empresa cuyo proceso, planta y antecedentes han sido evaluados bajo el procedimiento correspondiente del MINVU. Esta aprobación le permite presentar proyectos de Vivienda Industrializada Tipo, pero no debe confundirse con la aprobación de una VIT específica.",
    noConfundirCon: ["vivienda-industrializada-tipo"],
  },
  {
    slug: "vivienda-industrializada-tipo",
    titulo: "Vivienda Industrializada Tipo (VIT)",
    categoria: "regulacion_chilena",
    definicionCorta:
      "Tipología de vivienda industrializada revisada y aprobada conforme al procedimiento técnico del MINVU para su utilización en proyectos de determinados programas habitacionales, bajo las condiciones establecidas en su aprobación.",
  },
  {
    slug: "resolucion-exenta-52",
    titulo: "Resolución Exenta N.º 52",
    categoria: "regulacion_chilena",
    definicionCorta:
      "Instrumento del MINVU que establece el procedimiento para la evaluación y aprobación de empresas industrializadoras y sus modificaciones posteriores.",
  },
  {
    slug: "resolucion-exenta-59",
    titulo: "Resolución Exenta N.º 59",
    categoria: "regulacion_chilena",
    definicionCorta:
      "Instrumento del MINVU que establece condiciones y mecanismos para aprobar proyectos de Vivienda Industrializada Tipo y revisar proyectos que las incorporan en los programas habitacionales correspondientes.",
  },
  {
    slug: "nch3744",
    titulo: "NCh3744:2023",
    categoria: "regulacion_chilena",
    definicionCorta:
      "Norma chilena sobre construcción industrializada y prefabricada que establece términos y definiciones para construir un lenguaje común en el sector.",
  },
  {
    slug: "ditec",
    titulo: "DITEC",
    categoria: "regulacion_chilena",
    definicionCorta:
      "División Técnica de Estudio y Fomento Habitacional del Ministerio de Vivienda y Urbanismo. Participa en la definición de procedimientos, exigencias y evaluaciones técnicas relacionadas con soluciones y viviendas industrializadas.",
  },
  {
    slug: "iplc",
    titulo: "IPLC — Indicador de Productividad Laboral de la Construcción",
    categoria: "productividad_datos",
    definicionCorta:
      "Indicador que relaciona la producción obtenida con la cantidad de trabajo utilizada, bajo una metodología y alcance definidos. Permite analizar y comparar el desempeño laboral cuando los datos son equivalentes.",
  },
  {
    slug: "m2-persona-dia",
    titulo: "m²/persona-día",
    categoria: "productividad_datos",
    definicionCorta:
      "Unidad que relaciona metros cuadrados producidos con el total de jornadas-persona utilizadas. Un valor mayor indica más producción por unidad de trabajo, pero solo debe compararse entre proyectos con alcances y metodologías compatibles.",
  },
  {
    slug: "intensidad-de-residuos",
    titulo: "Intensidad de residuos (m³/m²)",
    categoria: "productividad_datos",
    definicionCorta:
      "Relación entre el volumen de residuos generado y la superficie construida. Un valor menor indica menos residuos por metro cuadrado, siempre que el alcance y la forma de medición sean equivalentes.",
  },
  {
    slug: "desviacion-de-plazo",
    titulo: "Desviación de plazo",
    categoria: "productividad_datos",
    definicionCorta:
      "Diferencia porcentual o temporal entre el plazo planificado y el plazo real de una actividad, etapa o proyecto.",
  },
  {
    slug: "trazabilidad",
    titulo: "Trazabilidad",
    categoria: "productividad_datos",
    definicionCorta:
      "Capacidad de seguir el historial, ubicación, estado e información de un componente, material o decisión a través del diseño, fabricación, transporte, montaje y operación.",
  },
  {
    slug: "acv",
    titulo: "Análisis de Ciclo de Vida (ACV)",
    categoria: "sostenibilidad",
    definicionCorta:
      "Metodología para evaluar impactos ambientales a lo largo de las etapas definidas del ciclo de vida de un producto, sistema o edificio. Incluye definición de objetivo y alcance, inventario, evaluación de impactos e interpretación.",
  },
  {
    slug: "dap-epd",
    titulo: "Declaración Ambiental de Producto (DAP/EPD)",
    categoria: "sostenibilidad",
    definicionCorta:
      'Documento estandarizado que comunica información ambiental cuantificada de un producto, normalmente basada en un análisis de ciclo de vida y reglas de categoría. No debe interpretarse automáticamente como un sello de producto "ecológico".',
  },
  {
    slug: "carbono-incorporado",
    titulo: "Carbono incorporado",
    categoria: "sostenibilidad",
    definicionCorta:
      "Emisiones de gases de efecto invernadero asociadas a los materiales y procesos de un activo, incluyendo, según el alcance definido, extracción, fabricación, transporte, construcción, mantenimiento, reposición y fin de vida.",
  },
  {
    slug: "economia-circular",
    titulo: "Economía circular en construcción",
    categoria: "sostenibilidad",
    definicionCorta:
      "Enfoque que busca mantener productos y materiales en uso durante más tiempo, reducir extracción y residuos, y diseñar para durabilidad, adaptación, mantenimiento, desmontaje, reutilización y reciclaje.",
  },
];

// Mapa slug → relacionados (clúster mutuo, sin incluirse a sí mismo).
const RELACIONADOS_POR_SLUG = new Map<string, string[]>();
for (const grupo of GRUPOS_RELACIONADOS) {
  for (const slug of grupo) {
    RELACIONADOS_POR_SLUG.set(
      slug,
      grupo.filter((s) => s !== slug)
    );
  }
}

// Ensamblado final: todos borradores, fuentes vacías, relacionados cableados.
export const TERMINOS: TerminoGlosario[] = BASE.map((t) => ({
  ...t,
  fuentes: [],
  publicado: false,
  destacado: DESTACADOS.has(t.slug) || undefined,
  relacionados: RELACIONADOS_POR_SLUG.get(t.slug),
}));

// --- Consultas --------------------------------------------------------------
export function getTerminoBySlug(slug: string): TerminoGlosario | undefined {
  return TERMINOS.find((t) => t.slug === slug);
}
export function terminosPublicados(): TerminoGlosario[] {
  return TERMINOS.filter((t) => t.publicado);
}
export function ultimaActualizacion(): string | undefined {
  const fechas = TERMINOS.map((t) => t.fechaRevision).filter((f): f is string => Boolean(f));
  return fechas.sort().at(-1);
}

// --- Validación (Paso 1: patrón de datos tipados) ---------------------------
import { FUENTES } from "./fuentes";

export function validarGlosario(terms: TerminoGlosario[] = TERMINOS): string[] {
  const errores: string[] = [];
  const vistos = new Set<string>();
  const todos = new Set(terms.map((t) => t.slug));

  for (const t of terms) {
    if (vistos.has(t.slug)) errores.push(`Slug duplicado: "${t.slug}".`);
    vistos.add(t.slug);

    if (!t.definicionCorta?.trim()) errores.push(`"${t.slug}" no tiene definicionCorta.`);

    if (t.publicado) {
      if (!t.fuentes || t.fuentes.length === 0)
        errores.push(`"${t.slug}" está publicado pero no tiene fuentes.`);
      if (!t.fechaRevision) errores.push(`"${t.slug}" está publicado pero no tiene fechaRevision.`);
      if (!t.definicionCorta?.trim())
        errores.push(`"${t.slug}" está publicado pero no tiene definicionCorta.`);
      // Paso 1 · 4.2: las fuentes de un término publicado deben existir en fuentes.ts.
      for (const fid of t.fuentes ?? [])
        if (!FUENTES[fid])
          errores.push(`"${t.slug}".fuentes apunta a una fuente inexistente: "${fid}".`);
    }

    for (const ref of t.noConfundirCon ?? [])
      if (!todos.has(ref)) errores.push(`"${t.slug}".noConfundirCon apunta a un slug inexistente: "${ref}".`);
    for (const ref of t.relacionados ?? [])
      if (!todos.has(ref)) errores.push(`"${t.slug}".relacionados apunta a un slug inexistente: "${ref}".`);
  }
  return errores;
}

/** Lanza si el glosario es inválido. Se llama en build para frenar el deploy. */
export function assertGlosarioValido(): void {
  const errores = validarGlosario();
  if (errores.length > 0) {
    throw new Error(`Glosario inválido (${errores.length}):\n - ${errores.join("\n - ")}`);
  }
}
