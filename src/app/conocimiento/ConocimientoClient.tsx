"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { RecursoBiblioteca } from "@/data/types";
import { ETIQUETAS_CATEGORIA, ETIQUETAS_ESTADO, etiquetaTema, estadoChip } from "@/lib/biblioteca";

function chipCls(active: boolean): string {
  return `shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cci-orange focus-visible:ring-offset-1 ${
    active ? "border-cci-graphite bg-cci-graphite text-white" : "border-cci-line bg-white text-cci-slate hover:border-cci-slate-light"
  }`;
}

function RecursoCard({ r }: { r: RecursoBiblioteca }) {
  return (
    <Link
      href={`/conocimiento/${r.slug}`}
      className="card-rise group flex h-full flex-col overflow-hidden rounded-2xl border border-cci-line bg-white shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-cci-orange"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-cci-graphite to-cci-graphite-dark">
        {r.portada && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={r.portada} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        )}
        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-700 uppercase tracking-wide ${estadoChip(r.estado)}`}>
          {ETIQUETAS_ESTADO[r.estado]}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {r.categoria && (
          <span className="text-[11px] font-700 uppercase tracking-wide text-cci-orange">{ETIQUETAS_CATEGORIA[r.categoria]}</span>
        )}
        <h3 className="font-display text-lg font-800 leading-snug text-cci-ink transition-colors group-hover:text-cci-orange-dark">{r.titulo}</h3>
        {r.bajada && <p className="line-clamp-3 text-sm leading-relaxed text-cci-slate">{r.bajada}</p>}
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-[11px] text-cci-slate-light">
          {r.institucion && <span>{r.institucion}</span>}
          {r.fechaPublicacion && <span className="font-mono">{r.fechaPublicacion.slice(0, 4)}</span>}
          {r.paginas ? <span className="font-mono">{r.paginas} págs</span> : null}
        </div>
      </div>
    </Link>
  );
}

export function ConocimientoClient({ recursos }: { recursos: RecursoBiblioteca[] }) {
  const [cat, setCat] = useState<string>("todas");
  const [tema, setTema] = useState<string>("todos");

  const categoriasPresentes = useMemo(
    () => [...new Set(recursos.map((r) => r.categoria).filter(Boolean))] as string[],
    [recursos]
  );
  const temasPresentes = useMemo(
    () => [...new Set(recursos.flatMap((r) => r.temas))].sort(),
    [recursos]
  );

  const filtrados = useMemo(
    () =>
      recursos.filter(
        (r) => (cat === "todas" || r.categoria === cat) && (tema === "todos" || r.temas.includes(tema))
      ),
    [recursos, cat, tema]
  );

  return (
    <>
      <section className="border-b border-cci-line bg-cci-paper">
        <div className="container-cci py-12 md:py-14">
          <div className="inline-flex w-fit items-center whitespace-nowrap border-l-4 border-cci-orange bg-cci-orange-soft py-2 pl-4 pr-3 text-[11px] font-700 uppercase leading-none tracking-[0.15em] text-cci-orange-dark md:text-xs">
            Biblioteca
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-3xl font-900 leading-tight text-cci-ink md:text-5xl">
            Conocimiento de la construcción industrializada
          </h1>
          <p className="mt-4 max-w-2xl text-cci-slate">
            Guías, estudios, normativa y herramientas del sector. Cada recurso indica su estado y su fuente.
          </p>
        </div>
      </section>

      {recursos.length === 0 ? (
        <section className="container-cci py-16">
          <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-cci-line bg-cci-paper px-8 py-16 text-center text-cci-slate">
            La biblioteca se está poblando. Muy pronto habrá material disponible.
          </div>
        </section>
      ) : (
        <>
          <section className="sticky top-[105px] z-20 border-b border-cci-line bg-white/95 backdrop-blur">
            <div className="container-cci flex flex-col gap-3 py-4">
              <div className="relative md:contents">
                <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide md:flex-wrap md:overflow-visible">
                  <button onClick={() => setCat("todas")} className={chipCls(cat === "todas")}>Todas</button>
                  {categoriasPresentes.map((c) => (
                    <button key={c} onClick={() => setCat(c)} className={chipCls(cat === c)}>
                      {ETIQUETAS_CATEGORIA[c as keyof typeof ETIQUETAS_CATEGORIA] ?? c}
                    </button>
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent md:hidden" />
              </div>
              {temasPresentes.length > 0 && (
                <div className="relative md:contents">
                  <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide md:flex-wrap md:overflow-visible">
                    <button onClick={() => setTema("todos")} className={chipCls(tema === "todos")}>Todos los temas</button>
                    {temasPresentes.map((t) => (
                      <button key={t} onClick={() => setTema(t)} className={chipCls(tema === t)}>{etiquetaTema(t)}</button>
                    ))}
                  </div>
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent md:hidden" />
                </div>
              )}
            </div>
          </section>

          <section className="container-cci py-10 md:py-12">
            <p className="mb-6 text-sm text-cci-slate-light" aria-live="polite">
              {filtrados.length} {filtrados.length === 1 ? "recurso" : "recursos"}
            </p>
            {filtrados.length === 0 ? (
              <div className="rounded-xl border border-dashed border-cci-line bg-cci-paper py-16 text-center text-cci-slate">
                No hay recursos con esa combinación; prueba quitar un filtro.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtrados.map((r) => (
                  <RecursoCard key={r.id} r={r} />
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {/* BANDA DE CIERRE — membresía (nivel 1) + aporta (nivel 3) */}
      <section className="relative overflow-hidden bg-cci-graphite-dark">
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{ backgroundImage: "radial-gradient(circle at 88% 20%, #E04E00 0%, transparent 45%), radial-gradient(circle at 5% 90%, #5C5C5C 0%, transparent 45%)" }}
        />
        <div className="container-cci relative py-14 text-center md:py-16">
          <h2 className="mx-auto max-w-3xl font-display text-2xl font-900 leading-tight text-white md:text-3xl">
            El conocimiento del sector se construye entre todos
          </h2>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-white/75">
            Sé parte del CCI para acceder primero, o aporta un caso, un dato o un estudio a la biblioteca.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/hazte-socio" data-cta="hazte-socio" data-ubicacion="cierre-conocimiento" className="btn-primary">
              Postula a ser socio CCI
            </Link>
            <Link
              href="/aporta"
              data-cta="aporta"
              data-ubicacion="cierre-conocimiento"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Aporta un caso o dato
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
