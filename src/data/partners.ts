import type { Partner } from "./types";

// ============================================================================
// ECOSISTEMA — empresas industrializadoras REALES certificadas por la DITEC
// del MINVU (Res. Ex. N°52). Fuente: listado oficial consultado en 08/2026.
//
// IMPORTANTE: estar certificado por la DITEC NO equivale a ser socio del CCI.
// Esta sección muestra el ecosistema industrializador verificable, no el
// padrón de socios. Cuando exista el listado oficial de socios, es un dato
// distinto y debe presentarse por separado.
//
// Los "logos" son marcas tipográficas generadas (iniciales sobre color de
// marca). NO son los logotipos reales de cada empresa: esos requieren que
// cada compañía entregue su archivo y autorice el uso.
// ============================================================================

export const partners: Partner[] = [
  { id: "c1", slug: "patagual-home", name: "Patagual Home", category: "Industrializadora", description: "Certificada en marzo de 2023 y en convenio directo con la DITEC. Cuenta con tipología VIT aprobada para D.S. 49.", logoInitials: "PH", logoColor: "#E04E00" },
  { id: "c2", slug: "e2e", name: "E2E", category: "Industrializadora", description: "En convenio con la DITEC. Registra tipologías VIT aprobadas para D.S. 49 y D.S. 10, incluida la rural Tamarugo y la de familia numerosa.", logoInitials: "E2", logoColor: "#005CAD" },
  { id: "c3", slug: "tecno-fast", name: "Tecno Fast", category: "Industrializadora", description: "Certificada en junio de 2023. Inauguró en Puerto Varas la primera planta industrializada de Los Lagos, con tecnología BIM y procesos automatizados.", logoInitials: "TF", logoColor: "#5C5C5C" },
  { id: "c4", slug: "baumax", name: "Baumax", category: "Industrializadora", description: "En convenio con la DITEC. Sus tipologías VIT incluyen departamento base, pequeño condominio de 3 pisos y edificio de 5 pisos.", logoInitials: "BX", logoColor: "#F1873D" },
  { id: "c5", slug: "tecnotruss", name: "Tecnotruss", category: "Industrializadora", description: "En convenio con la DITEC y con segunda resolución en diciembre de 2025. Registra tipologías rurales y urbanas pareadas.", logoInitials: "TT", logoColor: "#B84000" },
  { id: "c6", slug: "santa-magdalena", name: "Constructora Santa Magdalena", category: "Industrializadora", description: "En convenio con la DITEC desde marzo de 2023. Tipologías aprobadas rural (D.S. 10) y base ampliada (D.S. 49).", logoInitials: "SM", logoColor: "#3D3D3D" },
  { id: "c7", slug: "cintac", name: "Cintac", category: "Proveedor de materiales", description: "Certificada como empresa industrializadora en febrero de 2024, desde la cadena del acero.", logoInitials: "CT", logoColor: "#009DE6" },
  { id: "c8", slug: "prefabricadas-premium", name: "Prefabricadas Premium", category: "Industrializadora", description: "Certificada en octubre de 2023. Registra las tipologías VIT Limarí unifamiliar aislada y familiar adosada para D.S. 49.", logoInitials: "PP", logoColor: "#E04E00" },
];

export function getPartnerBySlug(slug: string) {
  return partners.find((p) => p.slug === slug);
}
