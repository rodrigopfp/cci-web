import Link from "next/link";
import type { Voz } from "@/data/types";

// Gradientes de marca para el retrato de respaldo (cuando no hay foto).
// Se elige de forma determinista por el nombre, para dar variedad al "muro"
// sin salir de la paleta del manual.
const GRADIENTES: [string, string][] = [
  ["#E04E00", "#B84000"], // naranja
  ["#005CAD", "#009DE6"], // azul
  ["#3D3D3D", "#5C5C5C"], // grafito
];

function iniciales(nombre: string): string {
  const partes = nombre.trim().split(/\s+/);
  const letras = partes.slice(0, 2).map((p) => p[0] ?? "");
  return letras.join("").toUpperCase();
}

function gradiente(nombre: string): [string, string] {
  const suma = [...nombre].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return GRADIENTES[suma % GRADIENTES.length];
}

/**
 * Retrato de una voz. Si hay foto la muestra; si no, un fondo de marca con las
 * iniciales, para que la tarjeta nunca se vea rota (mismo criterio que las
 * portadas de noticias).
 */
export function VozPortrait({
  voz,
  className = "",
  rounded = "rounded-xl",
}: {
  voz: Voz;
  className?: string;
  rounded?: string;
}) {
  const [from, to] = gradiente(voz.nombre);
  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
    >
      {voz.foto ? (
        <img
          src={voz.foto}
          alt={voz.nombre}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-4xl font-900 text-white/90">{iniciales(voz.nombre)}</span>
        </div>
      )}
    </div>
  );
}

/** Tarjeta de la grilla: retrato grande + nombre, cargo, organización y frase. */
export function VozCard({ voz }: { voz: Voz }) {
  return (
    <Link
      href={`/voces/${voz.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-cci-line bg-white shadow-card transition hover:shadow-card-hover"
    >
      <VozPortrait voz={voz} rounded="rounded-none" className="aspect-[4/5]" />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-800 leading-tight text-cci-ink group-hover:text-cci-orange-dark">
          {voz.nombre}
        </h3>
        {(voz.cargo || voz.organizacion) && (
          <p className="mt-1 text-sm text-cci-slate">
            {voz.cargo}
            {voz.cargo && voz.organizacion ? " · " : ""}
            {voz.organizacion}
          </p>
        )}
        {voz.fraseDestacada && (
          <p className="mt-3 border-l-2 border-cci-orange pl-3 text-sm italic leading-relaxed text-cci-graphite">
            “{voz.fraseDestacada}”
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-600 text-cci-orange">
          Ver entrevista
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
