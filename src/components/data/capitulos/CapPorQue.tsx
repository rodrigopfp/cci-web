"use client";

import Link from "next/link";
import { Reveal, Kicker, StatIndicador, GUIA_HREF, FuenteDetalle } from "../piezas";
import { RankingBarreras } from "../RankingBarreras";
import type { CapituloProps } from "./registro";

export function CapPorQue({ reduced }: CapituloProps) {
  return (
    <section id="cap3" className="scroll-mt-[160px] bg-white">
      <div className="container-cci py-16 md:py-20">
        <Reveal reduced={reduced}>
          <Kicker>03 · Por qué ocurre</Kicker>
          <h2 className="max-w-3xl font-display text-2xl font-900 leading-tight text-cci-ink md:text-4xl">
            La distancia entre obras no es tecnológica: es de sistema productivo
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <Reveal reduced={reduced}>
            <StatIndicador slug="iplc-p10" label="P10 — el 10% menos productivo (m²/persona-día)" reduced={reduced} />
          </Reveal>
          <Reveal reduced={reduced} delay={80}>
            <StatIndicador slug="iplc-p90" label="P90 — el 10% más productivo (m²/persona-día)" reduced={reduced} />
          </Reveal>
          <Reveal reduced={reduced} delay={160}>
            <StatIndicador slug="iplc-brecha-deciles" label="Brecha entre el mejor y el peor decil de obras" reduced={reduced} />
          </Reveal>
        </div>

        {/* Ranking de barreras con evidencia (reemplaza los 3 bullets sin
            respaldo). El resto del capítulo se conserva. */}
        <Reveal reduced={reduced} className="mt-12 max-w-3xl">
          <RankingBarreras reduced={reduced} />
        </Reveal>

        {/* Cita de Integración Temprana (intacta), ahora debajo del ranking. */}
        <Reveal reduced={reduced} delay={80} className="mt-10 max-w-2xl">
          <blockquote className="rounded-2xl border-l-4 border-cci-orange bg-cci-orange-soft p-7">
            <p className="font-display text-lg font-800 leading-snug text-cci-graphite md:text-xl">
              «La respuesta metodológica ya está escrita: Integración Temprana — todos los actores del
              proyecto, coordinados desde su génesis.»
            </p>
            <Link href={GUIA_HREF} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cci-orange-dark hover:text-cci-orange">
              Ver la Guía de Integración Temprana
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </blockquote>
        </Reveal>

        <FuenteDetalle slugs={["iplc-p10", "iplc-p90", "iplc-brecha-deciles", "barrera-cfs-colaboracion"]} />
      </div>
    </section>
  );
}
