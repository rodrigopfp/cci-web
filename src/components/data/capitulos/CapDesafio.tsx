"use client";

import { obtenerIndicador, obtenerFuente } from "@/lib/datos/indice";
import { Reveal, Kicker, BarDuel, FuenteDetalle, val } from "../piezas";
import type { CapituloProps } from "./registro";

export function CapDesafio({ reduced }: CapituloProps) {
  return (
    <section id="cap2" className="scroll-mt-[160px] bg-cci-graphite-dark">
      <div className="container-cci py-16 md:py-20">
        <Reveal reduced={reduced}>
          <Kicker dark>02 · El desafío de Chile</Kicker>
          <h2 className="max-w-3xl font-display text-2xl font-900 leading-tight text-white md:text-4xl">
            Durante décadas, la productividad del sector se mantuvo plana
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/75">
            No es un problema de personas ni de empresas: es un desafío sistémico del proceso
            productivo. La brecha con los estándares internacionales se mide, y es grande.
          </p>
        </Reveal>

        <Reveal reduced={reduced} className="mt-10 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.04] p-7">
          <BarDuel
            title="Productividad laboral (m²/persona-día)"
            items={[
              { label: "Chile", value: val("productividad-chile") },
              { label: "Estándar internacional", value: val("productividad-internacional"), highlight: true },
            ]}
            decimals={2}
            chip={`brecha de ${obtenerIndicador("brecha-productividad").prefix ?? ""}${val("brecha-productividad")}${obtenerIndicador("brecha-productividad").suffix ?? ""}`}
            reduced={reduced}
            dark
            tipo={obtenerIndicador("productividad-chile").sourceType}
            scope={obtenerIndicador("productividad-chile").scope}
          />
          <p className="mt-5 border-t border-white/10 pt-4 text-[11px] leading-relaxed text-white/50">
            Fuente: {obtenerFuente("matrix-2020").shortLabel}.
          </p>
          <FuenteDetalle slugs={["productividad-chile", "productividad-internacional"]} dark />
        </Reveal>
      </div>
    </section>
  );
}
