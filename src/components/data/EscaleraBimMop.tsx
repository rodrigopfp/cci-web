"use client";

// ESCALERA BIM DEL MOP — Pieza 1 del cap "Chile avanza" (P1-7).
//
// 5 direcciones de la DGOP con su avance de implementación de BIM, en escala
// común 0-100%, con una línea vertical de PROMEDIO (17,7%) cruzando el gráfico.
// El contraste 32,0% vs 0,3% es el argumento. Barras HTML/CSS (no SVG escalado),
// mismo lenguaje que el ranking del cap 03. Valores, promedio y caveat SOLO del
// registro. Sin JS / reduced-motion: barras llenas y cifras finales.

import { useEffect, useLayoutEffect, useState } from "react";
import { obtenerIndicador, obtenerFuente } from "@/lib/datos/indice";
import { useInView, useCountUp } from "@/lib/counters";
import { formatCL } from "./piezas";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const DURAZNO = "#F6B27E"; // mismo durazno de cap 02 / cap 03

// Direcciones de mayor a menor (etiquetas cortas de presentación; los valores
// salen del registro por slug).
const DIRECCIONES = [
  { slug: "bim-dgop-arquitectura", label: "Arquitectura" },
  { slug: "bim-dgop-aeropuertos", label: "Aeropuertos" },
  { slug: "bim-dgop-vialidad", label: "Vialidad" },
  { slug: "bim-dgop-obras-portuarias", label: "Obras portuarias" },
  { slug: "bim-dgop-obras-hidraulicas", label: "Obras hidráulicas" },
];

function BarraBim({
  label,
  value,
  delay,
  go,
  inView,
  reduced,
}: {
  label: string;
  value: number;
  delay: number;
  go: boolean;
  inView: boolean;
  reduced: boolean;
}) {
  const count = useCountUp(value, inView, reduced);
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <span className="text-sm font-600 text-cci-ink">{label}</span>
        {/* El VALOR va siempre como texto: se lee igual de claro incluso el 0,3%
            cuya barra es un hilo. */}
        <span className="font-mono text-sm font-700 tabular-nums text-cci-ink">{formatCL(count, 1)}%</span>
      </div>
      <div className="h-3.5 w-full overflow-hidden rounded-full bg-cci-line">
        <div
          className="h-full rounded-full"
          style={{
            width: go ? `${value}%` : "0%",
            background: DURAZNO,
            transition: reduced ? "none" : `width 900ms ease ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export function EscaleraBimMop({ reduced }: { reduced: boolean }) {
  const datos = DIRECCIONES.map((d) => ({ ...d, value: Number(obtenerIndicador(d.slug).value) }));
  const total = obtenerIndicador("bim-dgop-total");
  const avg = Number(total.value); // 17,7
  const caveat = total.caveat;
  const nivelCentral = Number(obtenerIndicador("bim-dgop-nivel-central").value); // 26,5
  const regiones = Number(obtenerIndicador("bim-dgop-regiones").value); // 8,9
  const fBim = obtenerFuente("bim-dgop-2025");
  const fMop = obtenerFuente("mop-madera-2026");

  const { ref, inView } = useInView<HTMLDivElement>();
  const [go, setGo] = useState(true);
  useIso(() => {
    if (!reduced) setGo(false);
  }, [reduced]);
  useEffect(() => {
    if (reduced || inView) setGo(true);
  }, [reduced, inView]);

  const ariaLabel = `Avance de implementación institucional de BIM por dirección de la DGOP, promedio ${formatCL(avg, 1)}%: ${datos
    .map((d) => `${d.label} ${formatCL(d.value, 1)}%`)
    .join(", ")}. Es avance institucional, no porcentaje de proyectos con BIM.`;

  return (
    <div ref={ref}>
      <h3 className="font-display text-xl font-800 leading-snug text-cci-ink md:text-2xl">
        Una transformación a distintas velocidades
      </h3>
      <p className="mt-2 max-w-2xl leading-relaxed text-cci-slate">
        El Ministerio de Obras Públicas avanza en BIM, pero no al mismo ritmo en todas sus direcciones.
      </p>

      {/* Gráfico: tracks a ancho completo (escala 0-100% compartida) + línea de
          promedio vertical en 17,7% cruzando las barras. */}
      <div className="relative mt-6" role="img" aria-label={ariaLabel}>
        <span
          className="absolute top-0 z-10 -translate-x-1/2 whitespace-nowrap text-[11px] font-700 text-cci-graphite"
          style={{ left: `${avg}%` }}
          aria-hidden="true"
        >
          Prom. {formatCL(avg, 1)}%
        </span>
        <div
          className="pointer-events-none absolute bottom-0 z-10 border-l border-dashed border-cci-graphite/60"
          style={{ left: `${avg}%`, top: "1.5rem" }}
          aria-hidden="true"
        />
        <div className="mt-7 space-y-4">
          {datos.map((d, i) => (
            <BarraBim key={d.slug} label={d.label} value={d.value} delay={i * 60} go={go} inView={inView} reduced={reduced} />
          ))}
        </div>
      </div>

      {/* ADVERTENCIA OBLIGATORIA, VISIBLE (no en el <details>): del registro. */}
      <p className="mt-4 rounded-lg border border-cci-line bg-cci-paper px-3 py-2 text-sm leading-snug text-cci-slate">
        {caveat}
      </p>

      {/* Ver fuente y metodología: ficha bim-dgop-2025, dato de segundo nivel
          (nivel central / regiones) y ficha mop-madera-2026. */}
      <details className="group mt-3 rounded-lg border border-cci-line bg-cci-paper px-4 py-2.5">
        <summary className="cursor-pointer list-none text-[11px] font-700 uppercase tracking-wide text-cci-slate">
          Ver fuente y metodología
        </summary>
        <div className="mt-3 space-y-4 text-[12px] leading-relaxed text-cci-slate">
          <div className="space-y-1">
            <div>
              <span className="font-700 text-cci-ink">{fBim.organization}</span> — {fBim.title}
            </div>
            {fBim.url && (
              <div>
                <a href={fBim.url} target="_blank" rel="noopener noreferrer" className="font-600 text-cci-orange hover:text-cci-orange-dark">
                  Ir a la fuente
                </a>
              </div>
            )}
            <div>
              Avance por nivel — Nivel central: {formatCL(nivelCentral, 1)}% · Regiones: {formatCL(regiones, 1)}%.
            </div>
            <div>Alcance: {total.scope}</div>
          </div>
          <div className="space-y-1 border-t border-cci-line pt-3">
            <div>
              <span className="font-700 text-cci-ink">{fMop.organization}</span> — {fMop.title}
            </div>
            {fMop.url && (
              <div>
                <a href={fMop.url} target="_blank" rel="noopener noreferrer" className="font-600 text-cci-orange hover:text-cci-orange-dark">
                  Ir a la fuente
                </a>
              </div>
            )}
            {fMop.notes && <div>{fMop.notes}</div>}
          </div>
        </div>
      </details>
    </div>
  );
}

export default EscaleraBimMop;
