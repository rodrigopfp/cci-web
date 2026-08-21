import type { NivelVitrina } from "@/data/types";

/**
 * Metadatos de cada nivel de la Vitrina: etiqueta visible, orden de prioridad
 * (oro → plata → bronce → pagada) y clases de la insignia. Los niveles
 * "profesional" y "academia" no van en la grilla de tarjetas (se listan aparte).
 */
export const NIVEL_INFO: Record<
  NivelVitrina,
  { label: string; orden: number; chip: string; enGrilla: boolean }
> = {
  oro: { label: "Socio Oro", orden: 0, chip: "bg-cci-orange text-white", enGrilla: true },
  plata: { label: "Socio Plata", orden: 1, chip: "bg-cci-paper text-cci-slate", enGrilla: true },
  bronce: { label: "Socio Bronce", orden: 2, chip: "bg-cci-orange-soft text-cci-orange-dark", enGrilla: true },
  pagada: {
    label: "Publicación pagada",
    orden: 3,
    chip: "border border-dashed border-cci-orange bg-white text-cci-orange-dark",
    enGrilla: true,
  },
  profesional: { label: "Socio Profesional", orden: 4, chip: "bg-cci-blue-soft text-cci-blue", enGrilla: false },
  academia: { label: "Academia", orden: 5, chip: "bg-cci-blue-soft text-cci-blue", enGrilla: false },
};

export function ordenNivel(n: NivelVitrina): number {
  return NIVEL_INFO[n]?.orden ?? 9;
}

// Listas de filtros (reflejan las opciones del tipo empresaVitrina en Sanity).
export const CATEGORIAS_VITRINA = [
  "hormigón prefabricado",
  "madera/CLT",
  "acero liviano",
  "módulos 3D",
  "envolvente",
  "instalaciones",
  "ingeniería y diseño",
  "servicios",
] as const;

export const ZONAS_VITRINA = ["Norte", "Centro", "Sur", "Austral", "Todo Chile", "Internacional"] as const;

/** mailto de contacto con el asunto fijo pedido para la Vitrina. */
export function mailtoContacto(email: string, nombreEmpresa: string): string {
  const asunto = encodeURIComponent("Contacto desde la Vitrina CCI");
  const cuerpo = encodeURIComponent(
    `Hola ${nombreEmpresa},\n\nLos encontramos en la Vitrina del CCI y nos gustaría conversar sobre:\n\n\nSaludos,\n`
  );
  return `mailto:${email}?subject=${asunto}&body=${cuerpo}`;
}
