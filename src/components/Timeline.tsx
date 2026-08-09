import { hitos, tipoLabel, type Hito } from "@/data/hitos";

/**
 * LÍNEA DE TIEMPO — "vía de producción"
 *
 * En vez de una línea de tiempo genérica, el eje se trata como una línea de
 * montaje: estaciones hexagonales (el hexágono del isotipo CCI) enhebradas por
 * un riel. El riel va sólido mientras el hito está ejecutado y pasa a
 * discontinuo después del marcador HOY, de modo que la forma misma distingue
 * lo que ya ocurrió de lo que está comprometido.
 *
 * En escritorio corre en horizontal; bajo lg se reordena en vertical.
 */

function Estacion({ ejecutado }: { ejecutado: boolean }) {
  // hexágono de punta plana, misma geometría que el isotipo
  const pts = "50,3 91,26.5 91,73.5 50,97 9,73.5 9,26.5";
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
      <polygon
        points={pts}
        fill={ejecutado ? "#E04E00" : "none"}
        stroke={ejecutado ? "#E04E00" : "#9C9C9C"}
        strokeWidth={ejecutado ? 0 : 7}
      />
      {ejecutado && <polygon points="50,34 68,44.5 68,65.5 50,76 32,65.5 32,44.5" fill="#fff" opacity="0.9" />}
    </svg>
  );
}

function HitoCard({ hito, index }: { hito: Hito; index: number }) {
  const ejecutado = hito.estado === "ejecutado";
  return (
    <li className="relative flex shrink-0 flex-col lg:w-[280px]">
      {/* fila del riel */}
      <div className="relative flex items-center lg:block">
        {/* riel horizontal (lg+) */}
        <span
          className={`absolute left-0 right-0 top-1/2 hidden h-[2px] -translate-y-1/2 lg:block ${
            ejecutado ? "bg-cci-orange" : ""
          }`}
          style={
            ejecutado
              ? undefined
              : {
                  backgroundImage:
                    "repeating-linear-gradient(90deg,#9C9C9C 0 6px,transparent 6px 12px)",
                }
          }
        />
        {/* riel vertical (móvil) */}
        <span
          className={`absolute left-[13px] top-0 h-full w-[2px] lg:hidden ${
            ejecutado ? "bg-cci-orange" : ""
          }`}
          style={
            ejecutado
              ? undefined
              : {
                  backgroundImage:
                    "repeating-linear-gradient(180deg,#9C9C9C 0 6px,transparent 6px 12px)",
                }
          }
        />
        <span className="relative z-10 block h-7 w-7 bg-white lg:h-8 lg:w-8">
          <Estacion ejecutado={ejecutado} />
        </span>
      </div>

      {/* contenido */}
      <div className="pl-10 lg:pl-0 lg:pr-8 lg:pt-6">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm font-600 tabular-nums text-cci-ink">
            {hito.periodo}
          </span>
          <span className="annot text-cci-slate-light">{tipoLabel[hito.tipo]}</span>
        </div>
        <h3 className="mt-2 font-display text-base font-800 leading-snug text-cci-ink">
          {hito.titulo}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-cci-slate">{hito.detalle}</p>
        {hito.fuente && (
          <a
            href={hito.fuente}
            target="_blank"
            rel="noopener noreferrer"
            className="annot mt-3 text-cci-orange hover:text-cci-orange-dark"
          >
            Fuente
          </a>
        )}
        {!ejecutado && (
          <span className="annot mt-3 block text-cci-slate-light">Programado</span>
        )}
      </div>
    </li>
  );
}

export function Timeline() {
  // índice donde termina lo ejecutado, para insertar el marcador HOY
  const corte = hitos.findIndex((h) => h.estado === "programado");

  return (
    <div className="relative">
      {/* degradado de borde: señala que la secuencia continúa */}
      <div className="pointer-events-none absolute right-0 top-0 z-20 hidden h-full w-24 bg-gradient-to-l from-white to-transparent lg:block" />
      {/* scroll horizontal en escritorio; apilado en móvil */}
      <ol className="flex flex-col gap-10 lg:flex-row lg:gap-0 lg:overflow-x-auto lg:pb-4">
        {hitos.map((h, i) => (
          <>
            {i === corte && (
              <li
                key="hoy"
                className="relative flex shrink-0 items-center lg:w-[92px] lg:flex-col lg:items-start"
              >
                <div className="relative flex h-7 items-center lg:h-8 lg:w-full">
                  <span className="absolute left-0 right-0 top-1/2 hidden h-[2px] -translate-y-1/2 bg-cci-line lg:block" />
                  <span className="relative z-10 ml-[3px] block h-7 w-[3px] bg-cci-graphite lg:ml-0 lg:h-8" />
                </div>
                <div className="pl-10 lg:pl-0 lg:pt-6">
                  <span className="font-mono text-sm font-600 uppercase tracking-[0.14em] text-cci-graphite">
                    Hoy
                  </span>
                </div>
              </li>
            )}
            <HitoCard key={h.id} hito={h} index={i} />
          </>
        ))}
      </ol>
      <p className="annot mt-6 text-cci-slate-light">
        Riel continuo = ejecutado · Riel discontinuo = programado
      </p>
    </div>
  );
}
