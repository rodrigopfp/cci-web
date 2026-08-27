"use client";

// CCI Data — orquestador delgado de la scroll-story.
//
// El orden, los ids/anclas y las pills salen del registro central
// (src/components/data/capitulos/registro.tsx). Este archivo solo cablea el
// scrollspy (IntersectionObserver) y renderiza cada capítulo pasándole sus
// props. La lógica y el JSX de cada capítulo viven en su propio archivo (P0-1).

import { Fragment, useEffect, useRef, useState } from "react";
import type { Study } from "@/data/types";
import { usePrefersReducedMotion } from "@/lib/counters";
import { CAPITULOS } from "@/components/data/capitulos/registro";
import { BandaIlustracion } from "@/components/data/BandaIlustracion";

// Bandas de ilustración (respiros) que van FUERA de los capítulos, como
// separador ANTES del capítulo indicado por su id. banda-integracion antes de
// "Por qué ocurre" (cap3); banda-ciclo antes de "Qué cambia" (cap5), es decir
// entre "Industrializar no es prefabricar" (cap4) y "Qué cambia".
const BANDAS: Record<string, { src: string; alt: string }> = {
  cap3: {
    src: "/ilustraciones/data/banda-integracion.webp",
    alt: "Ilustración: componentes dispersos que se ordenan progresivamente hasta formar un conjunto integrado.",
  },
  cap5: {
    src: "/ilustraciones/data/banda-ciclo.webp",
    alt: "Ilustración: un proceso disperso que pasa por un ciclo de mejora continua y termina en un sistema ordenado.",
  },
};

// ---- Navegación por capítulos (pills sticky + scrollspy) ---------------
function ChapterNav({ active }: { active: string }) {
  return (
    <nav className="sticky top-[105px] z-30 border-b border-cci-line bg-white/95 backdrop-blur">
      <div className="container-cci">
        <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide py-3">
          {CAPITULOS.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                active === c.id ? "bg-cci-graphite text-white" : "bg-cci-paper text-cci-slate hover:bg-cci-line"
              }`}
            >
              {c.labelPill}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ---- Componente principal ----------------------------------------------
export function DataStory({ studiesInternacionales }: { studiesInternacionales: Study[] }) {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(CAPITULOS[0].id);
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = CAPITULOS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (sections.length === 0 || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={storyRef}>
      <ChapterNav active={active} />
      {CAPITULOS.map(({ id, Componente }) => (
        <Fragment key={id}>
          {BANDAS[id] && <BandaIlustracion src={BANDAS[id].src} alt={BANDAS[id].alt} />}
          <Componente reduced={reduced} studiesInternacionales={studiesInternacionales} />
        </Fragment>
      ))}
    </div>
  );
}
