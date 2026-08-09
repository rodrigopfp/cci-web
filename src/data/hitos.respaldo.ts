// ============================================================================
// LÍNEA DE TIEMPO DE LA INDUSTRIALIZACIÓN EN CHILE
//
// Hitos verificables: resoluciones de la DITEC, normas, primeras obras y
// actividades publicadas en la agenda del CCI. Cada hito indica su fuente.
//
// `estado` distingue lo ejecutado de lo comprometido a futuro. La plataforma
// nunca presenta un hito futuro como si ya hubiera ocurrido.
// ============================================================================

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

export const tipoLabel: Record<HitoTipo, string> = {
  normativa: "Normativa",
  obra: "Obra",
  gremial: "Gremial",
  dato: "Dato",
};

const MINVU = "https://www.minvu.gob.cl/construccion-industrializada/";
const CCI = "https://construccionindustrializada.cl/";

export const hitos: Hito[] = [
  {
    id: "h1",
    periodo: "2017",
    fecha: "2017-01-01",
    titulo: "Nace el CCI",
    detalle:
      "El Consejo se forma al alero del programa Construye2025, reuniendo a empresas, academia y sector público en torno a la industrialización.",
    tipo: "gremial",
    estado: "ejecutado",
    fuente: CCI,
  },
  {
    id: "h2",
    periodo: "Ene 2023",
    fecha: "2023-01-17",
    titulo: "Se abre la vía regulatoria",
    detalle:
      "Las Res. Ex. N°52 y N°59 crean el procedimiento para aprobar empresas industrializadoras y proyectos de Vivienda Industrializada Tipo.",
    tipo: "normativa",
    estado: "ejecutado",
    fuente: MINVU,
  },
  {
    id: "h3",
    periodo: "Mar 2023",
    fecha: "2023-03-14",
    titulo: "Primeras industrializadoras certificadas",
    detalle:
      "Patagual Home, Santa Magdalena y E2E son las primeras aprobadas por la DITEC. El mecanismo deja de ser teoría.",
    tipo: "normativa",
    estado: "ejecutado",
    fuente: MINVU,
  },
  {
    id: "h4",
    periodo: "Feb 2025",
    fecha: "2025-02-20",
    titulo: "Primer edificio industrializado de la RM",
    detalle:
      "Sesenta familias reciben sus departamentos en Lo Espejo, en un conjunto modular de cuatro pisos.",
    tipo: "obra",
    estado: "ejecutado",
    fuente: MINVU,
  },
  {
    id: "h5",
    periodo: "Jul 2025",
    fecha: "2025-07-15",
    titulo: "Norma de Construcción de Vivienda Industrializada",
    detalle:
      "El MINVU ordena diseño, transporte, protección contra fuego y fiscalización, distinguiendo lo que se controla en fábrica de lo que se controla en obra.",
    tipo: "normativa",
    estado: "ejecutado",
    fuente: MINVU,
  },
  {
    id: "h6",
    periodo: "Nov 2025",
    fecha: "2025-11-20",
    titulo: "La VIT llega al extremo norte",
    detalle:
      "El condominio Fuerte Bulnes suma quince viviendas industrializadas en Arica y Parinacota, las primeras de la región.",
    tipo: "obra",
    estado: "ejecutado",
    fuente: MINVU,
  },
  {
    id: "h7",
    periodo: "Dic 2025",
    fecha: "2025-12-15",
    titulo: "Primera planta industrializada del sur",
    detalle:
      "Puerto Varas inaugura una planta con tecnología BIM y procesos automatizados, con cobertura entre Concepción y Punta Arenas.",
    tipo: "obra",
    estado: "ejecutado",
    fuente: MINVU,
  },
  {
    id: "h8",
    periodo: "Dic 2025",
    fecha: "2025-12-04",
    titulo: "El Censo dimensiona el problema",
    detalle:
      "El Censo 2024 estima 491.904 requerimientos de nuevas viviendas: el 7,5% de los hogares del país.",
    tipo: "dato",
    estado: "ejecutado",
    fuente: "https://centrodeestudios.minvu.gob.cl/deficit-habitacional-censo-2024/",
  },
  {
    id: "h9",
    periodo: "Jun 2026",
    fecha: "2026-06-04",
    titulo: "Seminario VIT y nuevo directorio CCI",
    detalle:
      "El MINVU convoca a Estado, industria y academia para proyectar la VIT, y el CCI traspasa su directorio para 2026–2028.",
    tipo: "gremial",
    estado: "ejecutado",
    fuente: MINVU,
  },
  {
    id: "h10",
    periodo: "Oct 2026",
    fecha: "2026-10-20",
    titulo: "Edifica 2026",
    detalle:
      "Presencia del Consejo en la principal feria del sector en Santiago, dentro de su agenda de proyección internacional.",
    tipo: "gremial",
    estado: "programado",
    fuente: CCI,
  },
  {
    id: "h11",
    periodo: "Nov 2026",
    fecha: "2026-11-19",
    titulo: "Protocolo de Políticas Públicas",
    detalle:
      "Lanzamiento del protocolo y jornada de interconexión entre sector público, privado y academia.",
    tipo: "gremial",
    estado: "programado",
    fuente: CCI,
  },
  {
    id: "h12",
    periodo: "Por definir",
    fecha: "2027-01-01",
    titulo: "Medir el parque industrializado",
    detalle:
      "El vacío pendiente: cuántas viviendas industrializadas existen, dónde están y con qué desempeño. Requiere metodología y datos de las empresas.",
    tipo: "dato",
    estado: "programado",
  },
];

export const hitosEjecutados = hitos.filter((h) => h.estado === "ejecutado");
export const hitosProgramados = hitos.filter((h) => h.estado === "programado");
