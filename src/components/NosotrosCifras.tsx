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
  fuenteUrl: string;
  fuenteLabel: string;
}

/** Separador de miles con punto (formato es-CL): 3300 → "3.300". */
function miles(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function CifraCard({ valor, prefijo = "", etiqueta, fuenteUrl, fuenteLabel, reduced }: Cifra & { reduced: boolean }) {
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
    </div>
  );
}

/** `anios` se calcula en tiempo de compilación (año actual − 2017) y se pasa
 *  desde el componente de servidor, para que "años articulando" no quede fijo. */
export function NosotrosCifras({ anios }: { anios: number }) {
  const reduced = usePrefersReducedMotion();

  const cifras: Cifra[] = [
    {
      valor: anios,
      etiqueta: "años articulando el sector, desde 2017",
      fuenteUrl: "https://construccionindustrializada.cl/quienes-somos/",
      fuenteLabel: "construccionindustrializada.cl",
    },
    {
      valor: 100,
      prefijo: "+",
      etiqueta: "empresas y profesionales socios",
      fuenteUrl: "https://construccionindustrializada.cl/asociados/",
      fuenteLabel: "construccionindustrializada.cl",
    },
    {
      valor: 9,
      etiqueta: "instituciones de educación superior socias (Academia)",
      fuenteUrl: "https://construccionindustrializada.cl/asociados/",
      fuenteLabel: "directorio de asociados",
    },
    {
      valor: 3300,
      prefijo: "+",
      etiqueta: "asistentes al EICI 2025, en 14 ciudades del país",
      fuenteUrl:
        "https://construccionindustrializada.cl/2025/09/25/industrializacion-a-escala-nacional-eici-cierra-su-edicion-2025-con-actividades-a-lo-largo-del-pais/",
      fuenteLabel: "CCI · EICI 2025",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cifras.map((c) => (
        <CifraCard key={c.etiqueta} {...c} reduced={reduced} />
      ))}
    </div>
  );
}
