import { defineField, defineType } from "sanity";

/**
 * VOZ — referente del sector para la sección "Voces de la industrialización".
 * Retrato + entrevista breve en formato pregunta/respuesta.
 *
 * Sigue el patrón dual de foto de las noticias: se puede subir una imagen a
 * Sanity (foto) o pegar una URL externa (fotoUrl); la imagen subida tiene
 * prioridad.
 */
export const voz = defineType({
  name: "voz",
  title: "Voz de la industrialización",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Dirección web",
      description: "Se genera sola desde el nombre. Define la URL de la ficha.",
      type: "slug",
      options: { source: "nombre", maxLength: 90 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "cargo", title: "Cargo", type: "string" }),
    defineField({ name: "organizacion", title: "Organización", type: "string" }),
    defineField({
      name: "foto",
      title: "Retrato",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
    }),
    defineField({
      name: "fotoUrl",
      title: "Retrato (URL externa)",
      description:
        "Alternativa a subir una imagen: URL de una foto. Si subes una imagen en «Retrato», esa tiene prioridad sobre esta URL.",
      type: "url",
    }),
    defineField({
      name: "fraseDestacada",
      title: "Frase destacada",
      description: "Cita corta para la tarjeta de la grilla. Opcional.",
      type: "string",
      validation: (r) => r.max(200),
    }),
    defineField({
      name: "entrevista",
      title: "Entrevista",
      description: "Preguntas y respuestas. Se muestran en la ficha de la persona.",
      type: "array",
      of: [
        {
          type: "object",
          name: "parQyR",
          title: "Pregunta y respuesta",
          fields: [
            { name: "pregunta", title: "Pregunta", type: "string", validation: (r) => r.required() },
            { name: "respuesta", title: "Respuesta", type: "text", rows: 4, validation: (r) => r.required() },
          ],
          preview: { select: { title: "pregunta", subtitle: "respuesta" } },
        },
      ],
    }),
    defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
    defineField({
      name: "orden",
      title: "Orden en la grilla",
      description: "Número para ordenar. Menor aparece primero. Opcional.",
      type: "number",
    }),
  ],
  orderings: [
    { title: "Orden manual", name: "ordenAsc", by: [{ field: "orden", direction: "asc" }] },
    { title: "Nombre (A–Z)", name: "nombreAsc", by: [{ field: "nombre", direction: "asc" }] },
  ],
  preview: { select: { title: "nombre", subtitle: "cargo", media: "foto" } },
});
