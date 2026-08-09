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

/** RECURSO — documento descargable. */
export const recurso = defineType({
  name: "recurso",
  title: "Recurso descargable",
  type: "document",
  fields: [
    defineField({ name: "titulo", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({ name: "descripcion", title: "Descripción", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({
      name: "tipo", title: "Tipo", type: "string",
      options: { list: ["Guía técnica", "Estudio", "Normativa", "Ficha"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "archivo", title: "Archivo",
      description: "Sube aquí el PDF o planilla. Si no hay archivo, el recurso no debería publicarse.",
      type: "file",
    }),
    defineField({ name: "fecha", title: "Fecha de publicación", type: "date", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "titulo", subtitle: "tipo" } },
});
