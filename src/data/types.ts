// Tipos del dominio. Centralizados para mapear a un CMS a futuro.

import type { PortableTextBlock } from "@portabletext/types";

export type ContentType = "editorial" | "socio" | "patrocinado";

export type Category =
  | "País y políticas públicas"
  | "Vivienda industrializada"
  | "Innovación y productividad"
  | "Casos de socios"
  | "Normativa y certificación"
  | "Sostenibilidad"
  | "Opinión experta"
  | "Eventos CCI"
  | "Internacional"
  | "Publirreportajes";

export type PartnerCategory =
  | "Industrializadora"
  | "Proveedor de materiales"
  | "Ingeniería"
  | "Arquitectura"
  | "Tecnología"
  | "Academia"
  | "Institución publica / gremial";

export interface Partner {
  id: string;
  slug: string;
  name: string;
  category: PartnerCategory;
  description: string;
  logoInitials: string;
  logoColor: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  type: ContentType;
  date: string;
  author: string;
  image: { from: string; to: string; label: string };
  /** Foto de portada. URL remota (Unsplash, licencia libre) o /img/... local. */
  photo?: string;
  readingMinutes: number;
  content: string[];
  /** Cuerpo en texto enriquecido (Portable Text) desde Sanity. Se renderiza
   *  con <PortableText>. `content` se mantiene como texto plano de respaldo. */
  body?: PortableTextBlock[];
  partner?: Partner;
  /** URL de la fuente original de la noticia. Toda noticia real la lleva. */
  sourceUrl?: string;
  sourceName?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "Guía técnica" | "Estudio" | "Normativa" | "Ficha";
  /** Derivados del archivo subido en Sanity. Opcionales: los recursos migrados
   *  aún no tienen archivo cargado (descargas simuladas, ver SEGURIDAD.md). */
  format?: "PDF" | "XLSX" | "ZIP";
  weight?: string;
  date: string;
}

// ---- Biblioteca editorial (Fase 2 · paso 4) ----------------------------
export type CategoriaRecurso =
  | "guias" | "estudios" | "normativa" | "fichas" | "herramientas"
  | "plantillas" | "casos" | "reportes" | "publicaciones_internacionales";

export type EstadoRecurso =
  | "disponible" | "actualizado" | "en_revision" | "en_preparacion" | "proximamente" | "archivado";

export interface RecursoBiblioteca {
  id: string;
  titulo: string;
  slug: string;
  categoria?: CategoriaRecurso;
  temas: string[];
  bajada?: string;
  portada?: string;
  autores?: string;
  institucion?: string;
  fechaPublicacion?: string;
  version?: string;
  paginas?: number;
  formato?: string;
  estado: EstadoRecurso;
  requiereFormulario: boolean;
  /** URL de descarga resuelta: archivo de Sanity o enlace externo/interno. */
  archivoUrl?: string;
  archivoExt?: string;
  enlaceExterno?: string;
  esExterno: boolean;
  intro?: PortableTextBlock[];
  hallazgos: string[];
  cuerpo?: PortableTextBlock[];
  recursosRelacionados: string[];
  terminosGlosario: string[];
  /** Slugs del registro de indicadores (src/lib/datos) citados en la ficha. */
  indicadoresDestacados: string[];
  fechaActualizacion?: string;
}

export interface CCIEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  modality: "Presencial" | "Online" | "Híbrido";
  description: string;
}

// ---- Gobernanza del dato (puntos 9, 10, 53, 57 del prompt maestro) ----

// De dónde viene un dato. Define su badge y su nivel de confianza.
export type SourceType =
  | "oficial"       // MINVU, INE, organismos públicos
  | "cci"           // levantado por el Consejo
  | "empresa"       // declarado por empresa participante
  | "académica"     // universidad, paper
  | "internacional" // investigación internacional
  | "estimación";   // cálculo con metodología explícita

// Estado de verificación: distingue dato real de placeholder de desarrollo.
export type DataStatus = "real" | "mock" | "pending";

export interface Source {
  id: string;
  title: string;
  organization: string;
  year: number;
  url?: string;
  sourceType: SourceType;
}

export interface Indicator {
  id: string;
  // valor a mostrar en grande. Puede ser texto ("20–50%") o número formateado.
  value: string;
  unit?: string;
  label: string;
  // contexto obligatorio: qué mide y matices
  note: string;
  status: DataStatus;
  sourceType: SourceType;
  source?: Source;
  lastUpdated?: string; // ISO
  // ámbito geográfico del dato
  geography: "Chile" | "Internacional";
}

export interface Study {
  id: string;
  slug: string;
  title: string;
  organization: string;
  year: number;
  geography: "Chile" | "Internacional";
  topic: string;
  keyFinding: string; // hallázgo principal parafraseado
  url?: string;
  sourceType: SourceType;
}

// ---- Radar: empresas certificadas y línea de tiempo --------------------

export interface CertifiedCompany {
  name: string;
  resolution: string;
  date: string; // ISO
  year: number;
  /** true cuando es una segunda resolución de una empresa ya certificada */
  repeat?: boolean;
  /** empresa además en convenio con DITEC */
  convenio?: boolean;
}

// ---- Voces de la industrialización -------------------------------------

export interface VozEntrevistaItem {
  pregunta: string;
  respuesta: string;
}

export interface Voz {
  id: string;
  slug: string;
  nombre: string;
  cargo?: string;
  organizacion?: string;
  /** URL del retrato: imagen de Sanity ya resuelta o URL externa. */
  foto?: string;
  fraseDestacada?: string;
  entrevista: VozEntrevistaItem[];
  linkedin?: string;
  orden?: number;
}

// ---- EICI (Encuentro Internacional de Construcción Industrializada) -----

export interface EiciGalleryItem {
  url: string;
  caption?: string;
}

export interface EiciConfig {
  tituloProximaEdicion: string;
  /** ISO date (YYYY-MM-DD) de inicio; la cuenta regresiva apunta aquí. */
  fechaInicio?: string;
  fechaFin?: string;
  lugar?: string;
  emailCallForSpeakers?: string;
  mostrarCallForSpeakers: boolean;
  galeria: EiciGalleryItem[];
}

// ---- Vitrina (directorio comercial del ecosistema) ---------------------

export type NivelVitrina =
  | "oro"
  | "plata"
  | "bronce"
  | "profesional"
  | "academia"
  | "pagada";

export interface VitrinaProyecto {
  titulo: string;
  descripcion?: string;
  /** URL de la imagen del proyecto, ya resuelta desde Sanity. */
  imagen?: string;
}

/** Registro oficial DITEC/MINVU (se llena en la validación humana). */
export interface MinvuStatus {
  approvedCompany?: boolean;
  resolutions: string[];
  plants: string[];
  vitCount?: number;
}

export interface EmpresaVitrina {
  id: string;
  slug: string;
  nombre: string;
  nivel: NivelVitrina;
  titular?: string;
  descripcion?: string;
  categorias: string[];
  zonas: string[];
  /** URL del logo: imagen de Sanity ya resuelta o URL externa. */
  logo?: string;
  galeria: string[];
  sitioWeb?: string;
  emailContacto?: string;
  telefono?: string;
  anioDesde?: number;
  proyectosDestacados: VitrinaProyecto[];
  /** ISO date (YYYY-MM-DD). Solo relevante para nivel "pagada". */
  vigenteHasta?: string;
  activo: boolean;

  // --- Taxonomía multiatributo (Fase 2 · paso 2) ---
  // Valores de src/lib/datos/taxonomia-vitrina.ts. Arreglos vacíos cuando no se
  // ha clasificado (nunca se adivina). Los tipos se mantienen como string[] para
  // no acoplar el dominio a las uniones, pero los valores provienen del catálogo.
  actorTypes: string[];
  solutions: string[];
  materials: string[];
  capabilities: string[];
  regions: string[];
  coverageType?: string;
  cciRelationship: string[];
  minvuStatus?: MinvuStatus;
  validationStatus?: string;
  certificaciones: string[];
  direccionPlantas: string[];
  /** ISO datetime de la última verificación humana del perfil. */
  lastVerifiedAt?: string;
}

export type HitoTipo = "normativa" | "obra" | "gremial" | "dato";

export interface Hito {
  id: string;
  /** Etiqueta corta de período, para el eje */
  periodo: string;
  /** Fecha ISO aproximada, para ordenar */
  fecha: string;
  titulo: string;
  detalle: string;
  tipo: HitoTipo;
  estado: "ejecutado" | "programado";
  fuente?: string;
}
