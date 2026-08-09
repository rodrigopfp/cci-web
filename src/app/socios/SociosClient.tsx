"use client";
import { useState } from "react";
import { PartnerCard } from "@/components/Blocks";
import type { Partner, PartnerCategory } from "@/data/types";

const filters: (PartnerCategory | "Todas")[] = ["Todas","Industrializadora","Proveedor de materiales","Ingeniería","Arquitectura","Tecnología","Academia","Institución publica / gremial"];

export function SociosClient({ partners }: { partners: Partner[] }) {
  const [f, setF] = useState<(typeof filters)[number]>("Todas");
  const list = f === "Todas" ? partners : partners.filter((p) => p.category === f);
  return (
    <>
      <section className="border-b border-cci-line bg-cci-graphite-dark">
        <div className="container-cci py-14">
          <div className="mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange-light"><span className="h-[2px] w-6 bg-cci-orange" />Ecosistema</div>
          <h1 className="font-display text-3xl font-900 text-white md:text-5xl">Empresas industrializadoras certificadas</h1>
          <p className="mt-3 max-w-2xl text-white/75">El ecosistema que esta transformando la construcción. Filtra por tipo de solución.</p>
        </div>
      </section>
      <section className="container-cci py-10">
        <div className="mb-8 flex flex-wrap gap-2">{filters.map((c) => <button key={c} onClick={() => setF(c)} className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${f === c ? "bg-cci-orange text-white" : "bg-cci-paper text-cci-slate hover:bg-cci-line"}`}>{c}</button>)}</div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <PartnerCard key={p.id} partner={p} />)}</div>
      </section>
    </>
  );
}
