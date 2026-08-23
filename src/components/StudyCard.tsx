import type { Study } from "@/data/types";
import { sourceTypeLabel } from "@/lib/format";

// Tarjeta de estudio (evidencia internacional / chilena). Vive en su propio
// archivo para poder reutilizarse tanto en CCI Data (cap. 4) como en cualquier
// otra vista, sin duplicar el marcado ni la lógica de enlace a la fuente.
export function StudyCard({ study }: { study: Study }) {
  return (
    <a
      href={study.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-rise group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-cci-line bg-white p-6 shadow-card"
    >
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="annot text-cci-slate">
          <span className="annot-bar bg-cci-blue" />
          {sourceTypeLabel[study.sourceType]}
        </span>
        <span className="annot text-cci-slate-light">{study.topic}</span>
        <span className="ml-auto font-mono text-[11.5px] tabular-nums text-cci-slate-light">
          {study.year}
        </span>
      </div>
      <h3 className="font-display text-lg font-700 leading-snug text-cci-ink">{study.title}</h3>
      <p className="text-sm leading-relaxed text-cci-slate">{study.keyFinding}</p>
      <div className="mt-auto flex items-center justify-between border-t border-cci-line pt-3">
        <span className="text-xs text-cci-slate-light">{study.organization}</span>
        <span className="annot inline-flex items-center gap-1 text-cci-orange">
          Ver estudio
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <span className="sweep" />
    </a>
  );
}
