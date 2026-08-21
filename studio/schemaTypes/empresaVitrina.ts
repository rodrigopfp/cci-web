import { defineField, defineType } from "sanity";

/**
 * EMPRESA EN VITRINA — directorio comercial del ecosistema industrializado.
 *
 * Los socios se muestran según su nivel de membresía (oro / plata / bronce /
 * profesional / academia). Las empresas NO socias pueden publicar de forma
 * pagada (nivel "pagada"), siempre identificada como tal y con una vigencia.
 *
 * Sigue el patrón dual de imagen de las noticias: se puede subir un logo a
 * Sanity (logo) o pegar una URL externa (logoUrl); la imagen subida tiene
 * prioridad.
 */

export const NIVELES_VITRINA = [
  { title: "Oro (socio)", value: "oro" },
  { title: "Plata (socio)", value: "plata" },
  { title: "Bronce (socio)", value: "bronce" },
  { title: "Profesional (socio)", value: "profesional" },
  { title: "Academia (socio)", value: "academia" },
  { title: "Publicación pagada (empresa no socia)", value: "pagada" },
];

export const CATEGORIAS_VITRINA = [
  "hormigón prefabricado",
  "madera/CLT",
  "acero liviano",
  "módulos 3D",
  "envolvente",
  "instalaciones",
  "ingeniería y diseño",
  "servicios",
];

export const ZONAS_VITRINA = ["Norte", "Centro", "Sur", "Austral", "Todo Chile", "Internacional"];

export const empresaVitrina = defineType({
  name: "empresaVitrina",
  title: "Empresa en Vitrina",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre de la empresa",
      type: "string",
      validation: (r) => r.required().max(160),
    }),
    defineField({
      name: "slug",
      title: "Dirección web",
      description: "Se genera sola desde el nombre. Define la URL de la ficha.",
      type: "slug",
      options: { source: "nombre", maxLength: 90 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "nivel",
      title: "Nivel",
      description:
        "Determina el orden y qué se muestra. Oro/Plata/Bronce/Profesional/Academia son socios; «Pagada» es una empresa no socia y se rotula de forma visible.",
      type: "string",
      options: { list: NIVELES_VITRINA, layout: "dropdown" },
      initialValue: "bronce",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "titular",
      title: "Titular",
      description: "Una línea: qué hace la empresa. Ej: «Paneles de hormigón prefabricado para vivienda».",
      type: "string",
      validation: (r) => r.max(120),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      description: "Un párrafo que describe la empresa y su oferta.",
      type: "text",
      rows: 5,
      validation: (r) => r.max(700),
    }),
    defineField({
      name: "categorias",
      title: "Categorías de solución",
      type: "array",
      of: [{ type: "string" }],
      options: { list: CATEGORIAS_VITRINA },
    }),
    defineField({
      name: "zonas",
      title: "Zonas donde opera",
      type: "array",
      of: [{ type: "string" }],
      options: { list: ZONAS_VITRINA },
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
    }),
    defineField({
      name: "logoUrl",
      title: "Logo (URL externa)",
      description:
        "Alternativa a subir un logo: URL de una imagen. Si subes una imagen en «Logo», esa tiene prioridad sobre esta URL.",
      type: "url",
    }),
    defineField({
      name: "galeria",
      title: "Galería",
      description: "Imágenes de proyectos o productos. Opcional.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Texto alternativo", type: "string" }] }],
    }),
    defineField({ name: "sitioWeb", title: "Sitio web", type: "url" }),
    defineField({ name: "emailContacto", title: "Email de contacto", type: "string" }),
    defineField({ name: "telefono", title: "Teléfono", type: "string" }),
    defineField({
      name: "anioDesde",
      title: "Opera desde (año)",
      type: "number",
      validation: (r) => r.min(1900).max(2100),
    }),
    defineField({
      name: "proyectosDestacados",
      title: "Proyectos destacados",
      description: "Opcional. Se muestran en la ficha (no en niveles «bronce»).",
      type: "array",
      of: [
        {
          type: "object",
          name: "proyecto",
          title: "Proyecto",
          fields: [
            { name: "titulo", title: "Título", type: "string", validation: (r) => r.required() },
            { name: "descripcion", title: "Descripción", type: "text", rows: 3 },
            { name: "imagen", title: "Imagen", type: "image", options: { hotspot: true } },
          ],
          preview: { select: { title: "titulo", subtitle: "descripcion", media: "imagen" } },
        },
      ],
    }),
    defineField({
      name: "vigenteHasta",
      title: "Vigente hasta",
      description: "Solo relevante para el nivel «Pagada»: al pasar esta fecha, la ficha deja de mostrarse.",
      type: "date",
    }),
    defineField({
      name: "activo",
      title: "Activo",
      description: "Desmárcalo para ocultar la empresa sin borrarla.",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    { title: "Nombre (A–Z)", name: "nombreAsc", by: [{ field: "nombre", direction: "asc" }] },
  ],
  preview: {
    select: { title: "nombre", subtitle: "nivel", media: "logo" },
  },
});
