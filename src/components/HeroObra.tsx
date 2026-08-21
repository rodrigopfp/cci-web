"use client";

// ============================================================================
// HERO — ESCENA DE MONTAJE INDUSTRIALIZADO (plano técnico / blueprint)
//
// La escena cubre TODO el hero a pantalla completa, de borde a borde, y ENMARCA
// la columna de texto: la pluma cruza por arriba del titular, el mástil baja por
// el costado derecho y el edificio se ensambla en la base, debajo de los botones.
// El módulo (hexágono-cubo del logo CCI) recorre ese marco sin pasar nunca por
// delante del texto: sube por el costado derecho, viaja por la pluma superior,
// baja por el corredor derecho y se desliza por la base hasta encajar.
//
// Reglas de implementación:
//  - 100% original: SVG inline + CSS keyframes. Sin assets ni librerías.
//  - Solo se anima transform y opacity (nada que dispare relayout).
//  - Coordenadas en píxeles reales (viewBox = tamaño medido del hero) para que
//    los módulos no se deformen con la relación de aspecto. Se re-mide con un
//    ResizeObserver (no por frame); la coreografía es CSS puro.
//  - prefers-reduced-motion → estado final (edificio armado) sin movimiento.
// ============================================================================

import { useEffect, useMemo, useRef, useState } from "react";

const WHITE = "#FFFFFF";
const ORANGE = "#E04E00";
const BLUE = "#009DE6";

// ----- Hexágono-cubo del logo, a un tamaño en píxeles -----------------------
const hv = (radius: number, deg: number): [number, number] => {
  const rad = (deg * Math.PI) / 180;
  return [radius * Math.cos(rad), radius * Math.sin(rad)];
};
const pt = ([x, y]: [number, number]) => `${x.toFixed(1)} ${y.toFixed(1)}`;
const polyPath = (p: [number, number][]) => `M ${p.map(pt).join(" L ")} Z`;
const seg = (a: [number, number], b: [number, number]) => `M ${pt(a)} L ${pt(b)}`;

function ModuleShape({ m, color, opacity = 1, sw = 1.6 }: { m: number; color: string; opacity?: number; sw?: number }) {
  const R = m * 0.46;
  const r = R * (22.5 / 46);
  const O = [0, 60, 120, 180, 240, 300].map((d) => hv(R, d)) as [number, number][];
  const I = [0, 60, 120, 180, 240, 300].map((d) => hv(r, d)) as [number, number][];
  const common = {
    stroke: color,
    strokeWidth: sw,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
    fill: "none",
  };
  return (
    <g opacity={opacity}>
      <path d={polyPath(O)} {...common} />
      <path d={polyPath(I)} {...common} />
      <path d={`${seg([0, 0], I[0])} ${seg([0, 0], I[2])} ${seg([0, 0], I[4])}`} {...common} />
      <path d={`${seg(I[1], O[1])} ${seg(I[3], O[3])} ${seg(I[5], O[5])}`} {...common} />
    </g>
  );
}

// ----- Coreografía ----------------------------------------------------------
// Todo se calcula en píxeles a partir del tamaño real del hero (w,h). Una única
// línea de tiempo en bucle (~22 s) reparte N viajes; cada viaje comparte la
// misma estructura, de modo que el ciclo cierra y reinicia sin corte.
type Layout = {
  w: number;
  h: number;
  mob: boolean;
  n: number;
  m: number; // tamaño del módulo en px
  jibY: number;
  mastX: number;
  acopio: [number, number];
  dropX: number;
  travelY: number;
  baseBandY: number;
  cableMax: number;
  targets: [number, number][];
};

// Layout responsivo. En escritorio el módulo recorre todo el marco (sube por la
// derecha, cruza la pluma superior y baja por el corredor derecho, que queda
// despejado porque el texto es angosto). En móvil el texto es casi tan ancho
// como el viewport y su subtítulo se envuelve, de modo que NO hay corredor
// lateral limpio: la única zona libre es la franja inferior, bajo los botones.
// Por eso en móvil toda la acción del módulo se confina a esa franja (y > ~0.74h)
// y el carro/cable superiores se ocultan; la grúa queda como marco del texto.
function computeLayout(w: number, h: number): Layout {
  const mob = w < 720;
  const n = mob ? 3 : 4;
  const m = Math.max(mob ? 36 : 42, Math.min(w, h) * (mob ? 0.075 : 0.085));
  const jibY = h * 0.1;
  const mastX = w * (mob ? 0.93 : 0.9);
  const acopio: [number, number] = mob ? [w * 0.82, h * 0.93] : [w * 0.85, h * 0.92];
  const dropX = w * (mob ? 0.7 : 0.75);
  // Altura de acarreo: bajo la pluma en escritorio; en la franja inferior en móvil.
  const travelY = mob ? h * 0.74 : jibY + m * 0.75;
  const baseBandY = h * (mob ? 0.9 : 0.88);
  const cableMax = baseBandY - jibY;
  // Edificio en la base, debajo de los botones. El módulo baja por el corredor
  // derecho y se desliza por la franja base (bajo el texto) hasta encajar aquí.
  const buildX = w * (mob ? 0.2 : 0.13);
  const colW = w * (mob ? 0.13 : 0.078);
  const buildBaseY = h * (mob ? 0.92 : 0.9);
  const rowGap = h * 0.085;
  const cells: [number, number][] = [
    [buildX, buildBaseY],
    [buildX + colW, buildBaseY],
    [buildX, buildBaseY - rowGap],
    [buildX + colW, buildBaseY - rowGap],
  ];
  return { w, h, mob, n, m, jibY, mastX, acopio, dropX, travelY, baseBandY, cableMax, targets: cells.slice(0, n) };
}

// Fases locales de UN viaje (fracción 0..1 de su ventana): posición del módulo
// (mx,my), su opacidad (fly), posición del carro (tx) y punta del gancho (hy).
function tripTracks(L: Layout, i: number) {
  const [ax, ay] = L.acopio;
  const [txT, tyT] = L.targets[i];
  const tv = L.travelY;
  const bb = L.baseBandY;
  // [f, mx, my, fly]
  const mod: [number, number, number, number][] = [
    [0.0, ax, ay, 0],
    [0.05, ax, ay, 1], // aparece en el acopio
    [0.22, ax, tv, 1], // iza por el costado derecho
    [0.36, L.dropX, tv, 1], // viaja por la pluma superior
    [0.54, L.dropX, bb, 1], // baja por el corredor derecho a la franja base
    [0.72, txT, bb, 1], // se desliza por la base hasta su columna
    [0.86, txT, tyT, 1], // se asienta en su nivel
    [0.92, txT, tyT, 0], // encaja → aparece el colocado + destello; se oculta
    [1.0, ax, ay, 0],
  ];
  // [f, tx]
  const trolley: [number, number][] = [
    [0.0, ax],
    [0.22, ax],
    [0.36, L.dropX],
    [0.54, L.dropX],
    [0.7, ax],
    [1.0, ax],
  ];
  // [f, hy] — punta del gancho; el cable mide (hy - jibY)
  const hook: [number, number][] = [
    [0.0, tv],
    [0.05, ay],
    [0.22, tv],
    [0.36, tv],
    [0.54, bb],
    [0.6, tv],
    [1.0, tv],
  ];
  return { mod, trolley, hook };
}

function buildCss(L: Layout): string {
  const S = 88 / L.n; // ventana de cada viaje (%)
  const g = (i: number, f: number) => (i * S + f * S).toFixed(2);

  const mx: string[] = [];
  const my: string[] = [];
  const fly: string[] = [];
  const tro: string[] = [];
  const cab: string[] = [];
  const hok: string[] = [];

  for (let i = 0; i < L.n; i++) {
    const { mod, trolley, hook } = tripTracks(L, i);
    mod.forEach((p, k) => {
      const gg = g(i, p[0]);
      mx.push(`${gg}% { transform: translateX(${p[1].toFixed(1)}px); }`);
      my.push(`${gg}% { transform: translateY(${p[2].toFixed(1)}px); }`);
      if (k > 0 && mod[k - 1][3] !== p[3]) {
        fly.push(`${(parseFloat(gg) - 0.3).toFixed(2)}% { opacity: ${mod[k - 1][3]}; }`);
      }
      fly.push(`${gg}% { opacity: ${p[3]}; }`);
    });
    trolley.forEach((p) => tro.push(`${g(i, p[0])}% { transform: translateX(${p[1].toFixed(1)}px); }`));
    hook.forEach((p) => {
      const len = Math.max(0, p[1] - L.jibY);
      hok.push(`${g(i, p[0])}% { transform: translateY(${len.toFixed(1)}px); }`);
      cab.push(`${g(i, p[0])}% { transform: scaleY(${(len / L.cableMax).toFixed(4)}); }`);
    });
  }
  // Cierre del ciclo (88→100%): todo en reposo, coincide con el inicio.
  const [ax, ay] = L.acopio;
  const restLen = Math.max(0, L.travelY - L.jibY);
  mx.push(`100% { transform: translateX(${ax.toFixed(1)}px); }`);
  my.push(`100% { transform: translateY(${ay.toFixed(1)}px); }`);
  fly.push(`100% { opacity: 0; }`);
  tro.push(`100% { transform: translateX(${ax.toFixed(1)}px); }`);
  hok.push(`100% { transform: translateY(${restLen.toFixed(1)}px); }`);
  cab.push(`100% { transform: scaleY(${(restLen / L.cableMax).toFixed(4)}); }`);

  // Módulos colocados: aparecen al encajar, se mantienen hasta completar el
  // edificio y luego funden suave; el destello naranja pulsa una vez.
  const placed: string[] = [];
  for (let i = 0; i < L.n; i++) {
    const lock = parseFloat(g(i, 0.9));
    const before = (lock - 0.3).toFixed(2);
    const flashEnd = (lock + S * 0.16).toFixed(2);
    placed.push(`
      @keyframes obraPlaced${i} {
        0%,${before}% { opacity: 0; }
        ${lock.toFixed(2)}%,90% { opacity: 1; }
        98%,100% { opacity: 0; }
      }
      @keyframes obraFlash${i} {
        0%,${before}% { opacity: 0; }
        ${lock.toFixed(2)}% { opacity: 1; }
        ${flashEnd}%,100% { opacity: 0; }
      }`);
  }

  return `
    @keyframes obraMx { ${mx.join(" ")} }
    @keyframes obraMy { ${my.join(" ")} }
    @keyframes obraFly { ${fly.join(" ")} }
    @keyframes obraTrolley { ${tro.join(" ")} }
    @keyframes obraCable { ${cab.join(" ")} }
    @keyframes obraHook { ${hok.join(" ")} }
    ${placed.join("\n")}
    @keyframes obraSway { from { transform: translateX(-2px); } to { transform: translateX(2px); } }
    @keyframes obraGrid { 0%,100% { opacity: 0.04; } 50% { opacity: 0.075; } }
  `;
}

const DUR = "22s";

function styleFor(n: number): string {
  return `
    .obra [data-a] { animation-duration: ${DUR}; animation-timing-function: linear; animation-iteration-count: infinite; }
    .obra .a-mx { animation-name: obraMx; }
    .obra .a-my { animation-name: obraMy; }
    .obra .a-fly { animation-name: obraFly; }
    .obra .a-trolley { animation-name: obraTrolley; }
    .obra .a-cable { animation-name: obraCable; transform-box: fill-box; transform-origin: top left; }
    .obra .a-hook { animation-name: obraHook; }
    .obra .a-sway { animation: obraSway 4.5s ease-in-out infinite alternate; }
    .obra .a-grid { animation: obraGrid 9s ease-in-out infinite; }
    ${Array.from({ length: n }, (_, i) => `.obra .a-placed${i} { animation-name: obraPlaced${i}; } .obra .a-flash${i} { animation-name: obraFlash${i}; }`).join("\n")}

    @media (prefers-reduced-motion: reduce) {
      .obra [data-a], .obra .a-sway, .obra .a-grid { animation: none !important; }
      .obra .a-fly { opacity: 0 !important; }
      .obra [class*="a-flash"] { opacity: 0 !important; }
      .obra [class*="a-placed"] { opacity: 1 !important; }
    }
  `;
}

export function HeroObra({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 1440, h: 760 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      if (w < 2 || h < 2) return;
      setSize((prev) => (Math.abs(prev.w - w) > 2 || Math.abs(prev.h - h) > 2 ? { w, h } : prev));
    };
    measure(); // medición inmediata al montar (no depende de que el observer dispare)
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  const { L, css } = useMemo(() => {
    const L = computeLayout(size.w, size.h);
    return { L, css: styleFor(L.n) + buildCss(L) };
  }, [size.w, size.h]);

  const { w, h, m, jibY, mastX } = L;
  const restLen = Math.max(0, L.travelY - jibY);

  // Reticulado del mástil y celdas de la pluma, en px.
  const mastHalf = Math.max(7, m * 0.16);
  const mastRungs = Math.max(4, Math.round((h - jibY) / (mastHalf * 2.4)));
  const jibCells = Math.max(6, Math.round((mastX + m) / (m * 0.7)));

  return (
    <div ref={ref} className={`obra pointer-events-none select-none ${className}`} aria-hidden="true">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        {/* Grilla de plano, insinuada */}
        <g className="a-grid" stroke={WHITE} strokeWidth={0.6} opacity={0.05}>
          {Array.from({ length: Math.ceil(w / 56) }, (_, i) => (
            <line key={`v${i}`} x1={i * 56} y1={0} x2={i * 56} y2={h} />
          ))}
          {Array.from({ length: Math.ceil(h / 56) }, (_, i) => (
            <line key={`hz${i}`} x1={0} y1={i * 56} x2={w} y2={i * 56} />
          ))}
        </g>

        {/* Líneas de construcción (niveles del edificio), azul muy tenue */}
        <g stroke={BLUE} strokeWidth={0.8} strokeDasharray="3 6" opacity={0.14}>
          {L.targets.map(([, ty], i) => (
            <line key={i} x1={L.targets[0][0] - m * 0.7} y1={ty + m * 0.5} x2={mastX} y2={ty + m * 0.5} />
          ))}
        </g>
        {/* Suelo */}
        <line x1={0} y1={L.baseBandY + m * 0.55} x2={w} y2={L.baseBandY + m * 0.55} stroke={WHITE} strokeWidth={1} opacity={0.18} />

        {/* --- GRÚA TORRE (fija): pluma arriba de lado a lado, mástil a la derecha --- */}
        <g stroke={WHITE} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Mástil reticulado, recorre todo el alto por el costado derecho */}
          <g strokeWidth={1.4} opacity={0.5}>
            <line x1={mastX - mastHalf} y1={jibY} x2={mastX - mastHalf} y2={h} />
            <line x1={mastX + mastHalf} y1={jibY} x2={mastX + mastHalf} y2={h} />
            {Array.from({ length: mastRungs }, (_, i) => {
              const y0 = jibY + i * ((h - jibY) / mastRungs);
              const y1 = jibY + (i + 1) * ((h - jibY) / mastRungs);
              return (
                <g key={i} strokeWidth={0.9} opacity={0.7}>
                  <line x1={mastX - mastHalf} y1={y0} x2={mastX + mastHalf} y2={y0} />
                  <line x1={mastX - mastHalf} y1={y0} x2={mastX + mastHalf} y2={y1} />
                  <line x1={mastX + mastHalf} y1={y0} x2={mastX - mastHalf} y2={y1} />
                </g>
              );
            })}
          </g>

          {/* Pluma: doble cordón de lado a lado por arriba del titular */}
          <g strokeWidth={1.4} opacity={0.5}>
            <line x1={0} y1={jibY - mastHalf} x2={mastX + m * 1.3} y2={jibY - mastHalf} />
            <line x1={0} y1={jibY} x2={mastX + m * 1.3} y2={jibY} />
            {Array.from({ length: jibCells }, (_, i) => {
              const x0 = i * (m * 0.7);
              return <line key={i} x1={x0} y1={jibY} x2={x0 + m * 0.35} y2={jibY - mastHalf} strokeWidth={0.8} opacity={0.7} />;
            })}
          </g>
          {/* Ápice y tirantes */}
          <g strokeWidth={0.9} opacity={0.45}>
            <line x1={mastX} y1={jibY - mastHalf * 3.2} x2={mastX} y2={jibY} strokeWidth={1.1} opacity={0.6} />
            <line x1={mastX} y1={jibY - mastHalf * 3.2} x2={w * 0.18} y2={jibY - mastHalf} />
            <line x1={mastX} y1={jibY - mastHalf * 3.2} x2={w * 0.5} y2={jibY - mastHalf} />
            <line x1={mastX} y1={jibY - mastHalf * 3.2} x2={mastX + m} y2={jibY - mastHalf} />
          </g>
          {/* Contrapeso */}
          <rect x={mastX + m * 0.95} y={jibY - mastHalf} width={m * 0.35} height={mastHalf * 2} strokeWidth={1.1} opacity={0.55} />
        </g>

        {/* --- MÓDULOS YA COLOCADOS (edificio en la base) --- */}
        {L.targets.map(([tx, ty], i) => (
          <g key={i} transform={`translate(${tx.toFixed(1)} ${ty.toFixed(1)})`}>
            <g data-a="" className={`a-placed${i}`} style={{ opacity: 1 }}>
              <ModuleShape m={m} color={WHITE} opacity={0.5} sw={1.5} />
            </g>
            <g data-a="" className={`a-flash${i}`} style={{ opacity: 0 }}>
              <ModuleShape m={m} color={ORANGE} opacity={0.95} sw={1.9} />
            </g>
          </g>
        ))}

        {/* --- CARRO + CABLE + GANCHO (sobre la pluma) — solo escritorio, donde
              el módulo cuelga del gancho. En móvil el montaje ocurre en la base. --- */}
        {!L.mob && (
        <g data-a="" className="a-trolley" style={{ transform: `translateX(${L.acopio[0].toFixed(1)}px)` }}>
          <g transform={`translate(0 ${jibY.toFixed(1)})`}>
            <rect x={-m * 0.18} y={-m * 0.12} width={m * 0.36} height={m * 0.18} stroke={WHITE} strokeWidth={1.1} fill="none" opacity={0.55} rx={1} />
            {/* Cable (escala en Y con el gancho) */}
            <g data-a="" className="a-cable" style={{ transform: `scaleY(${(restLen / L.cableMax).toFixed(4)})` }}>
              <line x1={0} y1={0} x2={0} y2={L.cableMax} stroke={WHITE} strokeWidth={0.9} opacity={0.38} />
            </g>
            {/* Gancho */}
            <g data-a="" className="a-hook" style={{ transform: `translateY(${restLen.toFixed(1)}px)` }}>
              <g stroke={WHITE} strokeWidth={1.1} fill="none" opacity={0.5} strokeLinecap="round">
                <line x1={-4} y1={0} x2={4} y2={0} />
                <path d="M 0 0 q -3 5 0 8 q 3 3 0 5" />
              </g>
            </g>
          </g>
        </g>
        )}

        {/* --- MÓDULO EN VUELO (naranja) --- */}
        <g data-a="" className="a-mx" style={{ transform: `translateX(${L.acopio[0].toFixed(1)}px)` }}>
          <g data-a="" className="a-my" style={{ transform: `translateY(${L.acopio[1].toFixed(1)}px)` }}>
            <g data-a="" className="a-sway">
              <g data-a="" className="a-fly" style={{ opacity: 0 }}>
                <ModuleShape m={m} color={ORANGE} opacity={0.95} sw={1.8} />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default HeroObra;
