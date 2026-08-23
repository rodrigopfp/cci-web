import Link from "next/link";
import {
  getArticles,
  getPartners,
  getResources,
  getEvents,
  getRadarIndicators,
  getStudies,
  getVoces,
  getEmpresasVitrina,
} from "@/sanity/fetch";
import { FeaturedArticle } from "@/components/ArticleCard";
import { RadarKpisPreview } from "@/components/RadarKpis";
import { VozPortrait } from "@/components/VozCard";
import { VitrinaMiniCard } from "@/components/VitrinaCard";
import { PartnerCard, SectionHeader, CTASection, EditorialPolicyBlock, VerMasLink } from "@/components/Blocks";
import { MetricCard } from "@/components/MetricCard";
import { NewsletterBox } from "@/components/Footer";
import { HeroObra } from "@/components/HeroObra";
import { formatDate } from "@/lib/format";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    siteName: "CCI",
    title: "CCI · Datos y evidencia de la construcción industrializada en Chile",
    description:
      "La plataforma del Consejo de Construcción Industrializada: noticias, evidencia, datos y ecosistema de la industrialización en Chile y LATAM. Cada cifra, con su fuente.",
  },
};

export default async function Home() {
  const [articles, partners, resources, events, radarIndicators, studies, voces, empresasVitrina] =
    await Promise.all([
      getArticles(),
      getPartners(),
      getResources(),
      getEvents(),
      getRadarIndicators(),
      getStudies(),
      getVoces(),
      getEmpresasVitrina(),
    ]);
  const featured = articles[0];
  const latest = articles.slice(1, 5);
  // Franja Vitrina: hasta 4 socios oro.
  const vitrinaOro = empresasVitrina.filter((e) => e.nivel === "oro").slice(0, 4);

  return (
    <>
      {/* HERO — el desafío país. Alto acotado (no pantalla completa) para que la
          sección RADAR asome al pie de la primera pantalla. */}
      <section className="relative flex items-center overflow-hidden border-b border-cci-line bg-cci-graphite-dark min-h-[560px] md:max-h-[620px] md:h-[72svh]">
        <div className="absolute inset-0 opacity-[0.22]" style={{ backgroundImage: "radial-gradient(circle at 88% 15%, #E04E00 0%, transparent 42%), radial-gradient(circle at 5% 95%, #5C5C5C 0%, transparent 45%)" }} />
        {/* Escena de montaje industrializado (grúa + módulos), animada en loop.
            Enmarca el texto: pluma arriba, mástil a la derecha, edificio abajo a
            la derecha. Nunca pasa por delante del titular. */}
        <HeroObra className="absolute inset-0 opacity-80 md:opacity-100" />
        {/* Velo bajo el bloque de texto (centro-izquierda) para asegurar contraste. */}
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 60% 82% at 38% 50%, rgba(61,61,61,0.92) 0%, rgba(61,61,61,0.6) 52%, rgba(61,61,61,0) 82%)" }} />
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(100deg, rgba(61,61,61,0.85) 0%, rgba(61,61,61,0.7) 40%, rgba(61,61,61,0.2) 66%, transparent 82%)" }} />
        {/* Bloque de texto: centrado vertical; en escritorio arranca ~21% del ancho
            (alineado a la izquierda). En móvil limitado para dejar el corredor derecho. */}
        <div className="relative w-full px-6 sm:px-10 md:px-0">
          <div className="max-w-[82vw] animate-rise sm:max-w-md md:ml-[21%] md:max-w-xl">
            {/* Antetítulo: caja rectangular translúcida con barra naranja a la
                izquierda (sustituye al punto). Ancho definido por el contenido
                (w-fit), en una sola línea; en móvil baja el tamaño de fuente para
                caber sin cruzarse con la grúa. */}
            <div className="mb-5 inline-flex w-fit items-center whitespace-nowrap border-l-4 border-cci-orange bg-white/[0.06] py-2 pl-4 pr-3 text-[9px] font-700 uppercase leading-none tracking-[0.15em] text-[#F5EEE6] md:text-xs">
              Consejo de Construcción Industrializada
            </div>
            <h1 className="font-display text-4xl font-900 leading-[1.03] text-white md:text-6xl">
              Chile necesita<br />construir <span className="text-cci-orange">mejor.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Más productividad. Más control. Menos residuos. Menos incertidumbre.
              <span className="font-600 text-white"> Eso es industrializar.</span> Y no te pedimos que lo creas: miremos los datos.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/data" className="btn-primary">Ver la evidencia</Link>
              <Link href="/nosotros" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">Conoce al CCI</Link>
            </div>
          </div>
        </div>
      </section>

      {/* RADAR — instrumentos destacados: abre la portada con las cifras */}
      <section className="container-cci py-14">
        <SectionHeader kicker="CCI Data" title="La industrialización en cifras" />
        <RadarKpisPreview />
        <VerMasLink href="/data">Explorar CCI Data</VerMasLink>
      </section>

      {/* QUIÉNES SOMOS — presentación compacta del CCI (detalle vive en /nosotros) */}
      <section className="bg-cci-paper py-14">
        <div className="container-cci grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <div className="inline-flex w-fit items-center whitespace-nowrap border-l-4 border-cci-orange bg-cci-orange-soft py-2 pl-4 pr-3 text-[11px] font-700 uppercase leading-none tracking-[0.15em] text-cci-orange-dark md:text-xs">
              Quiénes somos
            </div>
            <h2 className="mt-5 font-display text-2xl font-800 leading-tight text-cci-ink md:text-[2rem]">
              El ecosistema que está industrializando la construcción en Chile y{" "}
              <span className="text-cci-orange">Latam</span>
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-cci-slate">
              El Consejo de Construcción Industrializada articula a empresas, profesionales, instituciones y
              academia en torno a un objetivo común: elevar la productividad y la sustentabilidad de la
              construcción a través de la industrialización.
            </p>
            <VerMasLink href="/nosotros">Conoce al CCI</VerMasLink>
          </div>
          <div className="flex justify-center lg:justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/nosotros/ecosistema-mapa.png"
              alt="Mapa del ecosistema de la construcción industrializada del CCI en Chile y Latinoamérica."
              width={990}
              height={996}
              className="h-auto w-full max-w-[420px]"
            />
          </div>
        </div>
      </section>

      {/* ACTUALIDAD — asoma apenas pasado el punto de partida (sitio vivo) */}
      <section className="container-cci py-14">
        <SectionHeader kicker="Actualidad" title="Lo último del sector" />
        <FeaturedArticle article={featured} />

        {/* Más noticias — listado compacto estilo BBC: miniatura + título + fecha */}
        <div className="mt-10">
          <h3 className="mb-3 font-display text-lg font-800 text-cci-ink">Más noticias</h3>
          <ul className="border-t border-cci-line">
            {latest.map((a) => (
              <li key={a.id}>
                <Link
                  href={`/noticias/${a.slug}`}
                  className="group flex items-start gap-4 border-b border-cci-line py-4"
                >
                  <div
                    className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-md sm:w-32"
                    style={{ background: `linear-gradient(135deg, ${a.image.from} 0%, ${a.image.to} 100%)` }}
                  >
                    {a.photo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={a.photo}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="line-clamp-2 font-display text-base font-800 leading-snug text-cci-ink transition-colors group-hover:text-cci-orange-dark sm:line-clamp-3 sm:text-lg">
                      {a.title}
                    </h4>
                    <p className="mt-1 text-xs text-cci-slate-light">{formatDate(a.date)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <VerMasLink href="/noticias">Ver todas las noticias</VerMasLink>
      </section>

      {/* VOCES — avance de la sección de referentes */}
      {voces.length > 0 && (
        <section className="bg-cci-paper py-14">
          <div className="container-cci">
            <SectionHeader kicker="Voces" title="Voces de la industrialización" />
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
            <VerMasLink href="/voces">Ver todas las voces</VerMasLink>
          </div>
        </section>
      )}

      {/* VITRINA — avance del directorio comercial (socios oro) */}
      {vitrinaOro.length > 0 && (
        <section className="bg-cci-graphite-dark py-14">
          <div className="container-cci">
            <SectionHeader kicker="Vitrina" title="Quién construye industrializado" dark />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {vitrinaOro.map((e) => (
                <VitrinaMiniCard key={e.id} empresa={e} />
              ))}
            </div>
            <VerMasLink href="/vitrina">Ver toda la Vitrina</VerMasLink>
          </div>
        </section>
      )}

      {/* RADAR: datos reales del ecosistema chileno */}
      <section className="container-cci py-14">
        <SectionHeader kicker="CCI Data" title="El ecosistema industrializado de Chile, hoy" href="/data" hrefLabel="Ver CCI Data completo" />
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
          <SectionHeader kicker="Evidencia" title="Qué dice la investigación" href="/data/#cap4" hrefLabel="Ver la evidencia" dark />
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
            <Link href="/conocimiento" className="annot shrink-0 pb-1 text-cci-slate hover:text-cci-orange">
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

      {/* BANDA DE CIERRE — postulación a socio (honor y pertenencia) */}
      <section className="relative overflow-hidden bg-cci-graphite-dark">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{ backgroundImage: "radial-gradient(circle at 88% 20%, #E04E00 0%, transparent 45%), radial-gradient(circle at 5% 90%, #5C5C5C 0%, transparent 45%)" }}
        />
        <div className="container-cci relative py-16 text-center md:py-20">
          <div className="mx-auto inline-flex w-fit items-center whitespace-nowrap border-l-4 border-cci-orange bg-white/[0.06] py-2 pl-4 pr-3 text-[11px] font-700 uppercase leading-none tracking-[0.15em] text-[#F5EEE6] md:text-xs">
            Membresía
          </div>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-900 leading-tight text-white md:text-4xl">
            Postula a ser socio CCI
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            Las empresas e instituciones que están transformando la construcción en Chile ya son parte
            del CCI. Suma a tu organización a ese ecosistema.
          </p>
          <div className="mt-8">
            <Link href="/hazte-socio" className="btn-primary">Postula a ser socio CCI</Link>
          </div>
        </div>
      </section>
    </>
  );
}
