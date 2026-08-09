import {
  radarIndicators,
  radarPending,
  certifiedCompanies,
  certificationsByYear,
  conveniosDitec,
  uniqueCompanyCount,
} from "@/data/radar";
import { MetricCard } from "@/components/MetricCard";
import { Timeline } from "@/components/Timeline";
import { formatDate } from "@/lib/format";

export const metadata = {
  title: "Radar · ¿Cuánto se está industrializando Chile?",
  description:
    "Monitor del ecosistema de construcción industrializada en Chile: empresas certificadas por DITEC, tipologías VIT aprobadas y evolución de las certificaciones. Cada cifra, con su fuente oficial.",
};

const MINVU_URL = "https://www.minvu.gob.cl/construccion-industrializada/";

export default function RadarPage() {
  const maxCount = Math.max(...certificationsByYear.map((c) => c.count));

  return (
    <>
      {/* HERO */}
      <section className="border-b border-cci-line bg-cci-graphite-dark">
        <div className="container-cci py-16">
          <div className="mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange-light">
            <span className="h-[2px] w-6 bg-cci-orange" />
            Radar
          </div>
          <h1 className="max-w-3xl font-display text-3xl font-900 leading-tight text-white md:text-5xl">
            ¿Cuánto se está industrializando Chile?
          </h1>
          <p className="mt-4 max-w-2xl text-white/75">
            Monitor del ecosistema industrializado a partir de fuentes oficiales. Empezamos por lo que
            sí se puede verificar hoy: las empresas certificadas por la DITEC del MINVU y su evolución
            en el tiempo. Lo que aún no existe como dato público, lo decimos.
          </p>
        </div>
      </section>

      {/* INDICADORES */}
      <section className="container-cci py-14">
        <h2 className="mb-2 font-display text-2xl font-800 text-cci-ink md:text-3xl">
          El estado del ecosistema
        </h2>
        <p className="mb-7 max-w-2xl text-cci-slate">
          Datos del listado oficial del MINVU. Cada tarjeta enlaza a su fuente.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {radarIndicators.map((i) => (
            <MetricCard key={i.id} indicator={i} />
          ))}
        </div>
      </section>

      {/* EVOLUCIÓN */}
      <section className="bg-cci-paper py-14">
        <div className="container-cci">
          <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">
            Cómo ha crecido la certificación
          </h2>
          <p className="mt-2 max-w-2xl text-cci-slate">
            Resoluciones de aprobación de empresas industrializadoras emitidas por la DITEC cada año,
            desde que entró en vigor la Res. Ex. N°52.
          </p>

          {/* gráfico de barras simple, accesible y sin librerías */}
          <div className="mt-8 rounded-2xl border border-cci-line bg-white p-7 shadow-card">
            <div className="flex items-end justify-between gap-4 sm:gap-10">
              {certificationsByYear.map((c) => (
                <div key={c.year} className="flex flex-1 flex-col items-center gap-3">
                  <span className="font-display text-2xl font-900 text-cci-orange">{c.count}</span>
                  <div
                    className="w-full rounded-t-md bg-cci-orange transition-all"
                    style={{ height: `${(c.count / maxCount) * 180 + 8}px` }}
                    role="img"
                    aria-label={`${c.count} resoluciones en ${c.year}`}
                  />
                  <span className="text-sm font-600 text-cci-slate">{c.year}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-cci-line pt-4 text-xs text-cci-slate-light">
              <span>
                Total: {certifiedCompanies.length} resoluciones · {uniqueCompanyCount} empresas únicas
              </span>
              <a
                href={MINVU_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-cci-orange hover:text-cci-orange-dark"
              >
                Fuente: MINVU · DITEC
              </a>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-sm text-cci-slate">
            El año 2026 está en curso, por lo que su cifra no es comparable con los años cerrados.
          </p>
        </div>
      </section>

      {/* LÍNEA DE TIEMPO */}
      <section className="container-cci py-14">
        <div className="mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange">
          <span className="h-[2px] w-6 bg-cci-orange" />
          Línea de tiempo
        </div>
        <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">
          Cómo se construyó el camino
        </h2>
        <p className="mt-2 max-w-2xl text-cci-slate">
          De la creación del Consejo a la regulación, las primeras obras y lo que viene.
          Desplázate para recorrer la secuencia.
        </p>
        <div className="mt-10">
          <Timeline />
        </div>
      </section>

      {/* LISTADO DE EMPRESAS */}
      <section className="container-cci py-14">
        <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">
          Empresas industrializadoras certificadas
        </h2>
        <p className="mt-2 max-w-2xl text-cci-slate">
          Habilitadas para presentar proyectos de Vivienda Industrializada Tipo (VIT) en los programas
          D.S. 49 y D.S. 10. Ordenadas de la certificación más reciente a la más antigua.
        </p>

        <div className="mt-7 overflow-hidden rounded-xl border border-cci-line bg-white shadow-card">
          {/* cabecera: solo en pantallas medianas hacia arriba */}
          <div className="hidden grid-cols-[1fr_auto_auto] gap-4 border-b border-cci-line bg-cci-paper px-6 py-3 text-[11px] font-700 uppercase tracking-wide text-cci-slate sm:grid">
            <span>Empresa</span>
            <span>Resolución</span>
            <span className="text-right">Fecha</span>
          </div>
          <ul>
            {[...certifiedCompanies]
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((c) => (
                <li
                  key={c.resolution + c.date}
                  className="grid gap-1 border-b border-cci-line px-6 py-4 last:border-0 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-600 text-cci-ink">{c.name}</span>
                    {c.convenio && (
                      <span className="badge bg-cci-blue-soft text-cci-blue">Convenio DITEC</span>
                    )}
                    {c.repeat && (
                      <span className="badge bg-cci-paper text-cci-slate-light">2ª resolución</span>
                    )}
                  </div>
                  <span className="text-sm text-cci-slate">{c.resolution}</span>
                  <span className="text-sm text-cci-slate-light sm:text-right">
                    {formatDate(c.date)}
                  </span>
                </li>
              ))}
          </ul>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
          <p className="text-cci-slate">
            <span className="font-600 text-cci-ink">Nota metodológica:</span> el listado oficial
            contiene {certifiedCompanies.length} resoluciones. Eterna y Tecnotruss registran una
            segunda resolución cada una, por lo que las empresas únicas son {uniqueCompanyCount}.
          </p>
          <a
            href={MINVU_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost shrink-0"
          >
            Ver listado oficial
          </a>
        </div>

        {/* convenios */}
        <div className="mt-10 rounded-2xl border border-cci-line bg-cci-paper p-7">
          <h3 className="font-display text-lg font-800 text-cci-graphite">
            En convenio directo con la DITEC
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {conveniosDitec.map((n) => (
              <span key={n} className="badge bg-white text-cci-ink">
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PENDIENTES */}
      <section className="bg-cci-graphite-dark py-14">
        <div className="container-cci">
          <div className="mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange-light">
            <span className="h-[2px] w-6 bg-cci-orange" />
            Lo que todavía no sabemos
          </div>
          <h2 className="font-display text-2xl font-800 text-white md:text-3xl">
            Los datos que Chile aún no mide
          </h2>
          <p className="mt-3 max-w-2xl text-white/70">
            Un observatorio serio también declara sus vacíos. Estos indicadores no tienen hoy una
            fuente pública confiable, y por eso no publicamos un número.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {radarPending.map((i) => (
              <MetricCard key={i.id} indicator={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
