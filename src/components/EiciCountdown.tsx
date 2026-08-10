"use client";

// Banner de cuenta regresiva del EICI. Pieza estrella de la página /eici.
//
// Lee la fecha inyectada en el build (prop fechaInicio, ISO YYYY-MM-DD) y corre
// un contador en vivo días : horas : minutos : segundos. Si la fecha ya pasó,
// muestra un estado elegante en vez de números negativos.
//
// Minimalista a propósito: solo el contador. El título, las fechas y el lugar
// los comunica el banner del hero (y siguen existiendo como campos en Sanity).

import { useEffect, useState } from "react";

type Restante = { dias: number; horas: number; minutos: number; segundos: number };

function calcular(objetivo: number): Restante | null {
  const diff = objetivo - Date.now();
  if (diff <= 0) return null;
  const s = Math.floor(diff / 1000);
  return {
    dias: Math.floor(s / 86400),
    horas: Math.floor((s % 86400) / 3600),
    minutos: Math.floor((s % 3600) / 60),
    segundos: s % 60,
  };
}

function Tile({ valor, etiqueta }: { valor: number; etiqueta: string }) {
  return (
    <div className="flex min-w-0 flex-col items-center">
      <div className="flex w-full min-w-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-1 py-3 sm:rounded-2xl sm:py-5">
        <span className="font-display text-[1.6rem] font-900 leading-none tabular-nums text-white sm:text-5xl lg:text-6xl">
          {String(valor).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2 text-[10px] font-700 uppercase tracking-wide text-cci-blue-light sm:text-[11px]">
        {etiqueta}
      </span>
    </div>
  );
}

export function EiciCountdown({ fechaInicio }: { fechaInicio?: string }) {
  const objetivo = fechaInicio ? new Date(`${fechaInicio}T00:00:00`).getTime() : null;
  const [restante, setRestante] = useState<Restante | null>(null);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    if (!objetivo) return;
    setMontado(true);
    setRestante(calcular(objetivo));
    const id = setInterval(() => setRestante(calcular(objetivo)), 1000);
    return () => clearInterval(id);
  }, [objetivo]);

  const expirado = montado && objetivo !== null && restante === null;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-cci-graphite-dark">
      {/* filo superior con el dúo cian + naranja del EICI */}
      <div className="h-1.5 w-full bg-gradient-to-r from-cci-orange via-cci-orange-mid to-cci-blue-light" />
      <div className="px-4 py-8 sm:px-10 sm:py-10">
        {expirado ? (
          <p className="text-center font-display text-2xl font-800 text-cci-orange-light">
            ¡Nos vemos en la próxima edición!
          </p>
        ) : (
          // grid-cols-4: las 4 casillas SIEMPRE en una sola fila, también en móvil.
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            <Tile valor={restante?.dias ?? 0} etiqueta="Días" />
            <Tile valor={restante?.horas ?? 0} etiqueta="Horas" />
            <Tile valor={restante?.minutos ?? 0} etiqueta="Minutos" />
            <Tile valor={restante?.segundos ?? 0} etiqueta="Segundos" />
          </div>
        )}
      </div>
    </div>
  );
}
