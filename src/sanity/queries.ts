/**
 * Consultas GROQ, una por tipo de contenido.
 *
 * Los nombres de campo están en español (los del esquema de Sanity). La capa de
 * conversión (fetch.ts) los traduce a los tipos de src/data/types.ts, de modo
 * que los componentes del sitio no cambian.
 */

// --- Noticias ------------------------------------------------------------
const NOTICIA_FIELDS = `
  _id,
  titulo,
  "slug": slug.current,
  bajada,
  categoria,
  tipo,
  fecha,
  autor,
  foto,
  fotoUrl,
  etiquetaFoto,
  colorDesde,
  colorHasta,
  minutosLectura,
  cuerpo,
  fuenteUrl,
  fuenteNombre
`;

export const noticiasQuery = `*[_type == "noticia"] | order(fecha desc){${NOTICIA_FIELDS}}`;

export const noticiaBySlugQuery = `*[_type == "noticia" && slug.current == $slug][0]{${NOTICIA_FIELDS}}`;

export const noticiaSlugsQuery = `*[_type == "noticia" && defined(slug.current)]{"slug": slug.current}`;

// --- Voces de la industrialización --------------------------------------
const VOZ_FIELDS = `
  _id,
  nombre,
  "slug": slug.current,
  cargo,
  organizacion,
  foto,
  fotoUrl,
  fraseDestacada,
  entrevista[]{ pregunta, respuesta },
  linkedin,
  orden
`;

export const vocesQuery = `*[_type == "voz"] | order(orden asc, nombre asc){${VOZ_FIELDS}}`;

export const vozBySlugQuery = `*[_type == "voz" && slug.current == $slug][0]{${VOZ_FIELDS}}`;

export const vozSlugsQuery = `*[_type == "voz" && defined(slug.current)]{"slug": slug.current}`;

// --- EICI (singleton de la página del Encuentro) ------------------------
export const eiciQuery = `*[_type == "eici"][0]{
  tituloProximaEdicion,
  fechaInicio,
  fechaFin,
  lugar,
  emailCallForSpeakers,
  mostrarCallForSpeakers,
  galeria[]{ _key, caption, asset }
}`;

// --- Empresas certificadas (Radar) --------------------------------------
export const empresasCertificadasQuery = `*[_type == "empresaCertificada"] | order(fecha desc){
  _id,
  nombre,
  resolucion,
  fecha,
  segundaResolucion,
  convenioDitec
}`;

// --- Convenios DITEC (listado oficial, independiente de las certificadas) --
export const conveniosDitecQuery = `*[_type == "convenioDitec"] | order(nombre asc){ nombre }`;

// --- Indicadores (con su fuente dereferenciada) -------------------------
export const indicadoresQuery = `*[_type == "indicador"]{
  _id,
  clave,
  valor,
  unidad,
  etiqueta,
  nota,
  estado,
  tipoFuente,
  ambito,
  actualizado,
  grupo,
  fuente->{ _id, titulo, organizacion, anio, url, tipoFuente }
}`;

// --- Hitos (línea de tiempo) --------------------------------------------
export const hitosQuery = `*[_type == "hito"] | order(fecha asc){
  _id,
  periodo,
  fecha,
  titulo,
  detalle,
  tipo,
  estado,
  fuenteUrl
}`;

// --- Estudios (Evidencia) -----------------------------------------------
export const estudiosQuery = `*[_type == "estudio"]{
  _id,
  titulo,
  "slug": slug.current,
  organizacion,
  anio,
  ambito,
  tema,
  hallazgo,
  tipoFuente,
  url
}`;

// --- Empresas (Ecosistema / Socios) -------------------------------------
export const empresasQuery = `*[_type == "empresa"]{
  _id,
  nombre,
  "slug": slug.current,
  categoria,
  descripcion,
  logo,
  iniciales,
  color,
  sitioWeb
}`;

// --- Eventos ------------------------------------------------------------
export const eventosQuery = `*[_type == "evento"] | order(fecha asc){
  _id,
  titulo,
  fecha,
  lugar,
  modalidad,
  descripcion,
  inscripcionUrl
}`;

// --- Recursos -----------------------------------------------------------
// Se dereferencia el asset del archivo para derivar formato (extensión) y peso.
export const recursosQuery = `*[_type == "recurso"] | order(fecha desc){
  _id,
  titulo,
  descripcion,
  tipo,
  fecha,
  archivo{ asset->{ extension, size } }
}`;

// Biblioteca editorial (/conocimiento): campos completos del recurso.
const RECURSO_BIBLIO_FIELDS = `
  _id,
  titulo,
  "slug": slug.current,
  categoria,
  temas,
  bajada,
  descripcion,
  portada,
  autores,
  institucion,
  fechaPublicacion,
  version,
  paginas,
  formato,
  estadoRecurso,
  requiereFormulario,
  archivo{ asset->{ url, extension, size } },
  enlaceExterno,
  intro,
  hallazgos,
  cuerpo,
  recursosRelacionados,
  terminosGlosario,
  indicadoresDestacados,
  fecha,
  fechaActualizacion
`;

export const recursosBiblioQuery = `*[_type == "recurso" && defined(slug.current)] | order(coalesce(fechaPublicacion, fecha) desc){${RECURSO_BIBLIO_FIELDS}}`;
export const recursoBiblioBySlugQuery = `*[_type == "recurso" && slug.current == $slug][0]{${RECURSO_BIBLIO_FIELDS}}`;
export const recursoBiblioSlugsQuery = `*[_type == "recurso" && defined(slug.current)]{"slug": slug.current}`;

// --- Vitrina (empresas del directorio comercial) ------------------------
const EMPRESA_VITRINA_FIELDS = `
  _id,
  nombre,
  "slug": slug.current,
  nivel,
  titular,
  descripcion,
  categorias,
  zonas,
  logo,
  logoUrl,
  galeria,
  sitioWeb,
  emailContacto,
  telefono,
  anioDesde,
  proyectosDestacados[]{ titulo, descripcion, imagen },
  vigenteHasta,
  activo,
  actorTypes,
  solutions,
  materials,
  capabilities,
  regions,
  coverageType,
  cciRelationship,
  minvuStatus,
  validationStatus,
  certificaciones,
  direccionPlantas,
  lastVerifiedAt
`;

export const empresasVitrinaQuery = `*[_type == "empresaVitrina"] | order(nombre asc){${EMPRESA_VITRINA_FIELDS}}`;
export const empresaVitrinaBySlugQuery = `*[_type == "empresaVitrina" && slug.current == $slug][0]{${EMPRESA_VITRINA_FIELDS}}`;
