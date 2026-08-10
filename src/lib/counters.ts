// Hooks compartidos para contadores animados al entrar al viewport.
//
// Se usan tanto en "La industrialización en cifras" del Radar como en las
// cifras del EICI. Respetan prefers-reduced-motion e incluyen una red de
// seguridad: si el IntersectionObserver no dispara (algunos entornos headless,
// quirks del navegador), el valor final se muestra igual.

import { useEffect, useRef, useState } from "react";

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

/** Contador que sube de 0 al objetivo con easing (easeOutCubic), una vez activo. */
export function useCountUp(
  target: number,
  active: boolean,
  reduced: boolean,
  duration = 1400
): number {
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
