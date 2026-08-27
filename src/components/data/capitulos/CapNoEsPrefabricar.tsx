"use client";

import Link from "next/link";
import { IndustrializarEscenas } from "@/components/IndustrializarEscenas";
import { Reveal, Kicker } from "../piezas";
import type { CapituloProps } from "./registro";

export function CapNoEsPrefabricar({ reduced }: CapituloProps) {
  return (
    <section id="cap4" className="scroll-mt-[160px] bg-cci-paper">
      <div className="container-cci py-16 md:py-20">
        <Reveal reduced={reduced}>
          <Kicker>04 · Industrializar no es prefabricar</Kicker>
          <h2 className="max-w-3xl font-display text-2xl font-900 leading-tight text-cci-ink md:text-4xl">
            Industrializar no es prefabricar
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cci-slate">
            <Link href="/glosario/prefabricacion" className="underline decoration-cci-orange/40 underline-offset-4 transition hover:decoration-cci-orange">
              La prefabricación
            </Link>{" "}
            puede ser una herramienta. La industrialización es la metodología que integra el
            proyecto completo.
          </p>
        </Reveal>

        <Reveal reduced={reduced} delay={80}>
          <p className="mt-6 max-w-3xl text-[17px] leading-[1.75] text-cci-ink/90">
            Industrializar no significa simplemente trasladar parte de la obra a una fábrica. Significa
            diseñar, coordinar y gestionar el proyecto como un sistema productivo, integrando
            tempranamente a sus actores y tomando decisiones que consideren desde el inicio la
            fabricación, la logística, el montaje, la operación y el desempeño final.
          </p>
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-cci-slate">
            <span className="font-700 uppercase tracking-wide text-cci-slate-light">Conceptos:</span>
            <Link href="/glosario/integracion-temprana" className="font-600 text-cci-orange hover:text-cci-orange-dark">Integración temprana</Link>
            <Link href="/glosario/dfma" className="font-600 text-cci-orange hover:text-cci-orange-dark">DfMA</Link>
            <Link href="/glosario/bim" className="font-600 text-cci-orange hover:text-cci-orange-dark">BIM</Link>
            <Link href="/glosario/mmc" className="font-600 text-cci-orange hover:text-cci-orange-dark">MMC</Link>
          </p>
        </Reveal>

        <IndustrializarEscenas />

        <Reveal reduced={reduced}>
          <p className="mt-10 font-display text-xl font-800 leading-snug text-cci-ink md:text-2xl">
            Diseñar para fabricar. Fabricar para montar. Medir para mejorar.
          </p>
          <a href="#cap5" className="btn-primary mt-6">Ver qué resultados produce</a>
        </Reveal>
      </div>
    </section>
  );
}
