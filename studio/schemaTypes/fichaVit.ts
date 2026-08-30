import { defineField, defineType } from "sanity";

/**
 * FICHA VIT — imagen del catálogo de viviendas industrializadas tipo (/data/vit).
 *
 * Los DATOS de cada ficha (tipo, empresa, programa, URL oficial) viven en el
 * registro tipado del repo; aquí va SOLO la imagen y su procedencia. La página
 * la busca por slug: si no existe imagen autorizada, usa la silueta por
 * tipología.
 *
 * `autorizadaPor` y `fechaAutorizacion` son OBLIGATORIOS: sin cualquiera de los
 * dos, el sitio NO muestra la imagen (los renders pertenecen a las empresas).
 */
export const fichaVit = defineType({
  name: "fichaVit",
  title: "CCI Data · Ficha VIT (imagen)",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug de la ficha",
      description: "Debe coincidir con el slug de la ficha en el registro del repo (datos-vit.ts).",
      type: "slug",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "imagen",
      title: "Imagen del render",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "credito",
      title: "Crédito",
      description: "A quién pertenece el render (empresa industrializadora u origen).",
      type: "string",
    }),
    defineField({
      name: "autorizadaPor",
      title: "Autorizada por",
      description: "Quién autorizó el uso de la imagen. OBLIGATORIO para que el sitio la muestre.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "fechaAutorizacion",
      title: "Fecha de autorización",
      description: "OBLIGATORIA para que el sitio muestre la imagen.",
      type: "date",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "slug.current", subtitle: "autorizadaPor", media: "imagen" },
  },
});
