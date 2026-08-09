import { studies, indicators } from "@/data/indicators";
import { MetricCard } from "@/components/MetricCard";
import { sourceTypeLabel } from "@/lib/format";

export const metadata = {
  title: "Evidencia · CCI",
  description: "Investigación, datos y estudios nacionales e internacionales sobre construcción industrializada.",
};

export default function EvidenciaPage() {
  const chilenos = studies.filter((s) => s.geography === "Chile");
  const internacionales = studies.filter((s) => s.geography === "Internacional");

  return (
    <>
      <section className="border-b border-cci-line bg-cci-graphite-dark">
        <div className="container-cci py-16">
          <div className="mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange-light">
            <span className="h-[2px] w-6 bg-cci-orange" />Evidencia
          </div>
          <h1 className="max-w-3xl font-display text-3xl font-900 leading-tight text-white md:text-5xl">La evidencia importa.</h1>
          <p className="mt-4 max-w-2xl text-white/75">
            Reunimos investigación, datos y estudios nacionales e internacionales para entender que funciona,
            cuando funciona y por qué. Diferenciamos la evidencia chilena de la internacional, porque no todo
            resultado extranjero es directamente extrapolable a Chile.
          </p>
        </div>
      </section>

      {/* Indicadores clave con fuente */}
      <section className="container-cci py-14">
        <h2 className="mb-2 font-display text-2xl font-800 text-cci-ink md:text-3xl">Cifras clave, con su fuente</h2>
        <p className="mb-7 max-w-2xl text-cci-slate">Cada número indica su origen, su tipo de fuente y su ambito. Haz clic en "ver fuente" para ir al documento original.</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {indicators.map((ind) => <MetricCard key={ind.id} indicator={ind} />)}
        </div>
      </section>

      {/* Evidencia internacional */}
      <section className="bg-cci-paper py-14">
        <div className="container-cci">
          <div className="mb-7 flex items-center gap-3">
            <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">Evidencia internacional</h2>
            <span className="badge bg-cci-blue-soft text-cci-blue">{internacionales.length} estudios</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {internacionales.map((s) => <StudyCard key={s.id} study={s} />)}
          </div>
        </div>
      </section>

      {/* Evidencia chilena */}
      <section className="container-cci py-14">
        <div className="mb-7 flex items-center gap-3">
          <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">Evidencia chilena</h2>
          <span className="badge bg-cci-orange-soft text-cci-orange-dark">{chilenos.length} fuente</span>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {chilenos.map((s) => <StudyCard key={s.id} study={s} />)}
        </div>
        <div className="mt-8 rounded-2xl border border-dashed border-cci-line bg-cci-paper p-7 text-center">
          <p className="text-sm text-cci-slate">
            La evidencia chilena especifica sobre desempeno industrializado es todavía escasa. Es justamente
            el vacio que el CCI busca llenar con estudios propios. <span className="font-600 text-cci-ink">Ese es el próximo paso.</span>
          </p>
        </div>
      </section>
    </>
  );
}

function StudyCard({ study }: { study: (typeof studies)[number] }) {
  return (
    <a href={study.url} target="_blank" rel="noopener noreferrer" className="card-rise group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-cci-line bg-white p-6 shadow-card">
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
        <span className="annot inline-flex items-center gap-1 text-cci-orange">Ver estudio
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
      <span className="sweep" />
    </a>
  );
}
