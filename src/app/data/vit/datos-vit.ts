// ============================================================================
// Contenido descriptivo (no numérico-KPI) de /data/vit. Transcrito de la
// maqueta validada, cuyas cifras y textos provienen de la Ditec Minvu. Las
// CIFRAS-KPI viven en el registro tipado (indicadores-vit.ts); aquí van las
// estructuras editoriales: tabla de autorizaciones, catálogo de fichas, casos,
// hitos históricos, criterios de evaluación y listas cualitativas.
// ============================================================================

export type SiluetaKey = "casa2" | "casa1" | "rural" | "pareada" | "depto" | "edificio5";

// --- Plazos 52 m²: matriz por etapa (Ditec «Industrialización en vivienda»,
//     29 may 2026). Los TOTALES viven en el registro; el desglose por etapa es
//     dato tabular de una sola lámina. Días por etapa en el orden de la leyenda.
export const PLAZOS_ETAPAS = [
  "Permiso de edificación",
  "Confección en fábrica",
  "Fundaciones",
  "Montaje u obra gruesa",
  "Terminaciones en obra",
  "Conexión a servicios",
  "Recepción final",
] as const;
export const PLAZOS_SERIES: { slug: string; titulo: string; dias: number[] }[] = [
  { slug: "llave-en-mano-fabrica-volumetrica", titulo: "Modular en fábrica", dias: [0, 7, 4, 1, 1, 1, 0] },
  { slug: "llave-en-mano-panelizada", titulo: "Panelizada en fábrica", dias: [0, 1, 6, 4, 27, 1, 0] },
  { slug: "llave-en-mano-tradicional", titulo: "Tradicional in situ", dias: [60, 0, 6, 45, 30, 1, 30] },
];
export const PLAZOS_COLORES = ["s1", "s2", "s3", "s4", "s5", "s6", "s7"];

// --- Registro de autorizaciones Res. Ex. N°52 (Ditec, corte feb 2026; nov 2025
//     en publicación N°398). Reproducido sin reordenar.
export const AUTORIZACIONES: { n: number; empresa: string; resolucion: string }[] = [
  { n: 1, empresa: "Patagual Home SpA", resolucion: "0607 · 14.03.2023" },
  { n: 2, empresa: "Santa Magdalena SpA", resolucion: "0639 · 15.03.2023" },
  { n: 3, empresa: "E2E SpA", resolucion: "0637 · 16.03.2023" },
  { n: 4, empresa: "Promet Servicio SpA", resolucion: "0679 · 27.03.2023" },
  { n: 5, empresa: "Canada House SpA", resolucion: "1702 · 13.11.2025" },
  { n: 6, empresa: "Baumax SpA", resolucion: "0834 · 21.04.2023" },
  { n: 7, empresa: "Syntheon Chile Ltda.", resolucion: "0977 · 25.05.2023" },
  { n: 8, empresa: "Tecno Fast S.A.", resolucion: "1092 · 14.06.2023" },
  { n: 9, empresa: "Tecnotruss S.A.", resolucion: "1093 · 14.06.2023" },
  { n: 10, empresa: "Atco Sabinco S.A.", resolucion: "1113 · 19.06.2023" },
  { n: 11, empresa: "Prefabricadas Premium SpA", resolucion: "1657 · 04.10.2023" },
  { n: 12, empresa: "CO-OL Ltda.", resolucion: "2089 · 06.02.2024" },
  { n: 13, empresa: "Cintac S.A.I.C.", resolucion: "0254 · 12.02.2024" },
  { n: 14, empresa: "Imel Town House SpA", resolucion: "0484 · 01.04.2024" },
  { n: 15, empresa: "Eterna", resolucion: "0835 · 11.06.2024" },
  { n: 16, empresa: "RCM Modular Chile S.A.", resolucion: "1736 · 14.11.2024" },
  { n: 17, empresa: "RTA Casas SpA", resolucion: "1737 · 15.11.2024" },
  { n: 18, empresa: "RC Tecnova Ltda.", resolucion: "0171 · 31.01.2025" },
  { n: 19, empresa: "Eterna SpA", resolucion: "0320 · 03.03.2025" },
  { n: 20, empresa: "Grupo SCM SpA", resolucion: "0578 · 24.04.2025" },
  { n: 21, empresa: "Rodríguez SpA", resolucion: "1196 · 27.08.2025" },
  { n: 22, empresa: "Tecnotruss S.A. (Puerto Varas)", resolucion: "1823 · 02.12.2025" },
  { n: 23, empresa: "Leonera SpA", resolucion: "0033 · 12.01.2026" },
  { n: 24, empresa: "Andes SpA", resolucion: "0234 · 11.02.2026" },
  { n: 25, empresa: "Steel Home SpA", resolucion: "0785 · 26.05.2026" },
  { n: 26, empresa: "Aceros O'Higgins SpA", resolucion: "1839 · 03.12.2024" },
];

// --- VIT aprobadas por industrializadora (Ditec, 29 may 2026, sin reordenar).
export const VIT_POR_EMPRESA: { empresa: string; n: number }[] = [
  { empresa: "Baumax", n: 9 },
  { empresa: "Santa Magdalena", n: 8 },
  { empresa: "Tecnotruss", n: 8 },
  { empresa: "E2E", n: 6 },
  { empresa: "Tecno Fast", n: 5 },
  { empresa: "Prefabricadas Premium", n: 4 },
  { empresa: "Patagual", n: 3 },
  { empresa: "Promet", n: 3 },
  { empresa: "Canada House", n: 1 },
];

// --- Ocho criterios de evaluación de una industrializadora (Ditec, Res. Ex.
//     N°52). El ícono se resuelve por número en la página.
export const CRITERIOS: { n: string; titulo: string; texto: string }[] = [
  { n: "01", titulo: "Planificación y control", texto: "Nivel de infraestructura, secuencia de fabricación, acopio y almacenaje, nivel de producción, equipo técnico y mano de obra." },
  { n: "02", titulo: "Desarrollo de sistemas técnicos", texto: "Optimización del diseño, simplificación de ensambles en obra y diseño de transporte eficiente y seguro." },
  { n: "03", titulo: "Construcción fuera del sitio", texto: "Qué produce y en qué materialidad, grado de entrega y qué incorpora: instalaciones y terminaciones." },
  { n: "04", titulo: "Relaciones de largo plazo", texto: "Alianzas estables con proveedores, constructoras y entidades patrocinantes." },
  { n: "05", titulo: "Proceso constructivo", texto: "Participación integral en diseño, fabricación, transporte, montaje y construcción, uso de normativa y método de control de calidad." },
  { n: "06", titulo: "Experiencia", texto: "Proyectos anteriores, para el Minvu o para mandantes externos." },
  { n: "07", titulo: "Uso de software", texto: "Diseño, producción y gestión integrados." },
  { n: "08", titulo: "Rendimientos", texto: "Cuánto es capaz de producir, con manuales o instrucciones de construcción y recepciones." },
];

export const SISTEMAS = [
  "Paneles SIP",
  "Marco plataforma en madera",
  "Paneles de acero galvanizado",
  "Paneles de muros y losas de hormigón armado",
  "Volumétrico en fábrica",
  "Estructura de acero",
  "Sistemas mixtos",
];

// --- Catálogo de las 24 fichas publicadas. slug = clave de imagen en Sanity
//     (fichaVit). En esta corrida solo silueta. Orden y rótulos de la maqueta.
export const CATALOGO: {
  slug: string; tipo: string; empresa: string; programa: string; silueta: SiluetaKey; url: string;
}[] = [
  { slug: "patagual-base", tipo: "Tipo Base", empresa: "Patagual", programa: "DS49", silueta: "casa2", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/1-Vivienda-tipo-industrailizada-PATAGUAL2023-2025.pdf" },
  { slug: "tamarugo", tipo: "Tipo Rural Tamarugo", empresa: "E2E", programa: "DS10", silueta: "rural", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/2-Ficha-Vivienda-Rural-Tamarugo-2025.pdf" },
  { slug: "e2e-base", tipo: "Tipo Base", empresa: "E2E", programa: "DS49", silueta: "casa2", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/3-Vivienda-tipo-industrailizada-E2E-2025.pdf" },
  { slug: "e2e-fn", tipo: "Tipo Familia Numerosa", empresa: "E2E", programa: "DS49", silueta: "casa2", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/4-FICHA-E2E-DITEC-FN-Vivienda-tipo-industrailizada-E2E-FN-2025.pdf" },
  { slug: "pareada-86", tipo: "Tipo Base y Ampliada Pareada 86", empresa: "E2E", programa: "DS49", silueta: "pareada", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/5-2da-Ficha-Vivienda-Pareada86-2025.pdf" },
  { slug: "nandu-pv-rural", tipo: "Tipo Rural Ñandú PV", empresa: "Tecnotruss", programa: "DS10", silueta: "rural", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/6-Ficha-Vivienda-Rural-Nandu-2025.pdf" },
  { slug: "nandu-rd-rural", tipo: "Tipo Rural Ñandú RD", empresa: "Tecnotruss", programa: "DS10", silueta: "rural", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/7-Ficha-Vivienda-Rural-Nandu-RD-2025.pdf" },
  { slug: "nandu-pv-ds49", tipo: "Tipo Ñandú PV", empresa: "Tecnotruss", programa: "DS49", silueta: "casa1", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/9-PV-Ficha-Vivienda-Rural-Nandu-DS49-2025.pdf" },
  { slug: "nandu-rd-ds49", tipo: "Tipo Ñandú RD", empresa: "Tecnotruss", programa: "DS49", silueta: "casa1", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/8-RD-Ficha-Vivienda-Rural-Nandu-DS49-2025.pdf" },
  { slug: "tecnopanel-urbana", tipo: "Tipo Base Urbana", empresa: "Tecnopanel", programa: "DS49", silueta: "casa2", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/10-Ficha-Vivienda-TECNOPANEL-URBANA-2025.pdf" },
  { slug: "santa-magdalena-rural", tipo: "Tipo Rural", empresa: "Santa Magdalena", programa: "DS10", silueta: "rural", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/11-Ficha-SANTA-MAGDALENA-RURAL-2025.pdf" },
  { slug: "santa-magdalena-base", tipo: "Tipo Base y Ampliada", empresa: "Santa Magdalena", programa: "DS49", silueta: "casa2", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/12-Ficha-SANTA-MAGDALENA-2025.pdf" },
  { slug: "baumax-depto-base", tipo: "Tipo Departamento Base", empresa: "Baumax", programa: "DS49", silueta: "depto", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/13-VI-Ficha-BAUMAX-2025.pdf" },
  { slug: "baumax-condominio-3p", tipo: "Tipo Pequeño Condominio 3 pisos", empresa: "Baumax", programa: "DS49", silueta: "depto", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/14-Ficha-Baumax-departamento-pequeno-condominio-2025.pdf" },
  { slug: "baumax-edificio-5p", tipo: "Tipo Edificio 5 pisos", empresa: "Baumax", programa: "DS49", silueta: "edificio5", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/15-Ficha-Baumax-departamento-5-pisos-alta-2025.pdf" },
  { slug: "huechuraba-i", tipo: "Tipo Huechuraba I", empresa: "Municipalidad de Huechuraba", programa: "DS49", silueta: "casa2", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/16-Ficha-Vivienda-VIT-HUECHURABA-I-2025.pdf" },
  { slug: "tecnofast-t01", tipo: "Tipo Base y Ampliada T01", empresa: "Tecno Fast", programa: "DS49", silueta: "casa2", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/17-Ficha-Vivienda-TECNOFASTA-T01-2025.pdf" },
  { slug: "tecnofast-t03", tipo: "Tipo Base T03", empresa: "Tecno Fast", programa: "DS49", silueta: "casa2", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/18-Ficha-Vivienda-TECNOFASTA-2025.pdf" },
  { slug: "urbana-pareada", tipo: "Tipo Urbana Pareada Base y Ampliada", empresa: "Tecnotruss", programa: "DS49", silueta: "pareada", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/19-Ficha-Vivienda-VIT-URABA-PAREADA-2025.pdf" },
  { slug: "limari-aislada", tipo: "Tipo Unifamiliar Aislada", empresa: "Prefabricadas Premium", programa: "DS49", silueta: "casa1", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/20-Ficha-Vivienda-VIT-LIMARI-2025.pdf" },
  { slug: "limari-adosada", tipo: "Tipo Familiar Adosada", empresa: "Prefabricadas Premium", programa: "DS49", silueta: "pareada", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/21-Ficha-Vivienda-VIT-LIMARI-ADOSADA-2025.pdf" },
  { slug: "promet-base", tipo: "DS49 Promet", empresa: "Promet Servicio", programa: "DS49", silueta: "casa2", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/22-Ficha-Vivienda-PROMET-2025.pdf" },
  { slug: "promet-1piso", tipo: "DS49 Promet 1 piso", empresa: "Promet Servicio", programa: "DS49", silueta: "casa1", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/23-Ficha-Vivienda-PROMET-1-PISO-2025.pdf" },
  { slug: "canada-house", tipo: "Tipo Canada House", empresa: "Canada House", programa: "DS49", silueta: "casa2", url: "https://www.minvu.gob.cl/wp-content/uploads/2025/10/24-Ficha-Vivienda-CANADA-HOUSE-2025.pdf" },
];

// --- Casos con ficha publicada (Ditec «Diagnóstico desde lo avanzado»).
export const CASOS: {
  cat: string; titulo: string; ubi: string;
  datos: { rot: string; valor: string }[]; pie: string;
}[] = [
  { cat: "Mayor distancia desde la fábrica", titulo: "Conjunto Habitacional Fuerte Bulnes", ubi: "Arica · región de Arica y Parinacota",
    datos: [{ rot: "Programa", valor: "DS49 · VIT" }, { rot: "Industrializadora", valor: "Tecno Fast" }, { rot: "Constructora", valor: "Noval" }, { rot: "Cabida", valor: "15 viviendas" }],
    pie: "23.08.2024 → 02.09.2025 · <b>12 meses</b> · entidad patrocinante Inmobiliaria Salfa Austral" },
  { cat: "Mayor velocidad de ejecución", titulo: "Villa Los Jardines", ubi: "Quinta de Tilcoco · región de O'Higgins",
    datos: [{ rot: "Programa", valor: "DS49 · VIR" }, { rot: "Industrializadora", valor: "Canada House" }, { rot: "Constructora", valor: "JOMAR" }, { rot: "Cabida", valor: "150 viviendas" }],
    pie: "25.11.2024 → 21.10.2025 · <b>11 meses</b> · entidad patrocinante Grupo 841" },
  { cat: "Primer proyecto en altura con estructura de madera", titulo: "Lo Espejo", ubi: "Lo Espejo · región Metropolitana",
    datos: [{ rot: "Programa", valor: "DS49 · VIR" }, { rot: "Industrializadora", valor: "Tecno Fast" }, { rot: "Constructora", valor: "Vive Social" }, { rot: "Cabida", valor: "60 departamentos · 4 pisos" }],
    pie: "20.11.2023 → 07.02.2025 · <b>15 meses</b> · entidad patrocinante Unión" },
  { cat: "En altura, hormigón armado", titulo: "Condominio El Sol II y III", ubi: "Rancagua · región de O'Higgins",
    datos: [{ rot: "Programa", valor: "DS49 · VIR" }, { rot: "Industrializadora", valor: "Baumax" }, { rot: "Constructora", valor: "Araneda" }, { rot: "Cabida", valor: "120 viviendas · 5 pisos" }],
    pie: "02.12.2024 → 28.04.2026 · <b>17 meses</b> · entidad patrocinante Grupo 841" },
  { cat: "Lugar de difícil acceso", titulo: "Villa Las Estrellas Punta Lavapié", ubi: "Arauco · región del Biobío",
    datos: [{ rot: "Programa", valor: "Reconstrucción incendios" }, { rot: "Industrializadora", valor: "Patagual Home" }, { rot: "Tipología", valor: "8 VIR · 3 VIT" }, { rot: "Cabida", valor: "11 viviendas en sitio propio" }],
    pie: "27.05.2024 → 08.07.2025 · <b>14 meses</b> · contratos iniciados en distintos períodos" },
];

// --- Cinta de zonas térmicas A–I (colores de la Ordenanza General).
export const CINTA_TERMICA: { z: string; color: string }[] = [
  { z: "A", color: "#F2C81F" }, { z: "B", color: "#C8322B" }, { z: "C", color: "#E08A2E" },
  { z: "D", color: "#8A6A3C" }, { z: "E", color: "#A9C86B" }, { z: "F", color: "#93CBE8" },
  { z: "G", color: "#3FA894" }, { z: "H", color: "#7FA5C9" }, { z: "I", color: "#173A63" },
];

// --- Materialidad: colores del anillo por categoría (mapa slug del registro).
export const MATERIALIDAD_SEG: { slug: string; label: string; color: string }[] = [
  { slug: "materialidad-madera", label: "madera", color: "#E04E00" },
  { slug: "materialidad-panel-sip", label: "panel SIP", color: "#F6BA8C" },
  { slug: "materialidad-acero", label: "acero", color: "#005CAD" },
  { slug: "materialidad-hormigon", label: "hormigón", color: "#5C5C5C" },
  { slug: "materialidad-mixto", label: "mixto", color: "#009DE6" },
];

// --- Listas cualitativas (se publica el orden, no números). Ditec / levantamiento.
export const FRENOS_INDUSTRIA = [
  "Pagos y anticipos", "Garantías", "Validación técnica y VIT", "Tributario e IVA",
  "Demanda y continuidad de cartera", "Procesos y aprobaciones", "Orden de proceder",
  "Itemizado y estandarización", "Coordinación con Serviu y capacitación",
  "Trazabilidad y visibilidad", "Acceso al sistema DS49", "Estacionalidad y calendarización",
];
export const AGENDA_DITEC = [
  "Recepción Serviu, en especial de equipos evaluadores e inspectores",
  "Gestión con otros organismos públicos", "Oportunidad de los pagos", "Boletas de garantía",
  "Condiciones contractuales", "Certificación técnica de proyectos",
  "Plazos contractuales y parciales programados", "Relación entre demanda y capacidad productiva",
  "Relación entre emisión de llamados y capacidad productiva",
  "Coordinación entre industrializadora y constructora",
];
export const CONDICIONES_ESCALA: { titulo: string; texto: string; ancho?: boolean }[] = [
  { titulo: "Planificación y señales de cartera", texto: "Que la industria pueda anticipar qué se va a construir y cuándo." },
  { titulo: "Procesos predecibles", texto: "Plazos y criterios estables entre instituciones." },
  { titulo: "Financiamiento alineado", texto: "Que el flujo de pagos acompañe el ciclo real de fabricación y montaje." },
  { titulo: "Criterios homogéneos", texto: "Que la exigencia no cambie según quién revisa." },
  { titulo: "Trazabilidad y aprendizaje", texto: "Información para controlar, fiscalizar y mejorar. Un sistema fragmentado con producción industrial repite los mismos errores, solo que más rápido.", ancho: true },
];

// --- Historia 1930–2025 (Minvu N°398, cap. evolución).
export const HISTORIA: { periodo: string; titulo: string; texto: string; act?: boolean }[] = [
  { periodo: "1930 — 1973", titulo: "Protoindustrialización Corvi", texto: "Casas experimentales, Estrella de Chile, Operación Pequeños Propietarios, los Concursos Oferta y un registro de productores de viviendas industrializadas en 1967. La industrialización se concibe como política pública, no como una técnica." },
  { periodo: "1971 — 1979", titulo: "La planta KPD", texto: "Paneles pesados de hormigón en Quilpué, gran formato y diseño seriado. El hito industrial más emblemático del país." },
  { periodo: "1980 — 1989", titulo: "Retiro del rol productivo del Estado", texto: "La vivienda social se orienta a cobertura y bajo costo. Los sistemas industrializados pesados pierden prioridad y la KPD se abandona." },
  { periodo: "1990 — 2000", titulo: "Reapertura técnica", texto: "La academia retoma la investigación en sistemas de paneles livianos y nuevos materiales. Se fortalece la base técnica sin política nacional." },
  { periodo: "2000 — 2009", titulo: "Sistemas no tradicionales", texto: "Llegan SIP, LSF y hormigón liviano. El Minvu actualiza sus normas de evaluación técnica e integra oficialmente los sistemas no tradicionales." },
  { periodo: "2010 — 2014", titulo: "Reconstrucción tras el 27-F", texto: "El terremoto deja instalada la urgencia de construir rápido y con control de calidad." },
  { periodo: "2015 — 2019", titulo: "Institucionalización", texto: "Corfo impulsa Construye2025 y nace el Consejo de Construcción Industrializada, que articula academia, industria y Estado. Por primera vez hay un ecosistema organizado." },
  { periodo: "2020 — 2023", titulo: "Las primeras VIT", texto: "La pandemia acelera la adopción y el déficit obliga a incorporar la industrialización de forma explícita en el plan habitacional. Aparecen las primeras viviendas industrializadas tipo." },
  { periodo: "2024 — 2026", titulo: "Marco regulatorio completo", texto: "Registro de empresas, procedimiento VIT, estándar higrotérmico y una red de plantas en tres macrozonas. La discusión se traslada de si se puede a cómo escala.", act: true },
];

// --- Documentos fuente (sección de cierre). id = fuente del registro.
export const DOCS: { titulo: string; meta: string; fuenteId: string }[] = [
  { titulo: "Vivienda industrializada: nuevas tecnologías para diversificar la vivienda de interés público en Chile", meta: "Minvu · publicación N°398 · diciembre 2025 · 116 págs.", fuenteId: "minvu-398" },
  { titulo: "Industrialización habitacional: construyendo la capacidad que Chile necesita", meta: "Ditec · seminario 29 may 2026", fuenteId: "ditec-calderon" },
  { titulo: "Res. Ex. N°52: estándares para la evaluación de empresas industrializadoras", meta: "Ditec · seminario 29 may 2026", fuenteId: "ditec-jara" },
  { titulo: "Industrialización en vivienda: marco normativo y aprobación", meta: "Ditec · seminario 29 may 2026", fuenteId: "ditec-matta" },
  { titulo: "Circular N°023: implementación del proceso de viviendas industrializadas tipo", meta: "Subsecretaría de Vivienda y Urbanismo · 16 mayo 2025 · 9 págs. + 4 anexos", fuenteId: "circular-023" },
  { titulo: "Oportunidades de mejora para escalar la industrialización", meta: "Levantamiento industrializadoras Res. Ex. N°52 · seminario 29 may 2026 · dato declarado", fuenteId: "res52-levantamiento" },
];

// --- Checklist Serviu (Circular N°023): los 8 puntos a corroborar.
export const CHECK_SERVIU: { titulo: string; texto: string }[] = [
  { titulo: "Itemizados técnicos y cuadros normativos", texto: "Los formalizados por resolución regional, según el DS49 y el DS10." },
  { titulo: "Zona térmica", texto: "Basta corroborar que la zona donde se emplazará la vivienda esté identificada en el oficio de aprobación. No se debe revisar ningún antecedente adicional." },
  { titulo: "Levantamiento topográfico", texto: "Cuando sea exigible." },
  { titulo: "Estudio de suelos", texto: "El respectivo del terreno." },
  { titulo: "Fundaciones", texto: "Que el diseño tipo sea adecuado al terreno definitivo. Pueden ajustarse al suelo real, y ese cambio solo requiere aprobación del Serviu." },
  { titulo: "Sanitario, eléctrico y gas", texto: "Los proyectos del VIT son informativos. La revisión se enfoca en los certificados de factibilidad y las conexiones: la instalación interior ya viene aprobada con la VIT." },
  { titulo: "Seremi de Salud", texto: "Cuando el proyecto contemple evacuación de basuras o soluciones sanitarias particulares." },
  { titulo: "Presupuesto", texto: "Que el kit de venta sea igual o menor al presupuesto de la VIT aprobada por la Ditec. Solo puede variar el transporte." },
];
