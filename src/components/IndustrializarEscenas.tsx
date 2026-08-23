"use client";

// "Industrializar no es prefabricar" — narrativa visual de 3 escenas (cap 04).
//
// Estilo blueprint: trazos finos en grafito + naranjo CCI, pariente del hero.
// Accesibilidad: TODOS los rótulos viven como texto HTML (chips/listas); el SVG
// es decorativo (aria-hidden). Sin JS y con prefers-reduced-motion todo se ve en
// su estado final. En móvil es una secuencia vertical; en escritorio las escenas
// se revelan y "se dibujan" al entrar en viewport (estados discretos, sin
// scroll-jacking).

import { useInView, usePrefersReducedMotion } from "@/lib/counters";

const NODOS = [
  "Mandante", "Arquitectura", "Ingeniería", "Especialidades", "Proveedores",
  "Fabricación", "Logística", "Construcción / montaje", "Operación",
];
const FRICCIONES = [
  "información tardía", "rediseños", "interferencias", "retrabajos",
  "esperas", "variabilidad", "pérdidas", "decisiones aisladas",
];
const CONCEPTOS = [
  "integración temprana", "DfMA", "BIM", "estandarización",
  "planificación productiva", "diseño para fabricación", "diseño para montaje", "trazabilidad",
];
const FLUJO = ["Evaluar", "Diseñar", "Coordinar", "Fabricar", "Transportar", "Montar", "Medir", "Mejorar"];

// Estilo de trazo animado (line-draw). Con reduced, dibujado de inmediato.
function trazo(drawn: boolean, delay = 0) {
  return {
    pathLength: 100,
    strokeDasharray: 100,
    strokeDashoffset: drawn ? 0 : 100,
    style: { transition: `stroke-dashoffset 1.1s ease ${delay}ms` },
  } as const;
}

function ChipList({ items, tone }: { items: string[]; tone: "friccion" | "concepto" }) {
  const cls =
    tone === "friccion"
      ? "border-cci-line bg-white text-cci-slate"
      : "border-cci-orange/30 bg-cci-orange-soft text-cci-orange-dark";
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className={`rounded-full border px-3 py-1 text-xs font-600 ${cls}`}>
          {t}
        </li>
      ))}
    </ul>
  );
}

function Escena({
  n,
  titulo,
  descripcion,
  children,
  svg,
}: {
  n: string;
  titulo: string;
  descripcion: string;
  children: React.ReactNode;
  svg: React.ReactNode;
}) {
  return (
    <div className="grid items-center gap-6 rounded-2xl border border-cci-line bg-white p-6 md:grid-cols-[1fr_1.05fr] md:p-8">
      <div>
        <div className="flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange">
          <span className="font-mono">{n}</span>
          <span className="h-[2px] w-6 bg-cci-orange" />
        </div>
        <h3 className="mt-2 font-display text-xl font-800 text-cci-ink md:text-2xl">{titulo}</h3>
        <p className="mt-2 text-sm leading-relaxed text-cci-slate">{descripcion}</p>
        {children}
      </div>
      <div className="order-first md:order-last">{svg}</div>
    </div>
  );
}

// ---- SVGs decorativos (aria-hidden) -----------------------------------------

function SvgFragmentado({ drawn }: { drawn: boolean }) {
  // Nodos dispersos con conexiones rotas (dashed) y marcas de fricción (×).
  const pts = [
    [30, 30], [150, 25], [270, 45], [60, 90], [200, 80],
    [300, 100], [40, 150], [170, 155], [285, 160],
  ];
  return (
    <svg viewBox="0 0 330 190" className="w-full" role="img" aria-hidden="true">
      {/* conexiones fragmentadas */}
      {[[0, 3], [1, 4], [4, 5], [3, 6], [7, 8]].map(([a, b], i) => (
        <line
          key={i}
          x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]}
          stroke="#C9C6C2" strokeWidth={1} strokeDasharray="4 5"
        />
      ))}
      {/* marcas de fricción (×) naranjas */}
      {[[95, 60], [235, 62], [110, 130], [240, 130]].map(([x, y], i) => (
        <g key={i} stroke="#E04E00" strokeWidth={1.6} strokeLinecap="round" {...trazo(drawn, i * 120)}>
          <line x1={x - 5} y1={y - 5} x2={x + 5} y2={y + 5} />
          <line x1={x + 5} y1={y - 5} x2={x - 5} y2={y + 5} />
        </g>
      ))}
      {/* nodos */}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={9} fill="#fff" stroke="#5C5C5C" strokeWidth={1.4} />
      ))}
    </svg>
  );
}

function SvgIntegrado({ drawn }: { drawn: boolean }) {
  // Hub-and-spoke: nodos alrededor de un centro, conectados con líneas sólidas.
  const cx = 165, cy = 95, r = 70;
  const ring = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
  });
  return (
    <svg viewBox="0 0 330 190" className="w-full" role="img" aria-hidden="true">
      {ring.map(([x, y], i) => (
        <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#E04E00" strokeWidth={1.4} {...trazo(drawn, i * 90)} />
      ))}
      {ring.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={8} fill="#fff" stroke="#5C5C5C" strokeWidth={1.4} />
      ))}
      <circle cx={cx} cy={cy} r={16} fill="#E04E00" />
    </svg>
  );
}

function SvgFlujo({ drawn }: { drawn: boolean }) {
  // Cadena de pasos con flechas; arco de retorno Medir → Mejorar (ciclo).
  const y = 70;
  const xs = [24, 66, 108, 150, 192, 234, 276, 306];
  return (
    <svg viewBox="0 0 330 150" className="w-full" role="img" aria-hidden="true">
      {xs.slice(0, -1).map((x, i) => (
        <line key={i} x1={x + 9} y1={y} x2={xs[i + 1] - 9} y2={y} stroke="#5C5C5C" strokeWidth={1.4} {...trazo(drawn, i * 90)} />
      ))}
      {xs.map((x, i) => (
        <circle key={i} cx={x} cy={y} r={7} fill="#fff" stroke={i >= 6 ? "#E04E00" : "#5C5C5C"} strokeWidth={1.5} />
      ))}
      {/* ciclo de mejora: arco de retorno del último al penúltimo */}
      <path
        d={`M ${xs[7]} ${y + 7} C ${xs[7]} ${y + 45}, ${xs[6]} ${y + 45}, ${xs[6]} ${y + 7}`}
        fill="none" stroke="#E04E00" strokeWidth={1.6} {...trazo(drawn, 720)}
      />
      <text x={(xs[6] + xs[7]) / 2} y={y + 60} textAnchor="middle" fontSize="9" fill="#E04E00" fontFamily="monospace">ciclo</text>
    </svg>
  );
}

function EscenaAnimada(props: {
  n: string;
  titulo: string;
  descripcion: string;
  children: React.ReactNode;
  render: (drawn: boolean) => React.ReactNode;
  reduced: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const drawn = props.reduced || inView;
  return (
    <div
      ref={ref}
      className={
        props.reduced
          ? ""
          : `transition-all duration-700 ease-out ${inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`
      }
    >
      <Escena n={props.n} titulo={props.titulo} descripcion={props.descripcion} svg={props.render(drawn)}>
        {props.children}
      </Escena>
    </div>
  );
}

export function IndustrializarEscenas() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="mt-10 space-y-5">
      <EscenaAnimada
        reduced={reduced}
        n="Escena 1"
        titulo="Proceso fragmentado"
        descripcion="Cada actor entra en un momento distinto y decide por separado. Entre una etapa y otra se pierde información y valor."
        render={(d) => <SvgFragmentado drawn={d} />}
      >
        <p className="mt-4 text-xs font-700 uppercase tracking-wide text-cci-slate-light">Actores desconectados</p>
        <ChipList items={NODOS} tone="friccion" />
        <p className="mt-4 text-xs font-700 uppercase tracking-wide text-cci-slate-light">Fricciones</p>
        <ChipList items={FRICCIONES} tone="friccion" />
      </EscenaAnimada>

      <EscenaAnimada
        reduced={reduced}
        n="Escena 2"
        titulo="Integración temprana"
        descripcion="Los mismos actores se conectan desde el inicio en torno a métodos comunes, y las decisiones se toman una sola vez y bien."
        render={(d) => <SvgIntegrado drawn={d} />}
      >
        <p className="mt-4 text-xs font-700 uppercase tracking-wide text-cci-slate-light">Métodos que los integran</p>
        <ChipList items={CONCEPTOS} tone="concepto" />
      </EscenaAnimada>

      <EscenaAnimada
        reduced={reduced}
        n="Escena 3"
        titulo="Flujo industrializado"
        descripcion="El proyecto avanza como un sistema productivo continuo que mide sus resultados y aprende de sí mismo."
        render={(d) => <SvgFlujo drawn={d} />}
      >
        <ol className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-2 text-sm font-600 text-cci-graphite">
          {FLUJO.map((paso, i) => (
            <li key={paso} className="flex items-center gap-1">
              <span className={i >= 6 ? "text-cci-orange-dark" : ""}>{paso}</span>
              {i < FLUJO.length - 1 && <span className="text-cci-slate-light">→</span>}
            </li>
          ))}
        </ol>
        <p className="mt-2 text-xs text-cci-slate-light">Medir → Mejorar cierra el ciclo.</p>
      </EscenaAnimada>
    </div>
  );
}
