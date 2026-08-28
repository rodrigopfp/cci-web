import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  TERMINOS,
  getTerminoBySlug,
  assertGlosarioValido,
  ETIQUETAS_CATEGORIA,
  esPublico,
  esArchivada,
  esBorrador,
  etiquetaNaturaleza,
  rotuloEstado,
} from "@/lib/datos/glosario";
import { obtenerFuente } from "@/lib/datos/indice";
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

  // Archivada: no indexar; canonical apunta al término vigente de reemplazo.
  if (esArchivada(t)) {
    return {
      title,
      robots: { index: false, follow: true },
      alternates: t.reemplazadoPor ? { canonical: `${SITE_URL}/glosario/${t.reemplazadoPor}/` } : undefined,
    };
  }

  // Borrador: fuera de índice y sin canonical/OG (aún no público).
  if (!esPublico(t)) {
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

// Sello de validación técnica del CCI. Colores del manual de marca: azul
// institucional #005CAD (cci-blue) y gris #5C5C5C (cci-graphite); los dos tintes
// celestes (#F4F9FD fondo, #CFE1F2 borde) son propios del sello, no van a la
// paleta global. Check de línea fina (no relleno), aria-hidden. Sin sombras ni
// degradados; no debe pesar más que el título. Solo se renderiza en validada_cci.
function SelloValidacion() {
  return (
    <div className="mt-3 flex max-w-[470px] items-center gap-3 rounded-lg border border-[#CFE1F2] bg-[#F4F9FD] px-[18px] py-[13px]">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
        <circle cx="12" cy="12" r="10" stroke="#005CAD" strokeWidth="1.6" />
        <path d="M7.5 12.3l3 3 6-6.6" stroke="#005CAD" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div>
        <p className="text-[13.5px] font-700 leading-snug text-cci-blue">Definición validada por el CCI</p>
        <p className="text-[12.5px] leading-snug text-cci-graphite">
          Revisada por el comité técnico del Consejo de Construcción Industrializada
        </p>
      </div>
    </div>
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

  // Archivada: stub de redirección (meta-refresh) al término vigente. En
  // producción Caddy sirve además un 301; aquí garantizamos el redirect sin JS.
  if (esArchivada(t)) {
    const destino = t.reemplazadoPor ? `/glosario/${t.reemplazadoPor}/` : "/glosario/";
    return (
      <>
        <meta httpEquiv="refresh" content={`0; url=${destino}`} />
        <article className="container-cci max-w-3xl py-16 text-center">
          <p className="text-cci-slate">
            Este término se archivó. Redirigiendo a{" "}
            <Link href={destino} className="font-600 text-cci-orange hover:text-cci-orange-dark">
              la definición vigente
            </Link>
            …
          </p>
        </article>
      </>
    );
  }

  const naturalezaLabel = etiquetaNaturaleza(t);
  const estadoLabel = rotuloEstado(t);

  // JSON-LD DefinedTerm solo cuando el término es público.
  const jsonLd = esPublico(t)
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
          {/* Pastilla de categoría INTENSA (solo en la ficha; el índice la mantiene
              suave). Misma forma/tamaño; solo cambia el relleno a naranja sólido con
              texto blanco. font-800 (no 700) para reforzar el contraste blanco sobre
              #E04E00 (~4,0:1), según indicación de subir peso antes que aclarar. */}
          <span className="rounded-full bg-cci-orange px-2.5 py-0.5 text-[11px] font-800 uppercase tracking-wide text-white">
            {ETIQUETAS_CATEGORIA[t.categoria]}
          </span>
          {/* Naturaleza (mismo estilo de pill que el indicador de evidencia). */}
          {naturalezaLabel && (
            <span
              className="inline-flex w-fit items-center rounded-md border border-cci-line bg-cci-paper px-2 py-0.5 text-[10px] font-700 uppercase tracking-wide text-cci-slate"
              title={
                t.naturaleza === "normativa"
                  ? "Definición alineada con una norma o instrumento oficial."
                  : "Explicación propia del CCI, no un texto normativo."
              }
            >
              {naturalezaLabel}
            </span>
          )}
          {esBorrador(t) && (
            <span className="rounded-full bg-cci-paper px-2.5 py-0.5 text-[11px] font-700 uppercase tracking-wide text-cci-slate-light">
              En revisión técnica
            </span>
          )}
        </div>
        <h1 className="font-display text-3xl font-900 leading-tight text-cci-ink md:text-4xl">{t.titulo}</h1>
        {/* Bajo el título: el SELLO de validación solo para definiciones validadas
            por el CCI. Para "revision_grupo_tecnico" (público pero puede cambiar) se
            mantiene la línea de estado plana; borrador/archivada no muestran nada. */}
        {t.estadoEditorial === "validada_cci" ? (
          <SelloValidacion />
        ) : estadoLabel ? (
          <p className="mt-3 text-sm font-600 text-cci-slate">{estadoLabel}.</p>
        ) : null}
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
          <ul className="space-y-1.5 text-sm text-cci-slate">
            {t.fuentes.map((id) => {
              const f = obtenerFuente(id);
              const externo = f.url?.startsWith("http");
              return (
                <li key={id}>
                  <span className="font-600 text-cci-ink">{f.organization}</span> — {f.title}
                  {f.url && (
                    <>
                      {" · "}
                      <a
                        href={f.url}
                        target={externo ? "_blank" : undefined}
                        rel={externo ? "noopener noreferrer" : undefined}
                        className="font-600 text-cci-orange hover:text-cci-orange-dark"
                      >
                        Ir a la fuente
                      </a>
                    </>
                  )}
                </li>
              );
            })}
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
