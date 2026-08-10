import Link from "next/link";
import { notFound } from "next/navigation";
import { getVozBySlug, getVozSlugs } from "@/sanity/fetch";
import { VozPortrait } from "@/components/VozCard";

export async function generateStaticParams() {
  const slugs = await getVozSlugs();
  // Con output: "export", un segmento dinámico exige al menos una ruta. Mientras
  // no haya voces publicadas, generamos un slug centinela que la página resuelve
  // como 404 (nadie lo enlaza: la grilla está en su estado vacío). En cuanto se
  // publique la primera voz, este centinela desaparece.
  if (slugs.length === 0) return [{ slug: "_sin-voces" }];
  return slugs.map((slug) => ({ slug }));
}

export default async function VozPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const voz = await getVozBySlug(slug);
  if (!voz) notFound();

  return (
    <article className="container-cci max-w-3xl py-10">
      <Link
        href="/voces"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-cci-slate hover:text-cci-orange-dark"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Volver a Voces
      </Link>

      {/* CABECERA: retrato + identidad */}
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end">
        <VozPortrait voz={voz} className="aspect-[4/5] w-40 shrink-0 sm:w-48" />
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2 text-xs font-700 uppercase tracking-wide text-cci-orange">
            <span className="h-[2px] w-6 bg-cci-orange" />
            Voz de la industrialización
          </div>
          <h1 className="font-display text-3xl font-900 leading-tight text-cci-ink md:text-4xl">
            {voz.nombre}
          </h1>
          {(voz.cargo || voz.organizacion) && (
            <p className="mt-2 text-lg text-cci-slate">
              {voz.cargo}
              {voz.cargo && voz.organizacion ? " · " : ""}
              {voz.organizacion}
            </p>
          )}
          {voz.linkedin && (
            <a
              href={voz.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-600 text-cci-blue hover:text-cci-blue-light"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.3 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2.02 0-2.33 1.58-2.33 3.2V21H9z" />
              </svg>
              LinkedIn
            </a>
          )}
        </div>
      </header>

      {/* FRASE DESTACADA */}
      {voz.fraseDestacada && (
        <blockquote className="mt-10 border-l-4 border-cci-orange pl-5 font-display text-xl font-800 italic leading-snug text-cci-graphite md:text-2xl">
          “{voz.fraseDestacada}”
        </blockquote>
      )}

      {/* ENTREVISTA — o, si aún no existe, un bloque "próximamente" elegante */}
      {voz.entrevista.length > 0 ? (
        <section className="mt-12 space-y-8 border-t border-cci-line pt-10">
          {voz.entrevista.map((qa, i) => (
            <div key={i}>
              <h2 className="font-display text-lg font-800 leading-snug text-cci-orange-dark md:text-xl">
                {qa.pregunta}
              </h2>
              <p className="mt-3 whitespace-pre-line text-[17px] leading-[1.75] text-cci-ink/90">
                {qa.respuesta}
              </p>
            </div>
          ))}
        </section>
      ) : (
        <section className="mt-12 border-t border-cci-line pt-10">
          <div className="rounded-2xl border border-dashed border-cci-line bg-cci-paper px-8 py-12 text-center">
            <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-cci-orange-soft text-cci-orange">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="font-display text-xl font-800 text-cci-ink">Entrevista próximamente</h2>
            <p className="mt-2 text-cci-slate">Pronto compartiremos la conversación con {voz.nombre}.</p>
          </div>
        </section>
      )}
    </article>
  );
}
