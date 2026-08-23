"use client";

// Mapa esquemático de Latinoamérica (Fase 2 · paso 8).
//
// Estilo blueprint (trazo fino, naranjo/grafito), pariente del mapa de /nosotros.
// Los 6 países con ficha están resaltados y son clicables; el resto, atenuado.
// Accesibilidad: el mapa NUNCA es la única vía — bajo él va la misma lista de
// países como enlaces HTML. Sin JS, la lista funciona igual; el panel de hover es
// solo mejora progresiva.

import { useState } from "react";
import Link from "next/link";

export interface PaisMapa {
  codigo: string;
  nombre: string;
  estadoFicha: "completa" | "parcial" | "en_levantamiento";
  resumen?: string;
  numFuentes: number;
  ultimaActualizacion: string;
}

// Posiciones geográficas aproximadas en el viewBox (esquemático, no cartográfico).
const POS: Record<string, [number, number]> = {
  mx: [92, 66], co: [150, 250], pe: [132, 322], br: [258, 286], cl: [150, 424], ar: [186, 432],
};
// Países sin ficha (atenuados, decorativos).
const INACTIVOS: { n: string; p: [number, number] }[] = [
  { n: "Venezuela", p: [188, 214] }, { n: "Ecuador", p: [112, 278] }, { n: "Bolivia", p: [190, 338] },
  { n: "Paraguay", p: [218, 378] }, { n: "Uruguay", p: [238, 452] },
];

const ESTADO_LABEL: Record<PaisMapa["estadoFicha"], string> = {
  completa: "Ficha completa",
  parcial: "Ficha parcial",
  en_levantamiento: "En levantamiento",
};

export function MapaLatam({ paises }: { paises: PaisMapa[] }) {
  const [sel, setSel] = useState<string | null>(null);
  const activo = paises.find((p) => p.codigo === sel) ?? null;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      {/* MAPA (decorativo + marcadores clicables) */}
      <div className="rounded-2xl border border-cci-line bg-white p-4 md:p-6">
        <svg viewBox="0 0 340 540" className="mx-auto w-full max-w-[420px]" role="img" aria-label="Mapa esquemático de Latinoamérica">
          {/* grilla blueprint */}
          <g stroke="#EDEBE8" strokeWidth={1} aria-hidden="true">
            {Array.from({ length: 8 }, (_, i) => <line key={`v${i}`} x1={i * 45} y1={0} x2={i * 45} y2={540} />)}
            {Array.from({ length: 12 }, (_, i) => <line key={`h${i}`} x1={0} y1={i * 45} x2={340} y2={i * 45} />)}
          </g>
          {/* silueta estilizada (no cartográfica) */}
          <path
            aria-hidden="true"
            d="M70 45 C110 35 150 45 150 70 C150 95 120 100 130 130 C140 160 175 165 178 205 C182 250 150 270 175 320 C200 370 175 400 200 440 C215 470 200 500 175 505 C150 510 150 470 140 440 C128 405 120 360 110 320 C100 285 95 250 105 215 C112 185 95 165 88 135 C80 105 55 80 70 45 Z"
            fill="#F7F5F2" stroke="#D9D6D2" strokeWidth={1.5}
          />

          {/* países atenuados */}
          {INACTIVOS.map((c) => (
            <g key={c.n} aria-hidden="true">
              <circle cx={c.p[0]} cy={c.p[1]} r={5} fill="#EDEBE8" stroke="#C9C6C2" strokeWidth={1} />
              <text x={c.p[0] + 9} y={c.p[1] + 3} fontSize="9" fill="#B7B3AE" fontFamily="monospace">{c.n}</text>
            </g>
          ))}

          {/* países con ficha (clicables) */}
          {paises.map((p) => {
            const [x, y] = POS[p.codigo] ?? [0, 0];
            const completa = p.estadoFicha === "completa";
            return (
              <a
                key={p.codigo}
                href={`/data/latam/${p.codigo}`}
                onMouseEnter={() => setSel(p.codigo)}
                onFocus={() => setSel(p.codigo)}
                onMouseLeave={() => setSel(null)}
                aria-label={`${p.nombre} — ${ESTADO_LABEL[p.estadoFicha]}`}
                className="cursor-pointer"
              >
                <title>{`${p.nombre} — ${ESTADO_LABEL[p.estadoFicha]}`}</title>
                <circle
                  cx={x} cy={y} r={sel === p.codigo ? 11 : 8}
                  fill={completa ? "#E04E00" : "#fff"}
                  stroke="#E04E00" strokeWidth={2}
                  className="transition-all"
                />
                <text x={x + 14} y={y + 4} fontSize="12" fontWeight="700" fill="#2B2B2B">
                  {p.nombre}
                </text>
              </a>
            );
          })}
        </svg>
      </div>

      {/* PANEL de detalle (mejora) + LISTA (fallback accesible, siempre presente) */}
      <div>
        <div className="min-h-[92px] rounded-2xl border border-cci-line bg-cci-paper p-5">
          {activo ? (
            <>
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-lg font-800 text-cci-ink">{activo.nombre}</h3>
                <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-700 uppercase tracking-wide text-cci-slate">
                  {ESTADO_LABEL[activo.estadoFicha]}
                </span>
              </div>
              {activo.resumen && <p className="mt-2 text-sm leading-relaxed text-cci-slate">{activo.resumen}</p>}
              <p className="mt-2 text-[11px] text-cci-slate-light">
                {activo.numFuentes} {activo.numFuentes === 1 ? "fuente" : "fuentes"} · Actualizado {activo.ultimaActualizacion}
              </p>
            </>
          ) : (
            <p className="text-sm text-cci-slate">Pasa sobre un país o elígelo en la lista para ver su estado.</p>
          )}
        </div>

        <ul className="mt-5 divide-y divide-cci-line rounded-2xl border border-cci-line">
          {paises.map((p) => (
            <li key={p.codigo}>
              <Link
                href={`/data/latam/${p.codigo}`}
                className="flex items-center justify-between gap-3 px-5 py-3 transition-colors hover:bg-cci-paper focus:outline-none focus-visible:bg-cci-paper"
              >
                <span className="font-600 text-cci-ink">{p.nombre}</span>
                <span className="text-[11px] font-600 uppercase tracking-wide text-cci-slate-light">
                  {ESTADO_LABEL[p.estadoFicha]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
