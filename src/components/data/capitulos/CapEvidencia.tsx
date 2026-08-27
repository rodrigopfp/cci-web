"use client";

import Link from "next/link";
import { obtenerIndicador } from "@/lib/datos/indice";
import { NotaEvidencia } from "@/components/EtiquetaEvidencia";
import { Reveal, GUIA_HREF, FuenteDetalle, formatCL, decimalsDe } from "../piezas";
import type { CapituloProps } from "./registro";

// ---- Casos documentados (cap 06): metrica = slug del registro + etiqueta ----
const CASOS = [
  {
    empresa: "Baumax",
    proyecto: "Paneles de hormigón en cinco edificios",
    metrics: [
      { slug: "caso-baumax-productividad", etiqueta: "productividad (m²/hd)" },
      { slug: "caso-baumax-residuos", etiqueta: "residuos" },
      { slug: "caso-baumax-retrabajos", etiqueta: "retrabajos" },
    ],
  },
  {
    empresa: "Socovesa Sur · BIM Lab · Spoerer",
    proyecto: "Coordinación BIM en Olimpia II",
    metrics: [
      { slug: "caso-socovesa-coordinacion", etiqueta: "tiempo de coordinación" },
      { slug: "caso-socovesa-adicionales", etiqueta: "de adicionales de obra" },
      { slug: "socovesa-rdi", etiqueta: "de RDI (consultas de información en obra)" },
    ],
  },
  {
    empresa: "Boetsch · Spoerer Ingenieros",
    proyecto: "Optimización estructural temprana",
    metrics: [
      { slug: "caso-boetsch-ahorro", etiqueta: "de ahorro del costo directo desde el diseño" },
      { slug: "boetsch-iteraciones-bim", etiqueta: "de iteraciones y modificaciones en BIM" },
    ],
  },
];
const CASOS_SLUGS = CASOS.flatMap((c) => c.metrics.map((m) => m.slug));

function metricaTexto(slug: string): string {
  const i = obtenerIndicador(slug);
  const n = Number(i.value);
  return `${i.prefix ?? ""}${formatCL(n, decimalsDe(n))}${i.suffix ?? ""}`;
}

export function CapEvidencia({ reduced }: CapituloProps) {
  return (
    <section id="cap7" className="scroll-mt-[160px] bg-cci-paper">
      <div className="container-cci py-16 md:py-20">
        <Reveal reduced={reduced}>
          <p className="max-w-3xl font-display text-xl font-800 leading-snug text-cci-ink md:text-2xl">
            La evidencia parte por casa: resultados documentados por socios del CCI en su Guía de
            Integración Temprana. Y el siguiente nivel ya está definido: casos medidos bajo el estándar
            nacional IPLC. Evidencia, no publicidad.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {CASOS.map((caso, i) => (
            <Reveal key={caso.empresa} reduced={reduced} delay={i * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-cci-line bg-white p-6 shadow-card">
                <span className="w-fit rounded-full bg-cci-orange-soft px-2.5 py-1 text-[10px] font-700 uppercase tracking-wide text-cci-orange-dark">
                  Caso documentado · Guía CCI 2024
                </span>
                <h3 className="mt-4 font-display text-lg font-800 leading-snug text-cci-ink">{caso.empresa}</h3>
                <p className="mt-1 text-sm text-cci-slate">{caso.proyecto}</p>
                <ul className="mt-4 space-y-2 border-t border-cci-line pt-4">
                  {caso.metrics.map((m) => {
                    // El caveat del indicador (p. ej. "vs 2-3% histórico") es la
                    // única fuente de verdad de esa comparación; se muestra entre
                    // paréntesis cuando existe.
                    const cav = obtenerIndicador(m.slug).caveat;
                    return (
                      <li key={m.slug} className="flex gap-2 text-sm font-600 text-cci-graphite">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cci-orange" />
                        <span>
                          <span className="font-800 text-cci-orange-dark">{metricaTexto(m.slug)}</span> {m.etiqueta}
                          {cav ? ` (${cav})` : ""}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <NotaEvidencia
                  tipo="documented_case"
                  scope={obtenerIndicador(caso.metrics[0].slug).scope}
                />
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-5 text-[11px] font-600 text-cci-slate-light">
          Fuente:{" "}
          <Link href={GUIA_HREF} className="underline hover:text-cci-orange-dark">
            Guía Práctica de Integración Temprana, CCI (2024)
          </Link>
          .
        </p>
        <FuenteDetalle slugs={CASOS_SLUGS} />

        {/* Ficha "siguiente nivel" — estándar IPLC */}
        <Reveal reduced={reduced} className="mt-12">
          <div className="rounded-2xl border-2 border-dashed border-cci-line bg-white p-7 md:p-9">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="w-fit rounded-full bg-cci-graphite px-3 py-1 text-[11px] font-700 uppercase tracking-wide text-white">
                  Estándar IPLC · Validación CCI
                </span>
                <h3 className="mt-4 font-display text-xl font-800 text-cci-ink">
                  El siguiente nivel: casos medidos bajo el estándar nacional
                </h3>
              </div>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <div className="text-[11px] font-700 uppercase tracking-wide text-cci-orange">Campos obligatorios</div>
                <ul className="mt-3 space-y-2 text-sm text-cci-slate">
                  {["m²/persona-día", "Desviación de plazos", "Residuos"].map((f) => (
                    <li key={f} className="flex items-center justify-between border-b border-cci-line pb-2">
                      <span className="font-600 text-cci-ink">{f}</span>
                      <span className="font-mono text-cci-slate-light">—</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[11px] font-700 uppercase tracking-wide text-cci-slate">Campos opcionales</div>
                <ul className="mt-3 space-y-2 text-sm text-cci-slate">
                  {["Costos", "Uso de MMC", "Nivel BIM"].map((f) => (
                    <li key={f} className="flex items-center justify-between border-b border-cci-line pb-2">
                      <span className="font-600 text-cci-ink">{f}</span>
                      <span className="font-mono text-cci-slate-light">—</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-6 text-sm text-cci-slate">
              Esta ficha se publicará con los primeros 2-3 casos medidos bajo el estándar IPLC.
            </p>
            <Link href="/hazte-socio" data-cta="hazte-socio" data-ubicacion="cap-evidencia-data" className="btn-primary mt-6">
              ¿Tu proyecto puede ser el primero? Conversemos
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
