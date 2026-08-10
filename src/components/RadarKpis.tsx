"use client";

// "La industrialización en cifras" — panel de KPIs del Radar.
//
// Un tablero de control (dashboard) con instrumentos variados: gauge
// semicircular, contadores animados, barras comparativas, una dona y barras
// por país. Todo en SVG + React + Tailwind, sin dependencias nuevas.
//
// Animaciones al entrar al viewport (IntersectionObserver) y respetando
// prefers-reduced-motion. Regla editorial: cada instrumento muestra su fuente.

import {
  velocidad,
  costo,
  manoDeObra,
  potencial,
  calidad,
  residuos,
  productividad,
  mundo,
  type KpiSource,
  type KpiCounter,
  type KpiProductividad,
  type KpiMundo,
} from "@/data/kpis";
import { usePrefersReducedMotion, useInView, useCountUp } from "@/lib/counters";

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

/** Arco sobre el semicírculo superior entre dos ángulos (grados; 0°=derecha,
 *  180°=izquierda). El sentido (sweep) se elige para recorrer siempre el arco
 *  de arriba, tanto de izquierda→derecha (normal) como de derecha→izquierda
 *  (espejado). */
function arcByAngle(cx: number, cy: number, r: number, a0: number, a1: number): string {
  const [x0, y0] = polar(cx, cy, r, a0);
  const [x1, y1] = polar(cx, cy, r, a1);
  const large = Math.abs(a0 - a1) > 180 ? 1 : 0;
  const sweep = a0 > a1 ? 1 : 0;
  return `M ${x0} ${y0} A ${r} ${r} 0 ${large} ${sweep} ${x1} ${y1}`;
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
  mirror = false,
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
  /** Espeja el instrumento: el arco se llena de derecha a izquierda y la aguja
   *  cae hacia el lado izquierdo. Se usa para comunicar reducción (residuos). */
  mirror?: boolean;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  const v = useCountUp(target, inView, reduced);
  const cx = 100;
  const cy = 100;
  const r = 78;
  // Ángulo de un valor. Normal: 0→180°(izq), scaleMax→0°(der). Espejado al revés,
  // de modo que el llenado y la aguja avancen de derecha a izquierda.
  const A = (value: number) =>
    mirror ? (value / scaleMax) * 180 : 180 - (value / scaleMax) * 180;
  const [nx, ny] = polar(cx, cy, r - 8, A(v));

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
            <path d={arcByAngle(cx, cy, r, A(0), A(scaleMax))} fill="none" stroke="#E6E4E2" strokeWidth={14} strokeLinecap="round" />
            {/* banda del rango destacado */}
            <path d={arcByAngle(cx, cy, r, A(band[0]), A(band[1]))} fill="none" stroke="#F6BA8C" strokeWidth={14} strokeLinecap="round" />
            {/* progreso animado */}
            <path d={arcByAngle(cx, cy, r, A(0), A(Math.max(v, 0.01)))} fill="none" stroke="#E04E00" strokeWidth={14} strokeLinecap="round" />
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

function ProductividadCard({ kpi, reduced }: { kpi: KpiProductividad; reduced: boolean }) {
  const { ref, inView } = useInView<HTMLElement>();
  const active = inView || reduced;
  const maxScale = Math.max(...kpi.series.map((s) => s.value));
  return (
    <Card innerRef={ref} className="sm:col-span-2 lg:col-span-2">
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
        <p className="mt-1 max-w-2xl text-xs text-cci-slate-light">
          Los estudios internacionales citados miden construcción industrializada off-site.
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
          <GaugeCard
            label={residuos.label}
            note={residuos.note}
            source={residuos.source}
            scaleMax={100}
            band={[0, residuos.value]}
            target={residuos.value}
            mirror
            format={(v) => `-${Math.round(v)}%`}
            ariaLabel={`${residuos.value}% menos residuos`}
            reduced={reduced}
          />
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
          <CounterCard kpi={calidad} reduced={reduced} />
          <CounterCard kpi={costo} reduced={reduced} />
          <CounterCard kpi={manoDeObra} reduced={reduced} />
          <MundoCard kpi={mundo} reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
