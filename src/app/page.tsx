import Link from "next/link";
import {
  getArticles,
  getPartners,
  getResources,
  getEvents,
  getPortadaIndicators,
  getRadarIndicators,
  getStudies,
  getVoces,
} from "@/sanity/fetch";
import { ArticleCard, FeaturedArticle } from "@/components/ArticleCard";
import { VozPortrait } from "@/components/VozCard";
import { PartnerCard, SectionHeader, CTASection, EditorialPolicyBlock } from "@/components/Blocks";
import { MetricCard } from "@/components/MetricCard";
import { NewsletterBox } from "@/components/Footer";
import { CCICubeOutline } from "@/components/Logo";

export default async function Home() {
  const [articles, partners, resources, events, indicators, radarIndicators, studies, voces] =
    await Promise.all([
      getArticles(),
      getPartners(),
      getResources(),
      getEvents(),
      getPortadaIndicators(),
      getRadarIndicators(),
      getStudies(),
      getVoces(),
    ]);
  const featured = articles[0];
  const latest = articles.slice(1, 5);

  return (
    <>
      {/* HERO — el desafío país */}
      <section className="relative overflow-hidden border-b border-cci-line bg-cci-graphite-dark">
        <div className="absolute inset-0 opacity-[0.22]" style={{ backgroundImage: "radial-gradient(circle at 88% 15%, #E04E00 0%, transparent 42%), radial-gradient(circle at 5% 95%, #5C5C5C 0%, transparent 45%)" }} />
        <div className="pointer-events-none absolute -right-16 top-1/2 hidden -translate-y-1/2 opacity-[0.14] lg:block"><CCICubeOutline size={520} color="#FFFFFF" strokeWidth={1.5} /></div>
        <div className="container-cci relative py-20 md:py-28">
          <div className="max-w-3xl animate-rise">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-700 uppercase tracking-wide text-cci-orange-light">
              <span className="h-1.5 w-1.5 rounded-full bg-cci-orange" />Consejo de Construcción Industrializada
            </div>
            <h1 className="font-display text-4xl font-900 leading-[1.03] text-white md:text-6xl">
              Chile necesita<br />construir <span className="text-cci-orange">mejor.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Más productividad. Más control. Menos residuos. Menos incertidumbre.
              <span className="font-600 text-white"> Eso es industrializar.</span> Y no te pedimos que lo creas: miremos los datos.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/radar" className="btn-primary">Explorar el Radar</Link>
              <Link href="/evidencia" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">Ver la evidencia</Link>
            </div>
          </div>
        </div>
      </section>

      {/* INDICADORES — el desafío + la evidencia, cada uno con su fuente */}
      <section className="container-cci py-14">
        <SectionHeader kicker="El punto de partida" title="El desafío, y lo que muestra la evidencia" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {indicators.map((ind) => (
            <MetricCard key={ind.id} indicator={ind} />
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-cci-slate">
          El déficit habitacional es un dato oficial del Censo 2024. Las cifras de plazo, costo y residuos provienen de
          investigación internacional sobre construcción modular y offsite: son evidencia real, no mediciones propias del CCI.
          Cada tarjeta enlaza a su fuente original.
        </p>
      </section>

      {/* ACTUALIDAD — asoma apenas pasado el punto de partida (sitio vivo) */}
      <section className="container-cci py-14">
        <SectionHeader kicker="Actualidad" title="Lo último del sector" href="/noticias" hrefLabel="Ver toda la actualidad" />
        <FeaturedArticle article={featured} />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((a) => <ArticleCard key={a.id} article={a} />)}
        </div>
      </section>

      {/* VOCES — avance de la sección de referentes */}
      {voces.length > 0 && (
        <section className="bg-cci-paper py-14">
          <div className="container-cci">
            <SectionHeader kicker="Voces" title="Voces de la industrialización" href="/voces" hrefLabel="Conoce las voces" />
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
              {voces.slice(0, 5).map((v) => (
                <Link key={v.id} href={`/voces/${v.slug}`} className="group">
                  <VozPortrait voz={v} className="aspect-[4/5]" />
                  <h3 className="mt-3 font-display text-sm font-800 leading-snug text-cci-ink transition-colors group-hover:text-cci-orange-dark">
                    {v.nombre}
                  </h3>
                  {v.cargo && <p className="mt-0.5 text-xs leading-snug text-cci-slate">{v.cargo}</p>}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RADAR: datos reales del ecosistema chileno */}
      <section className="container-cci py-14">
        <SectionHeader kicker="Radar" title="El ecosistema industrializado de Chile, hoy" href="/radar" hrefLabel="Ver el Radar completo" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {radarIndicators.map((i) => <MetricCard key={i.id} indicator={i} />)}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-cci-slate">
          Datos del listado oficial de la DITEC del MINVU. El Radar detalla empresa por empresa, con
          su resolución y fecha, y muestra la evolución de las certificaciones desde 2023.
        </p>
      </section>

      {/* EVIDENCIA destacada */}
      <section className="bg-cci-graphite-dark py-14">
        <div className="container-cci">
          <SectionHeader kicker="Evidencia" title="Qué dice la investigación" href="/evidencia" dark />
          <div className="grid gap-5 md:grid-cols-3">
            {studies.slice(0, 3).map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="card-rise group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="annot text-cci-orange-light">
                    <span className="annot-bar bg-cci-orange" />
                    {s.geography}
                  </span>
                  <span className="font-mono text-[11.5px] tabular-nums text-white/45">{s.year}</span>
                </div>
                <div className="annot text-white/55">{s.topic}</div>
                <p className="text-[15px] leading-relaxed text-white">{s.keyFinding}</p>
                <div className="mt-auto border-t border-white/10 pt-3 text-xs text-white/60">{s.organization}</div>
                <span className="sweep-light" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* AGENDA + RECURSOS — se resuelven como un índice: dos columnas con el
          mismo lenguaje de filas y filetes, en vez de dos estilos de tarjeta
          distintos. Las fechas y los formatos van en cifras monoespaciadas. */}
      <section className="container-cci grid gap-12 py-16 lg:grid-cols-2 lg:gap-16">
        {/* --- Agenda --- */}
        <div>
          <div className="mb-6 flex items-end justify-between gap-4 border-b-2 border-cci-ink pb-3">
            <div>
              <span className="annot text-cci-orange">
                <span className="annot-bar bg-cci-orange" />
                Agenda
              </span>
              <h2 className="mt-2 font-display text-2xl font-800 text-cci-ink">Próximos eventos</h2>
            </div>
            <Link href="/eventos" className="annot shrink-0 pb-1 text-cci-slate hover:text-cci-orange">
              Ver todo
            </Link>
          </div>

          <ul>
            {events.slice(0, 4).map((ev) => (
              <li key={ev.id}>
                <Link
                  href="/eventos"
                  className="group relative grid grid-cols-[58px_1fr_auto] items-start gap-5 border-b border-cci-line py-5 transition-colors hover:bg-cci-paper/60"
                >
                  <span className="pt-0.5 text-center">
                    <span className="block font-mono text-2xl font-600 leading-none tabular-nums text-cci-orange">
                      {new Date(ev.date + "T00:00:00").getDate()}
                    </span>
                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-cci-slate-light">
                      {new Date(ev.date + "T00:00:00")
                        .toLocaleDateString("es-CL", { month: "short" })
                        .replace(".", "")}
                    </span>
                  </span>
                  <span>
                    <span className="block font-display text-base font-800 leading-snug text-cci-ink transition-colors group-hover:text-cci-orange">
                      {ev.title}
                    </span>
                    <span className="annot mt-2 text-cci-slate-light">
                      {ev.modality} · {ev.location}
                    </span>
                  </span>
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2"
                    className="mt-1 text-cci-slate-light transition-all group-hover:translate-x-1 group-hover:text-cci-orange"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="sweep" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Recursos --- */}
        <div>
          <div className="mb-6 flex items-end justify-between gap-4 border-b-2 border-cci-ink pb-3">
            <div>
              <span className="annot text-cci-orange">
                <span className="annot-bar bg-cci-orange" />
                Conocimiento
              </span>
              <h2 className="mt-2 font-display text-2xl font-800 text-cci-ink">Recursos técnicos</h2>
            </div>
            <Link href="/recursos" className="annot shrink-0 pb-1 text-cci-slate hover:text-cci-orange">
              Ver todo
            </Link>
          </div>

          <ul>
            {resources.slice(0, 4).map((r) => (
              <li key={r.id}>
                <button className="group relative grid w-full grid-cols-[58px_1fr_auto] items-start gap-5 border-b border-cci-line py-5 text-left transition-colors hover:bg-cci-paper/60">
                  <span className="pt-0.5 text-center">
                    <span className="block font-mono text-sm font-600 leading-none text-cci-graphite">
                      {r.format}
                    </span>
                    <span className="mt-1.5 block font-mono text-[10px] tracking-wider text-cci-slate-light">
                      {r.weight}
                    </span>
                  </span>
                  <span>
                    <span className="block font-display text-base font-800 leading-snug text-cci-ink transition-colors group-hover:text-cci-orange">
                      {r.title}
                    </span>
                    <span className="annot mt-2 text-cci-slate-light">{r.type}</span>
                  </span>
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2"
                    className="mt-1 text-cci-slate-light transition-all group-hover:translate-y-0.5 group-hover:text-cci-orange"
                  >
                    <path d="M12 3v12M7 11l5 5 5-5M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="sweep" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SOCIOS */}
      <section className="bg-cci-paper py-14">
        <div className="container-cci">
          <SectionHeader kicker="Ecosistema" title="Empresas industrializadoras certificadas" href="/socios" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{partners.slice(0, 4).map((pr) => <PartnerCard key={pr.id} partner={pr} />)}</div>
        </div>
      </section>

      {/* CTA + PRINCIPIOS + NEWSLETTER */}
      <section className="container-cci space-y-10 py-14">
        <CTASection />
        <EditorialPolicyBlock />
        <NewsletterBox />
      </section>
    </>
  );
}
