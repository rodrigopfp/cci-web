"use client";

// BRECHA VIAL — cierre del cap 02.
//
// Segunda comparación Chile vs referentes internacionales, ahora en
// infraestructura vial: la brecha de productividad no es solo de vivienda.
// Lee como FAMILIA de la barra-duelo de edificación que va justo arriba: mismas
// barras horizontales (HTML/CSS, sin SVG → tipografía en px reales, nunca < 11px)
// y misma técnica de animación del sitio (IntersectionObserver + CSS + el
// contador de lib/counters). Chile en durazno (el dato que importa), referente
// internacional en neutro claro. Todo sale del registro (obtenerIndicadorConFuente).
//
// Sin JS / reduced-motion: barras llenas y cifras finales (export estático).

import { useEffect, useLayoutEffect, useState } from "react";
import { obtenerIndicadorConFuente } from "@/lib/datos/indice";
import { useInView, useCountUp } from "@/lib/counters";
import { EtiquetaEvidencia } from "@/components/EtiquetaEvidencia";
import { formatCL } from "./piezas";

// useLayoutEffect en cliente, useEffect en servidor (mismo patrón que counters).
const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;
// Mismo durazno calibrado en SlopeRelativa.tsx.
const DURAZNO = "#F6B27E";

type Dato = { label: string; value: number; chile?: boolean };

function Barra({
  d,
  max,
  decimals,
  suffix,
  go,
  inView,
  reduced,
}: {
  d: Dato;
  max: number;
  decimals: number;
  suffix: string;
  go: boolean;
  inView: boolean;
  reduced: boolean;
}) {
  const count = useCountUp(d.value, inView, reduced);
  const pct = max > 0 ? (d.value / max) * 100 : 0;
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <span className={`text-sm font-600 ${d.chile ? "" : "text-white/80"}`} style={d.chile ? { color: DURAZNO } : undefined}>
          {d.label}
        </span>
        <span
          className={`font-mono text-sm font-700 tabular-nums ${d.chile ? "" : "text-white/70"}`}
          style={d.chile ? { color: DURAZNO } : undefined}
        >
          {formatCL(count, decimals)}
          {suffix}
        </span>
      </div>
      <div className="h-3.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full"
          style={{
            width: go ? `${pct}%` : "0%",
            background: d.chile ? DURAZNO : "rgba(255,255,255,0.4)",
            transition: reduced ? "none" : "width 1000ms ease",
          }}
        />
      </div>
    </div>
  );
}

function Fila({
  titulo,
  hint,
  datos,
  decimals,
  suffix,
  go,
  inView,
  reduced,
}: {
  titulo: string;
  hint: string;
  datos: Dato[];
  decimals: number;
  suffix: string;
  go: boolean;
  inView: boolean;
  reduced: boolean;
}) {
  // Escala PROPIA de la fila (no se compara entre filas).
  const max = Math.max(...datos.map((d) => d.value));
  return (
    <div>
      <div className="mb-3">
        <span className="text-sm font-700 text-white">{titulo}</span>
      </div>
      <div className="space-y-3">
        {datos.map((d) => (
          <Barra key={d.label} d={d} max={max} decimals={decimals} suffix={suffix} go={go} inView={inView} reduced={reduced} />
        ))}
      </div>
      <p className="mt-2 text-[11px] text-white/50">{hint}</p>
    </div>
  );
}

export function BrechaVial({ reduced }: { reduced: boolean }) {
  const { indicador: pvc, fuente } = obtenerIndicadorConFuente("productividad-vial-chile");
  const { indicador: pvi } = obtenerIndicadorConFuente("productividad-vial-internacional");
  const { indicador: dvc } = obtenerIndicadorConFuente("desviacion-plazo-vial-chile");
  const { indicador: dvi } = obtenerIndicadorConFuente("desviacion-plazo-vial-internacional");
  const caveat = dvc.caveat;
  const muestra = fuente.muestra; // { proyectos, empresas } — del registro

  const { ref, inView } = useInView<HTMLDivElement>();

  // Crecimiento de barras (SSR-safe): parten llenas; tras hidratar, si vamos a
  // animar, se colapsan antes del primer pintado y crecen al entrar en viewport.
  const [go, setGo] = useState(true);
  useIso(() => {
    if (!reduced) setGo(false);
  }, [reduced]);
  useEffect(() => {
    if (reduced || inView) setGo(true);
  }, [reduced, inView]);

  const v = (n: string) => Number(n);
  const nPvc = v(String(pvc.value));
  const nPvi = v(String(pvi.value));
  const nDvc = v(String(dvc.value));
  const nDvi = v(String(dvi.value));

  const ariaLabel = `Brecha en infraestructura vial frente a referentes internacionales. Productividad (más es mejor): Chile ${nPvc} dólares por persona-día frente a ${nPvi}. Desviación de plazo respecto a lo programado (menos es mejor): ${nDvc}% en Chile frente a ${nDvi}%.`;

  return (
    <div ref={ref}>
      <h3 className="font-display text-xl font-800 leading-snug text-white md:text-2xl">
        La brecha atraviesa toda la construcción
      </h3>
      <p className="mt-2 max-w-2xl leading-relaxed text-white/75">
        No es un problema de un tipo de obra. En infraestructura vial la distancia con los referentes
        internacionales también es grande.
      </p>

      <div className="mt-6 space-y-6" role="img" aria-label={ariaLabel}>
        <Fila
          titulo="Productividad (US$ por persona-día)"
          hint="Más es mejor."
          decimals={0}
          suffix=""
          go={go}
          inView={inView}
          reduced={reduced}
          datos={[
            { label: "Chile", value: nPvc, chile: true },
            { label: "Referentes internacionales", value: nPvi },
          ]}
        />
        <Fila
          titulo="Desviación de plazo respecto a lo programado (%)"
          hint="Menos es mejor."
          decimals={0}
          suffix="%"
          go={go}
          inView={inView}
          reduced={reduced}
          datos={[
            { label: "Chile", value: nDvc, chile: true },
            { label: "Referentes internacionales", value: nDvi },
          ]}
        />
      </div>

      {/* Advertencia 1 (visible, no en el <details>): benchmarks distintos. */}
      <p className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] leading-snug text-white/60">
        Son benchmarks distintos y no deben compararse entre sí; ambos muestran brechas frente a referentes internacionales.
      </p>

      {/* Tipo de evidencia + caveat (advertencia 2, VISIBLE) + muestra (advertencia 3) + fuente. */}
      <div className="mt-4 border-t border-white/10 pt-4">
        <EtiquetaEvidencia tipo={dvc.sourceType} dark />
        <p className="mt-2 text-[11px] leading-snug text-white/50">{caveat}</p>
        {muestra && (
          <p className="mt-1 text-[11px] leading-snug text-white/50">
            Muestra: {muestra.proyectos} obras de {muestra.empresas} empresas.
          </p>
        )}
        {fuente.url ? (
          <a
            href={fuente.url}
            target={fuente.url.startsWith("http") ? "_blank" : undefined}
            rel={fuente.url.startsWith("http") ? "noopener noreferrer" : undefined}
            className="mt-2 inline-block text-[11px] font-600 text-white/50 transition hover:text-cci-orange-light"
          >
            Fuente: {fuente.shortLabel}
          </a>
        ) : (
          <span className="mt-2 inline-block text-[11px] font-600 text-white/50">Fuente: {fuente.shortLabel}</span>
        )}
      </div>
    </div>
  );
}

export default BrechaVial;
