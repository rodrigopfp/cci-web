import { defineField, defineType } from "sanity";

/**
 * EICI — configuración de la página del Encuentro Internacional de Construcción
 * Industrializada. Es un SINGLETON: existe un único documento (_id "eici-config")
 * que la página /eici lee en tiempo de build. Los cambios del panel llegan solos
 * por el puente automático (rebuild).
 */
export const eici = defineType({
  name: "eici",
  title: "Página EICI",
  type: "document",
  fields: [
    defineField({
      name: "tituloProximaEdicion",
      title: "Título de la próxima edición",
      description: "Ej: EICI 2027. Aparece en el banner de cuenta regresiva.",
      type: "string",
      initialValue: "EICI 2027",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "fechaInicio",
      title: "Fecha de inicio",
      description: "Hacia esta fecha corre la cuenta regresiva.",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({ name: "fechaFin", title: "Fecha de término", type: "date" }),
    defineField({
      name: "lugar",
      title: "Lugar",
      description: "Opcional. Si se deja vacío, la página muestra «Por confirmar».",
      type: "string",
    }),
    defineField({
      name: "emailCallForSpeakers",
      title: "Email para postulaciones de speakers",
      description: "El botón «Postula como speaker» abre un correo a esta dirección.",
      type: "string",
    }),
    defineField({
      name: "mostrarCallForSpeakers",
      title: "Mostrar sección «Call for Speakers»",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "galeria",
      title: "Galería de fotos",
      description:
        "Fotos del EICI. La sección Galería solo aparece en el sitio si hay al menos una imagen.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "caption", title: "Descripción (opcional)", type: "string" }],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "tituloProximaEdicion" },
    prepare: ({ title }) => ({ title: "Página EICI", subtitle: title }),
  },
});
