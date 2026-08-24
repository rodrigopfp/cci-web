"use client";

// CCI Data — scroll-story de 7 capítulos que fusiona el Radar y la Evidencia.
//
// TODAS las cifras, unidades, textos de fuente y fechas provienen del registro
// único (src/lib/datos) vía obtenerIndicador(slug): no hay números duros en el
// JSX de esta vista. El HTML estático contiene el valor final (se ve sin JS); el
// conteo anima como mejora progresiva y respeta prefers-reduced-motion.
// Cada bloque conserva su línea "Fuente:" y suma un <details> "Ver fuente y
// metodología" (nativo, funciona sin JS y con teclado).

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Indicator, SourceType, Study } from "@/data/types";
import { MetricCard } from "@/components/MetricCard";
import { StudyCard } from "@/components/StudyCard";
import { PotencialGauge } from "@/components/RadarKpis";
import { IndustrializarEscenas } from "@/components/IndustrializarEscenas";
import { usePrefersReducedMotion, useInView, useCountUp } from "@/lib/counters";
import { obtenerIndicador, obtenerFuente, obtenerIndicadorConFuente } from "@/lib/datos/indice";
import { EtiquetaEvidencia, NotaEvidencia } from "@/components/EtiquetaEvidencia";
import { infoEvidencia } from "@/lib/datos/evidencia";
import { formatDate } from "@/lib/format";

const GUIA_HREF = "/conocimiento/guia-integracion-temprana-cci";

// ---- Formato chileno ---------------------------------------------------
/** 491904 → "491.904" · 0.26 → "0,26" · 0.14 → "0,14". */
function formatCL(n: number, decimals = 0): string {
  const fixed = n.toFixed(decimals);
  const [int, dec] = fixed.split(".");
  const miles = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return dec ? `${miles},${dec}` : miles;
}

const val = (slug: string): number => Number(obtenerIndicador(slug).value);
const decimalsDe = (n: number): number => (Number.isInteger(n) ? 0 : 2);

/** Evidencia de un indicador para <MetricCard> (etiqueta neutra + nota). */
const evidenciaDe = (slug: string) => {
  const i = obtenerIndicador(slug);
  return { tipo: i.sourceType, scope: i.scope };
};

// Adaptador registro → Indicator (tipo del sitio) para reutilizar MetricCard.
const SOURCE_TYPE_MAP: Record<string, SourceType> = {
  official_chile: "oficial",
  cci_data: "cci",
  academic: "académica",
  international: "internacional",
  documented_case: "empresa",
  declared_by_organization: "empresa",
  survey: "internacional",
  estimate: "estimación",
};
function metricFromIndicador(slug: string): Indicator {
  const { indicador: i, fuente: f } = obtenerIndicadorConFuente(slug);
  const st = SOURCE_TYPE_MAP[i.sourceType] ?? "oficial";
  const year = Number(String(f.publicationDate ?? "").slice(0, 4)) || new Date(i.cutoffDate).getFullYear();
  return {
    id: i.slug,
    value: formatCL(Number(i.value), 0),
    unit: i.unit,
    label: i.title,
    note: i.description,
    status: "real",
    sourceType: st,
    source: { id: f.id, title: f.title, organization: f.organization, year, url: f.url, sourceType: st },
    lastUpdated: i.lastVerifiedAt,
    geography: (i.geography === "Chile" ? "Chile" : "Internacional") as Indicator["geography"],
  };
}

// ---- Piezas de animación ----------------------------------------------
function Reveal({
  children,
  reduced,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  reduced: boolean;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const show = inView || reduced;
  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        show ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
      style={{ transitionDelay: show ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

/** Tarjeta blanca de cifra protagonista con conteo animado (estilo /nosotros). */
function StatCard({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  label,
  fuente,
  fuenteUrl,
  reduced,
  tipo,
  scope,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  fuente: string;
  fuenteUrl?: string;
  reduced: boolean;
  tipo?: string;
  scope?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const v = useCountUp(value, inView, reduced, 1500);
  return (
    <div ref={ref} className="flex h-full flex-col rounded-2xl border border-cci-line bg-white px-5 py-6 shadow-card">
      <div className="font-display text-4xl font-900 leading-none tabular-nums text-cci-orange sm:text-5xl">
        {prefix}
        {formatCL(v, decimals)}
        {suffix}
      </div>
      <p className="mt-3 flex-1 text-sm leading-snug text-cci-slate">{label}</p>
      {tipo && <div className="mt-3"><EtiquetaEvidencia tipo={tipo} /></div>}
      {fuenteUrl ? (
        <a
          href={fuenteUrl}
          target={fuenteUrl.startsWith("http") ? "_blank" : undefined}
          rel={fuenteUrl.startsWith("http") ? "noopener noreferrer" : undefined}
          className="mt-3 inline-flex items-center gap-1 text-[11px] font-600 text-cci-slate-light hover:text-cci-orange-dark"
        >
          Fuente: {fuente}
        </a>
      ) : (
        <span className="mt-3 text-[11px] font-600 text-cci-slate-light">Fuente: {fuente}</span>
      )}
      {tipo && <NotaEvidencia tipo={tipo} scope={scope} />}
    </div>
  );
}

/** Tarjeta de cifra alimentada por un slug del registro. */
function StatIndicador({
  slug,
  label,
  reduced,
  decimals,
}: {
  slug: string;
  label?: string;
  reduced: boolean;
  decimals?: number;
}) {
  const { indicador: i, fuente: f } = obtenerIndicadorConFuente(slug);
  const value = Number(i.value);
  return (
    <StatCard
      value={value}
      decimals={decimals ?? decimalsDe(value)}
      prefix={i.prefix ?? ""}
      suffix={i.suffix ?? ""}
      label={label ?? i.title}
      fuente={f.shortLabel ?? f.organization}
      fuenteUrl={f.url}
      reduced={reduced}
      tipo={i.sourceType}
      scope={i.scope}
    />
  );
}

interface DuelItem {
  label: string;
  value: number;
  suffix?: string;
  highlight?: boolean;
}
function BarDuel({
  title,
  hint,
  items,
  decimals = 0,
  chip,
  reduced,
  dark = false,
  tipo,
  scope,
}: {
  title: string;
  hint?: string;
  items: DuelItem[];
  decimals?: number;
  chip?: string;
  reduced: boolean;
  dark?: boolean;
  tipo?: string;
  scope?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const active = inView || reduced;
  const max = Math.max(...items.map((i) => i.value));
  return (
    <div ref={ref}>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <span className={`text-sm font-700 ${dark ? "text-white" : "text-cci-ink"}`}>{title}</span>
        {chip && (
          <span className="rounded-full bg-cci-orange px-2.5 py-0.5 text-[11px] font-700 text-white">{chip}</span>
        )}
      </div>
      <div className="space-y-3">
        {items.map((it) => (
          <div key={it.label}>
            <div className="mb-1 flex items-baseline justify-between gap-3">
              <span className={`text-sm font-600 ${it.highlight ? "text-cci-orange" : dark ? "text-white/80" : "text-cci-slate"}`}>
                {it.label}
              </span>
              <span className={`font-mono text-sm font-700 tabular-nums ${it.highlight ? "text-cci-orange" : dark ? "text-white/70" : "text-cci-slate"}`}>
                {formatCL(it.value, decimals)}
                {it.suffix ?? ""}
              </span>
            </div>
            <div className={`h-3.5 w-full overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-cci-paper"}`}>
              <div
                className={`h-full rounded-full ${reduced ? "" : "transition-[width] duration-1000 ease-out"} ${
                  it.highlight ? "bg-cci-orange" : dark ? "bg-white/40" : "bg-cci-graphite"
                }`}
                style={{ width: active ? `${(it.value / max) * 100}%` : "0%" }}
                role="img"
                aria-label={`${it.label}: ${formatCL(it.value, decimals)}${it.suffix ?? ""}`}
              />
            </div>
          </div>
        ))}
      </div>
      {hint && <p className={`mt-2 text-[11px] ${dark ? "text-white/50" : "text-cci-slate-light"}`}>{hint}</p>}
      {tipo && (
        <div className="mt-3">
          <EtiquetaEvidencia tipo={tipo} dark={dark} />
          <NotaEvidencia tipo={tipo} scope={scope} dark={dark} />
        </div>
      )}
    </div>
  );
}

// ---- "Ver fuente y metodología" (nativo <details>, sin JS, con teclado) -----
function FuenteDetalle({ slugs, dark = false }: { slugs: string[]; dark?: boolean }) {
  // Una entrada por fuente única, con un indicador representativo para el alcance.
  const porFuente = new Map<string, { fuente: ReturnType<typeof obtenerFuente>; rep: ReturnType<typeof obtenerIndicador> }>();
  for (const slug of slugs) {
    const rep = obtenerIndicador(slug);
    if (!porFuente.has(rep.sourceId)) porFuente.set(rep.sourceId, { fuente: obtenerFuente(rep.sourceId), rep });
  }
  const linkCls = dark ? "text-cci-orange-light hover:text-white" : "text-cci-orange hover:text-cci-orange-dark";
  const dim = dark ? "text-white/60" : "text-cci-slate";
  const strong = dark ? "text-white/90" : "text-cci-ink";

  return (
    <details className={`group mt-3 rounded-lg border px-4 py-2.5 ${dark ? "border-white/10 bg-white/[0.03]" : "border-cci-line bg-cci-paper"}`}>
      <summary className={`cursor-pointer list-none text-[11px] font-700 uppercase tracking-wide ${dark ? "text-white/70" : "text-cci-slate"}`}>
        Ver fuente y metodología
      </summary>
      <div className="mt-3 space-y-4">
        {[...porFuente.values()].map(({ fuente: f, rep }) => (
          <div key={f.id} className={`space-y-1 text-[12px] leading-relaxed ${dim}`}>
            <div>
              <span className={`font-700 ${strong}`}>{f.organization}</span> — {f.title}
            </div>
            {f.url && (
              <div>
                <a
                  href={f.url}
                  target={f.url.startsWith("http") ? "_blank" : undefined}
                  rel={f.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`font-600 ${linkCls}`}
                >
                  Ir a la fuente
                </a>
              </div>
            )}
            {f.publicationDate && <div>Publicación: {f.publicationDate}</div>}
            {infoEvidencia(rep.sourceType) && (
              <div>
                <span className={`font-700 ${strong}`}>Tipo de evidencia:</span>{" "}
                {infoEvidencia(rep.sourceType)!.etiqueta} — {infoEvidencia(rep.sourceType)!.interpretacion}
              </div>
            )}
            <div>Fecha de corte del dato: {formatDate(rep.cutoffDate)}</div>
            <div>Alcance: {rep.scope}</div>
            {rep.methodology && <div>Metodología: {rep.methodology}</div>}
            {rep.caveat && <div>Nota: {rep.caveat}</div>}
            {f.notes && !rep.caveat && <div>Nota: {f.notes}</div>}
            <div>Última verificación: {formatDate(rep.lastVerifiedAt)}</div>
          </div>
        ))}
      </div>
    </details>
  );
}

// ---- Navegación por capítulos (pills sticky + scrollspy) ---------------
const CHAPTERS = [
  { id: "cap1", n: "01", label: "Oportunidad" },
  { id: "cap2", n: "02", label: "El desafío" },
  { id: "cap3", n: "03", label: "Por qué" },
  { id: "cap4", n: "04", label: "No es prefabricar" },
  { id: "cap5", n: "05", label: "Qué cambia" },
  { id: "cap6", n: "06", label: "Chile avanza" },
  { id: "cap7", n: "07", label: "La evidencia" },
  { id: "cap8", n: "08", label: "Qué medimos" },
];

function ChapterNav({ active }: { active: string }) {
  return (
    <nav className="sticky top-[105px] z-30 border-b border-cci-line bg-white/95 backdrop-blur">
      <div className="container-cci">
        <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide py-3">
          {CHAPTERS.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                active === c.id ? "bg-cci-graphite text-white" : "bg-cci-paper text-cci-slate hover:bg-cci-line"
              }`}
            >
              <span className="font-mono">{c.n}</span> {c.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Kicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide ${dark ? "text-cci-orange-light" : "text-cci-orange"}`}>
      <span className="h-[2px] w-6 bg-cci-orange" />
      {children}
    </div>
  );
}

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

const MEDICION = [
  { label: "Productividad laboral IPLC", unit: "m²/persona-día", obligatorio: true },
  { label: "Desviación de plazos", unit: "%", obligatorio: true },
  { label: "Residuos", unit: "m³/m²", obligatorio: true },
  { label: "Costos", unit: "%", obligatorio: false },
  { label: "Uso de MMC", unit: "métodos modernos de construcción", obligatorio: false },
  { label: "Nivel BIM", unit: "madurez del modelo", obligatorio: false },
];

// ---- Componente principal ----------------------------------------------
export function DataStory({ studiesInternacionales }: { studiesInternacionales: Study[] }) {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState("cap1");
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (sections.length === 0 || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

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

  const r20 = obtenerIndicador("residuos-sectorial-2020");
  const r25 = obtenerIndicador("residuos-sectorial-2025");
  const nch = obtenerIndicador("nch3744");

  return (
    <div ref={storyRef}>
      <ChapterNav active={active} />

      {/* ============================ CAP 01 ============================ */}
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

      {/* ============================ CAP 02 (grafito) ============================ */}
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

      {/* ============================ CAP 03 ============================ */}
      <section id="cap3" className="scroll-mt-[160px] bg-white">
        <div className="container-cci py-16 md:py-20">
          <Reveal reduced={reduced}>
            <Kicker>03 · Por qué ocurre</Kicker>
            <h2 className="max-w-3xl font-display text-2xl font-900 leading-tight text-cci-ink md:text-4xl">
              La distancia entre obras no es tecnológica: es de sistema productivo
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <Reveal reduced={reduced}>
              <StatIndicador slug="iplc-p10" label="P10 — el 10% menos productivo (m²/persona-día)" reduced={reduced} />
            </Reveal>
            <Reveal reduced={reduced} delay={80}>
              <StatIndicador slug="iplc-p90" label="P90 — el 10% más productivo (m²/persona-día)" reduced={reduced} />
            </Reveal>
            <Reveal reduced={reduced} delay={160}>
              <StatIndicador slug="iplc-brecha-deciles" label="Brecha entre el mejor y el peor decil de obras" reduced={reduced} />
            </Reveal>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <Reveal reduced={reduced}>
              <h3 className="font-display text-lg font-800 text-cci-ink">Las causas de raíz</h3>
              <ul className="mt-4 space-y-3">
                {[
                  "Fragmentación entre los actores del proyecto",
                  "Baja integración entre diseño y ejecución",
                  "Escasa estandarización de procesos y componentes",
                ].map((c) => (
                  <li key={c} className="flex gap-3 text-cci-slate">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cci-orange" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal reduced={reduced} delay={80}>
              <blockquote className="rounded-2xl border-l-4 border-cci-orange bg-cci-orange-soft p-7">
                <p className="font-display text-lg font-800 leading-snug text-cci-graphite md:text-xl">
                  «La respuesta metodológica ya está escrita: Integración Temprana — todos los actores del
                  proyecto, coordinados desde su génesis.»
                </p>
                <Link href={GUIA_HREF} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cci-orange-dark hover:text-cci-orange">
                  Ver la Guía de Integración Temprana
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </blockquote>
            </Reveal>
          </div>

          <FuenteDetalle slugs={["iplc-p10", "iplc-p90", "iplc-brecha-deciles"]} />
        </div>
      </section>

      {/* ============================ CAP 04 (nuevo) — Industrializar no es prefabricar ============================ */}
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

      {/* ============================ CAP 05 — Qué cambia cuando se industrializa ============================ */}
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

      {/* ============================ CAP 05 ============================ */}
      <section id="cap6" className="scroll-mt-[160px] bg-white">
        <div className="container-cci py-16 md:py-20">
          <Reveal reduced={reduced}>
            <Kicker>06 · Chile ya avanza</Kicker>
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

          <div className="mt-8">
            <Link href="/data/latam" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cci-orange hover:text-cci-orange-dark">
              Panorama LATAM
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================ CAP 06 ============================ */}
      <section id="cap7" className="scroll-mt-[160px] bg-cci-paper">
        <div className="container-cci py-16 md:py-20">
          <Reveal reduced={reduced}>
            <Kicker>07 · La evidencia</Kicker>
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

      {/* ============================ CAP 07 ============================ */}
      <section id="cap8" className="scroll-mt-[160px] bg-white">
        <div className="container-cci py-16 md:py-20">
          <Reveal reduced={reduced}>
            <Kicker>08 · Lo que estamos midiendo</Kicker>
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
    </div>
  );
}
