// ============================================================================
// GLOSARIO TÉCNICO CCI — capa de datos tipada (Fase 2 · paso 3; Fase 3 · ajuste 2)
// ============================================================================
// Cada término tiene un estadoEditorial que gobierna su visibilidad y SEO:
//   validada_cci          → pública, indexable ("Definición CCI validada").
//   revision_grupo_tecnico→ pública, indexable ("En revisión por grupo técnico").
//   borrador              → no pública (noindex, fuera del sitemap, insignia).
//   archivada             → la ruta redirige a reemplazadoPor; se conserva.
// Los 8 términos esenciales están validada_cci (contenido aprobado por Rodrigo,
// se carga TAL CUAL); los 36 restantes siguen como borrador.
//
// `fuentes` son ids de fuentes.ts (Paso 1). `naturaleza` distingue una
// definición alineada con una norma ("normativa") de una explicación propia
// del CCI ("editorial").
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

export type EstadoEditorial =
  | "validada_cci"
  | "revision_grupo_tecnico"
  | "borrador"
  | "archivada";

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
  estadoEditorial: EstadoEditorial;
  /** Distingue norma ("normativa") de explicación propia del CCI ("editorial"). */
  naturaleza?: "normativa" | "editorial";
  /** Obligatorio si estadoEditorial === "archivada": slug del término vigente. */
  reemplazadoPor?: string;
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

// Los 8 términos esenciales validados (contenido aprobado por Rodrigo). Se
// cargan validada_cci; el resto queda como borrador. También son los destacados
// del índice.
const ESENCIALES = new Set([
  "construccion-industrializada",
  "prefabricacion",
  "integracion-temprana",
  "dfma",
  "mmc",
  "bim",
  "empresa-industrializadora-ditec",
  "vivienda-industrializada-tipo",
]);
const DESTACADOS = ESENCIALES;

const FECHA_VALIDACION = "2026-08-23"; // revisión de los 8 esenciales

// Un término del glosario tal como se declara aquí (sin los campos derivados en
// el ensamblado). Las definiciones esenciales traen fuentes/relacionados/naturaleza
// propios; los borradores heredan relacionados del clúster y fuentes vacías.
type TerminoBase = Omit<TerminoGlosario, "estadoEditorial" | "destacado" | "fuentes" | "relacionados"> & {
  fuentes?: string[];
  relacionados?: string[];
};

// --- Definiciones de los 44 términos (8 validadas + 36 borradores) -----------
const BASE: TerminoBase[] = [
  {
    slug: "construccion-industrializada",
    titulo: "Construcción industrializada",
    categoria: "fundamentos",
    naturaleza: "normativa",
    fuentes: ["inn-nch3744", "guia-cci-2024"],
    definicionCorta:
      "Metodología que organiza el diseño, la producción, la logística y la ejecución de un proyecto como un sistema integrado, para mejorar productividad, calidad, sostenibilidad, trazabilidad y certeza. Puede utilizar o no componentes prefabricados.",
    explicacionSimple:
      "Industrializar la construcción no es solo fabricar piezas en una planta: es organizar el proyecto completo — desde el diseño hasta el montaje — como un proceso productivo planificado, donde las decisiones se toman a tiempo y cada etapa está pensada para la siguiente.",
    explicacionTecnica:
      "La construcción industrializada integra evaluación, diseño, ingeniería, fabricación, abastecimiento, logística, montaje, control y aprendizaje bajo reglas comunes: estandarización de componentes e interfaces, producción seriada y rítmica, planificación de flujo y medición de desempeño. La prefabricación es una de sus herramientas posibles, no su condición: un proyecto puede industrializarse optimizando procesos en obra, y puede usarse prefabricación sin que el proyecto esté industrializado.",
    porQueImporta:
      "Es la respuesta metodológica del sector al desafío de productividad y al déficit habitacional: permite construir con más certeza de plazo, menos pérdidas y calidad más consistente, como muestra la evidencia reunida en CCI Data.",
    ejemplo:
      "Un proyecto habitacional donde mandante, arquitectura, ingeniería e industrializador definen juntos — antes de cerrar el anteproyecto — la modulación, los paneles estandarizados, la logística y la secuencia de montaje. Parte de las partidas puede seguir ejecutándose en terreno: lo industrializado es el proceso, no solo las piezas.",
    noConfundirCon: ["prefabricacion"],
    contextoChileno:
      "La NCh3744:2023 estableció por primera vez un lenguaje común de términos y definiciones para la construcción industrializada y prefabricada en Chile, y el Estado la incorporó a su política habitacional mediante el mecanismo de empresas industrializadoras y Viviendas Industrializadas Tipo del MINVU.",
    relacionados: ["prefabricacion", "construccion-off-site", "mmc", "integracion-temprana", "dfma"],
  },
  {
    slug: "prefabricacion",
    titulo: "Prefabricación",
    categoria: "fundamentos",
    naturaleza: "normativa",
    fuentes: ["inn-nch3744"],
    definicionCorta:
      "Fabricación anticipada de un elemento, componente o conjunto en un lugar distinto de su posición final, para transportarlo e instalarlo posteriormente.",
    explicacionSimple:
      "Prefabricar es adelantar trabajo: producir una pieza — un panel, una escalera, un baño completo — fuera de su ubicación definitiva, en condiciones controladas, y luego llevarla e instalarla.",
    explicacionTecnica:
      "La prefabricación es una técnica de producción, no una metodología de gestión: define DÓNDE y CUÁNDO se fabrica un elemento, pero no cómo se integra el proyecto. Por eso puede existir dentro de un proceso industrializado — donde diseño, logística y montaje están coordinados desde el inicio — o de forma aislada, trasladando a la planta las mismas descoordinaciones de la obra tradicional.",
    porQueImporta:
      "Distinguir la herramienta (prefabricar) de la metodología (industrializar) es la base para evaluar proyectos y proveedores con criterio: comprar paneles no industrializa un proyecto; integrarlos desde el diseño, sí.",
    ejemplo:
      "Una constructora compra tabiques prefabricados para acelerar la obra gruesa, pero los planos llegan tarde, las instalaciones no calzan y hay retrabajos en terreno: hay prefabricación, pero no industrialización.",
    noConfundirCon: ["construccion-industrializada"],
    contextoChileno:
      "La NCh3744:2023 define y ordena los conceptos de construcción industrializada y prefabricada, separando la técnica de fabricación anticipada de la metodología integral.",
    relacionados: ["construccion-industrializada", "construccion-off-site", "sistema-panelizado-2d", "modulo-volumetrico-3d", "preensamblaje"],
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
    naturaleza: "editorial",
    fuentes: ["iplc-2025"],
    definicionCorta:
      "Conjunto amplio de sistemas, tecnologías y formas de gestión que buscan mejorar el desempeño de la construcción mediante estandarización, prefabricación, producción fuera de obra, digitalización y nuevas formas de ensamblaje (Modern Methods of Construction).",
    explicacionSimple:
      "MMC es un paraguas: agrupa las distintas maneras «modernas» de construir — paneles, unidades volumétricas, componentes, automatización, gestión digital — en una sola categoría para poder estudiarlas y compararlas.",
    explicacionTecnica:
      "El término, de origen británico, clasifica métodos según su grado de producción fuera de obra y de innovación de proceso. No es un sistema constructivo específico: un proyecto «con MMC» puede combinar panelización, preensamblaje de instalaciones y gestión digital de producción. Su utilidad principal es analítica: permite medir y comparar el desempeño de proyectos con y sin estos métodos bajo una definición común.",
    porQueImporta:
      "Es la categoría que usa la medición sectorial en Chile para comparar desempeño: los resultados de productividad, residuos y plazos publicados en CCI Data se ordenan bajo esta clasificación.",
    ejemplo:
      "El Estudio IPLC 2025 comparó proyectos de edificación en altura con y sin MMC, midiendo productividad, cumplimiento de plazos y generación de residuos bajo una misma metodología.",
    noConfundirCon: ["construccion-modular"],
    contextoChileno:
      "En Chile el término se emplea principalmente en estudios de productividad y benchmarking; el lenguaje normativo local se ordena bajo la NCh3744:2023 y el concepto de construcción industrializada.",
    relacionados: ["construccion-industrializada", "construccion-off-site", "prefabricacion"],
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
    naturaleza: "editorial",
    fuentes: ["guia-cci-2024"],
    definicionCorta:
      "Participación coordinada de los actores relevantes del proyecto desde sus primeras etapas, antes de que las decisiones críticas queden cerradas.",
    explicacionSimple:
      "Sentar a todos en la mesa desde el principio: mandante, arquitectura, ingeniería, especialidades, industrializador y constructor definen juntos las decisiones que después serían caras o imposibles de cambiar.",
    explicacionTecnica:
      "La integración temprana (ITCI) incorpora al diseño las restricciones y oportunidades de fabricación, costos, logística, montaje, operación y normativa cuando modificarlas aún es barato. Reordena el flujo de decisiones del proyecto: la información que tradicionalmente llega en obra — tolerancias de planta, dimensiones de transporte, secuencia de montaje — se convierte en dato de entrada del diseño.",
    porQueImporta:
      "La fragmentación y la información tardía están en el origen de los rediseños, interferencias y retrabajos que explican la brecha de productividad del sector; integrar temprano es la palanca que la evidencia de los casos documentados del CCI muestra una y otra vez.",
    ejemplo:
      "Incorporar al industrializador durante el anteproyecto para fijar la modulación de paneles y las pasadas de instalaciones: se eliminan rediseños posteriores y el montaje se planifica desde el primer plano.",
    contextoChileno:
      "La Guía Práctica de Integración Temprana en Construcción Industrializada (CCI, 2024) sistematiza el enfoque para Chile con casos documentados de socios y fue elaborada junto a instituciones del sector.",
    relacionados: ["construccion-industrializada", "dfma", "bim", "estandarizacion"],
  },
  {
    slug: "dfma",
    titulo: "DfMA — Diseño para Fabricación y Montaje",
    categoria: "diseno_integracion",
    naturaleza: "editorial",
    fuentes: ["guia-cci-2024"],
    definicionCorta:
      "Enfoque de diseño que incorpora desde el inicio la forma en que los elementos serán fabricados, transportados y montados (Design for Manufacture and Assembly).",
    explicacionSimple:
      "Diseñar pensando en la fábrica y en la grúa: cada elemento se dibuja para que sea fácil de producir, de trasladar y de instalar, no solo para que se vea bien en el plano.",
    explicacionTecnica:
      "DfMA optimiza el diseño contra las restricciones reales del proceso: capacidades de planta, tolerancias, dimensiones de transporte, peso izable, secuencia y accesibilidad de montaje. Busca reducir cantidad de componentes, operaciones innecesarias, errores y desperdicio, y es uno de los puentes concretos entre integración temprana e industrialización.",
    porQueImporta:
      "Gran parte del costo y del plazo de un proyecto queda definido en el diseño; DfMA traslada la eficiencia de la obra al tablero, donde corregir es barato.",
    ejemplo:
      "Diseñar un baño industrializado cuyas dimensiones caben en un camión estándar sin escolta, con conexiones agrupadas y accesibles para conectarlo en horas y no en días.",
    contextoChileno:
      "El enfoque se difunde en Chile a través de las guías y actividades del CCI y su ecosistema, como criterio de diseño para proyectos industrializados.",
    relacionados: ["integracion-temprana", "estandarizacion", "modularizacion", "construccion-industrializada"],
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
    naturaleza: "editorial",
    fuentes: ["planbim", "buildingsmart"],
    definicionCorta:
      "Metodología colaborativa para crear, gestionar e intercambiar información estructurada de un edificio o infraestructura durante su ciclo de vida (Building Information Modeling).",
    explicacionSimple:
      "Más que un modelo 3D: una manera de trabajar en la que todos los participantes crean y comparten información ordenada del proyecto — geometría, materiales, plazos, costos — sobre una base común y confiable.",
    explicacionTecnica:
      "BIM estructura la información del activo en modelos de datos compartidos, con estándares de intercambio (como IFC en el enfoque openBIM), roles, entornos comunes de datos y usos definidos: coordinación de especialidades, detección de interferencias, planificación 4D, cubicación y gestión de activos. No es el nombre de un software ni un entregable único, sino la metodología que gobierna esa información.",
    porQueImporta:
      "Para industrializar se necesita información precisa y a tiempo: BIM es el vehículo natural de la integración temprana y del DfMA, y la evidencia sectorial en CCI Data asocia su uso con mejor desempeño de plazos.",
    ejemplo:
      "Coordinar arquitectura, estructura e instalaciones en un modelo federado y resolver las interferencias ANTES de fabricar los paneles, en lugar de descubrirlas en obra.",
    noConfundirCon: ["gemelo-digital"],
    contextoChileno:
      "Planbim, iniciativa de Corfo, desarrolló el Estándar BIM para Proyectos Públicos, referencia para los proyectos del Estado en Chile; y buildingSMART define los estándares abiertos internacionales (openBIM, IFC) que permiten colaborar entre plataformas.",
    relacionados: ["openbim", "ifc", "cde", "deteccion-de-interferencias", "integracion-temprana"],
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
    naturaleza: "normativa",
    fuentes: ["ditec-minvu", "minvu-res-52"],
    definicionCorta:
      "Empresa cuyo proceso productivo, planta y antecedentes han sido evaluados y aprobados por el MINVU conforme al procedimiento de la División Técnica (DITEC), lo que la habilita para presentar proyectos de Vivienda Industrializada Tipo.",
    explicacionSimple:
      "Es un registro oficial: el Ministerio evalúa a la empresa — su planta, su proceso, su capacidad — y, si la aprueba, esa empresa puede presentar sus tipologías de vivienda para ser aprobadas como VIT.",
    explicacionTecnica:
      "La aprobación recae sobre la EMPRESA y su sistema productivo, según el procedimiento establecido en la Resolución Exenta N.º 52 del MINVU y sus modificaciones. Es una habilitación de proceso, no una certificación de cada vivienda: las tipologías específicas se aprueban por separado como VIT. La condición de empresa aprobada tampoco constituye una certificación de calidad emitida por el CCI ni un sello comercial.",
    porQueImporta:
      "Es la puerta de entrada de la industrialización a la política habitacional: solo las empresas aprobadas pueden presentar VIT y participar por esa vía en los programas del Estado, lo que da al mandante público y privado un registro verificable de proveedores evaluados.",
    ejemplo:
      "Una planta de paneles de madera somete su proceso, control de calidad y antecedentes al procedimiento DITEC; una vez aprobada, queda registrada oficialmente y puede presentar sus tipologías de vivienda a aprobación como VIT.",
    noConfundirCon: ["vivienda-industrializada-tipo"],
    contextoChileno:
      "El registro público de empresas industrializadoras aprobadas y de tipologías VIT lo administra el MINVU a través de la DITEC; CCI Data publica sus conteos oficiales con fecha de corte.",
    relacionados: ["vivienda-industrializada-tipo", "resolucion-exenta-52", "resolucion-exenta-59", "ditec"],
  },
  {
    slug: "vivienda-industrializada-tipo",
    titulo: "Vivienda Industrializada Tipo (VIT)",
    categoria: "regulacion_chilena",
    naturaleza: "normativa",
    fuentes: ["ditec-minvu", "minvu-res-59"],
    definicionCorta:
      "Tipología de vivienda industrializada revisada y aprobada conforme al procedimiento técnico del MINVU, para su utilización en proyectos de determinados programas habitacionales bajo las condiciones de su aprobación.",
    explicacionSimple:
      "Una «vivienda tipo» aprobada una vez y lista para repetirse: el diseño y su solución técnica pasan la revisión del Ministerio como tipología, y luego pueden incorporarse en proyectos habitacionales según las condiciones aprobadas.",
    explicacionTecnica:
      "La VIT es la aprobación de la TIPOLOGÍA (diseño, solución constructiva y antecedentes técnicos) presentada por una empresa industrializadora aprobada, conforme al mecanismo de la Resolución Exenta N.º 59 del MINVU. Su utilización en proyectos concretos se rige por las condiciones establecidas en la aprobación y por las reglas del programa habitacional correspondiente; no exime de las demás revisiones y permisos que apliquen a cada proyecto.",
    porQueImporta:
      "Convierte la repetición — el corazón de la industrialización — en ventaja regulatoria: una tipología bien resuelta se aprueba una vez y escala en múltiples proyectos, con más certeza técnica para mandantes y familias.",
    ejemplo:
      "Una tipología de vivienda de un piso aprobada como VIT se incorpora en distintos proyectos del programa habitacional correspondiente, replicando la misma solución evaluada en lugar de rediseñar y revisar desde cero cada vez.",
    noConfundirCon: ["empresa-industrializadora-ditec"],
    contextoChileno:
      "El catálogo de tipologías VIT vigentes es parte del registro oficial del MINVU/DITEC; su conteo se publica en CCI Data con fuente y fecha de corte.",
    relacionados: ["empresa-industrializadora-ditec", "resolucion-exenta-59", "resolucion-exenta-52", "construccion-industrializada"],
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

// Ensamblado final: los 8 esenciales validada_cci (con su fecha, fuentes y
// relacionados propios); el resto borrador, con relacionados del clúster.
export const TERMINOS: TerminoGlosario[] = BASE.map((t) => {
  const esencial = ESENCIALES.has(t.slug);
  return {
    ...t,
    fuentes: t.fuentes ?? [],
    relacionados: t.relacionados ?? RELACIONADOS_POR_SLUG.get(t.slug),
    estadoEditorial: (esencial ? "validada_cci" : "borrador") as EstadoEditorial,
    fechaRevision: t.fechaRevision ?? (esencial ? FECHA_VALIDACION : undefined),
    destacado: DESTACADOS.has(t.slug) || undefined,
  };
});

// --- Consultas --------------------------------------------------------------
export function getTerminoBySlug(slug: string): TerminoGlosario | undefined {
  return TERMINOS.find((t) => t.slug === slug);
}
/** Público = pieza indexable y en el sitemap (validada o en revisión técnica). */
export function esPublico(t: TerminoGlosario): boolean {
  return t.estadoEditorial === "validada_cci" || t.estadoEditorial === "revision_grupo_tecnico";
}
export function esBorrador(t: TerminoGlosario): boolean {
  return t.estadoEditorial === "borrador";
}
export function esArchivada(t: TerminoGlosario): boolean {
  return t.estadoEditorial === "archivada";
}
export function terminosPublicados(): TerminoGlosario[] {
  return TERMINOS.filter(esPublico);
}
export function ultimaActualizacion(): string | undefined {
  const fechas = TERMINOS.filter(esPublico)
    .map((t) => t.fechaRevision)
    .filter((f): f is string => Boolean(f));
  return fechas.sort().at(-1);
}

/**
 * Etiqueta de naturaleza para la ficha (mismo estilo de pill del indicador de
 * evidencia, pero mapeo propio): "normativa" cita su fuente principal;
 * "editorial" es explicación propia del CCI.
 */
export function etiquetaNaturaleza(t: TerminoGlosario): string | undefined {
  if (!t.naturaleza) return undefined;
  if (t.naturaleza === "editorial") return "Explicación editorial del CCI";
  const f = t.fuentes[0] ? FUENTES[t.fuentes[0]] : undefined;
  const nombre = f?.shortLabel ?? f?.organization ?? "su fuente normativa";
  return `Definición alineada con ${nombre}`;
}

/** Rótulo de estado para la ficha pública. */
export function rotuloEstado(t: TerminoGlosario): string | undefined {
  if (t.estadoEditorial === "validada_cci") return "Definición CCI validada";
  if (t.estadoEditorial === "revision_grupo_tecnico")
    return "En revisión por grupo técnico — esta definición puede cambiar";
  return undefined;
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

    // Público (validada_cci / revision_grupo_tecnico): exige la ficha completa.
    if (esPublico(t)) {
      if (!t.explicacionSimple?.trim())
        errores.push(`"${t.slug}" es público pero no tiene explicacionSimple.`);
      if (!t.fuentes || t.fuentes.length === 0)
        errores.push(`"${t.slug}" es público pero no tiene fuentes.`);
      if (!t.fechaRevision) errores.push(`"${t.slug}" es público pero no tiene fechaRevision.`);
      // Paso 1 · 4.2: las fuentes de un término público deben existir en fuentes.ts.
      for (const fid of t.fuentes ?? [])
        if (!FUENTES[fid])
          errores.push(`"${t.slug}".fuentes apunta a una fuente inexistente: "${fid}".`);
    }

    // Archivada: exige un reemplazo vigente y existente.
    if (t.estadoEditorial === "archivada") {
      if (!t.reemplazadoPor?.trim())
        errores.push(`"${t.slug}" está archivada pero no tiene reemplazadoPor.`);
      else if (!todos.has(t.reemplazadoPor))
        errores.push(`"${t.slug}".reemplazadoPor apunta a un slug inexistente: "${t.reemplazadoPor}".`);
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
