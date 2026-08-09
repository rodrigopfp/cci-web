import type { ContentType, SourceType, DataStatus, Category, HitoTipo } from "@/data/types";

export function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" });
}
export function formatDateShort(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-CL", { day: "2-digit", month: "short" });
}

export const contentTypeLabel: Record<ContentType, string> = {
  editorial: "Editorial CCI",
  socio: "Noticia de socio",
  patrocinado: "Contenido patrocinado",
};
export const contentTypeStyle: Record<ContentType, string> = {
  editorial: "bg-cci-graphite text-white",
  socio: "bg-cci-blue-soft text-cci-blue border border-cci-blue/20",
  patrocinado: "bg-cci-orange-soft text-cci-orange-dark border border-cci-orange/30",
};

// Etiquetas de gobernanza del dato
export const sourceTypeLabel: Record<SourceType, string> = {
  oficial: "Fuente oficial",
  cci: "Fuente CCI",
  empresa: "Fuente empresa",
  académica: "Fuente académica",
  internacional: "Fuente internacional",
  estimación: "Estimación",
};
export const dataStatusLabel: Record<DataStatus, string> = {
  real: "Dato verificado",
  mock: "Dato de ejemplo",
  pending: "En levantamiento",
};

// Etiqueta del tipo de hito en la línea de tiempo del Radar.
export const tipoLabel: Record<HitoTipo, string> = {
  normativa: "Normativa",
  obra: "Obra",
  gremial: "Gremial",
  dato: "Dato",
};
export const dataStatusStyle: Record<DataStatus, string> = {
  real: "bg-cci-blue-soft text-cci-blue",
  mock: "bg-cci-orange-soft text-cci-orange-dark",
  pending: "bg-cci-paper text-cci-slate",
};

/**
 * Etiqueta corta de categoría para las tarjetas.
 * Los nombres completos se conservan en los filtros y en la ficha del artículo;
 * aquí se abrevian a una palabra para que la fila de metadatos no salte de
 * línea y todas las tarjetas queden alineadas entre sí.
 */
export const categoryShort: Record<Category, string> = {
  "País y políticas públicas": "País",
  "Vivienda industrializada": "Vivienda",
  "Innovación y productividad": "Productividad",
  "Casos de socios": "Socios",
  "Normativa y certificación": "Normativa",
  Sostenibilidad: "Sostenibilidad",
  "Opinión experta": "Opinión",
  "Eventos CCI": "Eventos",
  Internacional: "Internacional",
  Publirreportajes: "Publirreportaje",
};
