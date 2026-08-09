import type { Resource, CCIEvent } from "./types";

export const resources: Resource[] = [
  { id: "r1", title: "Guía de certificación de sistemas industrializados", description: "Paso a paso de las rutas de certificación técnica para soluciones constructivas no tradicionales.", type: "Guía técnica", format: "PDF", weight: "3.2 MB", date: "2026-05-01" },
  { id: "r2", title: "Estudio de productividad sectorial 2025", description: "Indicadores comparados de eficiencia, plazo y desperdicio en proyectos industrializados versus convencionales.", type: "Estudio", format: "PDF", weight: "5.7 MB", date: "2026-03-12" },
  { id: "r3", title: "Matriz de homologación normativa", description: "Planilla editable para mapear requisitos de ensayo y documentación exigidos a cada sistema.", type: "Ficha", format: "XLSX", weight: "640 KB", date: "2026-04-08" },
  { id: "r4", title: "Normativa vigente aplicable a construcción offsite", description: "Compilado de referencias regulatorias relevantes para el diseño y aprobación de soluciones industrializadas.", type: "Normativa", format: "PDF", weight: "2.1 MB", date: "2026-02-20" },
  { id: "r5", title: "Plantillas de coordinación BIM para fabricación", description: "Set de plantillas y convenciones para integrar modelos de fabricación y obra.", type: "Ficha", format: "ZIP", weight: "12.4 MB", date: "2026-01-30" },
  { id: "r6", title: "Reporte de sostenibilidad y huella de carbono", description: "Metodología introductoria para estimar y declarar la huella ambiental de soluciones prefabricadas.", type: "Estudio", format: "PDF", weight: "4.0 MB", date: "2025-12-15" },
];

export const events: CCIEvent[] = [
  { id: "e1", title: "Congreso Internacional de Construcción Industrializada 2026", date: "2026-08-19", location: "Centro de Convenciones, Santiago", modality: "Presencial", description: "Tres días de paneles técnicos, visitas a planta y muestra comercial de socios del CCI." },
  { id: "e2", title: "Webinar: Métricas de productividad para el sector", date: "2026-06-11", location: "Online", modality: "Online", description: "Presentación del marco de indicadores comparables propuesto por el gremio." },
  { id: "e3", title: "Mesa técnica: Certificación y subsidios habitacionales", date: "2026-07-02", location: "Sede CCI, Santiago", modality: "Híbrido", description: "Trabajo conjunto con SERVIU regionales sobre homologación y bases de licitación." },
  { id: "e4", title: "Tour de planta: industrialización en acero liviano", date: "2026-06-26", location: "Región Metropolitana", modality: "Presencial", description: "Visita guiada a planta de socio industrializador con recorrido por la línea de producción." },
];
