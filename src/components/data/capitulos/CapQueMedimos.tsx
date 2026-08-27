"use client";

import { obtenerFuente } from "@/lib/datos/indice";
import { Reveal, Kicker } from "../piezas";
import type { CapituloProps } from "./registro";

const MEDICION = [
  { label: "Productividad laboral IPLC", unit: "m²/persona-día", obligatorio: true },
  { label: "Desviación de plazos", unit: "%", obligatorio: true },
  { label: "Residuos", unit: "m³/m²", obligatorio: true },
  { label: "Costos", unit: "%", obligatorio: false },
  { label: "Uso de MMC", unit: "métodos modernos de construcción", obligatorio: false },
  { label: "Nivel BIM", unit: "madurez del modelo", obligatorio: false },
];

export function CapQueMedimos({ reduced }: CapituloProps) {
  const iplc = obtenerFuente("iplc-2025");

  return (
    <section id="cap8" className="scroll-mt-[160px] bg-white">
      <div className="container-cci py-16 md:py-20">
        <Reveal reduced={reduced}>
          <Kicker>09 · Lo que estamos midiendo</Kicker>
          <h2 className="max-w-3xl font-display text-2xl font-900 leading-tight text-cci-ink md:text-4xl">
            Los indicadores del estándar nacional
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MEDICION.map((m, i) => (
            <Reveal key={m.label} reduced={reduced} delay={(i % 3) * 70}>
              <div className="flex h-full flex-col rounded-2xl border border-cci-line bg-white p-6 shadow-card">
                <span className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-700 uppercase tracking-wide ${m.obligatorio ? "bg-cci-orange-soft text-cci-orange-dark" : "bg-cci-paper text-cci-slate"}`}>
                  {m.obligatorio ? "Obligatorio" : "Opcional"}
                </span>
                <h3 className="mt-4 font-display text-lg font-800 leading-snug text-cci-ink">{m.label}</h3>
                <p className="mt-1 font-mono text-xs text-cci-slate-light">{m.unit}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 inline-flex flex-wrap items-center gap-2 rounded-xl border-2 border-dashed border-cci-line bg-cci-paper px-4 py-3 text-sm text-cci-slate">
          <span className="h-2 w-2 rounded-full bg-cci-orange" />
          {`Datos IPLC: edificación en altura · ${iplc.muestra?.proyectos} proyectos 2023-2024 · ${iplc.muestra?.empresas} empresas`}
        </div>

        <p className="mt-8 max-w-3xl text-[11px] leading-relaxed text-cci-slate-light">
          Crédito: Manual para la medición y análisis de Indicadores de Productividad Laboral de la
          Construcción (CDT · Construye2025 · Compromiso PRO · CChC).
        </p>
      </div>
    </section>
  );
}
