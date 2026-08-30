"use client";

import Link from "next/link";
import { obtenerIndicador, obtenerFuente } from "@/lib/datos/indice";
import { EtiquetaEvidencia } from "@/components/EtiquetaEvidencia";
import { Reveal, Kicker, StatIndicador, FuenteDetalle, formatCL } from "../piezas";
import { EscaleraBimMop } from "../EscaleraBimMop";
import type { CapituloProps } from "./registro";

// Ámbitos de "Más allá de la vivienda" (Pieza 3). Descriptores, no cifras. El
// cuarto queda deliberadamente incompleto ("Dato en levantamiento"): honestidad.
const AMBITOS = [
  { titulo: "Vivienda", detalle: "MINVU, VIT, industrializadoras certificadas." },
  { titulo: "Edificación pública", detalle: "MOP Arquitectura, BIM, edificios públicos." },
  { titulo: "Infraestructura", detalle: "Vialidad, aeropuertos, obras portuarias e hidráulicas." },
];

export function CapChileAvanza({ reduced }: CapituloProps) {
  const r20 = obtenerIndicador("residuos-sectorial-2020");
  const r25 = obtenerIndicador("residuos-sectorial-2025");
  const nch = obtenerIndicador("nch3744");

  return (
    <section id="cap6" className="scroll-mt-[160px] bg-white">
      <div className="container-cci py-16 md:py-20">
        <Reveal reduced={reduced}>
          <Kicker>07 · Chile ya avanza</Kicker>
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

        {/* ===== Pieza 1: escalera BIM del MOP (infraestructura pública) ===== */}
        <Reveal reduced={reduced} className="mt-14 max-w-2xl">
          <EscaleraBimMop reduced={reduced} />
        </Reveal>

        {/* ===== Pieza 2: señal institucional (hito, tono neutro para NO leerse
             como normativa; es una señal, no una regla) ===== */}
        <Reveal reduced={reduced} className="mt-12 max-w-2xl">
          <div className="rounded-2xl border border-cci-line bg-cci-paper p-7">
            <span className="w-fit rounded-full bg-cci-graphite px-2.5 py-1 text-[11px] font-700 uppercase tracking-wide text-white">
              Señal institucional · abril 2026
            </span>
            <h3 className="mt-4 font-display text-xl font-800 text-cci-ink">
              El Estado empieza a reconocer el valor que se produce en fábrica
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-cci-slate">
              En abril de 2026, el MOP planteó, para el desarrollo de infraestructura pública en madera, líneas de
              acción que incluyen industrialización con elementos estructurales certificados y estandarizados,
              formación y BIM, y mecanismos de pago por avance en fábrica.
            </p>
            <p className="mt-3 text-[11px] font-600 text-cci-slate-light">
              Alcance: infraestructura pública en madera. Es una señal de política, no una norma.
            </p>
            <a
              href={obtenerFuente("mop-madera-2026").url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-[11px] font-600 text-cci-slate-light transition hover:text-cci-orange-dark"
            >
              Fuente: MOP (2026)
            </a>
          </div>
        </Reveal>

        {/* ===== Pieza 3: más allá de la vivienda (4 ámbitos; el 4º incompleto) ===== */}
        <Reveal reduced={reduced} className="mt-12">
          <h3 className="font-display text-xl font-800 text-cci-ink md:text-2xl">Más allá de la vivienda</h3>
          <p className="mt-2 max-w-2xl text-cci-slate">
            La industrialización avanza en distintos frentes de la construcción, no solo en vivienda.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AMBITOS.map((a) => (
              <div key={a.titulo} className="flex h-full flex-col rounded-2xl border border-cci-line bg-white p-5">
                <h4 className="font-display text-base font-800 text-cci-ink">{a.titulo}</h4>
                <p className="mt-2 text-sm leading-snug text-cci-slate">{a.detalle}</p>
              </div>
            ))}
            {/* 4º ámbito: deliberadamente incompleto, rotulado. NO inventar contenido. */}
            <div className="flex h-full flex-col rounded-2xl border border-dashed border-cci-line bg-cci-paper p-5">
              <span className="w-fit rounded-full bg-cci-data-pending-soft px-2 py-0.5 text-[11px] font-700 uppercase tracking-wide text-cci-data-pending">
                Dato en levantamiento
              </span>
              <h4 className="mt-2 font-display text-base font-800 text-cci-slate">Industria y minería</h4>
              <p className="mt-2 text-sm leading-snug text-cci-slate-light">Aún sin datos consolidados que reportar.</p>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/data/vit" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cci-orange hover:text-cci-orange-dark">
            Ver el registro VIT
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
          <Link href="/data/latam" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cci-orange hover:text-cci-orange-dark">
            Panorama LATAM
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
