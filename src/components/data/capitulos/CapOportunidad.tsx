"use client";

// CAP 01 · "La escala del desafío chileno" (P1-8).
//
// Dos escalas simultáneas de demanda de construcción: vivienda (déficit del
// Censo 2024) e infraestructura pública (cartera de 70 obras del MOP, abril
// 2026). Reemplaza el foco anterior en MINVU + meta 2022-2026. Cifras SOLO del
// registro. Sin JS / reduced-motion: cifras finales, sin animación.

import { obtenerIndicadorConFuente, obtenerIndicador } from "@/lib/datos/indice";
import { useInView, useCountUp } from "@/lib/counters";
import { EtiquetaEvidencia } from "@/components/EtiquetaEvidencia";
import { Reveal, Kicker, FuenteDetalle, formatCL } from "../piezas";
import type { CapituloProps } from "./registro";

export function CapOportunidad({ reduced }: CapituloProps) {
  const { indicador: deficit, fuente: fCenso } = obtenerIndicadorConFuente("deficit-habitacional");
  const { indicador: obras, fuente: fMop } = obtenerIndicadorConFuente("mop-obras-priorizadas");
  const inversion = obtenerIndicador("mop-inversion-pib");
  const empleos = obtenerIndicador("mop-empleos-proyectados"); // valor-string (rango)

  const { ref, inView } = useInView<HTMLDivElement>();
  const cDeficit = useCountUp(Number(deficit.value), inView, reduced);
  const cObras = useCountUp(Number(obras.value), inView, reduced);
  const cInversion = useCountUp(Number(inversion.value), inView, reduced);

  return (
    <section id="cap1" className="scroll-mt-[160px] bg-white">
      <div className="container-cci py-16 md:py-20">
        <Reveal reduced={reduced}>
          <Kicker>01 · La escala del desafío</Kicker>
          <h2 className="max-w-3xl font-display text-2xl font-900 leading-tight text-cci-ink md:text-4xl">
            La escala del desafío chileno
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cci-slate">
            No es solo vivienda. La demanda de construcción que Chile enfrenta esta década ocurre en dos
            frentes simultáneos.
          </p>
        </Reveal>

        <div ref={ref}>
          {/* ===== BLOQUE 1 · Vivienda ===== */}
          <Reveal reduced={reduced} className="mt-10">
            <span className="inline-flex w-fit items-center rounded-full bg-cci-orange-soft px-3 py-1 text-[11px] font-700 uppercase tracking-wide text-cci-orange-dark">
              Vivienda
            </span>
            <div className="mt-3 border-t border-cci-line" />
            {/* Estructurado como fila cifra + texto: sumar una segunda cifra (meta
                2026-2030) más adelante es agregar otra fila igual. */}
            <div className="mt-5 grid items-center gap-x-6 gap-y-3 sm:grid-cols-[auto_1fr]">
              <div className="font-display text-5xl font-900 leading-none tabular-nums text-cci-orange md:text-6xl">
                {formatCL(cDeficit, 0)}
              </div>
              <div>
                <p className="text-lg leading-relaxed text-cci-ink">
                  hogares en situación de déficit habitacional. Es el punto de partida de cualquier política
                  de vivienda de esta década.
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <EtiquetaEvidencia tipo={deficit.sourceType} />
                  <span className="text-[11px] font-600 text-cci-slate-light">Fuente: {fCenso.shortLabel}</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ===== BLOQUE 2 · Infraestructura pública ===== */}
          <Reveal reduced={reduced} className="mt-12">
            <span className="inline-flex w-fit items-center rounded-full bg-cci-paper px-3 py-1 text-[11px] font-700 uppercase tracking-wide text-cci-slate">
              Infraestructura pública
            </span>
            <div className="mt-3 border-t border-cci-line" />
            <div className="mt-5 grid gap-6 sm:grid-cols-3">
              <div>
                <div className="font-display text-4xl font-900 tabular-nums text-cci-ink">{formatCL(cObras, 0)}</div>
                <p className="mt-1 text-sm leading-snug text-cci-slate">obras estratégicas priorizadas por el MOP.</p>
              </div>
              <div>
                <div className="font-display text-4xl font-900 tabular-nums text-cci-ink">{formatCL(cInversion, 1)}%</div>
                <p className="mt-1 text-sm leading-snug text-cci-slate">de inversión asociada, como porcentaje del PIB.</p>
              </div>
              <div>
                <div className="font-display text-3xl font-900 leading-tight text-cci-ink">{String(empleos.value)}</div>
                <p className="mt-1 text-sm leading-snug text-cci-slate">empleos directos e indirectos proyectados hacia 2030.</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <EtiquetaEvidencia tipo={obras.sourceType} />
              <span className="text-[11px] font-600 text-cci-slate-light">Fuente: {fMop.shortLabel}</span>
            </div>
            {/* ADVERTENCIA VISIBLE (no en el <details>) */}
            <p className="mt-4 rounded-lg border border-cci-line bg-cci-paper px-3 py-2 text-sm leading-snug text-cci-slate">
              Esta cartera no es un plan de industrialización: es la magnitud de obra pública que el país
              ejecutará esta década.
            </p>
          </Reveal>
        </div>

        {/* ===== CIERRE (sin cifras) ===== */}
        <Reveal reduced={reduced} className="mt-12 max-w-3xl">
          <p className="font-display text-xl font-800 leading-snug text-cci-ink md:text-2xl">
            Construir a esta escala, en ambos frentes, exige más capacidad, más velocidad y más
            estandarización — sin ceder calidad.
          </p>
          <p className="mt-3 leading-relaxed text-cci-slate">
            Ahí es donde la forma de construir deja de ser un detalle técnico.
          </p>
        </Reveal>

        <FuenteDetalle slugs={["deficit-habitacional", "mop-obras-priorizadas"]} />
      </div>
    </section>
  );
}
