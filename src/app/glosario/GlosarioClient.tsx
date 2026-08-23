"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  type TerminoGlosario,
  type CategoriaGlosario,
  CATEGORIAS,
  ETIQUETAS_CATEGORIA,
} from "@/lib/datos/glosario";

// Primera letra normalizada (sin acentos) para el índice alfabético.
function inicial(titulo: string): string {
  const c = titulo.trim().normalize("NFD").replace(/[̀-ͯ]/g, "")[0] ?? "#";
  return /[a-zA-Z]/.test(c) ? c.toUpperCase() : "#";
}

function chipCls(active: boolean): string {
  return `shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cci-orange focus-visible:ring-offset-1 ${
    active
      ? "border-cci-graphite bg-cci-graphite text-white"
      : "border-cci-line bg-white text-cci-slate hover:border-cci-slate-light"
  }`;
}

function BadgeBorrador() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-cci-paper px-2 py-0.5 text-[10px] font-700 uppercase tracking-wide text-cci-slate-light">
      En revisión técnica
    </span>
  );
}

function TerminoRow({ t }: { t: TerminoGlosario }) {
  return (
    <li>
      <Link
        href={`/glosario/${t.slug}`}
        className="group flex flex-col gap-1 border-b border-cci-line py-4 transition-colors hover:bg-cci-paper/60 focus:outline-none focus-visible:bg-cci-paper"
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="font-display text-lg font-800 text-cci-ink transition-colors group-hover:text-cci-orange-dark">
            {t.titulo}
          </h3>
          <span className="rounded-full bg-cci-orange-soft px-2 py-0.5 text-[10px] font-700 uppercase tracking-wide text-cci-orange-dark">
            {ETIQUETAS_CATEGORIA[t.categoria]}
          </span>
          {!t.publicado && <BadgeBorrador />}
        </div>
        <p className="line-clamp-2 max-w-3xl text-sm leading-relaxed text-cci-slate">{t.definicionCorta}</p>
      </Link>
    </li>
  );
}

export function GlosarioClient({
  terminos,
  ultimaActualizacion,
}: {
  terminos: TerminoGlosario[];
  ultimaActualizacion?: string;
}) {
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState<CategoriaGlosario | "todas">("todas");

  const filtrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    return terminos.filter((t) => {
      const matchCat = categoria === "todas" || t.categoria === categoria;
      const matchQ =
        !q ||
        t.titulo.toLowerCase().includes(q) ||
        t.definicionCorta.toLowerCase().includes(q) ||
        t.slug.includes(q);
      return matchCat && matchQ;
    });
  }, [terminos, query, categoria]);

  const sinFiltro = query.trim() === "" && categoria === "todas";
  const destacados = useMemo(() => terminos.filter((t) => t.destacado), [terminos]);

  // Agrupación alfabética de los resultados.
  const grupos = useMemo(() => {
    const mapa = new Map<string, TerminoGlosario[]>();
    for (const t of [...filtrados].sort((a, b) => a.titulo.localeCompare(b.titulo, "es"))) {
      const l = inicial(t.titulo);
      if (!mapa.has(l)) mapa.set(l, []);
      mapa.get(l)!.push(t);
    }
    return [...mapa.entries()].sort(([a], [b]) => a.localeCompare(b, "es"));
  }, [filtrados]);

  const letrasActivas = new Set(grupos.map(([l]) => l));

  return (
    <>
      {/* CABECERA */}
      <section className="border-b border-cci-line bg-cci-paper">
        <div className="container-cci py-12 md:py-14">
          <div className="inline-flex w-fit items-center whitespace-nowrap border-l-4 border-cci-orange bg-cci-orange-soft py-2 pl-4 pr-3 text-[11px] font-700 uppercase leading-none tracking-[0.15em] text-cci-orange-dark md:text-xs">
            Glosario técnico
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-3xl font-900 leading-tight text-cci-ink md:text-5xl">
            El lenguaje común de la construcción industrializada
          </h1>
          <p className="mt-4 max-w-2xl text-cci-slate">
            Definiciones claras y con fuente de los términos que usa el sector. Busca por palabra o
            filtra por categoría.
          </p>
          {ultimaActualizacion && (
            <p className="mt-3 text-xs text-cci-slate-light">Última actualización: {ultimaActualizacion}.</p>
          )}
        </div>
      </section>

      {/* BUSCADOR + FILTROS */}
      <section className="sticky top-[105px] z-20 border-b border-cci-line bg-white/95 backdrop-blur">
        <div className="container-cci flex flex-col gap-3 py-4">
          <div className="relative max-w-xl">
            <svg
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cci-slate-light"
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar un término…"
              aria-label="Buscar un término del glosario"
              className="w-full rounded-full border border-cci-line bg-white py-2.5 pl-12 pr-4 text-sm outline-none focus:border-cci-orange focus:ring-2 focus:ring-cci-orange/15"
            />
          </div>
          <div className="relative md:contents">
            <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide md:flex-wrap md:overflow-visible">
              <button onClick={() => setCategoria("todas")} className={chipCls(categoria === "todas")}>
                Todas
              </button>
              {CATEGORIAS.map((c) => (
                <button key={c.value} onClick={() => setCategoria(c.value)} className={chipCls(categoria === c.value)}>
                  {c.label}
                </button>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent md:hidden" />
          </div>
        </div>
      </section>

      {/* DESTACADOS (solo en la vista sin filtros) */}
      {sinFiltro && destacados.length > 0 && (
        <section className="container-cci pt-10">
          <h2 className="mb-4 text-sm font-700 uppercase tracking-wide text-cci-orange">Términos destacados</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destacados.map((t) => (
              <Link
                key={t.slug}
                href={`/glosario/${t.slug}`}
                className="card-rise group flex flex-col gap-2 rounded-2xl border border-cci-line bg-white p-5 shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-cci-orange"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-base font-800 text-cci-ink group-hover:text-cci-orange-dark">
                    {t.titulo}
                  </h3>
                  {!t.publicado && <BadgeBorrador />}
                </div>
                <p className="line-clamp-3 text-sm leading-relaxed text-cci-slate">{t.definicionCorta}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ÍNDICE ALFABÉTICO */}
      <section className="container-cci pt-8">
        <nav aria-label="Índice alfabético" className="flex flex-wrap gap-1.5">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l) => {
            const activa = letrasActivas.has(l);
            return activa ? (
              <a
                key={l}
                href={`#letra-${l}`}
                className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-700 text-cci-graphite transition hover:bg-cci-orange-soft hover:text-cci-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-cci-orange"
              >
                {l}
              </a>
            ) : (
              <span key={l} className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-700 text-cci-line">
                {l}
              </span>
            );
          })}
        </nav>
      </section>

      {/* RESULTADOS */}
      <section className="container-cci py-8 md:py-10">
        <p className="mb-6 text-sm text-cci-slate-light" aria-live="polite">
          {filtrados.length} {filtrados.length === 1 ? "término" : "términos"}
        </p>

        {grupos.length === 0 ? (
          <div className="rounded-xl border border-dashed border-cci-line bg-cci-paper py-16 text-center text-cci-slate">
            No encontramos términos con esa búsqueda. Prueba con otra palabra o quita el filtro.
          </div>
        ) : (
          <div className="space-y-10">
            {grupos.map(([letra, items]) => (
              <div key={letra} id={`letra-${letra}`} className="scroll-mt-[180px]">
                <h2 className="mb-1 font-display text-2xl font-900 text-cci-orange">{letra}</h2>
                <ul className="border-t border-cci-line">
                  {items.map((t) => (
                    <TerminoRow key={t.slug} t={t} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
