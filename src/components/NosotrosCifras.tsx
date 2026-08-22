"use client";

// "El ecosistema en cifras" de la página Quiénes somos. Tarjetas con contador
// animado (0 → valor al entrar al viewport). Reutiliza los hooks compartidos
// con el Radar y el EICI (viewport + count-up + prefers-reduced-motion), sin
// duplicar la lógica de animación.

import { usePrefersReducedMotion, useInView, useCountUp } from "@/lib/counters";

interface Cifra {
  valor: number;
  /** Prefijo fijo (ej. "+"), no se anima. */
  prefijo?: string;
  etiqueta: string;
  fuenteLabel: string;
  /** Si la fuente tiene URL, se enlaza; si no, se muestra como texto. */
  fuenteUrl?: string;
}

const EICI_2025 =
  "https://construccionindustrializada.cl/2025/09/25/industrializacion-a-escala-nacional-eici-cierra-su-edicion-2025-con-actividades-a-lo-largo-del-pais/";

const CIFRAS: Cifra[] = [
  { valor: 125, etiqueta: "Socios en 2024: empresas, profesionales e instituciones", fuenteLabel: "Memoria CCI 2022-2024" },
  { valor: 14000, prefijo: "+", etiqueta: "Personas alcanzadas por las actividades del CCI (2022-2024)", fuenteLabel: "Memoria CCI 2022-2024" },
  { valor: 9, etiqueta: "Regiones del país en el Encuentro Nacional 2023", fuenteLabel: "Memoria CCI 2022-2024" },
  { valor: 3300, prefijo: "+", etiqueta: "Asistentes al EICI 2025, en 14 ciudades", fuenteLabel: "CCI · EICI 2025", fuenteUrl: EICI_2025 },
];

/** Separador de miles con punto (formato es-CL): 3300 → "3.300". */
function miles(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function CifraCard({ valor, prefijo = "", etiqueta, fuenteLabel, fuenteUrl, reduced }: Cifra & { reduced: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const v = useCountUp(valor, inView, reduced, 1500);
  return (
    <div
      ref={ref}
      className="flex h-full flex-col items-center rounded-2xl border border-cci-line bg-white px-5 py-6 text-center shadow-card"
    >
      <div className="font-display text-4xl font-900 leading-none tabular-nums text-cci-orange sm:text-5xl">
        {prefijo}
        {miles(v)}
      </div>
      <p className="mt-3 flex-1 text-sm leading-snug text-cci-slate">{etiqueta}</p>
      {fuenteUrl ? (
        <a
          href={fuenteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-[11px] font-600 text-cci-slate-light hover:text-cci-orange-dark"
        >
          Fuente: {fuenteLabel}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17 17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      ) : (
        <span className="mt-4 text-[11px] font-600 text-cci-slate-light">Fuente: {fuenteLabel}</span>
      )}
    </div>
  );
}

export function NosotrosCifras() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {CIFRAS.map((c) => (
        <CifraCard key={c.etiqueta} {...c} reduced={reduced} />
      ))}
    </div>
  );
}
