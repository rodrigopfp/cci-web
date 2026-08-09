import { defineField, defineType } from "sanity";

/** EMPRESA CERTIFICADA — listado oficial de la DITEC que alimenta el Radar. */
export const empresaCertificada = defineType({
  name: "empresaCertificada",
  title: "Empresa certificada (Radar)",
  type: "document",
  fields: [
    defineField({ name: "nombre", title: "Nombre de la empresa", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "resolucion",
      title: "Resolución",
      description: 'Ej: Res. Ex. N°785',
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "fecha", title: "Fecha de la resolución", type: "date", validation: (r) => r.required() }),
    defineField({
      name: "segundaResolucion",
      title: "¿Es una segunda resolución de esta empresa?",
      description: "Márcalo si la empresa YA estaba certificada. Así no se cuenta dos veces.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "convenioDitec",
      title: "¿Tiene convenio directo con la DITEC?",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [{ title: "Más recientes", name: "fechaDesc", by: [{ field: "fecha", direction: "desc" }] }],
  preview: { select: { title: "nombre", subtitle: "resolucion" } },
});

/**
 * CONVENIO DITEC — listado oficial del MINVU de empresas en convenio directo
 * con la DITEC. Es un listado DISTINTO al de empresas certificadas: incluye
 * empresas que no están en el listado de resoluciones (p. ej. Easywood). Por
 * eso se modela por separado y NO se deriva del listado de certificadas.
 */
export const convenioDitec = defineType({
  name: "convenioDitec",
  title: "Empresa en convenio con la DITEC",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre de la empresa",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "nombre" } },
});

/** INDICADOR — una cifra publicada, siempre con su fuente y su estado. */
export const indicador = defineType({
  name: "indicador",
  title: "Indicador",
  type: "document",
  fields: [
    defineField({
      name: "clave",
      title: "Identificador interno",
      description: "Sin espacios. Lo usa el sitio para ubicar el indicador. Ej: deficit, empresas.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "valor",
      title: "Valor a mostrar",
      description: 'Tal como debe verse: 491.904, 20–50%, hasta 20%. Si aún no existe, escribe "En levantamiento".',
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "unidad", title: "Unidad", description: "Ej: viviendas. Opcional.", type: "string" }),
    defineField({
      name: "etiqueta",
      title: "Titular del dato",
      description: "En caja baja. Ej: Déficit habitacional en Chile",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "nota",
      title: "Contexto",
      description: "Qué mide exactamente y qué matices tiene. Es lo que evita malinterpretar la cifra.",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "estado",
      title: "Estado del dato",
      type: "string",
      options: {
        list: [
          { title: "Verificado (dato real con fuente)", value: "real" },
          { title: "Ejemplo (dato de demostración)", value: "mock" },
          { title: "En levantamiento (aún no existe)", value: "pending" },
        ],
        layout: "radio",
      },
      initialValue: "real",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tipoFuente",
      title: "Tipo de fuente",
      type: "string",
      options: {
        list: [
          { title: "Oficial", value: "oficial" },
          { title: "CCI", value: "cci" },
          { title: "Empresa", value: "empresa" },
          { title: "Académica", value: "academica" },
          { title: "Internacional", value: "internacional" },
          { title: "Estimación", value: "estimacion" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "fuente", title: "Fuente", type: "reference", to: [{ type: "fuente" }] }),
    defineField({ name: "ambito", title: "Ámbito", type: "string", options: { list: ["Chile", "Internacional"] }, validation: (r) => r.required() }),
    defineField({ name: "actualizado", title: "Fecha de verificación", type: "date" }),
    defineField({
      name: "grupo",
      title: "¿Dónde se muestra?",
      type: "string",
      options: {
        list: [
          { title: "Portada · El desafío y la evidencia", value: "portada" },
          { title: "Radar · Estado del ecosistema", value: "radar" },
          { title: "Radar · Datos pendientes", value: "pendiente" },
        ],
      },
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "etiqueta", subtitle: "valor" } },
});

/** HITO — punto de la línea de tiempo. */
export const hito = defineType({
  name: "hito",
  title: "Hito (línea de tiempo)",
  type: "document",
  fields: [
    defineField({ name: "periodo", title: "Período", description: "Como se muestra en el eje. Ej: Mar 2023, Por definir", type: "string", validation: (r) => r.required() }),
    defineField({ name: "fecha", title: "Fecha (para ordenar)", type: "date", validation: (r) => r.required() }),
    defineField({ name: "titulo", title: "Título del hito", type: "string", validation: (r) => r.required() }),
    defineField({ name: "detalle", title: "Detalle", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "tipo", title: "Tipo", type: "string",
      options: { list: [
        { title: "Normativa", value: "normativa" },
        { title: "Obra", value: "obra" },
        { title: "Gremial", value: "gremial" },
        { title: "Dato", value: "dato" },
      ]},
      validation: (r) => r.required(),
    }),
    defineField({
      name: "estado", title: "Estado", type: "string",
      description: "El riel de la línea de tiempo se dibuja continuo si está ejecutado y discontinuo si está programado.",
      options: { list: [
        { title: "Ejecutado (ya ocurrió)", value: "ejecutado" },
        { title: "Programado (está por ocurrir)", value: "programado" },
      ], layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "fuenteUrl", title: "Enlace a la fuente", type: "url" }),
  ],
  orderings: [{ title: "Cronológico", name: "fechaAsc", by: [{ field: "fecha", direction: "asc" }] }],
  preview: { select: { title: "titulo", subtitle: "periodo" } },
});
