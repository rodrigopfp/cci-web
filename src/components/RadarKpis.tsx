"use client";

// "La industrialización en cifras" — panel de KPIs del Radar.
//
// Un tablero de control (dashboard) con instrumentos variados: gauge
// semicircular, contadores animados, barras comparativas, una dona y barras
// por país. Todo en SVG + React + Tailwind, sin dependencias nuevas.
//
// Animaciones al entrar al viewport (IntersectionObserver) y respetando
// prefers-reduced-motion. Regla editorial: cada instrumento muestra su fuente.

import { useEffect, useRef, useState } from "react";
import {
  velocidad,
  costo,
  manoDeObra,
  potencial,
  residuos,
  productividad,
  mundo,
  type KpiSource,
  type KpiCounter,
  type KpiDonut,
  type KpiProductividad,
  type KpiMundo,
} from "@/data/kpis";

// ---- Hooks compartidos -------------------------------------------------

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Devuelve un ref y un flag que pasa a true la primera vez que el elemento
 *  entra en el viewport. Sin IntersectionObserver, aparece visible de inmediato. */
function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    // Red de seguridad: si por cualquier motivo el observer no dispara (algunos
    // entornos headless, quirks del navegador), revelamos igual para que las
    // cifras nunca se queden congeladas en 0.
    const fallback = window.setTimeout(() => setInView(true), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);
  return { ref, inView };
}

/** Contador que sube de 0 al objetivo con easing, una vez activo. */
function useCountUp(target: number, active: boolean, reduced: boolean, duration = 1400): number {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setVal(target);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduced, target, duration]);
  return val;
}

// ---- Piezas de presentación -------------------------------------------

function SourceLink({ source }: { source: KpiSource }) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`${source.title} (${source.year})`}
      className="mt-4 inline-block text-[11px] font-600 leading-snug text-cci-slate-light transition hover:text-cci-orange"
    >
      Fuente: {source.name} ({source.year})
    </a>
  );
}

function Card({
  children,
  className = "",
  innerRef,
}: {
  children: React.ReactNode;
  className?: string;
  innerRef?: React.Ref<HTMLElement>;
}) {
  return (
    <article
      ref={innerRef}
      className={`flex flex-col rounded-2xl border border-cci-line bg-white p-6 shadow-card ${className}`}
    >
      {children}
    </article>
  );
}

// ---- Geometría del gauge ----------------------------------------------

function polar(cx: number, cy: number, r: number, angleDeg: number): [number, number] {
  const a = (angleDeg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy - r * Math.sin(a)];
}

/** Arco sobre un semicírculo. La escala 0–scaleMax mapea 180°(izq)→0°(der). */
function arcPath(
  cx: number,
  cy: number,
  r: number,
  from: number,
  to: number,
  scaleMax: number
): string {
  const a0 = 180 - (from / scaleMax) * 180;
  const a1 = 180 - (to / scaleMax) * 180;
  const [x0, y0] = polar(cx, cy, r, a0);
  const [x1, y1] = polar(cx, cy, r, a1);
  const large = Math.abs(a0 - a1) > 180 ? 1 : 0;
  return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
}

/** Altura fija del área del instrumento (gauge/dona), para que los tres
 *  gráficos de la primera fila queden centrados a la misma altura. */
const INSTRUMENT_AREA = "flex h-[160px] items-center justify-center";

// ---- Instrumentos ------------------------------------------------------

/**
 * Velocímetro genérico: semicírculo con aguja y un número grande bajo el arco.
 * Lo comparten VELOCIDAD DE OBRA y POTENCIAL DE PRODUCTIVIDAD, para que la
 * primera fila tenga instrumentos consistentes.
 */
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
}: {
  label: string;
  note: string;
  source: KpiSource;
  scaleMax: number;
  band: [number, number];
  target: number;
  format: (v: number) => string;
  ariaLabel: string;
  reduced: boolean;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  const v = useCountUp(target, inView, reduced);
  const cx = 100;
  const cy = 100;
  const r = 78;
  const angle = 180 - (v / scaleMax) * 180;
  const [nx, ny] = polar(cx, cy, r - 8, angle);

  return (
    <Card innerRef={ref}>
      <span className="text-xs font-700 uppercase tracking-wide text-cci-slate-light">
        {label}
      </span>
      {/* Área del instrumento con altura fija: arco + número (velocímetro
          clásico, el número vive bajo la línea base, nunca toca la aguja). */}
      <div className={`mt-2 ${INSTRUMENT_AREA}`}>
        <div className="w-full max-w-[200px]">
          <svg viewBox="0 0 200 108" className="w-full" role="img" aria-label={ariaLabel}>
            {/* pista */}
            <path d={arcPath(cx, cy, r, 0, scaleMax, scaleMax)} fill="none" stroke="#E6E4E2" strokeWidth={14} strokeLinecap="round" />
            {/* banda del rango destacado */}
            <path d={arcPath(cx, cy, r, band[0], band[1], scaleMax)} fill="none" stroke="#F6BA8C" strokeWidth={14} strokeLinecap="round" />
            {/* progreso animado */}
            <path d={arcPath(cx, cy, r, 0, Math.max(v, 0.01), scaleMax)} fill="none" stroke="#E04E00" strokeWidth={14} strokeLinecap="round" />
            {/* aguja */}
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
    </Card>
  );
}

function CounterCard({ kpi, reduced }: { kpi: KpiCounter; reduced: boolean }) {
  const { ref, inView } = useInView<HTMLElement>();
  const v = useCountUp(kpi.value, inView, reduced);
  return (
    <Card innerRef={ref}>
      <span className="text-xs font-700 uppercase tracking-wide text-cci-slate-light">
        {kpi.label}
      </span>
      <div className="mt-3 font-display text-5xl font-900 leading-none text-cci-orange md:text-6xl">
        {kpi.prefix}
        {Math.round(v)}
        {kpi.suffix}
      </div>
      <p className="mt-3 text-sm text-cci-slate">{kpi.note}</p>
      <div className="mt-auto">
        <SourceLink source={kpi.source} />
      </div>
    </Card>
  );
}

function DonutCard({ kpi, reduced }: { kpi: KpiDonut; reduced: boolean }) {
  const { ref, inView } = useInView<HTMLElement>();
  const v = useCountUp(kpi.value, inView, reduced);
  const R = 52;
  const C = 2 * Math.PI * R;
  const offset = C * (1 - v / 100);
  return (
    <Card innerRef={ref}>
      <span className="text-xs font-700 uppercase tracking-wide text-cci-slate-light">
        {kpi.label}
      </span>
      {/* Misma área fija que los gauges; la dona ocupa el mismo alto visual. */}
      <div className={`mt-2 ${INSTRUMENT_AREA}`}>
        <div className="relative h-[140px] w-[140px]">
          <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90" role="img" aria-label={`${kpi.value}% ${kpi.label}`}>
            <circle cx={70} cy={70} r={R} fill="none" stroke="#E6E4E2" strokeWidth={14} />
            <circle
              cx={70}
              cy={70}
              r={R}
              fill="none"
              stroke="#E04E00"
              strokeWidth={14}
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-4xl font-900 text-cci-orange">
              {Math.round(v)}
              {kpi.suffix}
            </span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-cci-slate">{kpi.note}</p>
      <div className="mt-auto">
        <SourceLink source={kpi.source} />
      </div>
    </Card>
  );
}

function ProductividadCard({ kpi, reduced }: { kpi: KpiProductividad; reduced: boolean }) {
  const { ref, inView } = useInView<HTMLElement>();
  const active = inView || reduced;
  const maxScale = Math.max(...kpi.series.map((s) => s.value));
  return (
    <Card innerRef={ref} className="sm:col-span-2 lg:col-span-3">
      <span className="text-xs font-700 uppercase tracking-wide text-cci-slate-light">
        {kpi.label}
      </span>
      <p className="mt-2 max-w-2xl text-sm text-cci-slate">{kpi.note}</p>
      <div className="mt-5 space-y-4">
        {kpi.series.map((s) => (
          <div key={s.name}>
            <div className="mb-1 flex items-baseline justify-between gap-3">
              <span className={`text-sm font-600 ${s.highlight ? "text-cci-orange" : "text-cci-ink"}`}>
                {s.name}
              </span>
              <span className="font-mono text-sm font-600 text-cci-slate">+{s.value}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-cci-paper">
              <div
                className="h-full rounded-full transition-[width] duration-1000 ease-out"
                style={{
                  width: active ? `${(s.value / maxScale) * 100}%` : "0%",
                  backgroundColor: s.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl border border-cci-orange/30 bg-cci-orange-soft px-4 py-3">
        <p className="text-sm text-cci-graphite">
          {kpi.drop.label}{" "}
          <span className="font-display text-lg font-900 text-cci-orange">{kpi.drop.value}%</span>.
        </p>
      </div>
      <SourceLink source={kpi.source} />
      <span className="mt-1 text-[11px] text-cci-slate-light">
        Crecimiento anual 2000–2022 · construcción, economía mundial y manufactura.
      </span>
    </Card>
  );
}

function MundoCard({ kpi, reduced }: { kpi: KpiMundo; reduced: boolean }) {
  const { ref, inView } = useInView<HTMLElement>();
  const active = inView || reduced;
  const maxScale = Math.max(...kpi.countries.map((c) => c.value));
  return (
    <Card innerRef={ref}>
      <span className="text-xs font-700 uppercase tracking-wide text-cci-slate-light">
        {kpi.label}
      </span>
      <p className="mt-2 text-sm text-cci-slate">{kpi.note}</p>
      <div className="mt-5 space-y-4">
        {kpi.countries.map((c) => (
          <div key={c.name}>
            <div className="mb-1 flex items-baseline justify-between gap-3">
              <span className="text-sm font-600 text-cci-ink">{c.name}</span>
              <span className="font-mono text-sm font-700 text-cci-slate">
                {c.lessThan ? "<" : ""}
                {c.value}%
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-cci-paper">
              <div
                className="h-full rounded-full transition-[width] duration-1000 ease-out"
                style={{
                  width: active ? `${(c.value / maxScale) * 100}%` : "0%",
                  backgroundColor: c.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <SourceLink source={kpi.source} />
      </div>
    </Card>
  );
}

// ---- Sección completa --------------------------------------------------

export function RadarKpis() {
  const reduced = usePrefersReducedMotion();
  return (
    <section className="bg-cci-paper py-14">
      <div className="container-cci">
        <div className="mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange">
          <span className="h-[2px] w-6 bg-cci-orange" />
          Datos internacionales
        </div>
        <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">
          La industrialización en cifras
        </h2>
        <p className="mt-2 max-w-2xl text-cci-slate">
          Lo que muestran los datos internacionales. Cifras de referencia sobre el impacto de la
          construcción industrializada; cada instrumento enlaza a su fuente.
        </p>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <GaugeCard
            label={velocidad.label}
            note={velocidad.note}
            source={velocidad.source}
            scaleMax={100}
            band={[velocidad.rangeMin, velocidad.rangeMax]}
            target={velocidad.rangeMax}
            format={(v) => `${Math.round(v)}%`}
            ariaLabel={velocidad.display}
            reduced={reduced}
          />
          <DonutCard kpi={residuos} reduced={reduced} />
          <GaugeCard
            label={potencial.label}
            note={potencial.note}
            source={potencial.source}
            scaleMax={12}
            band={[5, 10]}
            target={potencial.value}
            format={(v) => `${potencial.prefix ?? ""}${Math.round(v)}${potencial.suffix ?? ""}`}
            ariaLabel={potencial.label}
            reduced={reduced}
          />
          <ProductividadCard kpi={productividad} reduced={reduced} />
          <CounterCard kpi={costo} reduced={reduced} />
          <CounterCard kpi={manoDeObra} reduced={reduced} />
          <MundoCard kpi={mundo} reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
