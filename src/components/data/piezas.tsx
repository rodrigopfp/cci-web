"use client";

// CCI Data — piezas compartidas de la scroll-story.
//
// Helpers de datos y componentes de presentación usados por más de un capítulo.
// Extraídos de DataStory.tsx SIN cambios de lógica (P0-1). TODAS las cifras,
// unidades, textos de fuente y fechas provienen del registro único
// (src/lib/datos) vía obtenerIndicador(slug): no hay números duros en el JSX.

import type { Indicator, SourceType } from "@/data/types";
import { useInView, useCountUp } from "@/lib/counters";
import { obtenerIndicador, obtenerFuente, obtenerIndicadorConFuente } from "@/lib/datos/indice";
import { EtiquetaEvidencia, NotaEvidencia } from "@/components/EtiquetaEvidencia";
import { infoEvidencia } from "@/lib/datos/evidencia";
import { formatDate } from "@/lib/format";

export const GUIA_HREF = "/conocimiento/guia-integracion-temprana-cci";

// ---- Formato chileno ---------------------------------------------------
/** 491904 → "491.904" · 0.26 → "0,26" · 0.14 → "0,14". */
export function formatCL(n: number, decimals = 0): string {
  const fixed = n.toFixed(decimals);
  const [int, dec] = fixed.split(".");
  const miles = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return dec ? `${miles},${dec}` : miles;
}

export const val = (slug: string): number => Number(obtenerIndicador(slug).value);
export const decimalsDe = (n: number): number => (Number.isInteger(n) ? 0 : 2);

/**
 * Contador SIN salto de layout. La caja se dimensiona por el VALOR FINAL ya
 * formateado (placeholder invisible con los separadores de miles), y el número
 * que anima se pinta encima en posición absoluta. Así, mientras cuenta:
 *  - la caja no cambia de ancho ni de alto (dígitos tabulares + valor final);
 *  - `whitespace-nowrap` impide el reflow por wrap;
 *  - el texto contiguo NO se mueve (su columna/hueco no depende del valor actual).
 * Cuenta al entrar en viewport; con `reduced` o sin JS, queda en el valor final.
 */
export function Contador({
  target,
  decimals = 0,
  prefix = "",
  suffix = "",
  reduced,
  className = "",
}: {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  reduced: boolean;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const count = useCountUp(target, inView, reduced);
  const finalStr = `${prefix}${formatCL(target, decimals)}${suffix}`;
  const currentStr = `${prefix}${formatCL(count, decimals)}${suffix}`;
  return (
    <span ref={ref} className={`relative inline-block whitespace-nowrap tabular-nums ${className}`}>
      {/* reserva ancho/alto según el valor final; invisible pero ocupa espacio */}
      <span aria-hidden="true" className="invisible">{finalStr}</span>
      <span className="absolute inset-0">{currentStr}</span>
    </span>
  );
}

/** Evidencia de un indicador para <MetricCard> (etiqueta neutra + nota). */
export const evidenciaDe = (slug: string) => {
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
export function metricFromIndicador(slug: string): Indicator {
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
export function Reveal({
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
export function StatCard({
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
export function StatIndicador({
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
export function BarDuel({
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
export function FuenteDetalle({ slugs, dark = false }: { slugs: string[]; dark?: boolean }) {
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

export function Kicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide ${dark ? "text-cci-orange-light" : "text-cci-orange"}`}>
      <span className="h-[2px] w-6 bg-cci-orange" />
      {children}
    </div>
  );
}
