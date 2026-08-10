"use client";

// "Edición 2025 en cifras" del EICI. Cuatro tarjetas con contador animado:
// parten en 0 y suben a su valor al entrar al viewport. Reutiliza los hooks
// compartidos con el Radar (viewport + count-up + prefers-reduced-motion, con
// red de seguridad si el observer no dispara).

import { usePrefersReducedMotion, useInView, useCountUp } from "@/lib/counters";

interface Cifra {
  valor: number;
  /** Prefijo fijo (ej. "+"), no se anima. */
  prefijo?: string;
  etiqueta: string;
}

const CIFRAS: Cifra[] = [
  { valor: 3300, prefijo: "+", etiqueta: "Asistentes" },
  { valor: 14, etiqueta: "Ciudades, de Arica a Punta Arenas" },
  { valor: 100, prefijo: "+", etiqueta: "Expertos" },
  { valor: 3, etiqueta: "Jornadas" },
];

/** Separador de miles con punto (formato es-CL): 3300 → "3.300". */
function miles(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function CifraCard({ valor, prefijo = "", etiqueta, reduced }: Cifra & { reduced: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const v = useCountUp(valor, inView, reduced, 1500);
  return (
    <div
      ref={ref}
      className="flex h-full flex-col items-center rounded-2xl border border-cci-line bg-white px-4 py-5 text-center shadow-card"
    >
      <div className="font-display text-4xl font-900 leading-none tabular-nums text-cci-orange sm:text-5xl">
        {prefijo}
        {miles(v)}
      </div>
      <p className="mt-2 text-sm leading-snug text-cci-slate">{etiqueta}</p>
    </div>
  );
}

export function EiciCifras() {
  const reduced = usePrefersReducedMotion();
  return (
    // 2×2 en móvil, las 4 en una sola fila en desktop; todas de igual altura.
    <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {CIFRAS.map((c) => (
        <CifraCard key={c.etiqueta} {...c} reduced={reduced} />
      ))}
    </div>
  );
}
