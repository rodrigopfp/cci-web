import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, toPlainText } from "@portabletext/react";
import {
  getRecursoBiblioBySlug,
  getRecursoBiblioSlugs,
  getRecursosBiblioteca,
} from "@/sanity/fetch";
import type { RecursoBiblioteca } from "@/data/types";
import { SITE_URL } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { ETIQUETAS_CATEGORIA, ETIQUETAS_ESTADO, etiquetaTema, estadoChip, urlDescarga, esDescargable } from "@/lib/biblioteca";
import { obtenerIndicadorConFuente } from "@/lib/datos/indice";
import { EtiquetaEvidencia } from "@/components/EtiquetaEvidencia";
import { getTerminoBySlug } from "@/lib/datos/glosario";
import { DescargaForm } from "@/components/DescargaForm";
import { AvisoDisponibilidad } from "@/components/AvisoDisponibilidad";

export async function generateStaticParams() {
  const slugs = await getRecursoBiblioSlugs();
  if (slugs.length === 0) return [{ slug: "_sin-recursos" }];
  return slugs.map((slug) => ({ slug }));
}

function tiempoLectura(r: RecursoBiblioteca): number {
  const texto = [
    r.bajada ?? "",
    r.resumenEjecutivo ? toPlainText(r.resumenEjecutivo) : "",
    r.intro ? toPlainText(r.intro) : "",
    r.hallazgos.join(" "),
    r.cuerpo ? toPlainText(r.cuerpo) : "",
  ].join(" ");
  const palabras = texto.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palabras / 200));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = await getRecursoBiblioBySlug(slug);
  if (!r) return { title: "Recurso no encontrado · CCI" };
  const url = `${SITE_URL}/conocimiento/${r.slug}/`;
  const title = `${r.titulo} · Biblioteca CCI`;
  const description = r.bajada ?? `Recurso de la biblioteca del CCI: ${r.titulo}.`;
  return {
    title,
    description,
    authors: r.autores ? [{ name: r.autores }] : undefined,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "CCI",
      images: r.portada ? [r.portada] : undefined,
      publishedTime: r.fechaPublicacion,
    },
  };
}

function Meta({ label, value }: { label: string; value?: string | number }) {
  if (value === undefined || value === "" || value === null) return null;
  return (
    <div>
      <dt className="text-[11px] font-700 uppercase tracking-wide text-cci-slate-light">{label}</dt>
      <dd className="text-sm text-cci-ink">{value}</dd>
    </div>
  );
}

export default async function RecursoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = await getRecursoBiblioBySlug(slug);
  if (!r) notFound();

  const todos = await getRecursosBiblioteca();
  const tituloDe = (s: string) => todos.find((x) => x.slug === s)?.titulo ?? s;
  const relacionados = r.recursosRelacionados.map((s) => todos.find((x) => x.slug === s)).filter(Boolean) as RecursoBiblioteca[];

  const url = `${SITE_URL}/conocimiento/${r.slug}/`;
  const download = urlDescarga(r);
  const descargable = esDescargable(r);

  // Cifras del documento: desde el registro único, con su línea Fuente.
  const cifras = r.indicadoresDestacados.map((s) => obtenerIndicadorConFuente(s));

  const esReporte = ["estudios", "normativa", "reportes"].includes(r.categoria ?? "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": esReporte ? "Report" : "Article",
    headline: r.titulo,
    description: r.bajada,
    inLanguage: "es-CL",
    url,
    ...(r.portada ? { image: r.portada } : {}),
    ...(r.autores ? { author: { "@type": "Organization", name: r.autores } } : {}),
    publisher: { "@type": "Organization", name: "Consejo de Construcción Industrializada" },
    ...(r.fechaPublicacion ? { datePublished: r.fechaPublicacion } : {}),
    ...(r.fechaActualizacion ? { dateModified: r.fechaActualizacion } : {}),
  };

  return (
    <article className="container-cci max-w-3xl py-10">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Ruta de navegación" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-cci-slate-light">
        <Link href="/" className="hover:text-cci-orange-dark">Inicio</Link>
        <span>/</span>
        <Link href="/conocimiento" className="hover:text-cci-orange-dark">Conocimiento</Link>
        <span>/</span>
        <span className="text-cci-slate">{r.titulo}</span>
      </nav>

      {/* ENCABEZADO */}
      <header>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {r.categoria && (
            <span className="rounded-full bg-cci-orange-soft px-2.5 py-0.5 text-[11px] font-700 uppercase tracking-wide text-cci-orange-dark">
              {ETIQUETAS_CATEGORIA[r.categoria]}
            </span>
          )}
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-700 uppercase tracking-wide ${estadoChip(r.estado)}`}>
            {ETIQUETAS_ESTADO[r.estado]}
          </span>
        </div>
        <h1 className="font-display text-3xl font-900 leading-tight text-cci-ink md:text-4xl">{r.titulo}</h1>
        {r.bajada && <p className="mt-3 text-lg leading-relaxed text-cci-slate">{r.bajada}</p>}
      </header>

      {r.portada && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={r.portada} alt={r.titulo} className="mt-6 aspect-[16/9] w-full rounded-2xl border border-cci-line object-cover" />
      )}

      {/* Metadatos */}
      <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-cci-line py-5 sm:grid-cols-3">
        <Meta label="Autores" value={r.autores} />
        <Meta label="Institución" value={r.institucion} />
        <Meta label="Publicación" value={r.fechaPublicacion ? formatDate(r.fechaPublicacion) : undefined} />
        <Meta label="Versión" value={r.version} />
        <Meta label="Páginas" value={r.paginas} />
        <Meta label="Formato" value={r.formato} />
        <Meta label="Lectura" value={`${tiempoLectura(r)} min`} />
        <Meta label="Actualizado" value={r.fechaActualizacion ? formatDate(r.fechaActualizacion) : undefined} />
      </dl>

      {/* RESUMEN EJECUTIVO */}
      {r.resumenEjecutivo && (
        <section className="mt-8 rounded-2xl border border-cci-line bg-cci-paper p-6">
          <h2 className="text-sm font-700 uppercase tracking-wide text-cci-orange">Resumen ejecutivo</h2>
          <div className="prose-cci mt-3 space-y-3 text-[16px] leading-[1.7] text-cci-ink/90">
            <PortableText value={r.resumenEjecutivo} />
          </div>
        </section>
      )}

      {/* INTRODUCCIÓN */}
      {r.intro && (
        <section className="prose-cci mt-8 space-y-4 text-[17px] leading-[1.75] text-cci-ink/90">
          <PortableText value={r.intro} />
        </section>
      )}

      {/* CIFRAS DEL DOCUMENTO (desde el registro, con Fuente) */}
      {cifras.length > 0 && (
        <section className="mt-8 rounded-2xl border border-cci-line bg-cci-paper p-6">
          <h2 className="text-sm font-700 uppercase tracking-wide text-cci-orange">Resultados medidos</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {cifras.map(({ indicador: i }) => (
              <div key={i.slug}>
                <div className="font-display text-2xl font-900 leading-none text-cci-orange">
                  {i.prefix ?? ""}
                  {i.value}
                  {i.suffix ?? ""}
                </div>
                <p className="mt-1 text-sm text-cci-slate">{i.title}</p>
                <div className="mt-2">
                  <EtiquetaEvidencia tipo={i.sourceType} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 border-t border-cci-line pt-3 text-[11px] font-600 text-cci-slate-light">
            Fuente: {cifras[0].fuente.shortLabel ?? cifras[0].fuente.organization}
          </p>
        </section>
      )}

      {/* HALLAZGOS */}
      {r.hallazgos.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-xl font-800 text-cci-ink">Hallazgos</h2>
          <ul className="mt-4 space-y-3">
            {r.hallazgos.map((h) => (
              <li key={h} className="flex gap-3 text-cci-slate">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cci-orange" />
                {h}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* CUERPO */}
      {r.cuerpo && (
        <section className="prose-cci mt-8 space-y-4 text-[17px] leading-[1.75] text-cci-ink/90">
          <PortableText value={r.cuerpo} />
        </section>
      )}

      {/* DESCARGA */}
      <section className="mt-10 border-t border-cci-line pt-8">
        {descargable && download ? (
          r.requiereFormulario ? (
            <DescargaForm slug={r.slug} titulo={r.titulo} downloadUrl={download} esExterno={r.esExterno} />
          ) : (
            <div className="rounded-2xl border border-cci-line bg-cci-paper p-6">
              <a
                href={download}
                {...(r.esExterno ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
                className="btn-primary"
              >
                {r.esExterno ? "Ir al documento" : "Descargar el documento"}
              </a>
              {r.esExterno && <p className="mt-3 text-xs text-cci-slate-light">Documento alojado por su institución de origen.</p>}
            </div>
          )
        ) : ["en_preparacion", "proximamente", "en_revision"].includes(r.estado) ? (
          // Sin archivo y en preparación/próximamente/revisión: aviso de disponibilidad.
          <AvisoDisponibilidad slug={r.slug} titulo={r.titulo} />
        ) : (
          <div className="rounded-2xl border border-dashed border-cci-line bg-cci-paper p-6 text-sm text-cci-slate">
            Este recurso está <strong>{ETIQUETAS_ESTADO[r.estado].toLowerCase()}</strong>. Aún no hay una descarga disponible.
          </div>
        )}
      </section>

      {/* RELACIONADOS + GLOSARIO */}
      {(relacionados.length > 0 || r.terminosGlosario.length > 0) && (
        <section className="mt-10 grid gap-8 border-t border-cci-line pt-8 sm:grid-cols-2">
          {relacionados.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-700 uppercase tracking-wide text-cci-slate">Recursos relacionados</h2>
              <ul className="space-y-2">
                {relacionados.map((x) => (
                  <li key={x.slug}>
                    <Link href={`/conocimiento/${x.slug}`} className="text-sm font-600 text-cci-orange hover:text-cci-orange-dark">
                      {x.titulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {r.terminosGlosario.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-700 uppercase tracking-wide text-cci-slate">Términos del glosario</h2>
              <div className="flex flex-wrap gap-2">
                {r.terminosGlosario.map((s) => {
                  const t = getTerminoBySlug(s);
                  if (!t) return null;
                  return (
                    <Link key={s} href={`/glosario/${s}`} className="inline-flex items-center rounded-full border border-cci-line bg-white px-3 py-1 text-sm font-600 text-cci-graphite transition hover:border-cci-graphite hover:bg-cci-paper">
                      {t.titulo}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      )}

      {/* CTA MEMBRESÍA */}
      <section className="mt-12 overflow-hidden rounded-2xl bg-cci-graphite-dark p-8 text-center">
        <h2 className="font-display text-2xl font-900 text-white">Sé parte del CCI</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/75">
          Accede primero al conocimiento, los datos y la red que está transformando la construcción en Chile.
        </p>
        <Link href="/hazte-socio" data-cta="hazte-socio" data-ubicacion="ficha-conocimiento" className="btn-primary mt-6">Postula a ser socio CCI</Link>
      </section>

      <div className="mt-8">
        <Link href="/conocimiento" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cci-slate hover:text-cci-orange-dark">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Volver a la biblioteca
        </Link>
      </div>
    </article>
  );
}
