/**
 * Convierte el contenido actual (archivos TypeScript en src/data) al formato
 * de importación de Sanity (NDJSON: un documento JSON por línea).
 *
 * Se ejecuta una sola vez, para la migración inicial:
 *   npx tsx scripts/exportar-a-sanity.ts
 *
 * Genera sanity-import.ndjson en la raíz del proyecto.
 */

import { writeFileSync } from "node:fs";
import { articles } from "../src/data/articles.respaldo";
import { studies, indicators, sources } from "../src/data/indicators.respaldo";
import { radarIndicators, radarPending, certifiedCompanies, conveniosDitec } from "../src/data/radar.respaldo";
import { hitos } from "../src/data/hitos.respaldo";
import { partners } from "../src/data/partners.respaldo";
import { events, resources } from "../src/data/resources.respaldo";

const docs: unknown[] = [];

// Identificadores estables: si se vuelve a importar, actualiza en vez de duplicar.
const id = (tipo: string, clave: string) =>
  `${tipo}-${clave.replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase()}`;

// --- Fuentes -------------------------------------------------------------
for (const [clave, f] of Object.entries(sources)) {
  docs.push({
    _id: id("fuente", clave),
    _type: "fuente",
    titulo: f.title,
    organizacion: f.organization,
    anio: f.year,
    url: f.url,
    tipoFuente: f.sourceType,
  });
}

// --- Noticias ------------------------------------------------------------
for (const a of articles) {
  docs.push({
    _id: id("noticia", a.slug),
    _type: "noticia",
    titulo: a.title,
    slug: { _type: "slug", current: a.slug },
    bajada: a.excerpt,
    categoria: a.category,
    tipo: a.type,
    fecha: a.date,
    autor: a.author,
    etiquetaFoto: a.image.label,
    // Foto externa (URL) y colores del degradado, para no perder la portada.
    fotoUrl: a.photo,
    colorDesde: a.image.from,
    colorHasta: a.image.to,
    minutosLectura: a.readingMinutes,
    // El cuerpo pasa a texto enriquecido: un bloque por párrafo.
    cuerpo: a.content.map((p, i) => ({
      _type: "block",
      _key: `p${i}`,
      style: "normal",
      children: [{ _type: "span", _key: `s${i}`, text: p, marks: [] }],
    })),
    fuenteUrl: a.sourceUrl,
    fuenteNombre: a.sourceName,
  });
}

// --- Indicadores ---------------------------------------------------------
const mapIndicador = (i: (typeof indicators)[number], grupo: string) => {
  const claveFuente = Object.entries(sources).find(([, s]) => s.id === i.source?.id)?.[0];
  return {
    _id: id("indicador", i.id),
    _type: "indicador",
    clave: i.id,
    valor: i.value,
    unidad: i.unit,
    etiqueta: i.label,
    nota: i.note,
    estado: i.status,
    tipoFuente: i.sourceType,
    ambito: i.geography,
    actualizado: i.lastUpdated,
    grupo,
    ...(claveFuente
      ? { fuente: { _type: "reference", _ref: id("fuente", claveFuente) } }
      : {}),
  };
};
indicators.forEach((i) => docs.push(mapIndicador(i, "portada")));
radarIndicators.forEach((i) => docs.push(mapIndicador(i, "radar")));
radarPending.forEach((i) => docs.push(mapIndicador(i, "pendiente")));

// --- Empresas certificadas (Radar) --------------------------------------
for (const c of certifiedCompanies) {
  docs.push({
    _id: id("cert", `${c.resolution}-${c.date}`),
    _type: "empresaCertificada",
    nombre: c.name,
    resolucion: c.resolution,
    fecha: c.date,
    segundaResolucion: Boolean(c.repeat),
    convenioDitec: Boolean(c.convenio),
  });
}

// --- Convenios DITEC (listado oficial, independiente de las certificadas) --
for (const nombre of conveniosDitec) {
  docs.push({
    _id: id("convenio", nombre),
    _type: "convenioDitec",
    nombre,
  });
}

// --- Hitos ---------------------------------------------------------------
for (const h of hitos) {
  docs.push({
    _id: id("hito", h.id),
    _type: "hito",
    periodo: h.periodo,
    fecha: h.fecha,
    titulo: h.titulo,
    detalle: h.detalle,
    tipo: h.tipo,
    estado: h.estado,
    fuenteUrl: h.fuente,
  });
}

// --- Estudios ------------------------------------------------------------
for (const s of studies) {
  docs.push({
    _id: id("estudio", s.slug),
    _type: "estudio",
    titulo: s.title,
    slug: { _type: "slug", current: s.slug },
    organizacion: s.organization,
    anio: s.year,
    ambito: s.geography,
    tema: s.topic,
    hallazgo: s.keyFinding,
    tipoFuente: s.sourceType,
    url: s.url,
  });
}

// --- Empresas del ecosistema --------------------------------------------
for (const p of partners) {
  docs.push({
    _id: id("empresa", p.slug),
    _type: "empresa",
    nombre: p.name,
    slug: { _type: "slug", current: p.slug },
    categoria: p.category,
    descripcion: p.description,
    iniciales: p.logoInitials,
    color: p.logoColor,
  });
}

// --- Eventos y recursos --------------------------------------------------
for (const e of events) {
  docs.push({
    _id: id("evento", e.id),
    _type: "evento",
    titulo: e.title,
    fecha: e.date,
    lugar: e.location,
    modalidad: e.modality,
    descripcion: e.description,
  });
}
for (const r of resources) {
  docs.push({
    _id: id("recurso", r.id),
    _type: "recurso",
    titulo: r.title,
    descripcion: r.description,
    tipo: r.type,
    fecha: r.date,
  });
}

const ndjson = docs.map((d) => JSON.stringify(d)).join("\n");
writeFileSync("sanity-import.ndjson", ndjson + "\n", "utf-8");

console.log(`Listo: ${docs.length} documentos escritos en sanity-import.ndjson`);
