/**
 * Capa de conversión: consulta Sanity y devuelve los datos YA convertidos a los
 * tipos de src/data/types.ts, para que los componentes del sitio no cambien.
 *
 * Todo se ejecuta en tiempo de compilación (el sitio es estático). Ninguna de
 * estas funciones debe llamarse desde un componente de cliente.
 */
import { createImageUrlBuilder } from "@sanity/image-url";
import { toPlainText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { client } from "./client";
import {
  noticiasQuery,
  noticiaBySlugQuery,
  noticiaSlugsQuery,
  vocesQuery,
  vozBySlugQuery,
  vozSlugsQuery,
  eiciQuery,
  empresasCertificadasQuery,
  conveniosDitecQuery,
  indicadoresQuery,
  hitosQuery,
  estudiosQuery,
  empresasQuery,
  eventosQuery,
  recursosQuery,
  empresasVitrinaQuery,
  empresaVitrinaBySlugQuery,
} from "./queries";
import type {
  Article,
  Indicator,
  Source,
  SourceType,
  Study,
  Partner,
  PartnerCategory,
  CCIEvent,
  Resource,
  CertifiedCompany,
  Hito,
  Voz,
  EiciConfig,
  EmpresaVitrina,
  NivelVitrina,
} from "@/data/types";

const builder = createImageUrlBuilder(client);

// --- Normalizadores ------------------------------------------------------
// Los documentos migrados guardan el tipo de fuente con tilde ("académica",
// "estimación"), pero el panel ofrece las variantes sin tilde. Aceptamos ambas.
function normalizeSourceType(v: string | undefined): SourceType {
  switch (v) {
    case "academica":
    case "académica":
      return "académica";
    case "estimacion":
    case "estimación":
      return "estimación";
    case "oficial":
    case "cci":
    case "empresa":
    case "internacional":
      return v;
    default:
      return (v as SourceType) ?? "cci";
  }
}

// El panel usa "Institución pública / gremial" (con tilde); el tipo del sitio
// usa la variante sin tilde. Normalizamos para que el filtro de Socios calce.
function normalizePartnerCategory(v: string | undefined): PartnerCategory {
  if (v === "Institución pública / gremial") return "Institución publica / gremial";
  return (v as PartnerCategory) ?? "Industrializadora";
}

function bytesLegibles(size: number | undefined): string | undefined {
  if (!size || size <= 0) return undefined;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

const FORMATOS_VALIDOS = new Set(["PDF", "XLSX", "ZIP"]);

// --- Noticias ------------------------------------------------------------
type NoticiaDoc = {
  _id: string;
  titulo: string;
  slug: string;
  bajada: string;
  categoria: Article["category"];
  tipo: Article["type"];
  fecha: string;
  autor?: string;
  foto?: { asset?: { _ref?: string } };
  fotoUrl?: string;
  etiquetaFoto?: string;
  minutosLectura?: number;
  cuerpo?: PortableTextBlock[];
  fuenteUrl?: string;
  fuenteNombre?: string;
  colorDesde?: string;
  colorHasta?: string;
};

function toArticle(d: NoticiaDoc): Article {
  // La foto puede venir como imagen subida en Sanity (asset) o como URL externa.
  const photo = d.foto?.asset?._ref
    ? builder.image(d.foto).width(1200).fit("max").auto("format").url()
    : d.fotoUrl || undefined;

  const cuerpo = Array.isArray(d.cuerpo) ? d.cuerpo : [];
  // Texto plano de respaldo: un string por bloque.
  const content = cuerpo
    .map((b) => toPlainText([b]))
    .filter((t) => t.trim().length > 0);

  return {
    id: d._id,
    slug: d.slug,
    title: d.titulo,
    excerpt: d.bajada,
    category: d.categoria,
    type: d.tipo,
    date: d.fecha,
    author: d.autor ?? "Redacción CCI",
    image: {
      from: d.colorDesde ?? "#2B2B2B",
      to: d.colorHasta ?? "#5C5C5C",
      label: d.etiquetaFoto ?? "",
    },
    photo,
    readingMinutes: d.minutosLectura ?? 4,
    content,
    body: cuerpo,
    sourceUrl: d.fuenteUrl,
    sourceName: d.fuenteNombre,
  };
}

export async function getArticles(): Promise<Article[]> {
  const docs = await client.fetch<NoticiaDoc[]>(noticiasQuery);
  return docs.map(toArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const doc = await client.fetch<NoticiaDoc | null>(noticiaBySlugQuery, { slug });
  return doc ? toArticle(doc) : null;
}

export async function getArticleSlugs(): Promise<string[]> {
  const rows = await client.fetch<{ slug: string }[]>(noticiaSlugsQuery);
  return rows.map((r) => r.slug).filter(Boolean);
}

/** Relacionadas: misma categoría primero, luego el resto. Lógica original. */
export function getRelatedArticles(article: Article, all: Article[], limit = 3): Article[] {
  return all
    .filter((a) => a.id !== article.id && a.category === article.category)
    .concat(all.filter((a) => a.id !== article.id && a.category !== article.category))
    .slice(0, limit);
}

// --- Voces de la industrialización --------------------------------------
type VozDoc = {
  _id: string;
  nombre: string;
  slug: string;
  cargo?: string;
  organizacion?: string;
  foto?: { asset?: { _ref?: string } };
  fotoUrl?: string;
  fraseDestacada?: string;
  entrevista?: { pregunta?: string; respuesta?: string }[];
  linkedin?: string;
  orden?: number;
};

function toVoz(d: VozDoc): Voz {
  // Mismo patrón dual que las noticias: imagen subida a Sanity o URL externa.
  const foto = d.foto?.asset?._ref
    ? builder.image(d.foto).width(800).fit("max").auto("format").url()
    : d.fotoUrl || undefined;

  const entrevista = (Array.isArray(d.entrevista) ? d.entrevista : [])
    .filter((e) => e?.pregunta && e?.respuesta)
    .map((e) => ({ pregunta: e.pregunta as string, respuesta: e.respuesta as string }));

  return {
    id: d._id,
    slug: d.slug,
    nombre: d.nombre,
    cargo: d.cargo,
    organizacion: d.organizacion,
    foto,
    fraseDestacada: d.fraseDestacada,
    entrevista,
    linkedin: d.linkedin,
    orden: d.orden,
  };
}

export async function getVoces(): Promise<Voz[]> {
  const docs = await client.fetch<VozDoc[]>(vocesQuery);
  return docs.map(toVoz);
}

export async function getVozBySlug(slug: string): Promise<Voz | null> {
  const doc = await client.fetch<VozDoc | null>(vozBySlugQuery, { slug });
  return doc ? toVoz(doc) : null;
}

export async function getVozSlugs(): Promise<string[]> {
  const rows = await client.fetch<{ slug: string }[]>(vozSlugsQuery);
  return rows.map((r) => r.slug).filter(Boolean);
}

// --- EICI (singleton de la página del Encuentro) ------------------------
type EiciDoc = {
  tituloProximaEdicion?: string;
  fechaInicio?: string;
  fechaFin?: string;
  lugar?: string;
  emailCallForSpeakers?: string;
  mostrarCallForSpeakers?: boolean;
  galeria?: { _key: string; caption?: string; asset?: { _ref?: string } }[];
};

export async function getEici(): Promise<EiciConfig | null> {
  const d = await client.fetch<EiciDoc | null>(eiciQuery);
  if (!d) return null;

  const galeria = (Array.isArray(d.galeria) ? d.galeria : [])
    .filter((g) => g?.asset?._ref)
    .map((g) => ({
      url: builder.image({ asset: g.asset }).width(1400).fit("max").auto("format").url(),
      caption: g.caption,
    }));

  return {
    tituloProximaEdicion: d.tituloProximaEdicion ?? "EICI 2027",
    fechaInicio: d.fechaInicio,
    fechaFin: d.fechaFin,
    lugar: d.lugar,
    emailCallForSpeakers: d.emailCallForSpeakers,
    mostrarCallForSpeakers: d.mostrarCallForSpeakers ?? true,
    galeria,
  };
}

// --- Indicadores ---------------------------------------------------------
type IndicadorDoc = {
  _id: string;
  clave: string;
  valor: string;
  unidad?: string;
  etiqueta: string;
  nota: string;
  estado: Indicator["status"];
  tipoFuente?: string;
  ambito: Indicator["geography"];
  actualizado?: string;
  grupo: "portada" | "radar" | "pendiente";
  fuente?: {
    _id: string;
    titulo: string;
    organizacion: string;
    anio: number;
    url?: string;
    tipoFuente?: string;
  } | null;
};

function toIndicator(d: IndicadorDoc): Indicator {
  const source: Source | undefined = d.fuente
    ? {
        id: d.fuente._id,
        title: d.fuente.titulo,
        organization: d.fuente.organizacion,
        year: d.fuente.anio,
        url: d.fuente.url,
        sourceType: normalizeSourceType(d.fuente.tipoFuente),
      }
    : undefined;

  return {
    id: d.clave,
    value: d.valor,
    unit: d.unidad,
    label: d.etiqueta,
    note: d.nota,
    status: d.estado,
    sourceType: normalizeSourceType(d.tipoFuente),
    source,
    lastUpdated: d.actualizado,
    geography: d.ambito,
  };
}

async function getIndicadores(): Promise<IndicadorDoc[]> {
  return client.fetch<IndicadorDoc[]>(indicadoresQuery);
}

/** grupo "portada": franja "El desafío y la evidencia" (Home y Evidencia). */
export async function getPortadaIndicators(): Promise<Indicator[]> {
  const docs = await getIndicadores();
  return docs.filter((d) => d.grupo === "portada").map(toIndicator);
}

/** grupo "radar": estado del ecosistema. */
export async function getRadarIndicators(): Promise<Indicator[]> {
  const docs = await getIndicadores();
  return docs.filter((d) => d.grupo === "radar").map(toIndicator);
}

/** grupo "pendiente": datos que aún no existen. */
export async function getRadarPending(): Promise<Indicator[]> {
  const docs = await getIndicadores();
  return docs.filter((d) => d.grupo === "pendiente").map(toIndicator);
}

// --- Estudios ------------------------------------------------------------
type EstudioDoc = {
  _id: string;
  titulo: string;
  slug?: string;
  organizacion: string;
  anio: number;
  ambito: Study["geography"];
  tema: string;
  hallazgo: string;
  tipoFuente?: string;
  url?: string;
};

export async function getStudies(): Promise<Study[]> {
  const docs = await client.fetch<EstudioDoc[]>(estudiosQuery);
  return docs.map((d) => ({
    id: d._id,
    slug: d.slug ?? "",
    title: d.titulo,
    organization: d.organizacion,
    year: d.anio,
    geography: d.ambito,
    topic: d.tema,
    keyFinding: d.hallazgo,
    url: d.url,
    sourceType: normalizeSourceType(d.tipoFuente),
  }));
}

// --- Empresas certificadas (Radar) --------------------------------------
type EmpresaCertDoc = {
  _id: string;
  nombre: string;
  resolucion: string;
  fecha: string;
  segundaResolucion?: boolean;
  convenioDitec?: boolean;
};

export async function getCertifiedCompanies(): Promise<CertifiedCompany[]> {
  const docs = await client.fetch<EmpresaCertDoc[]>(empresasCertificadasQuery);
  return docs.map((d) => ({
    name: d.nombre,
    resolution: d.resolucion,
    date: d.fecha,
    year: Number(d.fecha?.slice(0, 4)),
    repeat: d.segundaResolucion || undefined,
    convenio: d.convenioDitec || undefined,
  }));
}

// --- Convenios DITEC -----------------------------------------------------
// Listado oficial del MINVU, independiente del de empresas certificadas.
// Incluye empresas que no aparecen entre las certificadas (p. ej. Easywood).
export async function getConveniosDitec(): Promise<string[]> {
  const rows = await client.fetch<{ nombre: string }[]>(conveniosDitecQuery);
  return rows.map((r) => r.nombre).filter(Boolean);
}

// --- Hitos ---------------------------------------------------------------
type HitoDoc = {
  _id: string;
  periodo: string;
  fecha: string;
  titulo: string;
  detalle: string;
  tipo: Hito["tipo"];
  estado: Hito["estado"];
  fuenteUrl?: string;
};

export async function getHitos(): Promise<Hito[]> {
  const docs = await client.fetch<HitoDoc[]>(hitosQuery);
  return docs.map((d) => ({
    id: d._id,
    periodo: d.periodo,
    fecha: d.fecha,
    titulo: d.titulo,
    detalle: d.detalle,
    tipo: d.tipo,
    estado: d.estado,
    fuente: d.fuenteUrl,
  }));
}

// --- Empresas (Ecosistema / Socios) -------------------------------------
type EmpresaDoc = {
  _id: string;
  nombre: string;
  slug?: string;
  categoria?: string;
  descripcion: string;
  iniciales?: string;
  color?: string;
};

export async function getPartners(): Promise<Partner[]> {
  const docs = await client.fetch<EmpresaDoc[]>(empresasQuery);
  return docs.map((d) => ({
    id: d._id,
    slug: d.slug ?? "",
    name: d.nombre,
    category: normalizePartnerCategory(d.categoria),
    description: d.descripcion,
    logoInitials: d.iniciales ?? "",
    logoColor: d.color ?? "#5C5C5C",
  }));
}

// --- Eventos -------------------------------------------------------------
type EventoDoc = {
  _id: string;
  titulo: string;
  fecha: string;
  lugar: string;
  modalidad: CCIEvent["modality"];
  descripcion?: string;
};

export async function getEvents(): Promise<CCIEvent[]> {
  const docs = await client.fetch<EventoDoc[]>(eventosQuery);
  return docs.map((d) => ({
    id: d._id,
    title: d.titulo,
    date: d.fecha,
    location: d.lugar,
    modality: d.modalidad,
    description: d.descripcion ?? "",
  }));
}

// --- Recursos ------------------------------------------------------------
type RecursoDoc = {
  _id: string;
  titulo: string;
  descripcion: string;
  tipo: Resource["type"];
  fecha: string;
  archivo?: { asset?: { extension?: string; size?: number } };
};

export async function getResources(): Promise<Resource[]> {
  const docs = await client.fetch<RecursoDoc[]>(recursosQuery);
  return docs.map((d) => {
    const ext = d.archivo?.asset?.extension?.toUpperCase();
    const format = ext && FORMATOS_VALIDOS.has(ext) ? (ext as Resource["format"]) : undefined;
    return {
      id: d._id,
      title: d.titulo,
      description: d.descripcion,
      type: d.tipo,
      format,
      weight: bytesLegibles(d.archivo?.asset?.size),
      date: d.fecha,
    };
  });
}

// --- Biblioteca editorial (/conocimiento) -------------------------------
import type { RecursoBiblioteca, CategoriaRecurso, EstadoRecurso } from "@/data/types";
import {
  recursosBiblioQuery,
  recursoBiblioBySlugQuery,
  recursoBiblioSlugsQuery,
} from "./queries";

type RecursoBiblioDoc = {
  _id: string;
  titulo: string;
  slug?: string;
  categoria?: string;
  temas?: string[];
  bajada?: string;
  descripcion?: string;
  portada?: ImagenDoc;
  autores?: string;
  institucion?: string;
  fechaPublicacion?: string;
  version?: string;
  paginas?: number;
  formato?: string;
  estadoRecurso?: string;
  requiereFormulario?: boolean;
  archivo?: { asset?: { url?: string; extension?: string; size?: number } };
  enlaceExterno?: string;
  intro?: PortableTextBlock[];
  hallazgos?: string[];
  cuerpo?: PortableTextBlock[];
  recursosRelacionados?: string[];
  terminosGlosario?: string[];
  indicadoresDestacados?: string[];
  fecha?: string;
  fechaActualizacion?: string;
};

function toRecursoBiblio(d: RecursoBiblioDoc): RecursoBiblioteca {
  const portada = d.portada?.asset?._ref
    ? builder.image(d.portada).width(1200).fit("max").auto("format").url()
    : undefined;
  const archivoUrl = d.archivo?.asset?.url;
  const enlaceExterno = d.enlaceExterno;
  const esExterno = Boolean(enlaceExterno && /^https?:\/\//i.test(enlaceExterno));
  return {
    id: d._id,
    titulo: d.titulo,
    slug: d.slug ?? "",
    categoria: d.categoria as CategoriaRecurso | undefined,
    temas: Array.isArray(d.temas) ? d.temas : [],
    bajada: d.bajada || d.descripcion || undefined,
    portada,
    autores: d.autores,
    institucion: d.institucion,
    fechaPublicacion: d.fechaPublicacion || d.fecha,
    version: d.version,
    paginas: d.paginas,
    formato: d.formato,
    estado: (d.estadoRecurso as EstadoRecurso) ?? "en_preparacion",
    requiereFormulario: Boolean(d.requiereFormulario),
    archivoUrl: archivoUrl || undefined,
    archivoExt: d.archivo?.asset?.extension,
    enlaceExterno,
    esExterno,
    intro: Array.isArray(d.intro) ? d.intro : undefined,
    hallazgos: Array.isArray(d.hallazgos) ? d.hallazgos.filter(Boolean) : [],
    cuerpo: Array.isArray(d.cuerpo) ? d.cuerpo : undefined,
    recursosRelacionados: Array.isArray(d.recursosRelacionados) ? d.recursosRelacionados.filter(Boolean) : [],
    terminosGlosario: Array.isArray(d.terminosGlosario) ? d.terminosGlosario.filter(Boolean) : [],
    indicadoresDestacados: Array.isArray(d.indicadoresDestacados) ? d.indicadoresDestacados.filter(Boolean) : [],
    fechaActualizacion: d.fechaActualizacion,
  };
}

export async function getRecursosBiblioteca(): Promise<RecursoBiblioteca[]> {
  const docs = await client.fetch<RecursoBiblioDoc[]>(recursosBiblioQuery);
  return docs.map(toRecursoBiblio);
}

export async function getRecursoBiblioBySlug(slug: string): Promise<RecursoBiblioteca | null> {
  const doc = await client.fetch<RecursoBiblioDoc | null>(recursoBiblioBySlugQuery, { slug });
  return doc ? toRecursoBiblio(doc) : null;
}

export async function getRecursoBiblioSlugs(): Promise<string[]> {
  const rows = await client.fetch<{ slug: string }[]>(recursoBiblioSlugsQuery);
  return rows.map((r) => r.slug).filter(Boolean);
}

// --- Vitrina (directorio comercial) -------------------------------------
type ImagenDoc = { asset?: { _ref?: string } };
type EmpresaVitrinaDoc = {
  _id: string;
  nombre: string;
  slug: string;
  nivel?: NivelVitrina;
  titular?: string;
  descripcion?: string;
  categorias?: string[];
  zonas?: string[];
  logo?: ImagenDoc;
  logoUrl?: string;
  galeria?: ImagenDoc[];
  sitioWeb?: string;
  emailContacto?: string;
  telefono?: string;
  anioDesde?: number;
  proyectosDestacados?: { titulo?: string; descripcion?: string; imagen?: ImagenDoc }[];
  vigenteHasta?: string;
  activo?: boolean;
  actorTypes?: string[];
  solutions?: string[];
  materials?: string[];
  capabilities?: string[];
  regions?: string[];
  coverageType?: string;
  cciRelationship?: string[];
  minvuStatus?: {
    approvedCompany?: boolean;
    resolutions?: string[];
    plants?: string[];
    vitCount?: number;
  } | null;
  validationStatus?: string;
  certificaciones?: string[];
  direccionPlantas?: string[];
  lastVerifiedAt?: string;
};

// Devuelve un arreglo de strings solo con valores válidos (sin nulos ni vacíos).
function limpiarLista(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && x.length > 0) : [];
}

function toEmpresaVitrina(d: EmpresaVitrinaDoc): EmpresaVitrina {
  // Mismo patrón dual que las noticias: imagen subida a Sanity o URL externa.
  const logo = d.logo?.asset?._ref
    ? builder.image(d.logo).width(480).fit("max").auto("format").url()
    : d.logoUrl || undefined;

  const galeria = (Array.isArray(d.galeria) ? d.galeria : [])
    .filter((g) => g?.asset?._ref)
    .map((g) => builder.image(g).width(1400).fit("max").auto("format").url());

  const proyectosDestacados = (Array.isArray(d.proyectosDestacados) ? d.proyectosDestacados : [])
    .filter((p) => p?.titulo)
    .map((p) => ({
      titulo: p.titulo as string,
      descripcion: p.descripcion,
      imagen: p.imagen?.asset?._ref
        ? builder.image(p.imagen).width(1200).fit("max").auto("format").url()
        : undefined,
    }));

  return {
    id: d._id,
    slug: d.slug,
    nombre: d.nombre,
    nivel: (d.nivel as NivelVitrina) ?? "bronce",
    titular: d.titular,
    descripcion: d.descripcion,
    categorias: Array.isArray(d.categorias) ? d.categorias : [],
    zonas: Array.isArray(d.zonas) ? d.zonas : [],
    logo,
    galeria,
    sitioWeb: d.sitioWeb,
    emailContacto: d.emailContacto,
    telefono: d.telefono,
    anioDesde: d.anioDesde,
    proyectosDestacados,
    vigenteHasta: d.vigenteHasta,
    activo: d.activo !== false,
    // Taxonomía multiatributo: arreglos vacíos cuando aún no se clasifica.
    actorTypes: limpiarLista(d.actorTypes),
    solutions: limpiarLista(d.solutions),
    materials: limpiarLista(d.materials),
    capabilities: limpiarLista(d.capabilities),
    regions: limpiarLista(d.regions),
    coverageType: d.coverageType || undefined,
    cciRelationship: limpiarLista(d.cciRelationship),
    minvuStatus: d.minvuStatus
      ? {
          approvedCompany: d.minvuStatus.approvedCompany,
          resolutions: limpiarLista(d.minvuStatus.resolutions),
          plants: limpiarLista(d.minvuStatus.plants),
          vitCount: d.minvuStatus.vitCount,
        }
      : undefined,
    validationStatus: d.validationStatus || undefined,
    certificaciones: limpiarLista(d.certificaciones),
    direccionPlantas: limpiarLista(d.direccionPlantas),
    lastVerifiedAt: d.lastVerifiedAt || undefined,
  };
}

/**
 * Visibilidad en el sitio: se ocultan las inactivas y las publicaciones
 * "pagada" cuya vigencia ya pasó (comparación por fecha ISO en tiempo de build).
 */
function esVisible(e: EmpresaVitrina): boolean {
  if (!e.activo) return false;
  const hoy = new Date().toISOString().slice(0, 10);
  if (e.nivel === "pagada" && e.vigenteHasta && e.vigenteHasta < hoy) return false;
  return true;
}

export async function getEmpresasVitrina(): Promise<EmpresaVitrina[]> {
  const docs = await client.fetch<EmpresaVitrinaDoc[]>(empresasVitrinaQuery);
  return docs.map(toEmpresaVitrina).filter(esVisible);
}

export async function getEmpresaVitrinaBySlug(slug: string): Promise<EmpresaVitrina | null> {
  const doc = await client.fetch<EmpresaVitrinaDoc | null>(empresaVitrinaBySlugQuery, { slug });
  if (!doc) return null;
  const empresa = toEmpresaVitrina(doc);
  return esVisible(empresa) ? empresa : null;
}

export async function getEmpresaVitrinaSlugs(): Promise<string[]> {
  const empresas = await getEmpresasVitrina();
  return empresas.map((e) => e.slug).filter(Boolean);
}
