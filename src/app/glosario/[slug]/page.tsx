import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  TERMINOS,
  getTerminoBySlug,
  assertGlosarioValido,
  ETIQUETAS_CATEGORIA,
} from "@/lib/datos/glosario";
import { formatDate } from "@/lib/format";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  assertGlosarioValido(); // freno de build ante datos inválidos
  return TERMINOS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTerminoBySlug(slug);
  if (!t) return { title: "Término no encontrado · Glosario CCI" };

  const url = `${SITE_URL}/glosario/${t.slug}/`;
  const title = `${t.titulo} · Glosario CCI`;

  // Borrador: fuera de índice y sin canonical/OG (aún no publicado).
  if (!t.publicado) {
    return { title, description: t.definicionCorta, robots: { index: false, follow: false } };
  }

  return {
    title,
    description: t.definicionCorta,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description: t.definicionCorta,
      url,
      siteName: "CCI",
    },
  };
}

// Enlace a otro término (relacionados / no confundir con). El slug existe por
// validación; si no existe, no se renderiza para evitar enlaces rotos.
function TerminoLink({ slug }: { slug: string }) {
  const t = getTerminoBySlug(slug);
  if (!t) return null;
  return (
    <Link
      href={`/glosario/${t.slug}`}
      className="inline-flex items-center rounded-full border border-cci-line bg-white px-3 py-1 text-sm font-600 text-cci-graphite transition hover:border-cci-graphite hover:bg-cci-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-cci-orange"
    >
      {t.titulo}
    </Link>
  );
}

function Bloque({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 border-t border-cci-line pt-8">
      <h2 className="mb-3 text-sm font-700 uppercase tracking-wide text-cci-slate">{titulo}</h2>
      {children}
    </section>
  );
}

export default async function TerminoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTerminoBySlug(slug);
  if (!t) notFound();

  const url = `${SITE_URL}/glosario/${t.slug}/`;

  // JSON-LD solo cuando el término está publicado.
  const jsonLd = t.publicado
    ? {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        name: t.titulo,
        description: t.definicionCorta,
        url,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "Glosario técnico CCI",
          url: `${SITE_URL}/glosario/`,
        },
      }
    : null;

  return (
    <article className="container-cci max-w-3xl py-10">
      {jsonLd && (
        // eslint-disable-next-line react/no-danger
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}

      {/* BREADCRUMBS */}
      <nav aria-label="Ruta de navegación" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-cci-slate-light">
        <Link href="/" className="hover:text-cci-orange-dark">Inicio</Link>
        <span>/</span>
        <Link href="/glosario" className="hover:text-cci-orange-dark">Glosario</Link>
        <span>/</span>
        <span className="text-cci-slate">{t.titulo}</span>
      </nav>

      {/* CABECERA */}
      <header>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-cci-orange-soft px-2.5 py-0.5 text-[11px] font-700 uppercase tracking-wide text-cci-orange-dark">
            {ETIQUETAS_CATEGORIA[t.categoria]}
          </span>
          {!t.publicado && (
            <span className="rounded-full bg-cci-paper px-2.5 py-0.5 text-[11px] font-700 uppercase tracking-wide text-cci-slate-light">
              En revisión técnica
            </span>
          )}
        </div>
        <h1 className="font-display text-3xl font-900 leading-tight text-cci-ink md:text-4xl">{t.titulo}</h1>
      </header>

      {/* 1. DEFINICIÓN CORTA */}
      <p className="mt-6 text-[19px] leading-[1.7] text-cci-ink/90">{t.definicionCorta}</p>

      {/* 2. EXPLICACIÓN SIMPLE */}
      {t.explicacionSimple && (
        <Bloque titulo="En simple">
          <p className="whitespace-pre-line text-[17px] leading-[1.75] text-cci-ink/90">{t.explicacionSimple}</p>
        </Bloque>
      )}

      {/* 3. EXPLICACIÓN TÉCNICA */}
      {t.explicacionTecnica && (
        <Bloque titulo="En detalle técnico">
          <p className="whitespace-pre-line text-[17px] leading-[1.75] text-cci-ink/90">{t.explicacionTecnica}</p>
        </Bloque>
      )}

      {/* 4. POR QUÉ IMPORTA */}
      {t.porQueImporta && (
        <Bloque titulo="Por qué importa">
          <p className="whitespace-pre-line text-[17px] leading-[1.75] text-cci-ink/90">{t.porQueImporta}</p>
        </Bloque>
      )}

      {/* 5. EJEMPLO */}
      {t.ejemplo && (
        <Bloque titulo="Ejemplo">
          <p className="whitespace-pre-line text-[17px] leading-[1.75] text-cci-ink/90">{t.ejemplo}</p>
        </Bloque>
      )}

      {/* 6. NO CONFUNDIR CON */}
      {t.noConfundirCon && t.noConfundirCon.length > 0 && (
        <Bloque titulo="No confundir con">
          <div className="flex flex-wrap gap-2">
            {t.noConfundirCon.map((s) => (
              <TerminoLink key={s} slug={s} />
            ))}
          </div>
        </Bloque>
      )}

      {/* 7. CONTEXTO CHILENO */}
      {t.contextoChileno && (
        <Bloque titulo="Contexto chileno">
          <p className="whitespace-pre-line text-[17px] leading-[1.75] text-cci-ink/90">{t.contextoChileno}</p>
        </Bloque>
      )}

      {/* 8. TÉRMINOS RELACIONADOS */}
      {t.relacionados && t.relacionados.length > 0 && (
        <Bloque titulo="Términos relacionados">
          <div className="flex flex-wrap gap-2">
            {t.relacionados.map((s) => (
              <TerminoLink key={s} slug={s} />
            ))}
          </div>
        </Bloque>
      )}

      {/* 9. RECURSOS RELACIONADOS */}
      {t.recursosRelacionados && t.recursosRelacionados.length > 0 && (
        <Bloque titulo="Recursos relacionados">
          <ul className="space-y-1">
            {t.recursosRelacionados.map((s) => (
              <li key={s}>
                <Link href={`/conocimiento/${s}`} className="text-sm font-600 text-cci-orange hover:text-cci-orange-dark">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </Bloque>
      )}

      {/* 10. FUENTES */}
      {t.fuentes.length > 0 && (
        <Bloque titulo="Fuentes">
          <ul className="space-y-1 text-sm text-cci-slate">
            {t.fuentes.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </Bloque>
      )}

      {/* 11. FECHA DE REVISIÓN */}
      {t.fechaRevision && (
        <p className="mt-8 border-t border-cci-line pt-6 text-xs text-cci-slate-light">
          Última revisión: {formatDate(t.fechaRevision)}.
        </p>
      )}

      <div className="mt-10">
        <Link href="/glosario" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cci-slate hover:text-cci-orange-dark">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Volver al glosario
        </Link>
      </div>
    </article>
  );
}
