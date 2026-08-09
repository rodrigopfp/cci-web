"use client";
import { useMemo, useState } from "react";
import { articles } from "@/data/articles";
import { ArticleCard } from "@/components/ArticleCard";
import type { Category, ContentType } from "@/data/types";

const categories: (Category | "Todas")[] = ["Todas","País y políticas públicas","Vivienda industrializada","Innovación y productividad","Casos de socios","Normativa y certificación","Sostenibilidad","Opinión experta","Eventos CCI","Internacional","Publirreportajes"];
const types: { value: ContentType | "Todos"; label: string }[] = [{ value: "Todos", label: "Todo el contenido" },{ value: "editorial", label: "Editorial CCI" },{ value: "socio", label: "Noticias de socios" },{ value: "patrocinado", label: "Patrocinado" }];

export default function NoticiasPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("Todas");
  const [type, setType] = useState<(typeof types)[number]["value"]>("Todos");
  const filtered = useMemo(() => articles.filter((a) => {
    const matchCat = cat === "Todas" || a.category === cat;
    const matchType = type === "Todos" || a.type === type;
    const q = query.trim().toLowerCase();
    const matchQuery = !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.author.toLowerCase().includes(q);
    return matchCat && matchType && matchQuery;
  }), [query, cat, type]);

  return (
    <>
      <section className="border-b border-cci-line bg-cci-paper">
        <div className="container-cci py-12">
          <div className="mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange"><span className="h-[2px] w-6 bg-cci-orange" />Actualidad</div>
          <h1 className="font-display text-3xl font-900 text-cci-ink md:text-5xl">Todo lo que mueve a la construcción industrializada</h1>
          <p className="mt-3 max-w-2xl text-cci-slate">Cobertura editorial, casos de socios y contenido patrocinado, siempre claramente diferenciados.</p>
          <div className="relative mt-7 max-w-xl">
            <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cci-slate-light" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" strokeLinecap="round" /></svg>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por título, tema o autor..." className="w-full rounded-full border border-cci-line bg-white py-3 pl-12 pr-4 text-sm outline-none focus:border-cci-orange focus:ring-2 focus:ring-cci-orange/15" />
          </div>
        </div>
      </section>
      <section className="sticky top-[105px] z-30 border-b border-cci-line bg-white/95 backdrop-blur">
        <div className="container-cci flex flex-col gap-3 py-4">
          <div className="flex flex-wrap gap-2">{categories.map((c) => <button key={c} onClick={() => setCat(c)} className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${cat === c ? "bg-cci-graphite text-white" : "bg-cci-paper text-cci-slate hover:bg-cci-line"}`}>{c}</button>)}</div>
          <div className="flex flex-wrap gap-2">{types.map((t) => <button key={t.value} onClick={() => setType(t.value)} className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${type === t.value ? "border-cci-orange bg-cci-orange-soft text-cci-orange-dark" : "border-cci-line bg-white text-cci-slate hover:border-cci-slate-light"}`}>{t.label}</button>)}</div>
        </div>
      </section>
      <section className="container-cci py-12">
        <div className="mb-6 text-sm text-cci-slate-light">{filtered.length} {filtered.length === 1 ? "artículo" : "artículos"}</div>
        {filtered.length === 0 ? <div className="rounded-xl border border-dashed border-cci-line bg-cci-paper py-20 text-center text-cci-slate">No encontramos artículos con esos criterios.</div> : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((a) => <ArticleCard key={a.id} article={a} />)}</div>}
      </section>
    </>
  );
}
