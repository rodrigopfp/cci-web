// Hooks compartidos para contadores animados al entrar al viewport.
//
// Se usan tanto en "La industrialización en cifras" del Radar como en las
// cifras del EICI. Respetan prefers-reduced-motion e incluyen una red de
// seguridad: si el IntersectionObserver no dispara (algunos entornos headless,
// quirks del navegador), el valor final se muestra igual.

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// useLayoutEffect en cliente; useEffect en servidor (evita el warning de SSR).
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function usePrefersReducedMotion(): boolean {
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
export function useInView<T extends Element>() {
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
    // Red de seguridad: si por cualquier motivo el observer no dispara,
    // revelamos igual para que las cifras nunca se queden congeladas en 0.
    const fallback = window.setTimeout(() => setInView(true), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);
  return { ref, inView };
}

/**
 * Contador con easing (easeOutCubic) que respeta el render de servidor:
 *  - SSR y primer render de cliente devuelven el VALOR FINAL, de modo que el
 *    HTML estático contiene la cifra real y se ve sin JS.
 *  - Tras hidratar, un layout-effect pone el valor en 0 ANTES del primer pintado
 *    (sin parpadeo) para poder animar; la animación arranca cuando `active`.
 *  - Con prefers-reduced-motion no hay animación: queda fijo en el valor final.
 */
export function useCountUp(
  target: number,
  active: boolean,
  reduced: boolean,
  duration = 1400
): number {
  // Inicial = target: coincide en SSR e hidratación (sin mismatch).
  const [val, setVal] = useState(target);

  // Antes del primer pintado en cliente: si vamos a animar, partir de 0.
  useIsoLayoutEffect(() => {
    if (!reduced) setVal(0);
  }, [reduced]);

  useEffect(() => {
    if (reduced) {
      setVal(target);
      return;
    }
    if (!active) return;
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
