"use client";

// Buscador unificado v1 del hub (Fase 3 · ajuste 1, Parte 2.3a).
//
// Filtra en cliente sobre recursos de la Biblioteca + términos publicados del
// glosario. Es una mejora progresiva: sin JS el input no filtra, pero todas las
// secciones del hub quedan visibles debajo.

import { useMemo, useState } from "react";
import Link from "next/link";

export type ItemBusqueda = {
  tipo: "Recurso" | "Glosario";
  titulo: string;
  desc: string;
  href: string;
};

export function HubBuscador({ items }: { items: ItemBusqueda[] }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const resultados = useMemo(() => {
    if (!query) return [];
    return items
      .filter((i) => i.titulo.toLowerCase().includes(query) || i.desc.toLowerCase().includes(query))
      .slice(0, 12);
  }, [items, query]);

  return (
    <div className="mx-auto mt-6 max-w-2xl">
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cci-slate-light"
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
        </svg>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Busca un recurso o un término…"
          aria-label="Buscar en la biblioteca y el glosario"
          className="w-full rounded-full border border-cci-line bg-white py-3 pl-12 pr-4 text-sm outline-none focus:border-cci-orange focus:ring-2 focus:ring-cci-orange/15"
        />
      </div>

      {query && (
        <div className="mt-2 overflow-hidden rounded-2xl border border-cci-line bg-white text-left shadow-card">
          {resultados.length === 0 ? (
            <p className="px-4 py-4 text-sm text-cci-slate-light">Sin resultados. Prueba con otra palabra.</p>
          ) : (
            <ul className="divide-y divide-cci-line" aria-live="polite">
              {resultados.map((r) => (
                <li key={`${r.tipo}-${r.href}`}>
                  <Link href={r.href} className="flex items-start gap-3 px-4 py-3 transition hover:bg-cci-paper">
                    <span className="mt-0.5 shrink-0 rounded-full bg-cci-paper px-2 py-0.5 text-[10px] font-700 uppercase tracking-wide text-cci-slate-light">
                      {r.tipo}
                    </span>
                    <span>
                      <span className="block text-sm font-700 text-cci-ink">{r.titulo}</span>
                      <span className="line-clamp-1 text-xs text-cci-slate">{r.desc}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
