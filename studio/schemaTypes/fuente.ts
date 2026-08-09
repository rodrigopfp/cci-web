import { defineField, defineType } from "sanity";

/**
 * FUENTE — de dónde proviene un dato.
 * Es el corazón de la credibilidad del sitio: toda cifra publicada apunta a una.
 */
export const fuente = defineType({
  name: "fuente",
  title: "Fuente",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título del documento",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "organizacion",
      title: "Organización",
      description: "Quién publica. Ej: MINVU · DITEC, McKinsey & Company",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "anio",
      title: "Año de publicación",
      type: "number",
      validation: (r) => r.required().min(1990).max(2100),
    }),
    defineField({
      name: "url",
      title: "Enlace al documento original",
      type: "url",
      description: "Debe abrir y mostrar el dato que se cita.",
    }),
    defineField({
      name: "tipoFuente",
      title: "Tipo de fuente",
      type: "string",
      options: {
        list: [
          { title: "Oficial (MINVU, INE, organismos públicos)", value: "oficial" },
          { title: "CCI (levantada por el Consejo)", value: "cci" },
          { title: "Empresa (declarada por la empresa)", value: "empresa" },
          { title: "Académica (universidad, paper)", value: "academica" },
          { title: "Internacional", value: "internacional" },
          { title: "Estimación (cálculo con metodología explícita)", value: "estimacion" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "titulo", subtitle: "organizacion" },
  },
});
