"use client";

import { useState } from "react";
import styles from "./vit.module.css";

const S = styles as Record<string, string>;

type Criterio = { n: string; titulo: string; texto: string };

/**
 * Acordeón de las dimensiones de evaluación (Res. Ex. N°52). Estado FINAL sin
 * JS: la primera fila se renderiza abierta en el HTML estático y las demás
 * cerradas, de modo que se ve correcto aun si el JS no hidrata. Con JS, cada
 * cabezal (un <button> real) alterna su panel; se permiten varias filas
 * abiertas a la vez. Contenido (número, título, texto e ícono) intacto.
 */
export default function CriteriosAcordeon({
  criterios,
  iconos,
}: {
  criterios: Criterio[];
  iconos: Record<string, React.ReactNode>;
}) {
  const [abiertos, setAbiertos] = useState<Set<string>>(
    () => new Set(criterios.length ? [criterios[0].n] : []),
  );
  const todasAbiertas = abiertos.size === criterios.length;

  const toggle = (n: string) =>
    setAbiertos((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });

  const toggleTodas = () =>
    setAbiertos(todasAbiertas ? new Set() : new Set(criterios.map((c) => c.n)));

  return (
    <div className={S.acordeon}>
      <div className={S["acc-top"]}>
        <span className={S["acc-rotulo"]}>{criterios.length} dimensiones</span>
        <button
          type="button"
          className={S["acc-toggle"]}
          onClick={toggleTodas}
          aria-expanded={todasAbiertas}
        >
          {todasAbiertas ? "Cerrar todas" : "Abrir todas"}
        </button>
      </div>

      <div className={S["acc-lista"]}>
        {criterios.map((cr) => {
          const abierta = abiertos.has(cr.n);
          const panelId = `acc-panel-${cr.n}`;
          const cabId = `acc-cab-${cr.n}`;
          return (
            <div
              key={cr.n}
              className={abierta ? `${S["acc-fila"]} ${S.abierta}` : S["acc-fila"]}
            >
              <h3 className={S["acc-hd"]}>
                <button
                  type="button"
                  id={cabId}
                  className={S["acc-cab"]}
                  aria-expanded={abierta}
                  aria-controls={panelId}
                  onClick={() => toggle(cr.n)}
                >
                  <span className={S["acc-ic"]}>{iconos[cr.n]}</span>
                  <span className={S["acc-tx"]}>
                    <span className={S["acc-n"]}>{cr.n}</span>
                    <span className={S["acc-t"]}>{cr.titulo}</span>
                  </span>
                  <svg
                    className={S["acc-chevron"]}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </h3>
              <div
                id={panelId}
                className={S["acc-panel"]}
                role="region"
                aria-labelledby={cabId}
              >
                <div className={S["acc-panel-inner"]}>
                  <p>{cr.texto}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
