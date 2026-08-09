"use client";

import { useState } from "react";
import type { Indicator } from "@/data/types";
import { sourceTypeLabel, dataStatusLabel, formatDate } from "@/lib/format";

/** Color del estado del dato: azul institucional = verificado. */
const statusColor: Record<Indicator["status"], string> = {
  real: "#005CAD",
  mock: "#E04E00",
  pending: "#9C9C9C",
};

/**
 * Anotación de fuente. Se resuelve como marca de ficha técnica —barra de color
 * y texto monoespaciado— en vez de una píldora genérica.
 */
export function SourceBadge({ indicator }: { indicator: Indicator }) {
  return (
    <span className="annot whitespace-nowrap text-cci-slate">
      <span className="annot-bar" style={{ background: statusColor[indicator.status] }} />
      {sourceTypeLabel[indicator.sourceType]}
    </span>
  );
}

// Tarjeta de indicador grande, con número protagónico + fuente clicable.
export function MetricCard({ indicator }: { indicator: Indicator }) {
  const [open, setOpen] = useState(false);
  const isPending = indicator.status === "pending";

  return (
    <div className="relative flex flex-col gap-3 rounded-2xl border border-cci-line bg-white p-6 shadow-card">
      <div className="flex min-h-[26px] items-center">
        <SourceBadge indicator={indicator} />
      </div>

      <div>
        <div
          className={`flex min-h-[52px] flex-wrap items-baseline gap-x-1.5 font-display font-900 leading-none tracking-tight ${
            isPending ? "text-lg text-cci-slate" : "text-4xl text-cci-orange"
          }`}
        >
          <span>{indicator.value}</span>
          {indicator.unit && !isPending && (
            <span className="text-sm font-700 text-cci-slate">{indicator.unit}</span>
          )}
        </div>
        {/* Titular del dato: caja baja en la display. El registro técnico ya lo
            aporta la anotación monoespaciada de arriba, así que aquí conviene
            leer como titular editorial y no como rótulo de panel. */}
        <div className="mt-3 min-h-[46px] font-display text-[17px] font-800 leading-snug tracking-tight text-cci-ink">
          {indicator.label}
        </div>
      </div>

      <p className="text-xs leading-relaxed text-cci-slate">{indicator.note}</p>

      <div className="mt-auto flex items-end justify-between gap-3 border-t border-cci-line pt-3">
        <span className="font-mono text-[10px] leading-relaxed text-cci-slate-light">
          {indicator.geography} · {dataStatusLabel[indicator.status]}
          {indicator.lastUpdated && (
            <>
              <br />
              {formatDate(indicator.lastUpdated)}
            </>
          )}
        </span>
        {indicator.source && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="annot shrink-0 text-cci-orange hover:text-cci-orange-dark"
          >
            Ver fuente
          </button>
        )}
      </div>

      {/* panel de fuente */}
      {open && indicator.source && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-xl border border-cci-line bg-white p-4 shadow-card-hover">
          <div className="mb-1 text-[10px] font-700 uppercase tracking-wide text-cci-orange">
            {sourceTypeLabel[indicator.source.sourceType]} · {indicator.source.year}
          </div>
          <div className="text-sm font-600 text-cci-ink">{indicator.source.title}</div>
          <div className="text-xs text-cci-slate">{indicator.source.organization}</div>
          {indicator.source.url && (
            <a
              href={indicator.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-cci-blue hover:underline"
            >
              Ir a la fuente original
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
