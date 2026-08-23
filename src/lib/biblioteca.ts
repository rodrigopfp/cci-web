import type { RecursoBiblioteca, CategoriaRecurso, EstadoRecurso } from "@/data/types";

export const ETIQUETAS_CATEGORIA: Record<CategoriaRecurso, string> = {
  guias: "Guías",
  estudios: "Estudios",
  normativa: "Normativa",
  fichas: "Fichas",
  herramientas: "Herramientas",
  plantillas: "Plantillas",
  casos: "Casos",
  reportes: "Reportes",
  publicaciones_internacionales: "Publicaciones internacionales",
};

export const ETIQUETAS_ESTADO: Record<EstadoRecurso, string> = {
  disponible: "Disponible",
  actualizado: "Actualizado",
  en_revision: "En revisión",
  en_preparacion: "En preparación",
  proximamente: "Próximamente",
  archivado: "Archivado",
};

export const ETIQUETAS_TEMA: Record<string, string> = {
  productividad: "Productividad",
  integracion_temprana: "Integración temprana",
  bim: "BIM",
  dfma: "DfMA",
  vivienda: "Vivienda",
  sostenibilidad: "Sostenibilidad",
  certificacion: "Certificación",
  industrializacion: "Industrialización",
  normativa: "Normativa",
  fabricacion: "Fabricación",
  logistica: "Logística",
  montaje: "Montaje",
  latam: "Latam",
};

export function etiquetaTema(t: string): string {
  return ETIQUETAS_TEMA[t] ?? t;
}

/** Chip de color por estado (fondo + texto). */
export function estadoChip(estado: EstadoRecurso): string {
  switch (estado) {
    case "disponible":
    case "actualizado":
      return "bg-cci-blue-soft text-cci-blue";
    case "archivado":
      return "bg-cci-paper text-cci-slate-light";
    default:
      return "bg-cci-orange-soft text-cci-orange-dark";
  }
}

/** URL de descarga resuelta (archivo de Sanity o enlace externo/interno). */
export function urlDescarga(r: RecursoBiblioteca): string | undefined {
  return r.archivoUrl || r.enlaceExterno || undefined;
}

/** ¿Se puede descargar/acceder hoy? Debe tener destino real y estado accesible. */
export function esDescargable(r: RecursoBiblioteca): boolean {
  return Boolean(urlDescarga(r)) && (r.estado === "disponible" || r.estado === "actualizado");
}
