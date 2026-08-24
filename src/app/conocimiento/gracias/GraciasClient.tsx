"use client";

// Confirmación de descarga (Fase 3 · ajuste 3, Parte 2).
//
// Ruta única: el recurso llega por ?recurso=slug y se resuelve en cliente contra
// el mapa que arma el componente de servidor. Sin JS (o sin parámetro), se
// muestra la versión genérica: agradecimiento + enlace a la Biblioteca.

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export type RecursoGracias = {
  titulo: string;
  downloadUrl?: string;
  esExterno: boolean;
  relacionados: { slug: string; titulo: string }[];
  glosario: { slug: string; titulo: string }[];
};

function Check() {
  return (
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cci-orange">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function GraciasClient({ recursos }: { recursos: Record<string, RecursoGracias> }) {
  const params = useSearchParams();
  const slug = params.get("recurso") ?? "";
  const r = slug ? recursos[slug] : undefined;

  return (
    <>
      <section
        data-cta="descarga-completada"
        data-recurso={slug || undefined}
        className="relative overflow-hidden border-b border-cci-line bg-cci-graphite-dark"
      >
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{ backgroundImage: "radial-gradient(circle at 88% 20%, #E04E00 0%, transparent 45%), radial-gradient(circle at 5% 90%, #5C5C5C 0%, transparent 45%)" }}
        />
        <div className="container-cci relative py-20 text-center md:py-24">
          <Check />
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-3xl font-900 leading-tight text-white md:text-5xl">
            {r ? "¡Gracias por tu descarga!" : "¡Gracias!"}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            {r
              ? `Estás accediendo a «${r.titulo}». Si la descarga no comenzó, usa el enlace de respaldo.`
              : "Gracias por tu interés en la biblioteca del CCI."}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {r?.downloadUrl && (
              <a
                href={r.downloadUrl}
                {...(r.esExterno ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
                data-cta="descarga-completada"
                data-recurso={slug || undefined}
                className="btn-primary"
              >
                {r.esExterno ? "Ir al documento" : "Descargar de nuevo"}
              </a>
            )}
            <Link href="/conocimiento" className="inline-flex items-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
              Volver a la Biblioteca
            </Link>
          </div>
        </div>
      </section>

      {/* Recursos relacionados + términos del glosario del recurso descargado */}
      {r && (r.relacionados.length > 0 || r.glosario.length > 0) && (
        <section className="container-cci py-16 md:py-20">
          {r.relacionados.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">Sigue explorando</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {r.relacionados.map((x) => (
                  <Link
                    key={x.slug}
                    href={`/conocimiento/${x.slug}`}
                    className="card-rise group flex flex-col gap-2 rounded-2xl border border-cci-line bg-white p-6 shadow-card"
                  >
                    <h3 className="font-display text-lg font-800 text-cci-ink group-hover:text-cci-orange-dark">{x.titulo}</h3>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-cci-orange">Ver recurso →</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {r.glosario.length > 0 && (
            <div className="mt-10">
              <h2 className="mb-3 text-sm font-700 uppercase tracking-wide text-cci-slate">Términos del glosario</h2>
              <div className="flex flex-wrap gap-2">
                {r.glosario.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/glosario/${t.slug}`}
                    className="inline-flex items-center rounded-full border border-cci-line bg-white px-3 py-1 text-sm font-600 text-cci-graphite transition hover:border-cci-graphite hover:bg-cci-paper"
                  >
                    {t.titulo}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* CTA membresía */}
      <section className="bg-cci-paper py-16 md:py-20">
        <div className="container-cci text-center">
          <h2 className="font-display text-2xl font-900 text-cci-ink md:text-3xl">Sé parte del CCI</h2>
          <p className="mx-auto mt-3 max-w-xl text-cci-slate">
            Accede primero al conocimiento, los datos y la red que está transformando la construcción en Chile.
          </p>
          <Link href="/hazte-socio" data-cta="hazte-socio" data-ubicacion="conocimiento-gracias" className="btn-primary mt-6">
            Hazte socio
          </Link>
        </div>
      </section>
    </>
  );
}
