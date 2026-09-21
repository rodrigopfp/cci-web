// ============================================================================
// ZONAS TÉRMICAS POR VIVIENDA — las 24 fichas VIT publicadas por la Ditec
// ============================================================================
// Cada ficha PDF publicada en minvu.gob.cl incluye el oficio aprobatorio de la
// Ditec, y ese oficio trae el campo "Zona Térmica para la cual se desarrolló".
// Aquí se transcribe LITERAL (zonasLiteral) y se descompone en zonas firmes
// (zonasAprobadas) y zonas aprobadas con condición (zonasCondicionadas), con
// el texto de la condición. NADA se corrige: la ficha 03 dice "A-B-C-D-F" y
// omite la E; se publica tal cual y se anota.
//
// slug = clave del catálogo (CATALOGO en src/app/data/vit/datos-vit.ts), de
// donde salen los nombres visibles. Fuente de cada fila: la ficha PDF de la
// Ditec (url) y la página del PDF donde está el oficio.
// Insumo de trabajo: scripts/fichas-vit/zonas-planta-vit.csv (diagnóstico
// del 20.09.2026, lectura de los 24 PDF con pdftotext -layout).
// ============================================================================

import { ZONAS_TERMICAS, type ZonaTermica } from "./comunas-tipos";

export interface ZonasCondicionadas {
  zonas: ZonaTermica[];
  /** Condición literal del oficio (o su resumen fiel cuando el oficio remite a otro documento). */
  condicion: string;
}

export interface OficioVit {
  numero: string;
  /** ISO. */
  fecha: string;
  /** Página del PDF de la ficha donde está el campo de zona térmica. */
  pagina: string;
}

export interface ViviendaZonas {
  slug: string;
  /** Empresa industrializadora según el oficio (o la atribución de la ficha, anotada). */
  industrializadora: string;
  /** Clave de la industrializadora en plantas.ts. */
  industrializadoraId: string;
  zonasAprobadas: ZonaTermica[];
  zonasCondicionadas: ZonasCondicionadas[];
  /** Campo "Zona Térmica para la cual se desarrolló", tal cual aparece en el oficio. */
  zonasLiteral: string;
  oficio: OficioVit;
  notaLiteral?: string;
  fuente: { id: "ditec-fichas-vit-oficios"; url: string; pagina: string };
}

const M = "https://www.minvu.gob.cl/wp-content/uploads/2025/10";
const FID = "ditec-fichas-vit-oficios" as const;
const Z = (s: string) => s.split("") as ZonaTermica[];

export const ZONAS_VIT: ViviendaZonas[] = [
  {
    slug: "patagual-base", industrializadora: "Patagual Home SpA", industrializadoraId: "patagual",
    zonasAprobadas: Z("ABCDEF"),
    zonasCondicionadas: [{ zonas: Z("GI"), condicion: "el eje 2 no se podrá orientar al sur" }],
    zonasLiteral: "Para zonas A - B - C - D - E ó F. En Zonas G e I, el eje 2 no se podrá orientar al sur.",
    oficio: { numero: "ORD N°46", fecha: "2023-01-10", pagina: "3" },
    notaLiteral: "El oficio no trae el campo «Empresa Industrializadora» (formato anterior a la Res. Ex. N°607 de Patagual); está dirigido a Patagual Home. Se mantiene la atribución de la ficha publicada por el Minvu.",
    fuente: { id: FID, url: `${M}/1-Vivienda-tipo-industrailizada-PATAGUAL2023-2025.pdf`, pagina: "3" },
  },
  {
    slug: "tamarugo", industrializadora: "E2E SpA", industrializadoraId: "e2e",
    zonasAprobadas: Z("ABCDE"), zonasCondicionadas: [],
    zonasLiteral: "A-B-C-D-E",
    oficio: { numero: "ORD N°1372", fecha: "2023-08-24", pagina: "2" },
    fuente: { id: FID, url: `${M}/2-Ficha-Vivienda-Rural-Tamarugo-2025.pdf`, pagina: "2" },
  },
  {
    slug: "e2e-base", industrializadora: "E2E S.A.", industrializadoraId: "e2e",
    zonasAprobadas: Z("ABCDF"), zonasCondicionadas: [],
    zonasLiteral: "A-B-C-D-F",
    oficio: { numero: "ORD N°2167", fecha: "2022-12-02", pagina: "3" },
    notaLiteral: "El oficio dice \"A-B-C-D-F\" y omite la E. Se publica tal cual, sin corregir. El oficio no trae el campo «Empresa Industrializadora»; está dirigido a E2E S.A.",
    fuente: { id: FID, url: `${M}/3-Vivienda-tipo-industrailizada-E2E-2025.pdf`, pagina: "3" },
  },
  {
    slug: "e2e-fn", industrializadora: "E2E S.A.", industrializadoraId: "e2e",
    zonasAprobadas: Z("ABCDE"), zonasCondicionadas: [],
    zonasLiteral: "A-B-C-D-E",
    oficio: { numero: "ORD N°394", fecha: "2023-03-06", pagina: "2" },
    notaLiteral: "El oficio no trae el campo «Empresa Industrializadora»; está dirigido a E2E S.A.",
    fuente: { id: FID, url: `${M}/4-FICHA-E2E-DITEC-FN-Vivienda-tipo-industrailizada-E2E-FN-2025.pdf`, pagina: "2" },
  },
  {
    slug: "pareada-86", industrializadora: "E2E S.A.", industrializadoraId: "e2e",
    zonasAprobadas: Z("ABCD"), zonasCondicionadas: [],
    zonasLiteral: "A-B-C-D",
    oficio: { numero: "ORD N°1755 (reemplaza y rectifica ORD N°11 del 26.10.2023)", fecha: "2023-11-02", pagina: "3" },
    fuente: { id: FID, url: `${M}/5-2da-Ficha-Vivienda-Pareada86-2025.pdf`, pagina: "3" },
  },
  {
    slug: "nandu-pv-rural", industrializadora: "Tecnotruss S.A.", industrializadoraId: "tecnotruss",
    zonasAprobadas: Z("ABCDE"), zonasCondicionadas: [],
    zonasLiteral: "A-B-C-D-E",
    oficio: { numero: "ORD N°2462 (complementado por ORD N°505 del 15.04.2025)", fecha: "2024-12-04", pagina: "5" },
    fuente: { id: FID, url: `${M}/6-Ficha-Vivienda-Rural-Nandu-2025.pdf`, pagina: "5" },
  },
  {
    slug: "nandu-rd-rural", industrializadora: "Tecnotruss S.A.", industrializadoraId: "tecnotruss",
    zonasAprobadas: Z("ABCDE"), zonasCondicionadas: [],
    zonasLiteral: "A-B-C-D-E",
    oficio: { numero: "ORD N°2462 (complementado por ORD N°505 del 15.04.2025)", fecha: "2024-12-04", pagina: "5" },
    fuente: { id: FID, url: `${M}/7-Ficha-Vivienda-Rural-Nandu-RD-2025.pdf`, pagina: "5" },
  },
  {
    slug: "nandu-pv-ds49", industrializadora: "Tecnotruss S.A.", industrializadoraId: "tecnotruss",
    zonasAprobadas: Z("BCDE"), zonasCondicionadas: [],
    zonasLiteral: "B-C-D-E",
    oficio: { numero: "ORD N°777", fecha: "2025-05-23", pagina: "2" },
    fuente: { id: FID, url: `${M}/9-PV-Ficha-Vivienda-Rural-Nandu-DS49-2025.pdf`, pagina: "2" },
  },
  {
    slug: "nandu-rd-ds49", industrializadora: "Tecnotruss S.A.", industrializadoraId: "tecnotruss",
    zonasAprobadas: Z("BCDE"), zonasCondicionadas: [],
    zonasLiteral: "B-C-D-E",
    oficio: { numero: "ORD N°776", fecha: "2025-05-23", pagina: "2" },
    fuente: { id: FID, url: `${M}/8-RD-Ficha-Vivienda-Rural-Nandu-DS49-2025.pdf`, pagina: "2" },
  },
  {
    slug: "tecnopanel-urbana", industrializadora: "Tecnotruss S.A.", industrializadoraId: "tecnotruss",
    zonasAprobadas: Z("ABCDE"), zonasCondicionadas: [],
    zonasLiteral: "A-B-C-D-E",
    oficio: { numero: "ORD N°546", fecha: "2024-02-28", pagina: "2" },
    notaLiteral: "La portada dice Tecnopanel S.A.; el oficio declara como industrializadora a Tecnotruss S.A. (Res. Ex. N°1.093), cuya planta se llama Tecno Panel.",
    fuente: { id: FID, url: `${M}/10-Ficha-Vivienda-TECNOPANEL-URBANA-2025.pdf`, pagina: "2" },
  },
  {
    slug: "santa-magdalena-rural", industrializadora: "Santa Magdalena SpA", industrializadoraId: "santa-magdalena",
    zonasAprobadas: [],
    zonasCondicionadas: [{ zonas: Z("ABCDEF"), condicion: "según condicionantes por zona e informe de cumplimiento del estándar higrotérmico" }],
    zonasLiteral: "A - B - C - D - E - F , de acuerdo a las condicionantes por zona, establecidas en las Especificaciones Técnicas y el documento \"Informe Cumplimiento Estándar Higrotérmico VIT RURAL SANTA MAGDALENA\" que forma parte integral del proyecto aprobado",
    oficio: { numero: "ORD N°1422", fecha: "2023-08-31", pagina: "3" },
    fuente: { id: FID, url: `${M}/11-Ficha-SANTA-MAGDALENA-RURAL-2025.pdf`, pagina: "3" },
  },
  {
    slug: "santa-magdalena-base", industrializadora: "Santa Magdalena SpA", industrializadoraId: "santa-magdalena",
    zonasAprobadas: [],
    zonasCondicionadas: [{ zonas: Z("ABCDEFG"), condicion: "según EETT" }],
    zonasLiteral: "A - B - C - D - E - F - G (según lo establecido en las Especificaciones Técnicas del proyecto)",
    oficio: { numero: "ORD N°457", fecha: "2023-03-09", pagina: "3" },
    notaLiteral: "El oficio no trae el campo «Empresa Industrializadora»; está dirigido a Constructora Santa Magdalena. Se mantiene la atribución de la ficha publicada por el Minvu.",
    fuente: { id: FID, url: `${M}/12-Ficha-SANTA-MAGDALENA-2025.pdf`, pagina: "3" },
  },
  {
    slug: "baumax-depto-base", industrializadora: "Baumax SpA", industrializadoraId: "baumax",
    zonasAprobadas: Z("D"), zonasCondicionadas: [],
    zonasLiteral: "D",
    oficio: { numero: "ORD N°810 (reemplaza ORD N°803 del 03.05.2023)", fecha: "2023-05-03", pagina: "2" },
    notaLiteral: "El oficio no nombra a la industrializadora (propietario del proyecto: Constructora Nova Unión SpA). Se mantiene la atribución a Baumax que hace la ficha publicada por el Minvu.",
    fuente: { id: FID, url: `${M}/13-VI-Ficha-BAUMAX-2025.pdf`, pagina: "2" },
  },
  {
    slug: "baumax-condominio-3p", industrializadora: "Baumax SpA", industrializadoraId: "baumax",
    zonasAprobadas: Z("ABCD"), zonasCondicionadas: [],
    zonasLiteral: "A-B-C-D",
    oficio: { numero: "ORD N°2105", fecha: "2023-12-06", pagina: "2" },
    fuente: { id: FID, url: `${M}/14-Ficha-Baumax-departamento-pequeno-condominio-2025.pdf`, pagina: "2" },
  },
  {
    slug: "baumax-edificio-5p", industrializadora: "Baumax SpA", industrializadoraId: "baumax",
    zonasAprobadas: Z("ABCDEF"), zonasCondicionadas: [],
    zonasLiteral: "A-B-C-D-E-F",
    oficio: { numero: "ORD N°2450", fecha: "2023-12-29", pagina: "2" },
    fuente: { id: FID, url: `${M}/15-Ficha-Baumax-departamento-5-pisos-alta-2025.pdf`, pagina: "2" },
  },
  {
    slug: "huechuraba-i", industrializadora: "Baumax SpA", industrializadoraId: "baumax",
    zonasAprobadas: Z("D"), zonasCondicionadas: [],
    zonasLiteral: "MACRO ZONA D",
    oficio: { numero: "ORD N°248", fecha: "2025-02-17", pagina: "2" },
    notaLiteral: "Propietario del proyecto: Entidad Patrocinante Municipalidad de Huechuraba; industrializadora según el oficio: Baumax SpA.",
    fuente: { id: FID, url: `${M}/16-Ficha-Vivienda-VIT-HUECHURABA-I-2025.pdf`, pagina: "2" },
  },
  {
    slug: "tecnofast-t01", industrializadora: "Tecno Fast S.A.", industrializadoraId: "tecnofast",
    zonasAprobadas: Z("ABCDE"), zonasCondicionadas: [],
    zonasLiteral: "A-B-C-D-E",
    oficio: { numero: "ORD N°545", fecha: "2024-02-28", pagina: "3" },
    fuente: { id: FID, url: `${M}/17-Ficha-Vivienda-TECNOFASTA-T01-2025.pdf`, pagina: "3" },
  },
  {
    slug: "tecnofast-t03", industrializadora: "Tecno Fast S.A.", industrializadoraId: "tecnofast",
    zonasAprobadas: Z("AB"), zonasCondicionadas: [],
    zonasLiteral: "A-B",
    oficio: { numero: "ORD N°2041", fecha: "2023-11-30", pagina: "2" },
    fuente: { id: FID, url: `${M}/18-Ficha-Vivienda-TECNOFASTA-2025.pdf`, pagina: "2" },
  },
  {
    slug: "urbana-pareada", industrializadora: "Tecnotruss S.A.", industrializadoraId: "tecnotruss",
    zonasAprobadas: Z("ABCDE"), zonasCondicionadas: [],
    zonasLiteral: "MACRO ZONA A-B-C-D-E",
    oficio: { numero: "ORD N°507 (deroga ORD N°462 del 10.04.2025)", fecha: "2025-04-16", pagina: "3" },
    notaLiteral: "La portada dice Tecnopanel S.A.; el oficio declara como industrializadora a Tecnotruss S.A.",
    fuente: { id: FID, url: `${M}/19-Ficha-Vivienda-VIT-URABA-PAREADA-2025.pdf`, pagina: "3" },
  },
  {
    slug: "limari-aislada", industrializadora: "Prefabricados Premium SpA", industrializadoraId: "prefabricadas-premium",
    zonasAprobadas: Z("BCDE"), zonasCondicionadas: [],
    zonasLiteral: "MACRO ZONAS BCDE",
    oficio: { numero: "ORD N°2704 (código ajustado por ORD N°251 del 19.02.2025)", fecha: "2024-12-31", pagina: "3" },
    notaLiteral: "El encabezado del oficio escribe «Prefabricados Premium SpA»; la razón social autorizada por la Res. Ex. N°1.657 y el código de aprobación del mismo oficio dicen «Prefabricadas Premium SpA». El ORD N°2704 lleva dos fechas en su encabezado (30/12/2024 y 31 diciembre 2024); se publica 31.12.2024, la que cita el ORD N°251 en ANT. y ADJ.",
    fuente: { id: FID, url: `${M}/20-Ficha-Vivienda-VIT-LIMARI-2025.pdf`, pagina: "3" },
  },
  {
    slug: "limari-adosada", industrializadora: "Prefabricados Premium SpA", industrializadoraId: "prefabricadas-premium",
    zonasAprobadas: Z("ABCDE"), zonasCondicionadas: [],
    zonasLiteral: "A -B-C-D-E",
    oficio: { numero: "ORD N°762", fecha: "2025-05-20", pagina: "2" },
    notaLiteral: "El encabezado del oficio escribe «Prefabricados PREMIUM SpA»; la razón social autorizada por la Res. Ex. N°1.657 y el código de aprobación del mismo oficio dicen «Prefabricadas Premium SpA».",
    fuente: { id: FID, url: `${M}/21-Ficha-Vivienda-VIT-LIMARI-ADOSADA-2025.pdf`, pagina: "2" },
  },
  {
    slug: "promet-base", industrializadora: "Promet Servicios SpA", industrializadoraId: "promet",
    zonasAprobadas: Z("CD"), zonasCondicionadas: [],
    zonasLiteral: "C-D",
    oficio: { numero: "ORD N°749 (complementa el ORD N°1006 del 26.04.2024, no publicado)", fecha: "2025-05-19", pagina: "2" },
    fuente: { id: FID, url: `${M}/22-Ficha-Vivienda-PROMET-2025.pdf`, pagina: "2" },
  },
  {
    slug: "promet-1piso", industrializadora: "Promet Servicios SpA", industrializadoraId: "promet",
    zonasAprobadas: Z("CD"), zonasCondicionadas: [],
    zonasLiteral: "Zonas C-D",
    oficio: { numero: "ORD N°2575", fecha: "2024-12-17", pagina: "2" },
    fuente: { id: FID, url: `${M}/23-Ficha-Vivienda-PROMET-1-PISO-2025.pdf`, pagina: "2" },
  },
  {
    slug: "canada-house", industrializadora: "Canada House SpA", industrializadoraId: "canada-house",
    zonasAprobadas: Z("BCDE"), zonasCondicionadas: [],
    zonasLiteral: "Macrozona B-C-D-E",
    oficio: { numero: "ORD N°424", fecha: "2025-03-31", pagina: "2" },
    notaLiteral: "El oficio cita como autorización la Res. Ex. N°764 de 12.04.2023, que no aparece en la web del Minvu (que lista la Res. Ex. N°1.702 de 13.11.2025).",
    fuente: { id: FID, url: `${M}/24-Ficha-Vivienda-CANADA-HOUSE-2025.pdf`, pagina: "2" },
  },
];

export const ZONAS_VIT_POR_SLUG: Record<string, ViviendaZonas> = Object.fromEntries(ZONAS_VIT.map((v) => [v.slug, v]));

/** Todas las zonas en que la vivienda puede emplazarse (firmes + condicionadas), en orden A–I. */
export function zonasDeVivienda(v: ViviendaZonas): ZonaTermica[] {
  const set = new Set<ZonaTermica>([...v.zonasAprobadas, ...v.zonasCondicionadas.flatMap((c) => c.zonas)]);
  return ZONAS_TERMICAS.filter((z) => set.has(z));
}

/** Condición que aplica a una zona, si la vivienda solo la tiene condicionada. */
export function condicionEnZona(v: ViviendaZonas, zona: ZonaTermica): string | null {
  if (v.zonasAprobadas.includes(zona)) return null;
  const c = v.zonasCondicionadas.find((x) => x.zonas.includes(zona));
  return c ? c.condicion : null;
}

/** ¿La vivienda entra para la zona? Firme o condicionada. */
export function compatibleConZona(v: ViviendaZonas, zona: ZonaTermica): boolean {
  return v.zonasAprobadas.includes(zona) || v.zonasCondicionadas.some((c) => c.zonas.includes(zona));
}

// --- Validación (se integra a scripts/validar-datos.ts) --------------------
export function validarZonasVit(slugsCatalogo: string[]): string[] {
  const errores: string[] = [];
  const vistos = new Set<string>();
  const cat = new Set(slugsCatalogo);
  const hoy = new Date().toISOString().slice(0, 10);
  for (const v of ZONAS_VIT) {
    const d = `vivienda "${v.slug}"`;
    if (vistos.has(v.slug)) errores.push(`${d}: slug duplicado.`);
    vistos.add(v.slug);
    if (!cat.has(v.slug)) errores.push(`${d}: no existe en el CATALOGO de /data/vit.`);
    const todas = [...v.zonasAprobadas, ...v.zonasCondicionadas.flatMap((c) => c.zonas)];
    if (!todas.length) errores.push(`${d}: sin zonas (ni firmes ni condicionadas).`);
    for (const z of todas) if (!ZONAS_TERMICAS.includes(z)) errores.push(`${d}: zona fuera de A–I: "${z}".`);
    for (const c of v.zonasCondicionadas) if (!c.condicion.trim()) errores.push(`${d}: zona condicionada sin texto de condición.`);
    for (const z of v.zonasAprobadas) if (v.zonasCondicionadas.some((c) => c.zonas.includes(z))) errores.push(`${d}: zona "${z}" firme y condicionada a la vez.`);
    if (!v.zonasLiteral.trim()) errores.push(`${d}: zonasLiteral vacío.`);
    if (!v.oficio.numero.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(v.oficio.fecha) || !v.oficio.pagina.trim()) errores.push(`${d}: oficio incompleto (número, fecha ISO y página).`);
    if (v.oficio.fecha > hoy) errores.push(`${d}: fecha del oficio en el futuro (${v.oficio.fecha}).`);
    if (!v.fuente.url.startsWith("https://www.minvu.gob.cl/") || !v.fuente.url.endsWith(".pdf")) errores.push(`${d}: la fuente debe ser la ficha PDF publicada por el Minvu.`);
    if (!v.fuente.pagina.trim()) errores.push(`${d}: fuente sin página.`);
    else if (v.fuente.pagina !== v.oficio.pagina) errores.push(`${d}: la página de la fuente (${v.fuente.pagina}) no coincide con la del oficio (${v.oficio.pagina}).`);
    if (!v.industrializadora.trim() || !v.industrializadoraId.trim()) errores.push(`${d}: industrializadora vacía.`);
  }
  for (const s of slugsCatalogo) if (!vistos.has(s)) errores.push(`El CATALOGO tiene "${s}" sin zonas en vit-zonas.ts.`);
  return errores;
}
