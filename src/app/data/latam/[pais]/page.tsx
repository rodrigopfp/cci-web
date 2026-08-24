import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PAISES_LATAM, getFichaPais } from "@/lib/datos/latam";
import { obtenerIndicadorConFuente, obtenerFuente } from "@/lib/datos/indice";
import { EtiquetaEvidencia, NotaEvidencia } from "@/components/EtiquetaEvidencia";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return PAISES_LATAM.map((f) => ({ pais: f.codigo }));
}

export async function generateMetadata({ params }: { params: Promise<{ pais: string }> }): Promise<Metadata> {
  const { pais } = await params;
  const f = getFichaPais(pais);
  if (!f) return { title: "País no encontrado · CCI" };
  const url = `${SITE_URL}/data/latam/${f.codigo}/`;
  const desc = f.resumen ?? `Panorama de la construcción industrializada en ${f.nombre}.`;
  return {
    title: `${f.nombre} · Panorama LATAM · CCI`,
    description: desc,
    robots: f.estadoFicha === "en_levantamiento" ? { index: false, follow: true } : undefined,
    alternates: { canonical: url },
    openGraph: { type: "article", title: `${f.nombre} · Panorama LATAM`, description: desc, url, siteName: "CCI" },
  };
}

const ESTADO_LABEL = {
  completa: "Ficha completa",
  parcial: "Ficha parcial",
  en_levantamiento: "En levantamiento",
} as const;

function formatCL(v: number | string): string {
  if (typeof v !== "number") return String(v);
  return Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function EnLevantamiento() {
  return (
    <p className="rounded-xl border border-dashed border-cci-line bg-cci-paper px-4 py-3 text-sm text-cci-slate">
      Información en levantamiento.
    </p>
  );
}

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 border-t border-cci-line pt-8">
      <h2 className="mb-3 text-sm font-700 uppercase tracking-wide text-cci-slate">{titulo}</h2>
      {children}
    </section>
  );
}

export default async function FichaPaisPage({ params }: { params: Promise<{ pais: string }> }) {
  const { pais } = await params;
  const f = getFichaPais(pais);
  if (!f) notFound();

  const s = f.secciones;
  const indicadores = (s.indicadores ?? []).map((slug) => obtenerIndicadorConFuente(slug));

  return (
    <article className="container-cci max-w-3xl py-10">
      <nav aria-label="Ruta de navegación" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-cci-slate-light">
        <Link href="/data" className="hover:text-cci-orange-dark">CCI Data</Link>
        <span>/</span>
        <Link href="/data/latam" className="hover:text-cci-orange-dark">Panorama LATAM</Link>
        <span>/</span>
        <span className="text-cci-slate">{f.nombre}</span>
      </nav>

      <header>
        <div className="mb-2">
          <span className="rounded-full bg-cci-orange-soft px-2.5 py-0.5 text-[11px] font-700 uppercase tracking-wide text-cci-orange-dark">
            {ESTADO_LABEL[f.estadoFicha]}
          </span>
        </div>
        <h1 className="font-display text-3xl font-900 leading-tight text-cci-ink md:text-4xl">{f.nombre}</h1>
        {f.resumen && <p className="mt-3 text-lg leading-relaxed text-cci-slate">{f.resumen}</p>}
        {f.ultimoHito && <p className="mt-2 text-sm text-cci-slate-light">Último hito: {f.ultimoHito}</p>}
      </header>

      {/* 1. PANORAMA GENERAL */}
      <Seccion titulo="Panorama general">
        {s.panorama ? <p className="text-[17px] leading-[1.75] text-cci-ink/90">{s.panorama}</p> : <EnLevantamiento />}
      </Seccion>

      {/* 2. LENGUAJE UTILIZADO */}
      <Seccion titulo="Lenguaje utilizado">
        {s.lenguaje && s.lenguaje.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {s.lenguaje.map((t) => (
              <span key={t} className="rounded-full bg-cci-paper px-3 py-1 text-sm font-600 text-cci-graphite">{t}</span>
            ))}
          </div>
        ) : <EnLevantamiento />}
      </Seccion>

      {/* 3. POLÍTICA PÚBLICA */}
      <Seccion titulo="Política pública">
        {s.politicaPublica ? <p className="text-[17px] leading-[1.75] text-cci-ink/90">{s.politicaPublica}</p> : <EnLevantamiento />}
      </Seccion>

      {/* 4. MARCO NORMATIVO */}
      <Seccion titulo="Marco normativo">
        {s.marcoNormativo ? <p className="text-[17px] leading-[1.75] text-cci-ink/90">{s.marcoNormativo}</p> : <EnLevantamiento />}
      </Seccion>

      {/* 5. ECOSISTEMA */}
      <Seccion titulo="Ecosistema">
        {s.ecosistema && s.ecosistema.length > 0 ? (
          <ul className="grid gap-3 sm:grid-cols-2">
            {s.ecosistema.map((o) => (
              <li key={o.nombre} className="rounded-xl border border-cci-line bg-white p-4">
                <div className="font-600 text-cci-ink">
                  {o.url ? (
                    <a href={o.url} target="_blank" rel="noopener noreferrer" className="hover:text-cci-orange-dark">{o.nombre}</a>
                  ) : o.nombre}
                </div>
                <div className="text-xs text-cci-slate-light">{o.tipo}</div>
              </li>
            ))}
          </ul>
        ) : <EnLevantamiento />}
      </Seccion>

      {/* 6. CASOS DESTACADOS */}
      <Seccion titulo="Casos destacados">
        {s.casos && s.casos.length > 0 ? (
          <>
            <ul className="space-y-2">
              {s.casos.map((c) => (
                <li key={c} className="flex gap-3 text-cci-slate">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cci-orange" />
                  {c}
                </li>
              ))}
            </ul>
            {s.casosEnlaces && s.casosEnlaces.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                {s.casosEnlaces.map((e) => (
                  <Link key={e.href} href={e.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-cci-orange hover:text-cci-orange-dark">
                    {e.label}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : <EnLevantamiento />}
      </Seccion>

      {/* 7. INDICADORES (desde el registro, con Fuente) */}
      <Seccion titulo="Indicadores">
        {indicadores.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {indicadores.map(({ indicador: i, fuente }) => (
              <div key={i.slug} className="rounded-xl border border-cci-line bg-white p-4">
                <div className="font-display text-2xl font-900 leading-none text-cci-orange">
                  {i.prefix ?? ""}{formatCL(i.value)}{i.suffix ?? ""}
                  {i.unit && <span className="ml-1 text-sm font-700 text-cci-slate">{i.unit}</span>}
                </div>
                <p className="mt-1 text-sm text-cci-slate">{i.title}</p>
                <div className="mt-2"><EtiquetaEvidencia tipo={i.sourceType} /></div>
                <p className="mt-2 text-[11px] font-600 text-cci-slate-light">Fuente: {fuente.shortLabel ?? fuente.organization}</p>
                <NotaEvidencia tipo={i.sourceType} scope={i.scope} />
              </div>
            ))}
          </div>
        ) : <EnLevantamiento />}
      </Seccion>

      {/* 8. FUENTES */}
      <Seccion titulo="Fuentes">
        {f.fuentes.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {f.fuentes.map((id) => {
              const src = obtenerFuente(id);
              return (
                <li key={id}>
                  <span className="font-600 text-cci-ink">{src.organization}</span> — {src.title}
                  {src.url && (
                    <> · <a href={src.url} target={src.url.startsWith("http") ? "_blank" : undefined} rel={src.url.startsWith("http") ? "noopener noreferrer" : undefined} className="font-600 text-cci-orange hover:text-cci-orange-dark">Ir a la fuente</a></>
                  )}
                </li>
              );
            })}
          </ul>
        ) : <EnLevantamiento />}
      </Seccion>

      {/* GOBERNANZA */}
      <section className="mt-10 rounded-2xl border border-cci-line bg-cci-paper p-5 text-[12px] leading-relaxed text-cci-slate">
        <div className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
          {f.fechaCorte && <div><span className="font-700 text-cci-ink">Fecha de corte:</span> {f.fechaCorte}</div>}
          <div><span className="font-700 text-cci-ink">Última actualización:</span> {f.ultimaActualizacion}</div>
          <div><span className="font-700 text-cci-ink">Editor:</span> {f.editor}</div>
          <div><span className="font-700 text-cci-ink">Estado:</span> {ESTADO_LABEL[f.estadoFicha]}</div>
        </div>
        {f.limitaciones && <p className="mt-3 border-t border-cci-line pt-3"><span className="font-700 text-cci-ink">Limitaciones:</span> {f.limitaciones}</p>}
      </section>

      {/* CTA APORTE */}
      <div className="mt-8">
        <Link href={`/data/latam/aporta?pais=${f.codigo}`} data-cta="aporta-pais" data-ubicacion="latam-ficha" className="btn-ghost">
          Aporta información de {f.nombre}
        </Link>
      </div>

      {/* BANDA DE CIERRE — Hazte socio */}
      <section className="mt-12 overflow-hidden rounded-2xl bg-cci-graphite-dark p-8 text-center">
        <h2 className="font-display text-2xl font-900 text-white">Sé parte del CCI</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/75">Suma a tu organización al ecosistema que está transformando la construcción en la región.</p>
        <Link href="/hazte-socio" data-cta="hazte-socio" data-ubicacion="cierre-latam" className="btn-primary mt-6">Postula a ser socio CCI</Link>
      </section>

      <div className="mt-8">
        <Link href="/data/latam" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cci-slate hover:text-cci-orange-dark">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Volver al Panorama LATAM
        </Link>
      </div>
    </article>
  );
}
