// ============================================================================
// HERO — ESCENA DE MONTAJE INDUSTRIALIZADO (plano técnico / blueprint)
//
// Grúa torre de líneas finas que iza módulos con la forma del hexágono-cubo
// del logo CCI y los ensambla en un pequeño edificio de 3 niveles. Loop
// infinito y lento (~22 s) con fundido suave al reiniciar. La idea narrativa:
// no se levanta muro a muro, se izan unidades terminadas y se ensamblan.
//
// Reglas de implementación:
//  - 100% original: SVG inline + CSS keyframes. Sin assets ni librerías.
//  - Solo se anima transform y opacity (nada que dispare relayout).
//  - prefers-reduced-motion → estado final (edificio armado) sin movimiento.
//  - Toda la coreografía (carro, cable, gancho, módulo en vuelo y los módulos
//    colocados) comparte UNA sola línea de tiempo de 22 s en bucle, por lo que
//    el ciclo cierra y reinicia sin corte.
// ============================================================================

// ----- Geometría de la escena (coordenadas del viewBox 0 0 400 480) ---------
const JIB_Y = 96; // altura de la pluma
const MAST_X = 300; // eje del mástil
const PICKUP_X = 250; // columna de acopio donde se toma cada módulo
const TRAVEL_HOIST = 60; // cuánto cuelga el módulo bajo la pluma al viajar
const PICKUP_HOIST = 304; // el módulo queda apoyado en el suelo al tomarlo
const CABLE_MAX = 340; // largo del cable a escala 1 (base para el scaleY)
const HOOK_GAP = 26; // el cable termina en la cara superior del módulo, no en su centro

// Módulos ya colocados: columna izquierda de 3 niveles + uno a la derecha en
// la base. El centro (x,y) de cada celda define dónde encaja cada módulo.
const TARGETS = [
  { x: 150, y: 400 }, // viaje 1 → base izquierda
  { x: 210, y: 400 }, // viaje 2 → base derecha
  { x: 150, y: 352 }, // viaje 3 → 2.º nivel izquierda
  { x: 150, y: 304 }, // viaje 4 → 3.er nivel izquierda
];
const N = TARGETS.length;
const TRIP_SPAN = 88 / N; // % de la línea de tiempo por viaje (deja 12% de cierre)

// ----- Hexágono-cubo del logo, reproducido a escala pequeña ------------------
const HR = 30; // radio exterior del módulo (≈60 px de ancho)
const hr = HR * (22.5 / 46); // radio interior, misma proporción que el logo
const hv = (radius: number, deg: number): [number, number] => {
  const rad = (deg * Math.PI) / 180;
  return [radius * Math.cos(rad), radius * Math.sin(rad)];
};
const O = [0, 60, 120, 180, 240, 300].map((d) => hv(HR, d)) as [number, number][];
const I = [0, 60, 120, 180, 240, 300].map((d) => hv(hr, d)) as [number, number][];
const pt = ([x, y]: [number, number]) => `${x.toFixed(1)} ${y.toFixed(1)}`;
const polyPath = (...p: [number, number][]) => `M ${p.map(pt).join(" L ")} Z`;
const seg = (a: [number, number], b: [number, number]) => `M ${pt(a)} L ${pt(b)}`;

// Contorno del hexágono-cubo centrado en (0,0). Cuatro trazos: hexágono
// exterior, hexágono interior y las dos ternas de aristas del cubo.
function ModuleShape({ color, opacity = 1, sw = 1.6 }: { color: string; opacity?: number; sw?: number }) {
  const common = {
    stroke: color,
    strokeWidth: sw,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
    fill: "none",
    vectorEffect: "non-scaling-stroke" as const,
  };
  return (
    <g opacity={opacity}>
      <path d={polyPath(...O)} {...common} />
      <path d={polyPath(...I)} {...common} />
      <path d={`${seg([0, 0], I[0])} ${seg([0, 0], I[2])} ${seg([0, 0], I[4])}`} {...common} />
      <path d={`${seg(I[1], O[1])} ${seg(I[3], O[3])} ${seg(I[5], O[5])}`} {...common} />
    </g>
  );
}

// ----- Generación de keyframes de la coreografía ----------------------------
// Fases locales de UN viaje (fracción 0..1 de su ventana). En cada fase se fija
// la posición del carro (tx), cuánto baja el gancho (h) y si el módulo en vuelo
// es visible (fly).
type Phase = { f: number; tx: number; h: number; fly: number };
function tripPhases(i: number): Phase[] {
  const t = TARGETS[i];
  const hT = t.y - JIB_Y; // descenso hasta la celda destino
  return [
    { f: 0.0, tx: PICKUP_X, h: TRAVEL_HOIST, fly: 0 }, // gancho arriba, vacío
    { f: 0.1, tx: PICKUP_X, h: PICKUP_HOIST, fly: 0 }, // baja al acopio
    { f: 0.15, tx: PICKUP_X, h: PICKUP_HOIST, fly: 1 }, // aparece el módulo
    { f: 0.32, tx: PICKUP_X, h: TRAVEL_HOIST, fly: 1 }, // iza el módulo
    { f: 0.56, tx: t.x, h: TRAVEL_HOIST, fly: 1 }, // viaja por la pluma
    { f: 0.79, tx: t.x, h: hT, fly: 1 }, // desciende al hueco
    { f: 0.86, tx: t.x, h: hT, fly: 0 }, // encaja y suelta
    { f: 1.0, tx: PICKUP_X, h: TRAVEL_HOIST, fly: 0 }, // vuelve vacío al acopio
  ];
}

// Convierte la fracción local de un viaje en % global de la línea de tiempo.
const gpc = (i: number, f: number) => (i * TRIP_SPAN + f * TRIP_SPAN).toFixed(2);

function buildKeyframes(): string {
  const trolley: string[] = [];
  const hoist: string[] = [];
  const cable: string[] = [];
  const fly: string[] = [];

  for (let i = 0; i < N; i++) {
    const phases = tripPhases(i);
    for (let k = 0; k < phases.length; k++) {
      const p = phases[k];
      const g = gpc(i, p.f);
      trolley.push(`${g}% { transform: translateX(${p.tx}px); }`);
      hoist.push(`${g}% { transform: translateY(${p.h}px); }`);
      cable.push(`${g}% { transform: scaleY(${((p.h - HOOK_GAP) / CABLE_MAX).toFixed(4)}); }`);
      // La opacidad del módulo en vuelo cambia en escalón: se añade un stop
      // previo con el valor anterior para que el cambio sea casi instantáneo.
      if (k > 0 && phases[k - 1].fly !== p.fly) {
        const gPrev = (parseFloat(g) - 0.3).toFixed(2);
        fly.push(`${gPrev}% { opacity: ${phases[k - 1].fly}; }`);
      }
      fly.push(`${g}% { opacity: ${p.fly}; }`);
    }
  }
  // Cierre 88→100%: carro en acopio, gancho arriba, módulo oculto.
  trolley.push(`100% { transform: translateX(${PICKUP_X}px); }`);
  hoist.push(`100% { transform: translateY(${TRAVEL_HOIST}px); }`);
  cable.push(`100% { transform: scaleY(${((TRAVEL_HOIST - HOOK_GAP) / CABLE_MAX).toFixed(4)}); }`);
  fly.push(`100% { opacity: 0; }`);

  // Cada módulo colocado aparece en su instante de encaje y destella una vez.
  const placed: string[] = [];
  for (let i = 0; i < N; i++) {
    const lock = parseFloat(gpc(i, 0.83));
    const before = (lock - 0.3).toFixed(2);
    const flashEnd = (lock + TRIP_SPAN * 0.14).toFixed(2);
    placed.push(`
      @keyframes obraPlaced${i} {
        0% { opacity: 0; }
        ${before}% { opacity: 0; }
        ${lock.toFixed(2)}% { opacity: 1; }
        88% { opacity: 1; }
        96% { opacity: 0; }
        100% { opacity: 0; }
      }
      @keyframes obraFlash${i} {
        0% { opacity: 0; }
        ${before}% { opacity: 0; }
        ${lock.toFixed(2)}% { opacity: 1; }
        ${flashEnd}% { opacity: 0; }
        100% { opacity: 0; }
      }`);
  }

  return `
    @keyframes obraTrolley { ${trolley.join(" ")} }
    @keyframes obraHoist { ${hoist.join(" ")} }
    @keyframes obraCable { ${cable.join(" ")} }
    @keyframes obraFly { ${fly.join(" ")} }
    ${placed.join("\n")}
    @keyframes obraSway { from { transform: translateX(-2px); } to { transform: translateX(2px); } }
    @keyframes obraGrid { 0%,100% { opacity: 0.04; } 50% { opacity: 0.08; } }
  `;
}

const KEYFRAMES = buildKeyframes();
const DUR = "22s";

// Estilos de la escena: la coreografía completa comparte duración y bucle, de
// modo que todo cierra el ciclo a la vez. En prefers-reduced-motion se apaga la
// animación y el estado por defecto del SVG ya es el edificio armado.
const STYLE = `
  .obra [data-anim] { animation-duration: ${DUR}; animation-timing-function: linear; animation-iteration-count: infinite; }
  .obra .a-trolley { animation-name: obraTrolley; }
  .obra .a-hoist { animation-name: obraHoist; }
  .obra .a-cable { animation-name: obraCable; transform-box: fill-box; transform-origin: top left; }
  .obra .a-fly { animation-name: obraFly; }
  .obra .a-sway { animation: obraSway 4.5s ease-in-out infinite alternate; }
  .obra .a-grid { animation: obraGrid 9s ease-in-out infinite; }
  ${TARGETS.map((_, i) => `.obra .a-placed${i} { animation-name: obraPlaced${i}; } .obra .a-flash${i} { animation-name: obraFlash${i}; }`).join("\n")}

  @media (prefers-reduced-motion: reduce) {
    .obra [data-anim], .obra .a-sway, .obra .a-grid { animation: none !important; }
    .obra .a-fly, .obra [class*="a-flash"] { opacity: 0 !important; }
    .obra [class*="a-placed"] { opacity: 1 !important; }
  }
`;

const WHITE = "#FFFFFF";
const ORANGE = "#E04E00";
const BLUE = "#009DE6";

export function HeroObra({ className = "" }: { className?: string }) {
  return (
    <div className={`obra pointer-events-none select-none ${className}`} aria-hidden="true">
      <style dangerouslySetInnerHTML={{ __html: STYLE + KEYFRAMES }} />
      <svg viewBox="0 0 400 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        {/* Grilla de plano, insinuada */}
        <g className="a-grid" stroke={WHITE} strokeWidth={0.5} opacity={0.05}>
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`v${i}`} x1={40 + i * 40} y1={40} x2={40 + i * 40} y2={456} />
          ))}
          {Array.from({ length: 11 }, (_, i) => (
            <line key={`h${i}`} x1={20} y1={40 + i * 40} x2={392} y2={40 + i * 40} />
          ))}
        </g>

        {/* Líneas de construcción (niveles del edificio), azul muy tenue */}
        <g stroke={BLUE} strokeWidth={0.7} strokeDasharray="3 5" opacity={0.16}>
          <line x1={110} y1={424} x2={260} y2={424} />
          <line x1={110} y1={376} x2={260} y2={376} />
          <line x1={110} y1={328} x2={260} y2={328} />
        </g>
        {/* Suelo */}
        <line x1={20} y1={424} x2={392} y2={424} stroke={WHITE} strokeWidth={1} opacity={0.22} />

        {/* --- GRÚA TORRE (fija) --- */}
        <g stroke={WHITE} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.55}>
          {/* Mástil reticulado */}
          <g strokeWidth={1.4}>
            <line x1={MAST_X - 9} y1={JIB_Y} x2={MAST_X - 9} y2={452} opacity={0.85} />
            <line x1={MAST_X + 9} y1={JIB_Y} x2={MAST_X + 9} y2={452} opacity={0.85} />
            {Array.from({ length: 9 }, (_, i) => {
              const y0 = JIB_Y + i * 40;
              const y1 = y0 + 40;
              return (
                <g key={i} strokeWidth={0.9} opacity={0.6}>
                  <line x1={MAST_X - 9} y1={y0} x2={MAST_X + 9} y2={y0} />
                  <line x1={MAST_X - 9} y1={y0} x2={MAST_X + 9} y2={y1} />
                  <line x1={MAST_X + 9} y1={y0} x2={MAST_X - 9} y2={y1} />
                </g>
              );
            })}
          </g>
          {/* Base */}
          <line x1={MAST_X - 22} y1={452} x2={MAST_X + 22} y2={452} strokeWidth={1.4} opacity={0.85} />

          {/* Pluma (reticulada) y contrapluma */}
          <g strokeWidth={1.4}>
            <line x1={92} y1={JIB_Y - 8} x2={MAST_X + 60} y2={JIB_Y - 8} opacity={0.85} />
            <line x1={92} y1={JIB_Y} x2={MAST_X + 60} y2={JIB_Y} opacity={0.85} />
            {Array.from({ length: 13 }, (_, i) => {
              const x0 = 100 + i * 16;
              return <line key={i} x1={x0} y1={JIB_Y} x2={x0 + 8} y2={JIB_Y - 8} strokeWidth={0.8} opacity={0.55} />;
            })}
          </g>
          {/* Tirantes desde el ápice */}
          <g strokeWidth={0.9} opacity={0.5}>
            <line x1={MAST_X} y1={JIB_Y - 46} x2={110} y2={JIB_Y - 8} />
            <line x1={MAST_X} y1={JIB_Y - 46} x2={175} y2={JIB_Y - 8} />
            <line x1={MAST_X} y1={JIB_Y - 46} x2={MAST_X + 52} y2={JIB_Y - 8} />
            <line x1={MAST_X} y1={JIB_Y} x2={MAST_X} y2={JIB_Y - 46} strokeWidth={1.1} opacity={0.7} />
          </g>
          {/* Contrapeso */}
          <rect x={MAST_X + 44} y={JIB_Y - 4} width={20} height={16} strokeWidth={1.1} opacity={0.7} />
          {/* Cabina del operador */}
          <rect x={MAST_X - 11} y={JIB_Y + 2} width={22} height={16} strokeWidth={1} opacity={0.6} />
        </g>

        {/* --- MÓDULOS YA COLOCADOS (edificio) --- */}
        {TARGETS.map((t, i) => (
          <g key={i} transform={`translate(${t.x} ${t.y})`}>
            <g data-anim="" className={`a-placed${i}`} style={{ opacity: 1 }}>
              <ModuleShape color={WHITE} opacity={0.5} sw={1.5} />
            </g>
            <g data-anim="" className={`a-flash${i}`} style={{ opacity: 0 }}>
              <ModuleShape color={ORANGE} opacity={0.95} sw={1.9} />
            </g>
          </g>
        ))}

        {/* --- CONJUNTO CARRO + CABLE + GANCHO + MÓDULO EN VUELO --- */}
        <g transform={`translate(0 ${JIB_Y})`}>
          <g data-anim="" className="a-trolley">
            {/* Carro sobre la pluma */}
            <rect x={-9} y={-6} width={18} height={9} stroke={WHITE} strokeWidth={1.1} fill="none" opacity={0.6} rx={1} />
            {/* Cable (escala en Y con el gancho) */}
            <g data-anim="" className="a-cable">
              <line x1={0} y1={0} x2={0} y2={CABLE_MAX} stroke={WHITE} strokeWidth={0.9} opacity={0.4} />
            </g>
            {/* Gancho + módulo en vuelo, descienden con el hoist */}
            <g data-anim="" className="a-hoist">
              <g data-anim="" className="a-sway">
                {/* Gancho, sobre la cara superior del módulo (donde termina el cable) */}
                <g stroke={WHITE} strokeWidth={1.1} fill="none" opacity={0.5} strokeLinecap="round" transform={`translate(0 ${-HOOK_GAP})`}>
                  <line x1={-6} y1={0} x2={6} y2={0} />
                  <line x1={-6} y1={0} x2={0} y2={8} />
                  <line x1={6} y1={0} x2={0} y2={8} />
                  <path d="M 0 8 q -4 6 0 10 q 4 3 0 6" />
                </g>
                {/* Módulo en vuelo, naranja, centrado en el punto del gancho */}
                <g data-anim="" className="a-fly" style={{ opacity: 0 }}>
                  <ModuleShape color={ORANGE} opacity={0.95} sw={1.8} />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default HeroObra;
