"use client";

// Banner de cuenta regresiva del EICI. Pieza estrella de la página /eici.
//
// Lee la fecha inyectada en el build (prop fechaInicio, ISO YYYY-MM-DD) y corre
// un contador en vivo días : horas : minutos : segundos. Si la fecha ya pasó,
// muestra un estado elegante en vez de números negativos.

import { useEffect, useState } from "react";

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/** "8, 9 y 10 de septiembre de 2027" a partir de las fechas ISO. */
function rangoFechas(inicio?: string, fin?: string): string {
  if (!inicio) return "Fecha por confirmar";
  const [ay, am, ad] = inicio.split("-").map(Number);
  const mes = MESES[(am ?? 1) - 1] ?? "";
  let dias = `${ad}`;
  if (fin) {
    const [, fm, fd] = fin.split("-").map(Number);
    if (fm === am && fd && fd > ad) {
      const nums: number[] = [];
      for (let d = ad; d <= fd; d++) nums.push(d);
      const ultimo = nums.pop();
      dias = `${nums.join(", ")} y ${ultimo}`;
    }
  }
  return `${dias} de ${mes} de ${ay}`;
}

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
    <div className="flex flex-col items-center">
      <div className="flex min-w-[68px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3 sm:min-w-[92px] sm:px-5 sm:py-4">
        <span className="font-display text-4xl font-900 tabular-nums text-white sm:text-6xl">
          {String(valor).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2 text-[11px] font-700 uppercase tracking-wide text-cci-blue-light">
        {etiqueta}
      </span>
    </div>
  );
}

export function EiciCountdown({
  titulo,
  fechaInicio,
  fechaFin,
  lugar,
}: {
  titulo: string;
  fechaInicio?: string;
  fechaFin?: string;
  lugar?: string;
}) {
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
      <div className="px-6 py-10 sm:px-10 sm:py-12">
        <div className="flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-blue-light">
          <span className="h-[2px] w-6 bg-cci-blue-light" />
          Próxima edición
        </div>
        <h2 className="mt-3 font-display text-3xl font-900 text-white md:text-4xl">{titulo}</h2>
        <p className="mt-2 text-white/70">
          {rangoFechas(fechaInicio, fechaFin)}
          <span className="mx-2 text-white/30">·</span>
          Lugar: {lugar && lugar.trim() ? lugar : "Por confirmar"}
        </p>

        <div className="mt-8">
          {expirado ? (
            <p className="font-display text-2xl font-800 text-cci-orange-light">
              ¡Nos vemos en la próxima edición!
            </p>
          ) : (
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Tile valor={restante?.dias ?? 0} etiqueta="Días" />
              <Tile valor={restante?.horas ?? 0} etiqueta="Horas" />
              <Tile valor={restante?.minutos ?? 0} etiqueta="Minutos" />
              <Tile valor={restante?.segundos ?? 0} etiqueta="Segundos" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
