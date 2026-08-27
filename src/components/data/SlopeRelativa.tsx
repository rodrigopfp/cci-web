"use client";

// SLOPE — "La construcción perdió terreno" (cap 02).
//
// Muestra la caída de la productividad laboral SECTORIAL RELATIVA de la
// construcción respecto al promedio de la economía: 1,7× en 1990 → 0,8× en 2024.
// SVG a mano (sin librerías), misma técnica del sitio: IntersectionObserver + CSS
// (strokeDashoffset) + el contador de lib/counters. Los valores, caveat, tipo de
// evidencia y fuente salen SOLO del registro (obtenerIndicadorConFuente).
//
// El capítulo va sobre bg-cci-graphite-dark: los grises "grafito" del diseño se
// adaptan a neutros claros (white/xx) para que se lean en oscuro; el acento
// durazno se mantiene. Sin JS / reduced-motion: todo aparece dibujado y con los
// valores finales (export estático).

import { useEffect, useLayoutEffect, useState } from "react";
import { obtenerIndicadorConFuente } from "@/lib/datos/indice";
import { useInView, useCountUp } from "@/lib/counters";
import { EtiquetaEvidencia } from "@/components/EtiquetaEvidencia";
import { formatCL } from "./piezas";

// useLayoutEffect en cliente, useEffect en servidor (evita el warning de SSR;
// mismo patrón que lib/counters, para poner el estado inicial antes del pintado).
const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Durazno CCI (mismo hex usado en la leyenda del hero). El resto son neutros
// blancos sobre el grafito del capítulo.
const DURAZNO = "#F6B27E";

// --- Geometría del gráfico (viewBox 600×300; escala Y honesta: 0 en la base) ---
const X1 = 175; // 1990 (izquierda)
const X2 = 425; // 2024 (derecha)
const X_LEFT = 90;
const X_RIGHT = 510;
const yOf = (v: number) => 240 - v * 100; // v=0 → y=240 (base); v=2 → y=40; v=1 → y=140

export function SlopeRelativa({ reduced }: { reduced: boolean }) {
  const { indicador: i1990, fuente } = obtenerIndicadorConFuente("productividad-relativa-construccion-1990");
  const { indicador: i2024 } = obtenerIndicadorConFuente("productividad-relativa-construccion-2024");
  const v1990 = Number(i1990.value);
  const v2024 = Number(i2024.value);
  const caveat = i2024.caveat;

  const { ref, inView } = useInView<HTMLDivElement>();

  // Dibujo (SSR-safe): parte dibujado; tras hidratar, si vamos a animar, se
  // "esconde" antes del primer pintado y se dibuja al entrar en viewport.
  const [go, setGo] = useState(true);
  useIso(() => {
    if (!reduced) setGo(false);
  }, [reduced]);
  useEffect(() => {
    if (reduced || inView) setGo(true);
  }, [reduced, inView]);

  // El punto 2024 cuenta hasta 0,8 DESPUÉS de que se traza la pendiente.
  const [countGo, setCountGo] = useState(false);
  useEffect(() => {
    if (reduced || !inView) return;
    const t = window.setTimeout(() => setCountGo(true), 1500);
    return () => window.clearTimeout(t);
  }, [reduced, inView]);
  const count = useCountUp(v2024, countGo, reduced);

  const y1 = yOf(v1990);
  const y2 = yOf(v2024);
  const promY = yOf(1);
  const len = Math.hypot(X2 - X1, y2 - y1);

  const fade = (delay: number) => ({
    opacity: go ? 1 : 0,
    transition: reduced ? "none" : `opacity 500ms ease ${delay}ms`,
  });
  const draw = {
    strokeDasharray: len,
    strokeDashoffset: go ? 0 : len,
    transition: reduced ? "none" : "stroke-dashoffset 1100ms ease 400ms",
  } as const;

  const ariaLabel = `La productividad laboral de la construcción pasó de ${formatCL(v1990, 1)} veces el promedio de la economía en 1990 a ${formatCL(v2024, 1)} veces en 2024`;

  return (
    <div ref={ref}>
      <h3 className="font-display text-xl font-800 leading-snug text-white md:text-2xl">
        La construcción perdió terreno frente al resto de la economía
      </h3>
      <p className="mt-2 max-w-2xl leading-relaxed text-white/75">
        En 1990 su productividad laboral superaba ampliamente el promedio nacional. En 2024 está por debajo.
      </p>

      <svg viewBox="0 0 600 300" className="mt-6 w-full" role="img" aria-label={ariaLabel}>
        {/* Zona bajo el promedio (v<1): oscurecida muy suave = "por debajo". */}
        <g style={fade(0)} aria-hidden="true">
          <rect x={X_LEFT} y={promY} width={X_RIGHT - X_LEFT} height={240 - promY} fill="#2B2A28" opacity={0.4} />
          <text x={X_LEFT + 8} y={232} textAnchor="start" fontSize={16} fill="#FFFFFF" fillOpacity={0.4}>
            bajo el promedio
          </text>
        </g>

        {/* Base (v=0) y referencias de escala 0–2, discretas. */}
        <g style={fade(0)} aria-hidden="true">
          <line x1={X_LEFT} y1={240} x2={X_RIGHT} y2={240} stroke="#FFFFFF" strokeOpacity={0.18} strokeWidth={1} />
          <text x={X_LEFT - 12} y={244} textAnchor="end" fontSize={16} fill="#FFFFFF" fillOpacity={0.35}>0×</text>
          <text x={X_LEFT - 12} y={44} textAnchor="end" fontSize={16} fill="#FFFFFF" fillOpacity={0.35}>2×</text>
        </g>

        {/* Línea del promedio de la economía (v=1): sólida y discreta. */}
        <g style={fade(0)} aria-hidden="true">
          <line x1={X_LEFT} y1={promY} x2={X_RIGHT} y2={promY} stroke="#FFFFFF" strokeOpacity={0.35} strokeWidth={1.5} />
          <text x={X_RIGHT} y={promY - 8} textAnchor="end" fontSize={16} fill="#FFFFFF" fillOpacity={0.55}>
            promedio de la economía
          </text>
        </g>

        {/* Pendiente 1990 → 2024, se traza de izquierda a derecha. */}
        <line x1={X1} y1={y1} x2={X2} y2={y2} stroke={DURAZNO} strokeWidth={3} strokeLinecap="round" fill="none" style={draw} aria-hidden="true" />

        {/* Punto y etiquetas 1990 (neutro claro). */}
        <g style={fade(200)} aria-hidden="true">
          <circle cx={X1} cy={y1} r={6} fill="#FFFFFF" fillOpacity={0.8} />
          <text x={X1} y={y1 - 24} textAnchor="middle" fontSize={30} fontWeight={800} fill="#FFFFFF" fillOpacity={0.85}>
            {formatCL(v1990, 1)}×
          </text>
          <text x={X1} y={y1 + 34} textAnchor="middle" fontSize={17} fill="#FFFFFF" fillOpacity={0.45}>1990</text>
        </g>

        {/* Punto y etiquetas 2024 (durazno, mayor: el punto de llegada). */}
        <g style={fade(1300)} aria-hidden="true">
          <circle cx={X2} cy={y2} r={8} fill={DURAZNO} />
          <text x={X2} y={y2 + 36} textAnchor="middle" fontSize={34} fontWeight={900} fill={DURAZNO}>
            {formatCL(count, 1)}×
          </text>
          <text x={X2} y={y2 + 66} textAnchor="middle" fontSize={17} fill="#FFFFFF" fillOpacity={0.45}>2024</text>
        </g>
      </svg>

      {/* Tipo de evidencia + caveat (VISIBLE, no puede perderse) + fuente. */}
      <div className="mt-5 border-t border-white/10 pt-4">
        <EtiquetaEvidencia tipo={i2024.sourceType} dark />
        <p className="mt-2 text-[11px] leading-snug text-white/50">{caveat}</p>
        {fuente.url ? (
          <a
            href={fuente.url}
            target={fuente.url.startsWith("http") ? "_blank" : undefined}
            rel={fuente.url.startsWith("http") ? "noopener noreferrer" : undefined}
            className="mt-2 inline-block text-[11px] font-600 text-white/50 transition hover:text-cci-orange-light"
          >
            Fuente: {fuente.shortLabel}
          </a>
        ) : (
          <span className="mt-2 inline-block text-[11px] font-600 text-white/50">Fuente: {fuente.shortLabel}</span>
        )}
      </div>
    </div>
  );
}

export default SlopeRelativa;
