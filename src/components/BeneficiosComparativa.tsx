"use client";

// Comparativa de beneficios por categoría (Fase 2 · paso 7).
// Escritorio: tabla con las 5 categorías. Móvil: selector de categoría (tabs)
// que muestra los valores de esa columna agrupados — el patrón más legible en
// pantallas angostas. SIN valores UF. Datos EXACTOS del insumo confirmado.

import { Fragment, useState } from "react";

const CATS = ["Oro", "Plata", "Bronce", "Academia", "Profesional Asociado"] as const;

type Fila = { l: string; v: string[] };
type Grupo = { titulo: string; filas: Fila[] };

const GRUPOS: Grupo[] = [
  {
    titulo: "Posicionamiento",
    filas: [
      { l: "Logo en sitio web y newsletter", v: ["Sí", "Sí", "Sí", "Sí", "No"] },
      { l: "Directorio de socios", v: ["Sí", "Sí", "Sí", "Sí", "Sí"] },
      { l: "Imagen corporativa en eventos organizados por el CCI", v: ["Sí", "Sí, más pequeño", "No", "Sí", "No"] },
      { l: "Imagen corporativa en actividades CCI", v: ["Sí", "Sí, más pequeño", "Sí, muy pequeño", "Sí", "No"] },
      { l: "Descuento en entradas a eventos CCI", v: ["20%", "15%", "5%", "5%", "10%"] },
      { l: "Descuento en auspicios de eventos CCI", v: ["20%", "15%", "5%", "No", "No"] },
    ],
  },
  {
    titulo: "Difusión",
    filas: [
      { l: "Conoce a nuestros socios", v: ["3", "2", "1", "No", "No"] },
      { l: "Ping-Pong CCI", v: ["5", "3", "2", "No", "1"] },
      { l: "Cápsulas RRSS", v: ["3", "2", "1", "1", "1"] },
    ],
  },
  {
    titulo: "Actividades CCI",
    filas: [
      { l: "Plenario de socios", v: ["1 titular + 2 suplentes", "1 titular + 1 suplente", "1 titular", "1 titular", "1"] },
      { l: "Roadshow", v: ["2", "1", "1", "No", "No"] },
      { l: "Encuentro Técnico", v: ["1", "1", "No", "No", "No"] },
      { l: "Interconexión", v: ["3 cupos", "2 cupos", "2 cupos", "1 cupo", "No"] },
      { l: "Espacio CCI", v: ["Sí", "Sí", "Sí", "Sí", "Sí"] },
      { l: "Visitas a obra / planta (anfitriones)", v: ["2", "1", "1", "No", "No"] },
      { l: "Visitas a obra / planta (cupos)", v: ["3", "2", "1", "2", "1"] },
    ],
  },
];

function Valor({ v }: { v: string }) {
  if (v === "No") return <span className="text-cci-slate-light">—</span>;
  if (v === "Sí") return <span className="font-600 text-cci-ink">Sí</span>;
  return <span className="font-600 text-cci-ink">{v}</span>;
}

export function BeneficiosComparativa() {
  const [cat, setCat] = useState(0); // índice de categoría (móvil)

  return (
    <div>
      {/* ESCRITORIO — tabla */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-cci-ink">
              <th scope="col" className="py-3 pr-4 text-left font-700 text-cci-ink" />
              {CATS.map((c) => (
                <th key={c} scope="col" className="px-3 py-3 text-center align-bottom">
                  <span className="font-display text-base font-800 text-cci-ink">{c}</span>
                  {c === "Plata" && (
                    <span className="mt-1 block text-[10px] font-500 leading-tight text-cci-slate-light">
                      Segunda prioridad en participación y beneficios
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GRUPOS.map((g) => (
              <Fragment key={g.titulo}>
                <tr className="bg-cci-paper">
                  <th scope="colgroup" colSpan={6} className="py-2 pl-1 text-left text-[11px] font-700 uppercase tracking-wide text-cci-orange">
                    {g.titulo}
                  </th>
                </tr>
                {g.filas.map((fila) => (
                  <tr key={fila.l} className="border-b border-cci-line">
                    <th scope="row" className="py-3 pr-4 text-left font-500 text-cci-slate">{fila.l}</th>
                    {fila.v.map((val, i) => (
                      <td key={i} className="px-3 py-3 text-center">
                        <Valor v={val} />
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* MÓVIL — selector de categoría */}
      <div className="md:hidden">
        <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide pb-1" role="tablist" aria-label="Categoría de membresía">
          {CATS.map((c, i) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === i}
              onClick={() => setCat(i)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cci-orange ${cat === i ? "border-cci-orange bg-cci-orange text-white" : "border-cci-line bg-white text-cci-slate"}`}
            >
              {c}
            </button>
          ))}
        </div>
        {CATS[cat] === "Plata" && (
          <p className="mt-3 rounded-lg bg-cci-orange-soft px-3 py-2 text-xs text-cci-orange-dark">
            Segunda prioridad en participación y beneficios.
          </p>
        )}
        <div className="mt-4 space-y-5">
          {GRUPOS.map((g) => (
            <div key={g.titulo}>
              <h4 className="mb-2 text-[11px] font-700 uppercase tracking-wide text-cci-orange">{g.titulo}</h4>
              <dl className="divide-y divide-cci-line rounded-xl border border-cci-line">
                {g.filas.map((fila) => (
                  <div key={fila.l} className="flex items-center justify-between gap-4 px-4 py-2.5">
                    <dt className="text-sm text-cci-slate">{fila.l}</dt>
                    <dd className="shrink-0 text-right text-sm"><Valor v={fila.v[cat]} /></dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-5 text-xs text-cci-slate-light">
        Los números indican cupos o instancias anuales por categoría.
      </p>
    </div>
  );
}
