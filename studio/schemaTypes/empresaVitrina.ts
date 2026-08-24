import { defineField, defineType } from "sanity";

/**
 * EMPRESA EN VITRINA — directorio comercial del ecosistema industrializado.
 *
 * Los socios se muestran según su nivel de membresía (oro / plata / bronce /
 * profesional / academia). Las empresas NO socias pueden publicar de forma
 * pagada (nivel "pagada"), siempre identificada como tal y con una vigencia.
 *
 * Sigue el patrón dual de imagen de las noticias: se puede subir un logo a
 * Sanity (logo) o pegar una URL externa (logoUrl); la imagen subida tiene
 * prioridad.
 */

export const NIVELES_VITRINA = [
  { title: "Oro (socio)", value: "oro" },
  { title: "Plata (socio)", value: "plata" },
  { title: "Bronce (socio)", value: "bronce" },
  { title: "Profesional (socio)", value: "profesional" },
  { title: "Academia (socio)", value: "academia" },
  { title: "Publicación pagada (empresa no socia)", value: "pagada" },
];

export const CATEGORIAS_VITRINA = [
  "hormigón prefabricado",
  "madera/CLT",
  "acero liviano",
  "módulos 3D",
  "envolvente",
  "instalaciones",
  "ingeniería y diseño",
  "servicios",
];

export const ZONAS_VITRINA = ["Norte", "Centro", "Sur", "Austral", "Todo Chile", "Internacional"];

// ============================================================================
// TAXONOMÍA MULTIATRIBUTO (Fase 2 · paso 2)
// ⚠️ FUENTE ÚNICA: src/lib/datos/taxonomia-vitrina.ts (en el repo del sitio).
// Estas listas son una COPIA MANUAL de ese archivo (el Studio es un paquete
// aparte y no puede importarlo). Si cambias una lista allá, replícala aquí.
// ============================================================================
const TIPOS_ACTOR = [
  { title: "Industrializador", value: "industrializador" },
  { title: "Constructora", value: "constructora" },
  { title: "Inmobiliaria / Mandante", value: "inmobiliaria_mandante" },
  { title: "Proveedor de materiales", value: "proveedor_materiales" },
  { title: "Proveedor de componentes", value: "proveedor_componentes" },
  { title: "Ingeniería", value: "ingenieria" },
  { title: "Arquitectura", value: "arquitectura" },
  { title: "Tecnología / Software", value: "tecnologia_software" },
  { title: "Logística y transporte", value: "logistica_transporte" },
  { title: "Montaje", value: "montaje" },
  { title: "Academia", value: "academia" },
  { title: "Centro tecnológico", value: "centro_tecnologico" },
  { title: "Institución pública", value: "institucion_publica" },
  { title: "Asociación / Gremio", value: "asociacion_gremio" },
  { title: "Consultoría", value: "consultoria" },
];

const SOLUCIONES = [
  { title: "Panelizado 2D", value: "panelizado_2d" },
  { title: "Módulos 3D", value: "modulos_3d" },
  { title: "Prefabricados estructurales", value: "prefabricados_estructurales" },
  { title: "Estructuras industrializadas", value: "estructuras_industrializadas" },
  { title: "Fachadas y envolventes", value: "fachadas_envolventes" },
  { title: "Cubiertas", value: "cubiertas" },
  { title: "Instalaciones prefabricadas", value: "instalaciones_prefabricadas" },
  { title: "Baños / Pods", value: "banos_pods" },
  { title: "Componentes y subensambles", value: "componentes_subensambles" },
  { title: "Soluciones híbridas", value: "soluciones_hibridas" },
  { title: "Automatización y maquinaria", value: "automatizacion_maquinaria" },
  { title: "Software y datos", value: "software_datos" },
  { title: "Diseño y coordinación", value: "diseno_coordinacion" },
  { title: "Transporte y montaje", value: "transporte_montaje" },
  { title: "Llave en mano", value: "llave_en_mano" },
];

const MATERIALES = [
  { title: "Madera", value: "madera" },
  { title: "Acero", value: "acero" },
  { title: "Hormigón", value: "hormigon" },
  { title: "Fibrocemento", value: "fibrocemento" },
  { title: "Yeso", value: "yeso" },
  { title: "Compuestos", value: "compuestos" },
  { title: "Híbrido", value: "hibrido" },
  { title: "Independiente del material", value: "independiente_del_material" },
  { title: "Otros", value: "otros" },
];

const CAPACIDADES = [
  { title: "Evaluación", value: "evaluacion" },
  { title: "Diseño", value: "diseno" },
  { title: "Ingeniería", value: "ingenieria" },
  { title: "BIM", value: "bim" },
  { title: "DfMA", value: "dfma" },
  { title: "Fabricación", value: "fabricacion" },
  { title: "Abastecimiento", value: "abastecimiento" },
  { title: "Transporte", value: "transporte" },
  { title: "Montaje", value: "montaje" },
  { title: "Terminaciones", value: "terminaciones" },
  { title: "Puesta en marcha", value: "puesta_en_marcha" },
  { title: "Operación y mantenimiento", value: "operacion_mantenimiento" },
  { title: "Certificación y ensayos", value: "certificacion_ensayos" },
  { title: "Medición y datos", value: "medicion_datos" },
];

const REGIONES = [
  { title: "Arica y Parinacota", value: "arica_parinacota" },
  { title: "Tarapacá", value: "tarapaca" },
  { title: "Antofagasta", value: "antofagasta" },
  { title: "Atacama", value: "atacama" },
  { title: "Coquimbo", value: "coquimbo" },
  { title: "Valparaíso", value: "valparaiso" },
  { title: "Metropolitana", value: "metropolitana" },
  { title: "O'Higgins", value: "ohiggins" },
  { title: "Maule", value: "maule" },
  { title: "Ñuble", value: "nuble" },
  { title: "Biobío", value: "biobio" },
  { title: "La Araucanía", value: "araucania" },
  { title: "Los Ríos", value: "los_rios" },
  { title: "Los Lagos", value: "los_lagos" },
  { title: "Aysén", value: "aysen" },
  { title: "Magallanes", value: "magallanes" },
  { title: "Macrozona Norte", value: "norte" },
  { title: "Macrozona Centro", value: "centro" },
  { title: "Macrozona Sur", value: "sur" },
  { title: "Macrozona Austral", value: "austral" },
  { title: "Todo Chile", value: "todo_chile" },
  { title: "Latinoamérica", value: "latam" },
  { title: "Internacional", value: "internacional" },
];

const TIPOS_COBERTURA = [
  { title: "Regional", value: "regional" },
  { title: "Macrozona", value: "macrozona" },
  { title: "Nacional", value: "nacional" },
  { title: "Latinoamérica", value: "latam" },
  { title: "Internacional", value: "internacional" },
];

const RELACIONES_CCI = [
  { title: "Socio Oro", value: "socio_oro" },
  { title: "Socio Plata", value: "socio_plata" },
  { title: "Socio Bronce", value: "socio_bronce" },
  { title: "Academia", value: "academia" },
  { title: "Profesional", value: "profesional" },
  { title: "Patrocinador", value: "patrocinador" },
  { title: "Aliado", value: "aliado" },
  { title: "No socio (publicado)", value: "no_socio_publicado" },
  { title: "Industrializador MINVU", value: "industrializador_minvu" },
];

const ESTADOS_VALIDACION = [
  { title: "Validado por la organización", value: "validado_por_organizacion" },
  { title: "Fuente oficial", value: "fuente_oficial" },
  { title: "Revisado por el CCI", value: "revisado_por_cci" },
  { title: "En actualización", value: "en_actualizacion" },
  { title: "Pendiente", value: "pendiente" },
];

export const empresaVitrina = defineType({
  name: "empresaVitrina",
  title: "Empresa en Vitrina",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre de la empresa",
      type: "string",
      validation: (r) => r.required().max(160),
    }),
    defineField({
      name: "slug",
      title: "Dirección web",
      description: "Se genera sola desde el nombre. Define la URL de la ficha.",
      type: "slug",
      options: { source: "nombre", maxLength: 90 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "nivel",
      title: "Nivel",
      description:
        "Determina el orden y qué se muestra. Oro/Plata/Bronce/Profesional/Academia son socios; «Pagada» es una empresa no socia y se rotula de forma visible.",
      type: "string",
      options: { list: NIVELES_VITRINA, layout: "dropdown" },
      initialValue: "bronce",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "titular",
      title: "Titular",
      description: "Una línea: qué hace la empresa. Ej: «Paneles de hormigón prefabricado para vivienda».",
      type: "string",
      validation: (r) => r.max(120),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      description: "Un párrafo que describe la empresa y su oferta.",
      type: "text",
      rows: 5,
      validation: (r) => r.max(700),
    }),
    defineField({
      name: "categorias",
      title: "Categorías de solución",
      type: "array",
      of: [{ type: "string" }],
      options: { list: CATEGORIAS_VITRINA },
    }),
    defineField({
      name: "zonas",
      title: "Zonas donde opera",
      type: "array",
      of: [{ type: "string" }],
      options: { list: ZONAS_VITRINA },
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
    }),
    defineField({
      name: "logoUrl",
      title: "Logo (URL externa)",
      description:
        "Alternativa a subir un logo: URL de una imagen. Si subes una imagen en «Logo», esa tiene prioridad sobre esta URL.",
      type: "url",
    }),
    defineField({
      name: "galeria",
      title: "Galería",
      description: "Imágenes de proyectos o productos. Opcional.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Texto alternativo", type: "string" }] }],
    }),
    defineField({ name: "sitioWeb", title: "Sitio web", type: "url" }),
    defineField({ name: "emailContacto", title: "Email de contacto", type: "string" }),
    defineField({ name: "telefono", title: "Teléfono", type: "string" }),
    defineField({
      name: "anioDesde",
      title: "Opera desde (año)",
      type: "number",
      validation: (r) => r.min(1900).max(2100),
    }),
    defineField({
      name: "proyectosDestacados",
      title: "Proyectos destacados",
      description: "Opcional. Se muestran en la ficha (no en niveles «bronce»).",
      type: "array",
      of: [
        {
          type: "object",
          name: "proyecto",
          title: "Proyecto",
          fields: [
            { name: "titulo", title: "Título", type: "string", validation: (r) => r.required() },
            { name: "descripcion", title: "Descripción", type: "text", rows: 3 },
            { name: "imagen", title: "Imagen", type: "image", options: { hotspot: true } },
          ],
          preview: { select: { title: "titulo", subtitle: "descripcion", media: "imagen" } },
        },
      ],
    }),
    defineField({
      name: "vigenteHasta",
      title: "Vigente hasta",
      description: "Solo relevante para el nivel «Pagada»: al pasar esta fecha, la ficha deja de mostrarse.",
      type: "date",
    }),

    // ---- Taxonomía multiatributo (Fase 2 · paso 2) ----
    // NOTA: los campos de contacto de la taxonomía (website / publicEmail /
    // phone) se resuelven con los campos existentes sitioWeb / emailContacto /
    // telefono; no se duplican para no tener dos fuentes de verdad.
    defineField({
      name: "actorTypes",
      title: "Tipo de actor (D1)",
      description: "Multiatributo. No inventar: dejar vacío si no está verificado.",
      type: "array",
      of: [{ type: "string" }],
      options: { list: TIPOS_ACTOR },
    }),
    defineField({
      name: "solutions",
      title: "Soluciones (D2)",
      type: "array",
      of: [{ type: "string" }],
      options: { list: SOLUCIONES },
    }),
    defineField({
      name: "materials",
      title: "Materiales (D3)",
      type: "array",
      of: [{ type: "string" }],
      options: { list: MATERIALES },
    }),
    defineField({
      name: "capabilities",
      title: "Capacidades de la cadena de valor (D4)",
      type: "array",
      of: [{ type: "string" }],
      options: { list: CAPACIDADES },
    }),
    defineField({
      name: "regions",
      title: "Cobertura — regiones/macrozonas (D5)",
      type: "array",
      of: [{ type: "string" }],
      options: { list: REGIONES },
    }),
    defineField({
      name: "coverageType",
      title: "Tipo de cobertura (D5)",
      type: "string",
      options: { list: TIPOS_COBERTURA, layout: "dropdown" },
    }),
    defineField({
      name: "cciRelationship",
      title: "Relación con el CCI (D6)",
      description: "El nivel de membresía técnico vive aquí; el campo «Nivel» controla el orden/visualización.",
      type: "array",
      of: [{ type: "string" }],
      options: { list: RELACIONES_CCI },
    }),
    defineField({
      name: "minvuStatus",
      title: "Registro oficial DITEC / MINVU",
      description: "Se completa con el registro oficial en la validación humana. Dejar vacío si no aplica.",
      type: "object",
      fields: [
        { name: "approvedCompany", title: "Empresa aprobada (industrializador)", type: "boolean" },
        { name: "resolutions", title: "Resoluciones", type: "array", of: [{ type: "string" }] },
        { name: "plants", title: "Plantas", type: "array", of: [{ type: "string" }] },
        { name: "vitCount", title: "N.º de tipologías VIT", type: "number" },
      ],
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: "validationStatus",
      title: "Estado de validación (D7)",
      type: "string",
      options: { list: ESTADOS_VALIDACION, layout: "dropdown" },
      initialValue: "en_actualizacion",
    }),
    defineField({
      name: "fechaValidacion",
      title: "Fecha de validación por la organización",
      description:
        "Se completa al marcar «Validado por la organización». Con estado + fecha, la ficha muestra la insignia «Validado por la organización · [mes año]» (no es una certificación del CCI).",
      type: "date",
    }),
    defineField({
      name: "certificaciones",
      title: "Certificaciones",
      description: "Una por línea. Ej.: «ISO 9001», «CES». No inventar.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "direccionPlantas",
      title: "Dirección o plantas",
      description: "Direcciones o ubicaciones de plantas, una por entrada.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "lastVerifiedAt",
      title: "Última verificación",
      description: "Fecha y hora de la última validación humana del perfil.",
      type: "datetime",
    }),

    defineField({
      name: "activo",
      title: "Activo",
      description: "Desmárcalo para ocultar la empresa sin borrarla.",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    { title: "Nombre (A–Z)", name: "nombreAsc", by: [{ field: "nombre", direction: "asc" }] },
  ],
  preview: {
    select: { title: "nombre", subtitle: "nivel", media: "logo" },
  },
});
