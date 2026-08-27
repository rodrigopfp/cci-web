"use client";

import Link from "next/link";
import { MetricCard } from "@/components/MetricCard";
import { PotencialGauge } from "@/components/RadarKpis";
import { Reveal, Kicker, metricFromIndicador, evidenciaDe, FuenteDetalle } from "../piezas";
import type { CapituloProps } from "./registro";

export function CapOportunidad({ reduced }: CapituloProps) {
  return (
    <section id="cap1" className="scroll-mt-[160px] bg-white">
      <div className="container-cci py-16 md:py-20">
        <Reveal reduced={reduced}>
          <Kicker>01 · La oportunidad</Kicker>
          <h2 className="max-w-3xl font-display text-2xl font-900 leading-tight text-cci-ink md:text-4xl">
            Chile tiene una meta habitacional histórica por delante
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Reveal reduced={reduced}>
            <MetricCard indicator={metricFromIndicador("deficit-habitacional")} evidencia={evidenciaDe("deficit-habitacional")} />
          </Reveal>
          <Reveal reduced={reduced} delay={80}>
            <MetricCard indicator={metricFromIndicador("meta-habitacional")} evidencia={evidenciaDe("meta-habitacional")} />
          </Reveal>
        </div>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
          <Reveal reduced={reduced}>
            <PotencialGauge reduced={reduced} />
          </Reveal>
          <Reveal reduced={reduced} delay={80}>
            <p className="font-display text-xl font-800 leading-snug text-cci-ink md:text-2xl">
              <Link href="/glosario/construccion-industrializada" className="underline decoration-cci-orange/40 underline-offset-4 transition hover:decoration-cci-orange">
                La construcción industrializada
              </Link>{" "}
              permite responder con velocidad, calidad y menos pérdidas.
            </p>
          </Reveal>
        </div>

        <FuenteDetalle slugs={["deficit-habitacional", "meta-habitacional", "potencial-productividad"]} />
      </div>
    </section>
  );
}
