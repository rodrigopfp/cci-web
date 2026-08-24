// Etiqueta de tipo de evidencia (Fase 3 · ajuste 6).
//
// Componente único y reutilizable. Estilo NEUTRO para los 8 tipos: el texto
// distingue, el color no premia ni castiga. Sin hooks → server-safe (se usa en
// componentes de servidor y de cliente). Todo el contenido es texto real (nada
// depende del color) para accesibilidad y lectores de pantalla.

import { infoEvidencia, notaVisibleEvidencia } from "@/lib/datos/evidencia";

export function EtiquetaEvidencia({
  tipo,
  variant = "normal",
  fuente,
  dark = false,
}: {
  tipo: string;
  variant?: "normal" | "compacta";
  /** Texto de fuente para la variante compacta: "Benchmark internacional · MGI 2017". */
  fuente?: string;
  dark?: boolean;
}) {
  const info = infoEvidencia(tipo);
  if (!info) return null;

  // Compacta: texto inline para incrustar en una línea de "Fuente:" existente.
  if (variant === "compacta") {
    return <>{fuente ? `${info.etiqueta} · ${fuente}` : info.etiqueta}</>;
  }

  // Normal: pill sobrio de un solo estilo neutro.
  const cls = dark
    ? "border-white/20 bg-white/[0.08] text-white/80"
    : "border-cci-line bg-cci-paper text-cci-slate";
  return (
    <span
      className={`inline-flex w-fit items-center rounded-md border px-2 py-0.5 text-[10px] font-700 uppercase tracking-wide ${cls}`}
      title={info.interpretacion}
    >
      {info.etiqueta}
    </span>
  );
}

/**
 * Nota de interpretación VISIBLE bajo la cifra, solo para tipos que lo requieren
 * (survey, documented_case, declared_by_organization). Compone la interpretación
 * del mapeo con el scope del indicador. Sin alarmismo: es honestidad.
 */
export function NotaEvidencia({
  tipo,
  scope,
  dark = false,
}: {
  tipo: string;
  scope?: string;
  dark?: boolean;
}) {
  const info = infoEvidencia(tipo);
  if (!info || !notaVisibleEvidencia(tipo)) return null;
  const texto = scope ? `${info.interpretacion} ${scope}` : info.interpretacion;
  return (
    <p className={`mt-2 text-[11px] leading-snug ${dark ? "text-white/50" : "text-cci-slate-light"}`}>{texto}</p>
  );
}
