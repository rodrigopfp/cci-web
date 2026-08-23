import { defineField, defineType } from "sanity";

// ============================================================================
// FORMULARIOS — bandeja interna del equipo CCI (Fase 2 · paso 4)
// ============================================================================
// Documentos creados por el microservicio cci-forms (servicio-formularios/).
// El Studio es el panel donde el equipo gestiona postulaciones, leads y aportes.
// ============================================================================

const ESTADOS_POSTULACION = [
  { title: "Nueva", value: "nueva" },
  { title: "Pendiente de revisión", value: "pendiente_revision" },
  { title: "Contacto realizado", value: "contacto_realizado" },
  { title: "Reunión agendada", value: "reunion_agendada" },
  { title: "Antecedentes solicitados", value: "antecedentes_solicitados" },
  { title: "Aprobada", value: "aprobada" },
  { title: "Rechazada", value: "rechazada" },
  { title: "Incorporada", value: "incorporada" },
];

const COMUNES = [
  defineField({ name: "fecha", title: "Fecha", type: "datetime" }),
  defineField({ name: "origen", title: "Origen (página)", type: "string" }),
  defineField({ name: "utm", title: "UTM", type: "string" }),
];

export const postulacion = defineType({
  name: "postulacion",
  title: "Postulación a socio",
  type: "document",
  fields: [
    defineField({ name: "nombre", title: "Nombre", type: "string" }),
    defineField({ name: "apellido", title: "Apellido", type: "string" }),
    defineField({ name: "email", title: "Correo", type: "string" }),
    defineField({ name: "organizacion", title: "Organización", type: "string" }),
    defineField({ name: "cargo", title: "Cargo", type: "string" }),
    defineField({ name: "pais", title: "País", type: "string" }),
    defineField({ name: "tipoOrganizacion", title: "Tipo de organización", type: "string" }),
    defineField({ name: "interes", title: "Interés principal", type: "text", rows: 3 }),
    defineField({ name: "mensaje", title: "Mensaje", type: "text", rows: 3 }),
    defineField({
      name: "estado", title: "Estado", type: "string",
      options: { list: ESTADOS_POSTULACION, layout: "dropdown" }, initialValue: "nueva",
    }),
    ...COMUNES,
  ],
  orderings: [{ title: "Más recientes", name: "fechaDesc", by: [{ field: "fecha", direction: "desc" }] }],
  preview: { select: { title: "organizacion", subtitle: "estado" } },
});

export const descargaLead = defineType({
  name: "descargaLead",
  title: "Descarga (lead)",
  type: "document",
  fields: [
    defineField({ name: "nombre", title: "Nombre", type: "string" }),
    defineField({ name: "apellido", title: "Apellido", type: "string" }),
    defineField({ name: "email", title: "Correo corporativo", type: "string" }),
    defineField({ name: "organizacion", title: "Organización", type: "string" }),
    defineField({ name: "cargo", title: "Cargo", type: "string" }),
    defineField({ name: "pais", title: "País", type: "string" }),
    defineField({ name: "tipoOrganizacion", title: "Tipo de organización", type: "string" }),
    defineField({ name: "interes", title: "Interés principal", type: "string" }),
    defineField({ name: "recursoSlug", title: "Recurso (slug)", type: "string" }),
    defineField({ name: "recursoTitulo", title: "Recurso (título)", type: "string" }),
    defineField({ name: "autorizaContacto", title: "Autoriza contacto", type: "boolean" }),
    defineField({ name: "estado", title: "Estado", type: "string", initialValue: "nueva" }),
    ...COMUNES,
  ],
  orderings: [{ title: "Más recientes", name: "fechaDesc", by: [{ field: "fecha", direction: "desc" }] }],
  preview: { select: { title: "recursoTitulo", subtitle: "organizacion" } },
});

export const aporte = defineType({
  name: "aporte",
  title: "Aporte / dato",
  type: "document",
  fields: [
    defineField({ name: "nombre", title: "Nombre", type: "string" }),
    defineField({ name: "email", title: "Correo", type: "string" }),
    defineField({ name: "organizacion", title: "Organización", type: "string" }),
    defineField({
      name: "tipo", title: "Tipo", type: "string",
      options: { list: ["dato", "latam", "general"] }, initialValue: "dato",
    }),
    defineField({ name: "mensaje", title: "Mensaje", type: "text", rows: 4 }),
    defineField({ name: "estado", title: "Estado", type: "string", initialValue: "nueva" }),
    ...COMUNES,
  ],
  orderings: [{ title: "Más recientes", name: "fechaDesc", by: [{ field: "fecha", direction: "desc" }] }],
  preview: { select: { title: "tipo", subtitle: "organizacion" } },
});
