"use client";

import { StudyCard } from "@/components/StudyCard";
import { obtenerFuente, obtenerIndicador } from "@/lib/datos/indice";
import { Reveal, Kicker, StatCard, StatIndicador, BarDuel, FuenteDetalle, val } from "../piezas";
import type { CapituloProps } from "./registro";

export function CapQueCambia({ reduced, studiesInternacionales }: CapituloProps) {
  // Derivados de cap 04 (un registro consumido dos veces: duelo + tarjeta %).
  const prodSin = val("iplc-productividad-sin-mmc");
  const prodCon = val("iplc-productividad-con-mmc");
  const resSin = val("iplc-residuos-sin-mmc");
  const resCon = val("iplc-residuos-con-mmc");
  const atrSin = val("iplc-atrasos-sin-mmc");
  const atrCon = val("iplc-atrasos-con-mmc");
  const deltaProd = Math.round(((prodCon - prodSin) / prodSin) * 100); // +23
  const deltaRes = Math.round(((resCon - resSin) / resSin) * 100); // -30
  const factorAtr = Math.round(atrSin / atrCon); // 3
  const iplc = obtenerFuente("iplc-2025");
  // Las tres cifras derivadas de los duelos comparten la evidencia del IPLC
  // (muestra sectorial); reusamos su alcance para la nota de interpretación.
  const iplcScope = obtenerIndicador("iplc-productividad-con-mmc").scope;

  return (
    <section id="cap5" className="scroll-mt-[160px] bg-cci-graphite-dark">
      <div className="container-cci py-16 md:py-20">
        <Reveal reduced={reduced}>
          <Kicker dark>05 · Qué cambia cuando se industrializa</Kicker>
          <h2 className="max-w-3xl font-display text-2xl font-900 leading-tight text-white md:text-4xl">
            Cuando el proceso se industrializa, los resultados se miden — y se notan
          </h2>
        </Reveal>

        {/* 4 tarjetas de cifra (3 derivadas de los duelos + BIM directo) */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal reduced={reduced}>
            <StatCard value={Math.abs(deltaProd)} prefix={deltaProd >= 0 ? "+" : "−"} suffix="%" label="Productividad con métodos modernos de construcción (MMC)" fuente={iplc.shortLabel ?? iplc.organization} fuenteUrl={iplc.url} reduced={reduced} tipo="survey" scope={iplcScope} />
          </Reveal>
          <Reveal reduced={reduced} delay={70}>
            <StatCard value={Math.abs(deltaRes)} prefix={deltaRes >= 0 ? "+" : "−"} suffix="%" label="Residuos de obra con MMC" fuente={iplc.shortLabel ?? iplc.organization} fuenteUrl={iplc.url} reduced={reduced} tipo="survey" scope={iplcScope} />
          </Reveal>
          <Reveal reduced={reduced} delay={140}>
            <StatCard value={factorAtr} suffix="×" label="Menos obras que terminan fuera de plazo" fuente={iplc.shortLabel ?? iplc.organization} fuenteUrl={iplc.url} reduced={reduced} tipo="survey" scope={iplcScope} />
          </Reveal>
          <Reveal reduced={reduced} delay={210}>
            <StatIndicador slug="iplc-productividad-bim" label="Productividad con coordinación BIM" reduced={reduced} />
          </Reveal>
        </div>

        {/* 3 duelos de barras */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Reveal reduced={reduced} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <BarDuel
              title="Productividad (m²/persona-día)"
              hint="Más es mejor."
              items={[
                { label: "Sin MMC", value: prodSin },
                { label: "Con MMC", value: prodCon, highlight: true },
              ]}
              decimals={2}
              reduced={reduced}
              dark
              tipo="survey"
              scope={iplcScope}
            />
          </Reveal>
          <Reveal reduced={reduced} delay={80} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <BarDuel
              title="Residuos (m³/m²)"
              hint="Menos es mejor."
              items={[
                { label: "Sin MMC", value: resSin },
                { label: "Con MMC", value: resCon, highlight: true },
              ]}
              decimals={2}
              reduced={reduced}
              dark
              tipo="survey"
              scope={iplcScope}
            />
          </Reveal>
          <Reveal reduced={reduced} delay={160} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <BarDuel
              title="Obras fuera de plazo"
              hint="Menos es mejor."
              items={[
                { label: "Sin MMC", value: atrSin, suffix: "%" },
                { label: "Con MMC", value: atrCon, suffix: "%", highlight: true },
              ]}
              reduced={reduced}
              dark
              tipo="survey"
              scope={iplcScope}
            />
          </Reveal>
        </div>

        <p className="mt-6 max-w-3xl text-[11px] leading-relaxed text-white/50">
          Fuente: {iplc.shortLabel} — {iplc.organization}. Gráficos de elaboración propia.
        </p>
        <FuenteDetalle slugs={["iplc-productividad-con-mmc", "iplc-residuos-con-mmc", "iplc-atrasos-con-mmc", "iplc-productividad-bim"]} dark />

        {/* Evidencia internacional (estudios de Sanity) */}
        {studiesInternacionales.length > 0 && (
          <div className="mt-14">
            <Reveal reduced={reduced}>
              <h3 className="font-display text-xl font-800 text-white md:text-2xl">Lo que dice la investigación internacional</h3>
              <p className="mt-2 max-w-2xl text-sm text-white/70">
                Estudios internacionales sobre construcción industrializada off-site. Cada tarjeta enlaza a su fuente.
              </p>
            </Reveal>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {studiesInternacionales.map((s, i) => (
                <Reveal key={s.id} reduced={reduced} delay={(i % 2) * 80}>
                  <StudyCard study={s} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
