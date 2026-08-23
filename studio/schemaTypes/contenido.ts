import { defineField, defineType } from "sanity";

/** ESTUDIO — evidencia publicada. */
export const estudio = defineType({
  name: "estudio",
  title: "Estudio (Evidencia)",
  type: "document",
  fields: [
    defineField({ name: "titulo", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Dirección web", type: "slug", options: { source: "titulo" } }),
    defineField({ name: "organizacion", title: "Institución", type: "string", validation: (r) => r.required() }),
    defineField({ name: "anio", title: "Año", type: "number", validation: (r) => r.required() }),
    defineField({ name: "ambito", title: "Ámbito", type: "string", options: { list: ["Chile", "Internacional"] }, validation: (r) => r.required() }),
    defineField({ name: "tema", title: "Tema", description: "Ej: Productividad y costo, Residuos", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "hallazgo", title: "Hallazgo principal",
      description: "Redáctalo con tus palabras, no copies párrafos del original.",
      type: "text", rows: 3, validation: (r) => r.required(),
    }),
    defineField({
      name: "tipoFuente", title: "Tipo de fuente", type: "string",
      options: { list: ["oficial", "cci", "empresa", "academica", "internacional", "estimacion"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "url", title: "Enlace al estudio", type: "url", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "titulo", subtitle: "organizacion" } },
});

/** EMPRESA — ficha del Ecosistema. */
export const empresa = defineType({
  name: "empresa",
  title: "Empresa (Ecosistema)",
  type: "document",
  fields: [
    defineField({ name: "nombre", title: "Nombre", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Dirección web", type: "slug", options: { source: "nombre" } }),
    defineField({
      name: "categoria", title: "Categoría", type: "string",
      options: { list: [
        "Industrializadora", "Proveedor de materiales", "Ingeniería", "Arquitectura",
        "Tecnología", "Academia", "Institución pública / gremial",
      ]},
      validation: (r) => r.required(),
    }),
    defineField({ name: "descripcion", title: "Descripción", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "logo", title: "Logotipo",
      description: "Solo si la empresa autorizó su uso. Si no hay logo, se muestran las iniciales.",
      type: "image",
    }),
    defineField({ name: "iniciales", title: "Iniciales", description: "Dos letras. Se usan si no hay logotipo.", type: "string", validation: (r) => r.max(3) }),
    defineField({ name: "color", title: "Color de la marca tipográfica", description: "Ej: #E04E00", type: "string" }),
    defineField({ name: "sitioWeb", title: "Sitio web", type: "url" }),
  ],
  preview: { select: { title: "nombre", subtitle: "categoria", media: "logo" } },
});

/** EVENTO — agenda. */
export const evento = defineType({
  name: "evento",
  title: "Evento",
  type: "document",
  fields: [
    defineField({ name: "titulo", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({ name: "fecha", title: "Fecha", type: "date", validation: (r) => r.required() }),
    defineField({ name: "lugar", title: "Lugar", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "modalidad", title: "Modalidad", type: "string",
      options: { list: ["Presencial", "Online", "Híbrido"], layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "descripcion", title: "Descripción", type: "text", rows: 2 }),
    defineField({ name: "inscripcionUrl", title: "Enlace de inscripción", type: "url" }),
  ],
  orderings: [{ title: "Próximos primero", name: "fechaAsc", by: [{ field: "fecha", direction: "asc" }] }],
  preview: { select: { title: "titulo", subtitle: "fecha" } },
});

// Catálogos de la Biblioteca editorial (Fase 2 · paso 4).
export const CATEGORIAS_RECURSO = [
  { title: "Guías", value: "guias" },
  { title: "Estudios", value: "estudios" },
  { title: "Normativa", value: "normativa" },
  { title: "Fichas", value: "fichas" },
  { title: "Herramientas", value: "herramientas" },
  { title: "Plantillas", value: "plantillas" },
  { title: "Casos", value: "casos" },
  { title: "Reportes", value: "reportes" },
  { title: "Publicaciones internacionales", value: "publicaciones_internacionales" },
];
export const TEMAS_RECURSO = [
  "productividad", "integracion_temprana", "bim", "dfma", "vivienda", "sostenibilidad",
  "certificacion", "industrializacion", "normativa", "fabricacion", "logistica", "montaje", "latam",
];
export const ESTADOS_RECURSO = [
  { title: "Disponible", value: "disponible" },
  { title: "Actualizado", value: "actualizado" },
  { title: "En revisión", value: "en_revision" },
  { title: "En preparación", value: "en_preparacion" },
  { title: "Próximamente", value: "proximamente" },
  { title: "Archivado", value: "archivado" },
];

/** RECURSO — pieza de la Biblioteca editorial (artículo + descarga). */
export const recurso = defineType({
  name: "recurso",
  title: "Recurso (Biblioteca)",
  type: "document",
  fields: [
    defineField({ name: "titulo", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug", title: "Dirección web", type: "slug",
      options: { source: "titulo", maxLength: 96 },
    }),
    defineField({
      name: "categoria", title: "Categoría", type: "string",
      options: { list: CATEGORIAS_RECURSO, layout: "dropdown" },
    }),
    defineField({ name: "temas", title: "Temas", type: "array", of: [{ type: "string" }], options: { list: TEMAS_RECURSO } }),
    defineField({ name: "bajada", title: "Bajada", type: "text", rows: 2 }),
    // `descripcion` se conserva por compatibilidad con la portada; `bajada` es el nuevo texto corto.
    defineField({ name: "descripcion", title: "Descripción (compat.)", type: "text", rows: 2 }),
    defineField({ name: "portada", title: "Imagen de portada", type: "image", options: { hotspot: true } }),
    defineField({ name: "autores", title: "Autores", type: "string" }),
    defineField({ name: "institucion", title: "Institución", type: "string" }),
    defineField({ name: "fechaPublicacion", title: "Fecha de publicación", type: "date" }),
    defineField({ name: "version", title: "Versión", type: "string" }),
    defineField({ name: "paginas", title: "Páginas", type: "number" }),
    defineField({ name: "formato", title: "Formato", type: "string", description: "Ej: PDF, XLSX" }),
    defineField({
      name: "estadoRecurso", title: "Estado", type: "string",
      options: { list: ESTADOS_RECURSO, layout: "dropdown" }, initialValue: "en_preparacion",
    }),
    defineField({ name: "requiereFormulario", title: "Requiere formulario para descargar", type: "boolean", initialValue: false }),
    defineField({
      name: "archivo", title: "Archivo",
      description: "PDF o planilla. Si no hay archivo ni enlace, no se muestra botón de descarga.",
      type: "file",
    }),
    defineField({ name: "enlaceExterno", title: "Enlace externo", type: "url", description: "Alternativa al archivo (norma pública, documento de terceros)." }),
    defineField({ name: "intro", title: "Introducción", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "hallazgos", title: "Hallazgos", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "cuerpo", title: "Cuerpo", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "recursosRelacionados", title: "Recursos relacionados (slugs)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "terminosGlosario", title: "Términos del glosario (slugs)", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "indicadoresDestacados", title: "Cifras del registro (slugs de indicadores)",
      description: "Slugs de src/lib/datos/indicadores.ts; se muestran con su línea Fuente. No escribir cifras a mano.",
      type: "array", of: [{ type: "string" }],
    }),
    // `tipo` y `fecha` se conservan por compatibilidad con la portada.
    defineField({ name: "tipo", title: "Tipo (compat.)", type: "string", options: { list: ["Guía técnica", "Estudio", "Normativa", "Ficha"] } }),
    defineField({ name: "fecha", title: "Fecha (compat.)", type: "date" }),
    defineField({ name: "fechaActualizacion", title: "Última actualización", type: "date" }),
  ],
  preview: { select: { title: "titulo", subtitle: "categoria", media: "portada" } },
});
