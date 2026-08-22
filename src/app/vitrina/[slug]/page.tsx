import Link from "next/link";
import { notFound } from "next/navigation";
import { getEmpresaVitrinaBySlug, getEmpresaVitrinaSlugs } from "@/sanity/fetch";
import { VitrinaLogo, NivelBadge } from "@/components/VitrinaCard";
import { mailtoContacto } from "@/lib/vitrina";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  const slugs = await getEmpresaVitrinaSlugs();
  // Con output: "export", un segmento dinámico exige al menos una ruta. Mientras
  // no haya empresas publicadas, generamos un slug centinela que la página
  // resuelve como 404 (nadie lo enlaza: la Vitrina está en su estado vacío).
  if (slugs.length === 0) return [{ slug: "_sin-empresas" }];
  return slugs.map((slug) => ({ slug }));
}

export default async function EmpresaVitrinaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const empresa = await getEmpresaVitrinaBySlug(slug);
  if (!empresa) notFound();

  // Nivel "bronce": ficha reducida (sin galería ni proyectos, aunque existan).
  const fichaCompleta = empresa.nivel !== "bronce";
  const esPagada = empresa.nivel === "pagada";

  return (
    <article className="container-cci max-w-4xl py-10">
      <Link
        href="/vitrina"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-cci-slate hover:text-cci-orange-dark"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Volver a la Vitrina
      </Link>

      {/* CABECERA */}
      <header className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <VitrinaLogo empresa={empresa} size={88} />
        <div className="flex-1">
          <div className="mb-2">
            <NivelBadge nivel={empresa.nivel} />
          </div>
          <h1 className="font-display text-3xl font-900 leading-tight text-cci-ink md:text-4xl">{empresa.nombre}</h1>
          {empresa.titular && <p className="mt-2 text-lg text-cci-slate">{empresa.titular}</p>}
          {empresa.anioDesde && (
            <p className="mt-1 text-sm text-cci-slate-light">Opera desde {empresa.anioDesde}</p>
          )}
        </div>
      </header>

      {/* Aviso de publicación pagada */}
      {esPagada && (
        <div className="mt-6 rounded-lg border border-dashed border-cci-orange bg-cci-orange-soft px-5 py-4 text-sm text-cci-graphite">
          <span className="font-700 text-cci-orange-dark">Publicación pagada.</span> Esta es una empresa no socia. El
          CCI no respalda sus afirmaciones técnicas o comerciales.
          {empresa.vigenteHasta && <> Vigente hasta el {formatDate(empresa.vigenteHasta)}.</>}
        </div>
      )}

      {/* DESCRIPCIÓN */}
      {empresa.descripcion && (
        <section className="mt-8 border-t border-cci-line pt-8">
          <p className="whitespace-pre-line text-[17px] leading-[1.75] text-cci-ink/90">{empresa.descripcion}</p>
        </section>
      )}

      {/* CATEGORÍAS Y ZONAS */}
      {(empresa.categorias.length > 0 || empresa.zonas.length > 0) && (
        <section className="mt-8 grid gap-6 sm:grid-cols-2">
          {empresa.categorias.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-700 uppercase tracking-wide text-cci-slate">Soluciones</h2>
              <div className="flex flex-wrap gap-2">
                {empresa.categorias.map((c) => (
                  <span key={c} className="rounded-full bg-cci-orange-soft px-3 py-1 text-sm font-600 capitalize text-cci-orange-dark">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
          {empresa.zonas.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-700 uppercase tracking-wide text-cci-slate">Dónde opera</h2>
              <div className="flex flex-wrap gap-2">
                {empresa.zonas.map((z) => (
                  <span key={z} className="rounded-full bg-cci-blue-soft px-3 py-1 text-sm font-600 text-cci-blue">
                    {z}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* GALERÍA — no en fichas bronce */}
      {fichaCompleta && empresa.galeria.length > 0 && (
        <section className="mt-10 border-t border-cci-line pt-8">
          <h2 className="mb-4 font-display text-xl font-800 text-cci-ink">Galería</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {empresa.galeria.map((url, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={url}
                alt={`${empresa.nombre} — imagen ${i + 1}`}
                loading="lazy"
                className="aspect-[3/2] w-full rounded-xl border border-cci-line object-cover"
              />
            ))}
          </div>
        </section>
      )}

      {/* PROYECTOS DESTACADOS — no en fichas bronce */}
      {fichaCompleta && empresa.proyectosDestacados.length > 0 && (
        <section className="mt-10 border-t border-cci-line pt-8">
          <h2 className="mb-4 font-display text-xl font-800 text-cci-ink">Proyectos destacados</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {empresa.proyectosDestacados.map((p, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-cci-line bg-white shadow-card">
                {p.imagen && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.imagen} alt={p.titulo} loading="lazy" className="aspect-[3/2] w-full object-cover" />
                )}
                <div className="p-5">
                  <h3 className="font-display text-base font-800 text-cci-ink">{p.titulo}</h3>
                  {p.descripcion && <p className="mt-2 text-sm leading-relaxed text-cci-slate">{p.descripcion}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CONTACTO */}
      <section className="mt-10 flex flex-wrap items-center gap-3 border-t border-cci-line pt-8">
        {empresa.emailContacto ? (
          <a href={mailtoContacto(empresa.emailContacto, empresa.nombre)} className="btn-primary">
            Contactar
          </a>
        ) : (
          <span className="text-sm italic text-cci-slate-light">Contacto por confirmar</span>
        )}
        {empresa.sitioWeb && (
          <a
            href={empresa.sitioWeb}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cci-line px-5 py-2.5 text-sm font-semibold text-cci-graphite transition hover:border-cci-graphite hover:bg-cci-paper"
          >
            Sitio web
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17 17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
        {empresa.telefono && <span className="text-sm text-cci-slate">Tel: {empresa.telefono}</span>}
      </section>
    </article>
  );
}
