import { defineField, defineType } from "sanity";

/**
 * REQUERIMIENTO RECIBIDO — captación de demanda de la Vitrina.
 *
 * Quien busca un proveedor industrializado deja su necesidad. El sitio es
 * estático y NO escribe en Sanity: hoy el requerimiento llega por correo (el
 * botón de la Vitrina abre un mailto al CCI). Este tipo existe para registrar
 * a mano esos requerimientos o para conectar a futuro un servicio de formularios.
 */
export const requerimiento = defineType({
  name: "requerimiento",
  title: "Requerimiento recibido",
  type: "document",
  fields: [
    defineField({ name: "nombreContacto", title: "Nombre de contacto", type: "string", validation: (r) => r.required() }),
    defineField({ name: "empresa", title: "Empresa u organización", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string", validation: (r) => r.required() }),
    defineField({ name: "telefono", title: "Teléfono", type: "string" }),
    defineField({
      name: "descripcion",
      title: "Qué necesita",
      type: "text",
      rows: 5,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categoria",
      title: "Categoría de solución",
      type: "string",
      options: {
        list: [
          "hormigón prefabricado",
          "madera/CLT",
          "acero liviano",
          "módulos 3D",
          "envolvente",
          "instalaciones",
          "ingeniería y diseño",
          "servicios",
        ],
      },
    }),
    defineField({
      name: "zona",
      title: "Zona",
      type: "string",
      options: { list: ["Norte", "Centro", "Sur", "Austral", "Todo Chile", "Internacional"] },
    }),
    defineField({
      name: "fecha",
      title: "Fecha de recepción",
      type: "datetime",
    }),
  ],
  orderings: [{ title: "Más recientes", name: "fechaDesc", by: [{ field: "fecha", direction: "desc" }] }],
  preview: { select: { title: "nombreContacto", subtitle: "empresa" } },
});
