import { defineField, defineType } from "sanity";

export const CATEGORIAS = [
  "País y políticas públicas",
  "Vivienda industrializada",
  "Innovación y productividad",
  "Casos de socios",
  "Normativa y certificación",
  "Sostenibilidad",
  "Opinión experta",
  "Eventos CCI",
  "Internacional",
  "Publirreportajes",
];

export const noticia = defineType({
  name: "noticia",
  title: "Noticia",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (r) => r.required().max(140),
    }),
    defineField({
      name: "slug",
      title: "Dirección web",
      description: "Se genera sola desde el título. Define la URL de la noticia.",
      type: "slug",
      options: { source: "titulo", maxLength: 90 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "bajada",
      title: "Bajada",
      description: "Dos o tres líneas que resumen la noticia.",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(300),
    }),
    defineField({
      name: "categoria",
      title: "Categoría",
      type: "string",
      options: { list: CATEGORIAS },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tipo",
      title: "Tipo de contenido",
      description:
        "PROTEGE LA CREDIBILIDAD DEL SITIO. Nunca marques como Editorial algo que una empresa envió o pagó: el sitio lo rotula de forma visible al lector.",
      type: "string",
      options: {
        list: [
          { title: "Editorial CCI (contenido propio)", value: "editorial" },
          { title: "Noticia de socio (aportada por una empresa)", value: "socio" },
          { title: "Contenido patrocinado / publirreportaje", value: "patrocinado" },
        ],
        layout: "radio",
      },
      initialValue: "editorial",
      validation: (r) => r.required(),
    }),
    defineField({ name: "fecha", title: "Fecha de publicación", type: "date", validation: (r) => r.required() }),
    defineField({ name: "autor", title: "Autor o fuente", type: "string", initialValue: "Redacción CCI" }),
    defineField({
      name: "foto",
      title: "Foto de portada",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
    }),
    defineField({
      name: "fotoUrl",
      title: "Foto de portada (URL externa)",
      description:
        "Alternativa a subir una imagen: URL de una foto con licencia libre. Si subes una imagen en «Foto de portada», esa tiene prioridad sobre esta URL.",
      type: "url",
    }),
    defineField({
      name: "etiquetaFoto",
      title: "Etiqueta sobre la foto",
      description: "Palabra corta que aparece sobre la imagen. Ej: Certificación, Territorio.",
      type: "string",
    }),
    defineField({
      name: "colorDesde",
      title: "Color del degradado (desde)",
      description:
        "Color hex del fondo que queda detrás de la foto y de respaldo si la imagen no carga. Ej: #E04E00",
      type: "string",
    }),
    defineField({
      name: "colorHasta",
      title: "Color del degradado (hasta)",
      description: "Segundo color hex del degradado. Ej: #005CAD",
      type: "string",
    }),
    defineField({
      name: "minutosLectura",
      title: "Minutos de lectura",
      type: "number",
      initialValue: 4,
      validation: (r) => r.min(1).max(60),
    }),
    defineField({
      name: "cuerpo",
      title: "Cuerpo del artículo",
      type: "array",
      of: [{ type: "block" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "fuenteUrl",
      title: "Enlace a la publicación original",
      type: "url",
      description: "Si la noticia se basa en una publicación de terceros, enlázala.",
    }),
    defineField({ name: "fuenteNombre", title: "Nombre de la fuente", type: "string" }),
  ],
  orderings: [
    { title: "Más recientes", name: "fechaDesc", by: [{ field: "fecha", direction: "desc" }] },
  ],
  preview: {
    select: { title: "titulo", subtitle: "fecha", media: "foto" },
  },
});
