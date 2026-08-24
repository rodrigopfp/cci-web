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
    defineField({ name: "email", title: "Correo corporativo", type: "string" }),
    defineField({ name: "telefono", title: "Teléfono", type: "string" }),
    defineField({ name: "organizacion", title: "Organización", type: "string" }),
    defineField({ name: "sitioWeb", title: "Sitio web", type: "string" }),
    defineField({ name: "cargo", title: "Cargo", type: "string" }),
    defineField({ name: "tipoOrganizacion", title: "Tipo de organización", type: "string" }),
    defineField({ name: "tamano", title: "Tamaño aproximado", type: "string" }),
    defineField({ name: "pais", title: "País", type: "string" }),
    defineField({ name: "regiones", title: "Regiones donde opera", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "categoria", title: "Categoría de interés", type: "string" }),
    defineField({ name: "motivo", title: "Principal motivo para asociarse", type: "text", rows: 3 }),
    defineField({ name: "ejeInteres", title: "Eje de valor que más le interesa", type: "string" }),
    defineField({ name: "interes", title: "Interés principal (compat.)", type: "text", rows: 2 }),
    defineField({ name: "mensaje", title: "Mensaje adicional", type: "text", rows: 3 }),
    defineField({
      name: "estado", title: "Estado", type: "string",
      options: { list: ESTADOS_POSTULACION, layout: "dropdown" }, initialValue: "nueva",
    }),
    defineField({ name: "responsable", title: "Responsable", type: "string" }),
    defineField({
      name: "notas", title: "Historial de notas", type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "fecha", title: "Fecha", type: "datetime" },
            { name: "autor", title: "Autor", type: "string" },
            { name: "texto", title: "Nota", type: "text", rows: 2 },
          ],
          preview: { select: { title: "texto", subtitle: "autor" } },
        },
      ],
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

// Tipos reales que llegan por el microservicio: los de /aporta, el aviso de
// disponibilidad de recursos y los legados (dato/latam/general).
const TIPOS_APORTE = [
  { title: "Caso", value: "caso" },
  { title: "Proyecto", value: "proyecto" },
  { title: "Indicador o dato", value: "indicador" },
  { title: "Estudio", value: "estudio" },
  { title: "Fuente", value: "fuente" },
  { title: "Corrección", value: "correccion" },
  { title: "Información regional", value: "informacion_regional" },
  { title: "Organización", value: "organizacion" },
  { title: "Aviso de disponibilidad (recurso)", value: "aviso-recurso" },
  { title: "Dato (legado)", value: "dato" },
  { title: "LATAM", value: "latam" },
  { title: "General (legado)", value: "general" },
];

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
      options: { list: TIPOS_APORTE, layout: "dropdown" }, initialValue: "dato",
    }),
    defineField({ name: "mensaje", title: "Mensaje", type: "text", rows: 4 }),
    // Recurso asociado (aviso de disponibilidad). Lo envía el microservicio.
    defineField({ name: "recursoSlug", title: "Recurso (slug)", type: "string" }),
    defineField({ name: "recursoTitulo", title: "Recurso (título)", type: "string" }),
    defineField({ name: "estado", title: "Estado", type: "string", initialValue: "nueva" }),
    ...COMUNES,
  ],
  orderings: [{ title: "Más recientes", name: "fechaDesc", by: [{ field: "fecha", direction: "desc" }] }],
  preview: {
    select: { tipo: "tipo", organizacion: "organizacion", recurso: "recursoTitulo" },
    prepare({ tipo, organizacion, recurso }) {
      return { title: tipo || "aporte", subtitle: recurso ? `${recurso}` : organizacion || "" };
    },
  },
});
