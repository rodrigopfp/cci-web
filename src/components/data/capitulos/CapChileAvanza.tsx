"use client";

import Link from "next/link";
import { obtenerIndicador, obtenerFuente } from "@/lib/datos/indice";
import { EtiquetaEvidencia } from "@/components/EtiquetaEvidencia";
import { Reveal, Kicker, StatIndicador, FuenteDetalle, formatCL } from "../piezas";
import type { CapituloProps } from "./registro";

export function CapChileAvanza({ reduced }: CapituloProps) {
  const r20 = obtenerIndicador("residuos-sectorial-2020");
  const r25 = obtenerIndicador("residuos-sectorial-2025");
  const nch = obtenerIndicador("nch3744");

  return (
    <section id="cap6" className="scroll-mt-[160px] bg-white">
      <div className="container-cci py-16 md:py-20">
        <Reveal reduced={reduced}>
          <Kicker>06 · Chile ya avanza</Kicker>
          <h2 className="max-w-3xl font-display text-2xl font-900 leading-tight text-cci-ink md:text-4xl">
            No es una promesa: el país ya se está midiendo — y mejorando
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal reduced={reduced}>
            <StatIndicador
              slug="productividad-sectorial-crecimiento"
              label={`Productividad sectorial desde 2020 (${obtenerIndicador("productividad-sectorial-crecimiento").description})`}
              reduced={reduced}
            />
          </Reveal>
          <Reveal reduced={reduced} delay={70}>
            <StatIndicador slug="productividad-empresas-remedidas" label="Productividad en empresas re-medidas" reduced={reduced} />
          </Reveal>
          <Reveal reduced={reduced} delay={140}>
            <StatIndicador slug="industrializadoras-certificadas" label="Empresas industrializadoras certificadas por la DITEC" reduced={reduced} />
          </Reveal>
          <Reveal reduced={reduced} delay={210}>
            <StatIndicador slug="tipologias-vit" label="Tipologías VIT aprobadas por la DITEC" reduced={reduced} />
          </Reveal>
        </div>

        <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-cci-slate">
          <span className="font-700 uppercase tracking-wide text-cci-slate-light">Conceptos:</span>
          <Link href="/glosario/empresa-industrializadora-ditec" className="font-600 text-cci-orange hover:text-cci-orange-dark">Empresa industrializadora (DITEC)</Link>
          <Link href="/glosario/vivienda-industrializada-tipo" className="font-600 text-cci-orange hover:text-cci-orange-dark">Vivienda Industrializada Tipo</Link>
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal reduced={reduced}>
            <div className="flex h-full flex-col rounded-2xl border border-cci-blue/20 bg-cci-blue-soft p-7">
              <span className="w-fit rounded-full bg-cci-blue px-2.5 py-1 text-[11px] font-700 uppercase tracking-wide text-white">
                Hito normativo · {nch.value}
              </span>
              <h3 className="mt-4 font-display text-xl font-800 text-cci-ink">
                Chile ya tiene norma oficial de construcción industrializada
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cci-slate">{nch.description}</p>
              <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                <span className="text-[11px] font-600 text-cci-slate-light">
                  Fuente: {obtenerFuente(nch.sourceId).shortLabel}
                </span>
                <EtiquetaEvidencia tipo={nch.sourceType} />
              </div>
            </div>
          </Reveal>

          <Reveal reduced={reduced} delay={80}>
            <blockquote className="flex h-full flex-col justify-center rounded-2xl border-l-4 border-cci-orange bg-cci-orange-soft p-7">
              <p className="font-display text-lg font-800 leading-snug text-cci-graphite md:text-xl">
                «Medir es el primer paso para mejorar: la industria chilena ya se mide bajo el estándar del Manual IPLC.»
              </p>
            </blockquote>
          </Reveal>
        </div>

        <p className="mt-8 text-[11px] leading-relaxed text-cci-slate-light">
          Los residuos sectoriales bajaron de {formatCL(Number(r20.value), 2)} a {formatCL(Number(r25.value), 2)} {r20.unit} entre 2020 y 2025.
        </p>
        <FuenteDetalle
          slugs={[
            "productividad-sectorial-crecimiento",
            "productividad-empresas-remedidas",
            "industrializadoras-certificadas",
            "nch3744",
            "residuos-sectorial-2020",
          ]}
        />

        <div className="mt-8">
          <Link href="/data/latam" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cci-orange hover:text-cci-orange-dark">
            Panorama LATAM
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
