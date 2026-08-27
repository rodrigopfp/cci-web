"use client";

// CAP · "La mejora existe. El desafío es escalarla." (P1-4).
//
// Capítulo nuevo entre "Qué cambia" (cap5) y "Chile avanza" (cap6). Es el
// primero que se agrega desde el refactor P0-1: se registra en registro.tsx con
// un id PROPIO NO numérico (cap-escalar) para no tocar las anclas cap1..cap8
// (tienen redirects y enlaces internos). La numeración VISIBLE de la pill es 06.
//
// Diseño (alt. C): frase primero, cifras después. Las dos cifras son de APOYO
// (menor peso visual que el párrafo). Valores solo del registro: la PTF sale de
// ptf-construccion-2024; el +23% se REUSA como la MISMA derivación de CapQueCambia
// (deltaProd de iplc-productividad-con-mmc / -sin-mmc), no se duplica ni se escribe
// a mano. Sin JS / reduced-motion: todo estático con valores finales.

import { obtenerIndicadorConFuente, obtenerIndicador } from "@/lib/datos/indice";
import { useInView, useCountUp } from "@/lib/counters";
import { EtiquetaEvidencia } from "@/components/EtiquetaEvidencia";
import { Reveal, Kicker, FuenteDetalle, formatCL } from "../piezas";
import type { CapituloProps } from "./registro";

const DURAZNO = "#F6B27E"; // mismo durazno de cap 02 / cap 03

export function CapMejoraEscalar({ reduced }: CapituloProps) {
  // PTF del sector (dato oficial, sector completo).
  const { indicador: ptf } = obtenerIndicadorConFuente("ptf-construccion-2024");
  const nPtf = Number(ptf.value);

  // +23% con MMC: MISMA derivación que CapQueCambia (no es un slug propio).
  const { indicador: conMmc, fuente: fuenteMmc } = obtenerIndicadorConFuente("iplc-productividad-con-mmc");
  const sinMmc = obtenerIndicador("iplc-productividad-sin-mmc");
  const prodCon = Number(conMmc.value);
  const prodSin = Number(sinMmc.value);
  const deltaProd = Math.round(((prodCon - prodSin) / prodSin) * 100); // +23
  const muestraMmc = fuenteMmc.muestra; // { proyectos: 74, empresas: 25 }

  const { ref, inView } = useInView<HTMLDivElement>();
  const countPtf = useCountUp(nPtf, inView, reduced);
  const countMmc = useCountUp(deltaProd, inView, reduced);

  return (
    <section id="cap-escalar" className="scroll-mt-[160px] bg-cci-paper">
      <div className="container-cci py-16 md:py-20">
        <Reveal reduced={reduced}>
          <Kicker>06 · Escalar la mejora</Kicker>
          <h2 className="max-w-3xl font-display text-2xl font-900 leading-tight text-cci-ink md:text-4xl">
            La mejora existe.<br />El desafío es escalarla.
          </h2>
        </Reveal>

        {/* Párrafo protagonista (frase primero). */}
        <Reveal reduced={reduced} delay={80}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cci-ink/90 md:text-xl">
            Donde se mide proyecto a proyecto, los resultados ya cambian. En el agregado del sector, la
            brecha sigue ahí. No es contradicción: es la distancia entre lo que ya sabemos hacer y lo que
            aún no hemos escalado.
          </p>
        </Reveal>

        {/* Cifras de apoyo (menor peso visual) + nota de no comparabilidad. */}
        <Reveal reduced={reduced} className="mt-10 max-w-2xl">
          <div ref={ref} className="grid gap-4 sm:grid-cols-2">
            {/* PTF — acento neutro */}
            <div className="rounded-r-lg border-l-4 border-cci-slate bg-white/60 py-3 pl-4 pr-3">
              <div className="font-display text-2xl font-900 tabular-nums text-cci-ink">
                {ptf.prefix ?? ""}
                {formatCL(countPtf, 1)}
                {ptf.suffix ?? ""}
              </div>
              <div className="mt-1 text-sm font-600 text-cci-slate">PTF de la construcción, 2024</div>
              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                <EtiquetaEvidencia tipo={ptf.sourceType} />
                <span className="text-[11px] text-cci-slate-light">El sector completo</span>
              </div>
            </div>

            {/* Productividad con MMC — acento durazno */}
            <div className="rounded-r-lg border-l-4 bg-white/60 py-3 pl-4 pr-3" style={{ borderLeftColor: DURAZNO }}>
              <div className="font-display text-2xl font-900 tabular-nums text-cci-ink">
                {deltaProd >= 0 ? "+" : "−"}
                {formatCL(Math.abs(countMmc), 0)}%
              </div>
              <div className="mt-1 text-sm font-600 text-cci-slate">Productividad con MMC</div>
              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                <EtiquetaEvidencia tipo={conMmc.sourceType} />
                {muestraMmc && (
                  <span className="text-[11px] text-cci-slate-light">
                    {muestraMmc.proyectos} proyectos · {muestraMmc.empresas} empresas
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Nota de no comparabilidad — OBLIGATORIA, visible, junto a las cifras (no en el <details>). */}
          <p className="mt-4 rounded-lg border border-cci-line bg-white/70 px-3 py-2 text-sm leading-snug text-cci-slate">
            Metodologías y universos diferentes: no son cifras comparables ni sumables entre sí.
          </p>

          <FuenteDetalle slugs={["ptf-construccion-2024", "iplc-productividad-con-mmc"]} />
        </Reveal>
      </div>
    </section>
  );
}

export default CapMejoraEscalar;
