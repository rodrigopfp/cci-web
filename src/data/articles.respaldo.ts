import type { Article } from "./types";

// ============================================================================
// NOTICIAS REALES del ecosistema de construcción industrializada en Chile.
//
// Cada artículo está redactado a partir de fuentes públicas verificables
// (MINVU/DITEC y el sitio oficial del CCI) e incluye el enlace al original en
// `sourceUrl`. Los textos son resúmenes propios, no reproducciones.
//
// Los cuerpos son resúmenes breves: la plataforma enlaza a la fuente en vez de
// reemplazarla.
// ============================================================================

const MINVU_CI = "https://www.minvu.gob.cl/construccion-industrializada/";

export const articles: Article[] = [
  {
    id: "n1",
    slug: "seminario-vivienda-industrializada-2026",
    title:
      "Seminario Vivienda Industrializada 2026 reúne a Estado, industria y academia para definir los próximos pasos",
    excerpt:
      "El MINVU publicó las presentaciones del seminario que convocó a DITEC, CCI, CTEC y empresas industrializadoras para consolidar el avance de la VIT en vivienda social.",
    category: "País y políticas públicas",
    type: "editorial",
    date: "2026-06-03",
    author: "Redacción CCI",
    image: { from: "#5C5C5C", to: "#005CAD", label: "Política habitacional" },
    photo: "https://images.unsplash.com/photo-1640101086894-7d70c3e70179?fm=jpg&q=70&w=1200&auto=format&fit=crop",
    readingMinutes: 4,
    sourceUrl: MINVU_CI,
    sourceName: "MINVU · Construcción Industrializada",
    content: [
      "El Ministerio de Vivienda y Urbanismo puso a disposición pública las presentaciones del seminario dedicado a la Vivienda Industrializada Tipo, una instancia que reunió al sector público, la industria y la academia para evaluar cómo fortalecer la calidad y la productividad en la construcción de vivienda social.",
      "Entre los expositores hubo representantes de la DITEC, del Consejo de Construcción Industrializada, del CTEC y de empresas industrializadoras certificadas, con presentaciones sobre el estado del programa y sus desafíos operativos.",
      "El material completo está disponible para descarga en el sitio del MINVU.",
    ],
  },
  {
    id: "n2",
    slug: "traspaso-directorio-cci-2026-2028",
    title: "El CCI traspasa oficialmente su directorio para el período 2026–2028",
    excerpt:
      "El plenario de socios marcó el cambio de ciclo institucional y repasó los hitos de la gestión anterior, desde la vinculación internacional hasta los grupos técnicos.",
    category: "Eventos CCI",
    type: "editorial",
    date: "2026-06-04",
    author: "Redacción CCI",
    image: { from: "#E04E00", to: "#B84000", label: "Institucional" },
    photo: "https://images.unsplash.com/photo-1694521787673-28cbd8830ea5?fm=jpg&q=70&w=1200&auto=format&fit=crop",
    readingMinutes: 5,
    sourceUrl:
      "https://construccionindustrializada.cl/2026/06/04/traspaso-oficial-de-directorio-cci-periodo-2026-2028-marco-nueva-jornada-del-plenario-de-socios/",
    sourceName: "Consejo de Construcción Industrializada",
    content: [
      "La jornada, realizada en la sede Providencia de la Universidad Autónoma, reunió a profesionales e instituciones del sector para revisar los avances del período anterior y proyectar los desafíos del nuevo directorio.",
      "La presidenta del CCI, Pabla Ortúzar, repasó la trayectoria del Consejo desde su origen en 2017 al alero del programa Construye2025 hasta su posición actual como articulador del ecosistema industrializado.",
      "Entre los hitos expuestos figuran la participación en instancias nacionales e internacionales, el despliegue de Roadshows y Encuentros Técnicos, y la publicación de las guías de Integración Temprana y de Constructabilidad.",
    ],
  },
  {
    id: "n3",
    slug: "steel-home-nueva-industrializadora-certificada",
    title:
      "Steel Home se suma al listado de empresas industrializadoras certificadas por la DITEC",
    excerpt:
      "Con la Res. Ex. N°785 de mayo de 2026, la empresa queda habilitada para presentar proyectos de Vivienda Industrializada Tipo. Es la certificación más reciente del listado oficial.",
    category: "Normativa y certificación",
    type: "editorial",
    date: "2026-05-26",
    author: "Redacción CCI",
    image: { from: "#2B2B2B", to: "#3D3D3D", label: "Certificación" },
    photo: "https://images.unsplash.com/photo-1677354371002-7a6c38c992e6?fm=jpg&q=70&w=1200&auto=format&fit=crop",
    readingMinutes: 3,
    sourceUrl: MINVU_CI,
    sourceName: "MINVU · DITEC",
    content: [
      "La División Técnica de Estudio y Fomento Habitacional aprobó la inscripción de Steel Home SpA como empresa industrializadora, según el procedimiento establecido en la Res. Ex. N°52.",
      "La certificación habilita a la empresa para presentar proyectos de Vivienda Industrializada Tipo en el marco de los programas habitacionales D.S. 49 y D.S. 10.",
      "Con esta incorporación, el listado oficial del MINVU llega a 24 empresas industrializadoras únicas certificadas desde marzo de 2023.",
    ],
  },
  {
    id: "n4",
    slug: "roadshow-cci-diseno-estructural-ejecucion",
    title:
      "Roadshow CCI profundiza en la sinergia entre el diseño estructural y la ejecución en obra",
    excerpt:
      "La sesión abordó cómo la coordinación temprana entre cálculo, fabricación y montaje reduce interferencias y retrabajo en proyectos industrializados.",
    category: "Innovación y productividad",
    type: "editorial",
    date: "2026-05-19",
    author: "Redacción CCI",
    image: { from: "#005CAD", to: "#3D3D3D", label: "Encuentro técnico" },
    photo: "https://images.unsplash.com/photo-1609867271967-a82f85c48531?fm=jpg&q=70&w=1200&auto=format&fit=crop",
    readingMinutes: 3,
    sourceUrl: "https://construccionindustrializada.cl/",
    sourceName: "Consejo de Construcción Industrializada",
    content: [
      "El Roadshow CCI es una de las instancias periódicas del Consejo para compartir experiencia técnica entre socios.",
      "Esta edición se centró en la relación entre el diseño estructural y su materialización en obra, un punto crítico cuando parte sustancial del trabajo se traslada a planta.",
      "El ciclo continúa durante el año con sesiones temáticas anunciadas en la agenda institucional del Consejo.",
    ],
  },
  {
    id: "n5",
    slug: "plenario-cci-la-serena-zona-norte",
    title:
      "El CCI realiza en La Serena su primer plenario de socios fuera de la Región Metropolitana",
    excerpt:
      "El encuentro abordó los desafíos particulares de la zona norte y presentó casos de construcción industrializada aplicados al territorio.",
    category: "Eventos CCI",
    type: "editorial",
    date: "2026-03-12",
    author: "Redacción CCI",
    image: { from: "#E04E00", to: "#005CAD", label: "Territorio" },
    photo: "https://images.unsplash.com/photo-1644221150167-fb4fafa7f411?fm=jpg&q=70&w=1200&auto=format&fit=crop",
    readingMinutes: 4,
    sourceUrl:
      "https://construccionindustrializada.cl/2026/03/13/plenario-del-cci-en-la-serena-aborda-desafios-de-zona-norte-y-casos-de-construccion-industrializada/",
    sourceName: "Consejo de Construcción Industrializada",
    content: [
      "La actividad forma parte del plan estratégico 2025–2026 del Consejo, orientado a descentralizar su trabajo y fortalecer la colaboración entre industria, sector público y academia en regiones.",
      "Los expositores plantearon que la industrialización ofrece ventajas específicas en el norte, donde la disponibilidad de recursos, las condiciones de suelo, la crisis hídrica y la dificultad para disponer residuos complican la construcción tradicional.",
      "El plenario incluyó la presentación de casos regionales de aplicación de sistemas industrializados.",
    ],
  },
  {
    id: "n6",
    slug: "que-es-la-construccion-industrializada",
    title:
      "Construcción industrializada: el concepto que busca transformar la productividad del sector",
    excerpt:
      "Una discusión de fondo sobre qué es realmente industrializar, en un sector cuya productividad avanza más lento que la de otras industrias.",
    category: "Opinión experta",
    type: "editorial",
    date: "2026-04-01",
    author: "Redacción CCI",
    image: { from: "#5C5C5C", to: "#2B2B2B", label: "Concepto" },
    photo: "https://images.unsplash.com/photo-1643308012242-704341800ef3?fm=jpg&q=70&w=1200&auto=format&fit=crop",
    readingMinutes: 6,
    sourceUrl:
      "https://construccionindustrializada.cl/2026/04/01/construccion-industrializada-el-concepto-que-busca-transformar-la-productividad-y-sostenibilidad-del-sector/",
    sourceName: "Consejo de Construcción Industrializada",
    content: [
      "La pregunta sobre qué es la construcción industrializada abrió el primer plenario de socios de 2026, y no es una discusión menor: el sector muestra mejoras de productividad considerablemente más lentas que otras industrias.",
      "La conversación apuntó a que industrializar no se reduce a un material ni a prefabricar piezas, sino a un modelo productivo que integra diseño, fabricación controlada, logística y montaje.",
      "Los expositores coincidieron en que el potencial es especialmente alto en territorios donde la construcción tradicional enfrenta restricciones logísticas y de recursos.",
    ],
  },
  {
    id: "n7",
    slug: "agenda-cci-2026-territorio-gobernanza",
    title:
      "Agenda CCI 2026: vinculación, territorio y gobernanza para consolidar la industrialización",
    excerpt:
      "El calendario del año combina plenarios regionales, encuentros técnicos, presencia en ferias internacionales y el lanzamiento del Sello de Construcción Industrializada.",
    category: "Eventos CCI",
    type: "editorial",
    date: "2026-02-24",
    author: "Redacción CCI",
    image: { from: "#005CAD", to: "#E04E00", label: "Agenda" },
    photo: "https://images.unsplash.com/photo-1644221150186-5d785a471f44?fm=jpg&q=70&w=1200&auto=format&fit=crop",
    readingMinutes: 4,
    sourceUrl:
      "https://construccionindustrializada.cl/2026/02/24/agenda-cci-2026-vinculacion-territorio-y-gobernanza-para-consolidar-la-industrializacion-en-chile/",
    sourceName: "Consejo de Construcción Industrializada",
    content: [
      "Más que una lista de actividades, la agenda 2026 del Consejo funciona como hoja de ruta: articulación público-privada, fortalecimiento de socios, despliegue regional y posicionamiento técnico del sector.",
      "Entre los hitos del año figuran el lanzamiento del Sello de Construcción Industrializada, los Premios BuildUp CCI, el recambio de directorio, la presencia en Edifica 2026 y una misión a Brasil.",
      "El calendario también contempla el lanzamiento de un Protocolo de Políticas Públicas y una instancia de interconexión entre sector público, privado y academia.",
    ],
  },
  {
    id: "n8",
    slug: "convocatoria-directorio-cci-2026-2028",
    title: "Convocatoria abierta: el CCI elige su directorio para el período 2026–2028",
    excerpt:
      "El proceso eleccionario invitó a los socios con más de dos años en el Consejo a liderar el próximo ciclo institucional del gremio.",
    category: "Eventos CCI",
    type: "editorial",
    date: "2026-02-25",
    author: "Redacción CCI",
    image: { from: "#B84000", to: "#5C5C5C", label: "Gobernanza" },
    photo: "https://images.unsplash.com/photo-1694521788304-1d42378498da?fm=jpg&q=70&w=1200&auto=format&fit=crop",
    readingMinutes: 3,
    sourceUrl:
      "https://construccionindustrializada.cl/2026/02/25/convocatoria-abierta-cci-elige-su-nuevo-directorio-para-el-periodo-2026-2028/",
    sourceName: "Consejo de Construcción Industrializada",
    content: [
      "El proceso de recambio se dio en un escenario de crecimiento institucional, tras un período en que el Consejo consolidó su relevancia ante actores públicos y privados.",
      "Entre los hitos destacados de la gestión previa figura el EICI 2025, que posicionó al Consejo como referente internacional del sector.",
      "Quienes resultaran electos asumirían la continuidad de los proyectos estratégicos y la representación de una red de socios en expansión.",
    ],
  },
  {
    id: "n9",
    slug: "planta-industrializada-puerto-varas-los-lagos",
    title:
      "Puerto Varas inaugura la primera planta industrializada de Los Lagos dedicada a vivienda social",
    excerpt:
      "La instalación, con tecnología BIM y procesos automatizados, apunta a abastecer la demanda de soluciones modulares entre Concepción y Punta Arenas.",
    category: "Vivienda industrializada",
    type: "editorial",
    date: "2025-12-15",
    author: "Redacción CCI",
    image: { from: "#005CAD", to: "#3D3D3D", label: "Planta" },
    photo: "https://images.unsplash.com/photo-1577335029365-35029f68d093?fm=jpg&q=70&w=1200&auto=format&fit=crop",
    readingMinutes: 3,
    sourceUrl: MINVU_CI,
    sourceName: "MINVU",
    content: [
      "El ministro de Vivienda y Urbanismo, Carlos Montes, participó en la inauguración de la primera planta de construcción industrializada del sur del país, de propiedad del Grupo Tecno Fast.",
      "La planta incorpora tecnología BIM y procesos automatizados, y busca atender la creciente demanda de soluciones modulares para vivienda de interés público en la macrozona sur.",
      "Su radio de cobertura declarado se extiende entre Concepción y Punta Arenas.",
    ],
  },
  {
    id: "n10",
    slug: "condominio-fuerte-bulnes-arica-industrializado",
    title:
      "Condominio Fuerte Bulnes: el primer conjunto de viviendas industrializadas de Arica y Parinacota",
    excerpt:
      "Quince viviendas de dos pisos y 60 m², en estructura de madera de grado estructural, corresponden a una de las 42 tipologías aprobadas por la DITEC.",
    category: "Vivienda industrializada",
    type: "editorial",
    date: "2025-11-20",
    author: "Redacción CCI",
    image: { from: "#E04E00", to: "#F1873D", label: "Proyecto" },
    photo: "https://images.unsplash.com/photo-1693639767415-27ff64ce4da2?fm=jpg&q=70&w=1200&auto=format&fit=crop",
    readingMinutes: 3,
    sourceUrl: MINVU_CI,
    sourceName: "MINVU",
    content: [
      "El conjunto marca la llegada de la Vivienda Industrializada Tipo a la región de Arica y Parinacota, con quince unidades correspondientes a una tipología de la empresa Tecno Fast.",
      "Se trata de casas de dos pisos y 60 metros cuadrados, ejecutadas en madera de grado estructural, seca e impregnada contra termitas y humedad.",
      "La tipología es una de las 42 aprobadas por la División Técnica de Estudio y Fomento Habitacional del MINVU.",
    ],
  },
  {
    id: "n11",
    slug: "norma-construccion-vivienda-industrializada-2025",
    title:
      "MINVU publica la Norma de Construcción de Vivienda Industrializada",
    excerpt:
      "El documento ordena requerimientos de diseño, transporte, protección contra fuego, sistemas y fiscalización tanto en fábrica como en obra.",
    category: "Normativa y certificación",
    type: "editorial",
    date: "2025-07-15",
    author: "Redacción CCI",
    image: { from: "#2B2B2B", to: "#5C5C5C", label: "Normativa" },
    photo: "https://images.unsplash.com/photo-1673978484294-4c60fba3929e?fm=jpg&q=70&w=1200&auto=format&fit=crop",
    readingMinutes: 5,
    sourceUrl:
      "https://www.minvu.gob.cl/wp-content/uploads/2025/07/NORMA-CONSTRUCCION-INDUSTRIALIZADA-2025.pdf",
    sourceName: "MINVU",
    content: [
      "La norma aborda los requerimientos aplicables a viviendas industrializadas, incluyendo los casos sin emplazamiento específico y los sistemas basados en paneles y unidades volumétricas.",
      "Un capítulo relevante para el sector es el de fiscalizaciones, que distingue explícitamente las que se realizan en fábrica de las que se realizan en obra.",
      "El texto se apoya, entre otras referencias, en la NCh 3744:2023 sobre términos y definiciones de construcción industrializada y prefabricada.",
    ],
  },
  {
    id: "n12",
    slug: "protocolo-fiscalizacion-obras-industrializadas",
    title:
      "DITEC actualiza el protocolo de fiscalización de obras en proyectos habitacionales industrializados",
    excerpt:
      "El ORD. N°1673 ajusta cómo se inspeccionan las obras que incorporan sistemas industrializados, un punto sensible para empresas y SERVIU.",
    category: "Normativa y certificación",
    type: "editorial",
    date: "2025-09-16",
    author: "Redacción CCI",
    image: { from: "#3D3D3D", to: "#005CAD", label: "Fiscalización" },
    photo: "https://images.unsplash.com/photo-1693639056346-49cd9529378a?fm=jpg&q=70&w=1200&auto=format&fit=crop",
    readingMinutes: 3,
    sourceUrl: MINVU_CI,
    sourceName: "MINVU · DITEC",
    content: [
      "La actualización del protocolo responde a la necesidad de adaptar la inspección tradicional de obra a proyectos donde parte sustancial del trabajo ocurre en planta.",
      "Para las empresas industrializadoras, el ajuste implica revisar sus procedimientos de control y la documentación que acompaña cada despacho a obra.",
      "El documento está disponible en la sección de antecedentes sobre industrialización del MINVU.",
    ],
  },
  {
    id: "n13",
    slug: "primer-edificio-industrializado-lo-espejo",
    title: "Lo Espejo recibe el primer edificio industrializado de la Región Metropolitana",
    excerpt:
      "Sesenta familias recibieron las llaves de sus departamentos en un conjunto de cuatro pisos de construcción modular.",
    category: "Vivienda industrializada",
    type: "editorial",
    date: "2025-02-20",
    author: "Redacción CCI",
    image: { from: "#F1873D", to: "#B84000", label: "Entrega" },
    photo: "https://images.unsplash.com/photo-1644221150141-24f57d9a468b?fm=jpg&q=70&w=1200&auto=format&fit=crop",
    readingMinutes: 3,
    sourceUrl: MINVU_CI,
    sourceName: "MINVU",
    content: [
      "El conjunto habitacional, de cuatro pisos, corresponde al primer edificio industrializado entregado en la Región Metropolitana.",
      "Sesenta familias recibieron las llaves de sus departamentos, ejecutados mediante construcción modular.",
      "La entrega forma parte de la agenda de industrialización impulsada por el Ministerio de Vivienda y Urbanismo.",
    ],
  },
  {
    id: "n14",
    slug: "res-ex-190-modifica-aprobacion-vit",
    title:
      "Nueva resolución ajusta las condiciones de aprobación de proyectos de Vivienda Industrializada Tipo",
    excerpt:
      "La Res. Ex. N°190 modifica la Res. Ex. N°59, que fija el procedimiento de revisión de proyectos VIT en los programas D.S. 49 y D.S. 10.",
    category: "Normativa y certificación",
    type: "editorial",
    date: "2026-02-03",
    author: "Redacción CCI",
    image: { from: "#5C5C5C", to: "#3D3D3D", label: "Regulación" },
    photo: "https://images.unsplash.com/photo-1599707254554-027aeb4deacd?fm=jpg&q=70&w=1200&auto=format&fit=crop",
    readingMinutes: 3,
    sourceUrl: MINVU_CI,
    sourceName: "MINVU · DITEC",
    content: [
      "La Res. Ex. N°59 establece las condiciones y mecanismos de aprobación de proyectos de Vivienda Industrializada Tipo y el procedimiento con que SERVIU revisa los proyectos que las incorporan.",
      "La modificación introducida por la Res. Ex. N°190 se suma a la anterior Res. Ex. N°596, en un marco regulatorio que ha ido ajustándose desde 2023.",
      "Para las empresas del sector, seguir estas modificaciones es determinante porque definen los plazos y requisitos de ingreso de sus proyectos.",
    ],
  },
  {
    id: "n15",
    slug: "24-empresas-industrializadoras-certificadas-chile",
    title:
      "Chile llega a 24 empresas industrializadoras certificadas para vivienda social",
    excerpt:
      "El listado oficial de la DITEC muestra un ecosistema que pasó de cero a 24 empresas habilitadas en poco más de tres años. Analizamos la evolución.",
    category: "Innovación y productividad",
    type: "editorial",
    date: "2026-06-10",
    author: "Redacción CCI",
    image: { from: "#E04E00", to: "#005CAD", label: "Radar" },
    photo: "https://images.unsplash.com/photo-1655975719898-8f3432eed322?fm=jpg&q=70&w=1200&auto=format&fit=crop",
    readingMinutes: 5,
    sourceUrl: MINVU_CI,
    sourceName: "MINVU · DITEC",
    content: [
      "Desde que en marzo de 2023 se emitieron las primeras resoluciones bajo la Res. Ex. N°52, el listado de empresas industrializadoras aprobadas por la DITEC ha crecido de forma sostenida hasta alcanzar 24 empresas únicas.",
      "El ritmo de nuevas certificaciones fue más intenso en 2023, año de partida del mecanismo, y se ha mantenido con incorporaciones regulares en los años siguientes.",
      "La certificación habilita a estas empresas para presentar proyectos de Vivienda Industrializada Tipo, un instrumento que acelera la revisión de proyectos al contar con antecedentes previamente aprobados.",
      "El detalle empresa por empresa, con su resolución y fecha, está disponible en el Radar de esta plataforma.",
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(article: Article, limit = 3) {
  return articles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .concat(articles.filter((a) => a.id !== article.id && a.category !== article.category))
    .slice(0, limit);
}
