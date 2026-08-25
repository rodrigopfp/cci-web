"use client";

// ============================================================================
// HERO — CARRUSEL DE FOTOS DEL ECOSISTEMA CCI (opción A, 25/08)
//
// El fondo del hero es un carrusel de 4 fotografías reales del CCI con velo
// grafito encima; el mensaje y los botones quedan intactos. Bajo los botones se
// suma la leyenda de la foto activa y 4 puntos indicadores sincronizados.
//
// SSR sin JS: se renderiza el índice 0 → primera foto + todo el texto y los
// botones visibles. El JS solo agrega la rotación (crossfade cada 5 s).
// prefers-reduced-motion → sin intervalo ni transiciones; queda la 1ª foto.
// ============================================================================

import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = { n: number; caption: string; alt: string };

const SLIDES: Slide[] = [
  {
    n: 1,
    caption: "La comunidad CCI",
    alt: "Integrantes de la comunidad CCI saludando en las oficinas del Consejo",
  },
  {
    n: 2,
    caption: "Seminario Vivienda · con MINVU",
    alt: "Seminario de Vivienda Industrializada del CCI con una presentación del MINVU en pantalla",
  },
  {
    n: 3,
    caption: "Delegación CCI · Expo Osaka, Japón",
    alt: "Delegación del CCI en un jardín japonés durante la visita a la Expo de Osaka, en Japón",
  },
  {
    n: 4,
    caption: "Premios CCI 2026",
    alt: "Premiación CCI 2026: una premiada sostiene un pasaje simbólico de gran tamaño de Santiago a Madrid",
  },
];

// Velo grafito de la maqueta: transparente arriba, opaco al pie para garantizar
// la lectura del titular y la leyenda sobre cualquiera de las fotos.
const VELO =
  "linear-gradient(180deg, #2B2A2840 0%, #2B2A2875 35%, #2B2A28F0 68%, #2B2A28FA 100%)";

// Blindaje de legibilidad: sombra sutil en H1 y párrafo para que el texto no
// compita con las fotos más claras (Osaka), incluso donde el velo es medio.
const TEXT_SHADOW = "0 2px 14px rgba(0,0,0,.35)";

const INTERVALO_MS = 5000;

export function HeroCarousel() {
  const [activo, setActivo] = useState(0);
  const [reducido, setReducido] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReducido(true);
      return; // fija la primera foto, sin intervalo ni transiciones
    }
    const id = setInterval(() => {
      setActivo((i) => (i + 1) % SLIDES.length);
    }, INTERVALO_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex items-end overflow-hidden border-b border-cci-line bg-cci-graphite-dark min-h-[600px] md:min-h-[560px] md:h-[600px] md:max-h-[640px] md:items-center">
      {/* --- Carrusel de fondo: 4 slides con crossfade de opacidad --- */}
      <div className="absolute inset-0" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <div
            key={s.n}
            className="absolute inset-0"
            style={{
              opacity: i === activo ? 1 : 0,
              transition: reducido ? "none" : "opacity 1100ms ease",
            }}
          >
            <picture>
              <source srcSet={`/hero/hero-${s.n}.webp`} type="image/webp" />
              <img
                src={`/hero/hero-${s.n}.jpg`}
                alt={s.alt}
                className="h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
                decoding="async"
                draggable={false}
              />
            </picture>
          </div>
        ))}
        {/* Velo grafito vertical (maqueta): domina en móvil, donde el contenido
            va anclado abajo, en la zona más opaca. */}
        <div className="absolute inset-0" style={{ backgroundImage: VELO }} />
        {/* Refuerzo lateral SOLO en desktop: allí el contenido va centrado en
            vertical (layout actual del hero), donde el velo vertical es más
            claro. Este degradado oscurece la columna izquierda del texto y se
            desvanece hacia la derecha para no tapar la foto — garantiza la
            lectura del H1 y la leyenda incluso sobre la foto de Osaka. */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{ backgroundImage: "linear-gradient(90deg, #2B2A28E6 0%, #2B2A2899 34%, #2B2A2833 58%, transparent 74%)" }}
        />
      </div>

      {/* --- Contenido: mismo mensaje y botones que el hero anterior --- */}
      <div className="relative w-full px-6 pb-10 sm:px-10 md:px-0 md:pb-0">
        <div className="max-w-[82vw] animate-rise sm:max-w-md md:ml-[21%] md:max-w-xl">
          <div className="mb-5 inline-flex w-fit items-center whitespace-nowrap border-l-4 border-cci-orange bg-[#4A4947] py-2 pl-4 pr-3 text-[9px] font-700 uppercase leading-none tracking-[0.15em] text-[#E7E5E1] md:text-xs">
            Consejo de Construcción Industrializada
          </div>
          <h1 className="font-display text-4xl font-900 leading-[1.03] text-white md:text-6xl" style={{ textShadow: TEXT_SHADOW }}>
            Chile necesita<br />construir <span className="text-cci-orange">mejor.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75" style={{ textShadow: TEXT_SHADOW }}>
            Más productividad. Más calidad.
            <br className="md:hidden" /> Menos residuos.{" "}
            <span className="whitespace-nowrap font-bold tracking-[-0.015em] text-white">Eso es industrializar.</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/data" className="btn-primary">Ver la evidencia</Link>
            <Link href="/nosotros" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/90 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">Conoce al CCI</Link>
          </div>

          {/* Leyenda de la foto activa + puntos indicadores (decorativos).
              ALTURA FIJA de una línea (h-4/h-5) para que el bloque NO salte al
              cambiar de foto: la leyenda va en nowrap y, como red de seguridad,
              trunca con elipsis si alguna no cupiera. */}
          <div className="mt-7 flex h-4 items-center gap-4 md:h-5">
            <p className="min-w-0 truncate font-mono text-[10px] uppercase tracking-[0.14em] text-[#F6B27E] md:text-[11px]">
              {SLIDES[activo].caption}
            </p>
            <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
              {SLIDES.map((s, i) => (
                <span
                  key={s.n}
                  className="h-1.5 w-1.5 rounded-full transition-colors duration-500"
                  style={{ backgroundColor: i === activo ? "#E04E00" : "rgba(255,255,255,0.3)" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroCarousel;
