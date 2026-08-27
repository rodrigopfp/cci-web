"use client";

// RANKING DE BARRERAS — "El problema comienza antes de la fábrica" (cap 03).
//
// Reemplaza la lista de causas sin respaldo por un ranking con evidencia: las 6
// barreras más altas del estudio de Barreras CFS, TODAS aguas arriba de la
// fábrica (diseño y coordinación). El segundo grupo ("en la fábrica y en obra")
// queda deliberadamente VACÍO de barras: ese vacío es el argumento.
//
// Barras horizontales HTML/CSS (no SVG escalado → tipografía en px reales,
// nunca < 11px), misma familia que cap 02 / cap 05. Escala fija 0-100% (no
// normalizada al máximo). Valores, caveat y fuente salen SOLO del registro.
// Sin JS / reduced-motion: barras llenas y cifras finales (export estático).

import { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { obtenerIndicadorConFuente } from "@/lib/datos/indice";
import { useInView, useCountUp } from "@/lib/counters";
import { EtiquetaEvidencia } from "@/components/EtiquetaEvidencia";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const DURAZNO = "#F6B27E"; // mismo durazno de cap 02

const GLOSARIO_INTEGRACION = "/glosario/integracion-temprana";

// Etiquetas de presentación (el registro NO tiene shortTitle para las barreras;
// los valores y todo lo demás sí salen del registro por slug).
const BARRERAS = [
  { slug: "barrera-cfs-colaboracion", label: "Falta de trabajo colaborativo" },
  { slug: "barrera-cfs-estandarizacion-diseno", label: "Falta de estandarización del diseño" },
  { slug: "barrera-cfs-integracion-temprana", label: "Falta de integración temprana" },
  { slug: "barrera-cfs-definicion-temprana-diseno", label: "Definición tardía del diseño" },
  { slug: "barrera-cfs-estandarizacion-materiales", label: "Poca estandarización de materiales" },
  { slug: "barrera-cfs-adopcion-bim", label: "Escasa adopción de BIM" },
];

function Barra({
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
    <div className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 sm:grid-cols-[minmax(0,13rem)_1fr_auto]">
      <span className="col-span-2 text-sm font-600 text-cci-ink sm:col-span-1">{label}</span>
      {/* Track a ancho completo = escala 0-100% compartida por todas las barras. */}
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
      <span className="text-right font-mono text-sm font-700 tabular-nums text-cci-ink">{Math.round(count)}%</span>
    </div>
  );
}

function Pildora({ tono, children }: { tono: "durazno" | "neutro"; children: React.ReactNode }) {
  const cls =
    tono === "durazno"
      ? "bg-cci-orange-soft text-cci-orange-dark"
      : "bg-cci-paper text-cci-slate";
  return (
    <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-700 uppercase tracking-wide ${cls}`}>
      {children}
    </span>
  );
}

export function RankingBarreras({ reduced }: { reduced: boolean }) {
  const datos = BARRERAS.map((b) => {
    const { indicador } = obtenerIndicadorConFuente(b.slug);
    return { ...b, value: Number(indicador.value) };
  });
  const { indicador: primero, fuente } = obtenerIndicadorConFuente(BARRERAS[0].slug);
  const caveat = primero.caveat;

  const { ref, inView } = useInView<HTMLDivElement>();

  // Crecimiento SSR-safe: parten llenas; tras hidratar, si vamos a animar, se
  // colapsan antes del primer pintado y crecen escalonadas al entrar en viewport.
  const [go, setGo] = useState(true);
  useIso(() => {
    if (!reduced) setGo(false);
  }, [reduced]);
  useEffect(() => {
    if (reduced || inView) setGo(true);
  }, [reduced, inView]);

  const ariaLabel = `Ranking de barreras a la construcción fuera de sitio, percepción declarada por 113 profesionales: ${datos
    .map((d) => `${d.label} ${d.value}%`)
    .join(", ")}.`;

  return (
    <div ref={ref}>
      <h3 className="font-display text-xl font-800 leading-snug text-cci-ink md:text-2xl">
        El problema comienza antes de la fábrica
      </h3>
      <p className="mt-2 max-w-2xl leading-relaxed text-cci-slate">
        Las seis barreras más altas ocurren en el diseño y la coordinación, aguas arriba de la fabricación.
      </p>

      {/* Grupo 1: antes de la fábrica — las 6 barreras */}
      <div className="mt-6">
        <Pildora tono="durazno">Antes de la fábrica</Pildora>
        <div className="mt-3 border-t border-cci-line" />
        <div className="mt-4 space-y-3" role="img" aria-label={ariaLabel}>
          {datos.map((d, i) => (
            <Barra key={d.slug} label={d.label} value={d.value} delay={i * 60} go={go} inView={inView} reduced={reduced} />
          ))}
        </div>
        {/* Enlace al glosario para la barrera de integración temprana (77%).
            Va ADYACENTE a las barras (no dentro del role="img") para que sea
            accesible; el role="img" no debe contener controles interactivos. */}
        <p className="mt-3 text-[11px] leading-snug text-cci-slate-light">
          <Link href={GLOSARIO_INTEGRACION} className="font-600 text-cci-orange hover:text-cci-orange-dark">
            Integración temprana en el glosario
          </Link>
        </p>
      </div>

      {/* Grupo 2: en la fábrica y en obra — deliberadamente SIN barras. */}
      <div className="mt-8">
        <Pildora tono="neutro">En la fábrica y en obra</Pildora>
        <div className="mt-3 border-t border-cci-line" />
        <p className="mt-4 rounded-lg border border-dashed border-cci-line bg-cci-paper/60 px-4 py-3 text-sm italic leading-snug text-cci-slate">
          Ninguna de las barreras más altas del estudio apunta a fabricar, transportar o montar.
        </p>
      </div>

      {/* Advertencias VISIBLES + evidencia + fuente. */}
      <div className="mt-6 border-t border-cci-line pt-4">
        <EtiquetaEvidencia tipo={primero.sourceType} />
        <p className="mt-2 text-[11px] leading-snug text-cci-slate-light">{caveat}</p>
        <p className="mt-1 text-[11px] leading-snug text-cci-slate-light">
          113 profesionales; más del 90% ingenieros, constructores y arquitectos; 50% dueños, directores o gerentes.
        </p>
        {fuente.url ? (
          <a
            href={fuente.url}
            target={fuente.url.startsWith("http") ? "_blank" : undefined}
            rel={fuente.url.startsWith("http") ? "noopener noreferrer" : undefined}
            className="mt-2 inline-block text-[11px] font-600 text-cci-slate-light transition hover:text-cci-orange-dark"
          >
            Fuente: {fuente.shortLabel}
          </a>
        ) : (
          <span className="mt-2 inline-block text-[11px] font-600 text-cci-slate-light">Fuente: {fuente.shortLabel}</span>
        )}
      </div>
    </div>
  );
}

export default RankingBarreras;
