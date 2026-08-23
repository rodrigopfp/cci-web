"use client";

// Velocímetros "La industrialización en cifras".
//
// Instrumentos semicirculares SVG + React, sin dependencias nuevas. Los VALORES,
// textos y fuentes salen del registro único (src/lib/datos), vía
// obtenerIndicadorConFuente(slug). La configuración visual (escala, banda, espejo)
// vive aquí por ser presentación, no dato.
//
// El HTML estático contiene el valor final (útil sin JS); con JS se anima al
// entrar al viewport; con prefers-reduced-motion queda fijo.

import Image from "next/image";
import { usePrefersReducedMotion, useInView, useCountUp } from "@/lib/counters";
import { obtenerIndicadorConFuente } from "@/lib/datos/indice";
import type { DataSource } from "@/lib/datos/tipos-indicadores";

// Foto de cabecera opcional. Solo la pasa la portada (RadarKpisPreview); en CCI
// Data las tarjetas van sin foto, idénticas a antes.
type Foto = { src: string; alt: string };

// ---- Piezas de presentación -------------------------------------------

function anioDe(fecha?: string): string {
  return fecha ? String(fecha).slice(0, 4) : "";
}

function SourceLink({ source }: { source: DataSource }) {
  const etiqueta = `Fuente: ${source.organization}${source.publicationDate ? ` (${anioDe(source.publicationDate)})` : ""}`;
  if (!source.url) {
    return <span className="mt-4 inline-block text-[11px] font-600 leading-snug text-cci-slate-light">{etiqueta}</span>;
  }
  const externo = source.url.startsWith("http");
  return (
    <a
      href={source.url}
      target={externo ? "_blank" : undefined}
      rel={externo ? "noopener noreferrer" : undefined}
      title={`${source.title}${source.publicationDate ? ` (${anioDe(source.publicationDate)})` : ""}`}
      className="mt-4 inline-block text-[11px] font-600 leading-snug text-cci-slate-light transition hover:text-cci-orange"
    >
      {etiqueta}
    </a>
  );
}

// ---- Geometría del gauge ----------------------------------------------

function polar(cx: number, cy: number, r: number, angleDeg: number): [number, number] {
  const a = (angleDeg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy - r * Math.sin(a)];
}

function arcByAngle(cx: number, cy: number, r: number, a0: number, a1: number): string {
  const [x0, y0] = polar(cx, cy, r, a0);
  const [x1, y1] = polar(cx, cy, r, a1);
  const large = Math.abs(a0 - a1) > 180 ? 1 : 0;
  const sweep = a0 > a1 ? 1 : 0;
  return `M ${x0} ${y0} A ${r} ${r} 0 ${large} ${sweep} ${x1} ${y1}`;
}

const INSTRUMENT_AREA = "flex h-[160px] items-center justify-center";

// ---- Velocímetro genérico ---------------------------------------------

function GaugeCard({
  label,
  note,
  source,
  scaleMax,
  band,
  target,
  format,
  ariaLabel,
  reduced,
  mirror = false,
  foto,
}: {
  label: string;
  note: string;
  source: DataSource;
  scaleMax: number;
  band: [number, number];
  target: number;
  format: (v: number) => string;
  ariaLabel: string;
  reduced: boolean;
  mirror?: boolean;
  foto?: Foto;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  const v = useCountUp(target, inView, reduced);
  const cx = 100;
  const cy = 100;
  const r = 78;
  const A = (value: number) =>
    mirror ? (value / scaleMax) * 180 : 180 - (value / scaleMax) * 180;
  const [nx, ny] = polar(cx, cy, r - 8, A(v));

  return (
    <article
      ref={ref}
      className="flex flex-col overflow-hidden rounded-2xl border border-cci-line bg-white shadow-card"
    >
      {foto && (
        <div className="relative h-[min(50vw,230px)] w-full overflow-hidden">
          <Image src={foto.src} alt={foto.alt} fill className="object-cover" sizes="(min-width: 768px) 680px, 100vw" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-700 uppercase tracking-wide text-cci-slate-light">{label}</span>
        <div className={`mt-2 ${INSTRUMENT_AREA}`}>
          <div className="w-full max-w-[200px]">
            <svg viewBox="0 0 200 108" className="w-full" role="img" aria-label={ariaLabel}>
              <path d={arcByAngle(cx, cy, r, A(0), A(scaleMax))} fill="none" stroke="#E6E4E2" strokeWidth={14} strokeLinecap="round" />
              <path d={arcByAngle(cx, cy, r, A(band[0]), A(band[1]))} fill="none" stroke="#F6BA8C" strokeWidth={14} strokeLinecap="round" />
              <path d={arcByAngle(cx, cy, r, A(0), A(Math.max(v, 0.01)))} fill="none" stroke="#E04E00" strokeWidth={14} strokeLinecap="round" />
              <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#2B2B2B" strokeWidth={3} strokeLinecap="round" />
              <circle cx={cx} cy={cy} r={7} fill="#2B2B2B" />
            </svg>
            <p className="mt-1 text-center font-display text-4xl font-900 leading-none text-cci-orange">
              {format(v)}
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm text-cci-slate">{note}</p>
        <div className="mt-auto">
          <SourceLink source={source} />
        </div>
      </div>
    </article>
  );
}

// ---- Instrumentos reutilizables (portada + CCI Data), desde el registro ----

export function PotencialGauge({ reduced, foto }: { reduced: boolean; foto?: Foto }) {
  const { indicador, fuente } = obtenerIndicadorConFuente("potencial-productividad");
  const target = Number(indicador.value);
  const prefix = indicador.prefix ?? "";
  const suffix = indicador.suffix ?? "";
  return (
    <GaugeCard
      label={indicador.title}
      note={indicador.description}
      source={fuente}
      scaleMax={12}
      band={[5, 10]}
      target={target}
      format={(v) => `${prefix}${Math.round(v)}${suffix}`}
      ariaLabel={`${prefix}${target}${suffix} — ${indicador.title}`}
      reduced={reduced}
      foto={foto}
    />
  );
}

export function CalidadGauge({ reduced, foto }: { reduced: boolean; foto?: Foto }) {
  const { indicador, fuente } = obtenerIndicadorConFuente("calidad-percepcion");
  const target = Number(indicador.value);
  const suffix = indicador.suffix ?? "%";
  return (
    <GaugeCard
      label={indicador.title}
      note={indicador.description}
      source={fuente}
      scaleMax={100}
      band={[0, target]}
      target={target}
      format={(v) => `${Math.round(v)}${suffix}`}
      ariaLabel={`${target}${suffix} — ${indicador.title}`}
      reduced={reduced}
      foto={foto}
    />
  );
}

export function ResiduosGauge({ reduced, foto }: { reduced: boolean; foto?: Foto }) {
  const { indicador, fuente } = obtenerIndicadorConFuente("residuos-reduccion");
  const target = Number(indicador.value);
  const prefix = indicador.prefix ?? "−";
  const suffix = indicador.suffix ?? "%";
  return (
    <GaugeCard
      label={indicador.title}
      note={indicador.description}
      source={fuente}
      scaleMax={100}
      band={[0, target]}
      target={target}
      mirror
      format={(v) => `${prefix}${Math.round(v)}${suffix}`}
      ariaLabel={`${prefix}${target}${suffix} — ${indicador.title}`}
      reduced={reduced}
      foto={foto}
    />
  );
}

/**
 * Avance para la portada: tres instrumentos (potencial · calidad · residuos),
 * mismos componentes y datos que en CCI Data, cada uno con su foto real de
 * cabecera (gentileza de socios CCI). En CCI Data los mismos gauges van sin foto.
 */
export function RadarKpisPreview() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <PotencialGauge
        reduced={reduced}
        foto={{ src: "/img/portada/portada-productividad.jpg", alt: "Montaje de vivienda industrializada: panel con ventana instalada izado por grúa" }}
      />
      <CalidadGauge
        reduced={reduced}
        foto={{ src: "/img/portada/portada-calidad.jpg", alt: "Control de calidad en planta: operadora en estación CNC" }}
      />
      <ResiduosGauge
        reduced={reduced}
        foto={{ src: "/img/portada/portada-residuos.jpg", alt: "Montaje de elementos industrializados en obra" }}
      />
    </div>
  );
}
