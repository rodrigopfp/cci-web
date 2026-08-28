"use client";

// CAP 01 · "La escala del desafío chileno" (P1-8 · retoque P1-9).
//
// Dos escalas: vivienda (déficit Censo 2024) e infraestructura pública (cartera
// MOP abril 2026). Las cifras usan <Contador> (sin salto de layout). El bloque
// MOP tiene jerarquía: 8,6% del PIB como cifra ancla (durazno, del mismo tamaño
// que el 491.904), barra de proporción, y una fila secundaria con 70/más-de-300
// y 200-250 mil. Todo del registro; nada hardcodeado. Sin JS / reduced-motion:
// cifras finales, sin animación.

import { useEffect, useLayoutEffect, useState } from "react";
import { obtenerIndicadorConFuente, obtenerIndicador } from "@/lib/datos/indice";
import { useInView } from "@/lib/counters";
import { EtiquetaEvidencia } from "@/components/EtiquetaEvidencia";
import { Reveal, Kicker, FuenteDetalle, Contador, formatCL } from "../piezas";
import type { CapituloProps } from "./registro";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const DURAZNO = "#F6B27E";

export function CapOportunidad({ reduced }: CapituloProps) {
  const { indicador: deficit, fuente: fCenso } = obtenerIndicadorConFuente("deficit-habitacional");
  const { indicador: obras, fuente: fMop } = obtenerIndicadorConFuente("mop-obras-priorizadas");
  const inversion = obtenerIndicador("mop-inversion-pib");
  const empleos = obtenerIndicador("mop-empleos-proyectados");

  const nInversion = Number(inversion.value); // 8,6
  // "más de 300" sale del scope del registro (no se escribe a mano).
  const universo = obras.scope.match(/más de ([\d.]+)/)?.[1] ?? "";
  // Rango de empleos derivado del valor-string del registro ("200.000 a 250.000").
  const [empLo, empHi] = String(empleos.value)
    .split(" a ")
    .map((s) => Number(s.replace(/\./g, "")) / 1000);

  // go (SSR-safe) solo para la barra de proporción.
  const { ref, inView } = useInView<HTMLDivElement>();
  const [go, setGo] = useState(true);
  useIso(() => {
    if (!reduced) setGo(false);
  }, [reduced]);
  useEffect(() => {
    if (reduced || inView) setGo(true);
  }, [reduced, inView]);

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

        {/* ===== BLOQUE 1 · Vivienda ===== */}
        <Reveal reduced={reduced} className="mt-10">
          <span className="inline-flex w-fit items-center rounded-full bg-cci-orange-soft px-3 py-1 text-[11px] font-700 uppercase tracking-wide text-cci-orange-dark">
            Vivienda
          </span>
          <div className="mt-3 border-t border-cci-line" />
          {/* Fila cifra + texto: sumar una segunda cifra (meta 2026-2030) más
              adelante es agregar otra fila igual. */}
          <div className="mt-5 grid items-center gap-x-6 gap-y-3 sm:grid-cols-[auto_1fr]">
            <Contador
              target={Number(deficit.value)}
              reduced={reduced}
              className="font-display text-5xl font-900 leading-none text-cci-orange md:text-6xl"
            />
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

          {/* CIFRA ANCLA: 8,6% del PIB, mismo tamaño que el 491.904, en durazno. */}
          <div ref={ref}>
            <div className="mt-5 grid items-center gap-x-6 gap-y-3 sm:grid-cols-[auto_1fr]">
              <Contador
                target={nInversion}
                decimals={1}
                suffix="%"
                reduced={reduced}
                className="font-display text-5xl font-900 leading-none md:text-6xl"
              />
              <p className="text-lg leading-relaxed text-cci-ink">
                del PIB representa la cartera de obra pública que el MOP priorizó para esta década.
              </p>
            </div>

            {/* BARRA DE PROPORCIÓN (8,6 de 100), apoyo visual, no gráfico con ejes. */}
            <div className="mt-4" role="img" aria-label={`La cartera representa el ${formatCL(nInversion, 1)}% del PIB nacional.`}>
              <div className="h-2 w-full overflow-hidden rounded-full bg-cci-line">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: go ? `${nInversion}%` : "0%",
                    background: DURAZNO,
                    transition: reduced ? "none" : "width 900ms ease",
                  }}
                />
              </div>
              <span className="mt-1 block text-[11px] text-cci-slate-light">del PIB nacional</span>
            </div>
          </div>

          {/* FILA SECUNDARIA (tipografía menor que la cifra ancla), tras línea fina. */}
          <div className="mt-5 grid gap-4 border-t border-cci-line pt-4 sm:grid-cols-2">
            <div>
              <div className="font-display text-2xl font-900 tabular-nums text-cci-ink">
                {formatCL(Number(obras.value), 0)}
                <span className="font-600 text-cci-slate-light"> de más de {universo}</span>
              </div>
              <p className="mt-1 text-sm leading-snug text-cci-slate">obras evaluadas quedaron priorizadas</p>
            </div>
            <div>
              <div className="font-display text-2xl font-900 tabular-nums text-cci-ink">
                {formatCL(empLo, 0)}–{formatCL(empHi, 0)}
                <span className="font-600 text-cci-slate-light"> mil</span>
              </div>
              <p className="mt-1 text-sm leading-snug text-cci-slate">empleos proyectados hacia 2030</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <EtiquetaEvidencia tipo={obras.sourceType} />
            <span className="text-[11px] font-600 text-cci-slate-light">Fuente: {fMop.shortLabel}</span>
          </div>

          {/* ADVERTENCIA VISIBLE (no en el <details>), sin cambios. */}
          <p className="mt-4 rounded-lg border border-cci-line bg-cci-paper px-3 py-2 text-sm leading-snug text-cci-slate">
            Esta cartera no es un plan de industrialización: es la magnitud de obra pública que el país
            ejecutará esta década.
          </p>
        </Reveal>

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
