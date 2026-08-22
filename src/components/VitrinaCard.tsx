import Link from "next/link";
import type { EmpresaVitrina } from "@/data/types";
import { NIVEL_INFO, mailtoContacto } from "@/lib/vitrina";
import { formatDate } from "@/lib/format";

function iniciales(nombre: string): string {
  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0] ?? "")
    .join("")
    .toUpperCase();
}

/**
 * Banda de "marca" superior de la tarjeta (~96px). Muestra el logo si existe;
 * si no, el nombre de la empresa como marca tipográfica (mayúsculas, gris medio,
 * bold con leve tracking) sobre un degradado gris muy claro. Sin colores
 * aleatorios por empresa. `dark` la adapta al bloque de fondo oscuro.
 */
export function MarcaBanda({ empresa, dark = false }: { empresa: EmpresaVitrina; dark?: boolean }) {
  return (
    <div
      className={`flex h-24 shrink-0 items-center justify-center px-5 ${
        dark ? "bg-gradient-to-br from-white/[0.08] to-white/[0.02]" : "bg-gradient-to-br from-cci-paper to-[#EBE9E6]"
      }`}
    >
      {empresa.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={empresa.logo} alt={empresa.nombre} loading="lazy" className="max-h-16 w-full object-contain" />
      ) : (
        <span
          className={`line-clamp-2 text-center font-display text-sm font-800 uppercase leading-tight tracking-[0.08em] sm:text-base ${
            dark ? "text-white/70" : "text-cci-slate"
          }`}
        >
          {empresa.nombre}
        </span>
      )}
    </div>
  );
}

/** Marca cuadrada neutra (para la ficha): logo o iniciales sobre gris, sin color aleatorio. */
export function VitrinaLogo({ empresa, size = 56 }: { empresa: EmpresaVitrina; size?: number }) {
  if (empresa.logo) {
    return (
      <div
        className="flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-cci-line bg-white"
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={empresa.logo} alt={empresa.nombre} loading="lazy" className="h-full w-full object-contain p-2" />
      </div>
    );
  }
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-xl border border-cci-line bg-cci-paper font-display font-900 tracking-tight text-cci-slate"
      style={{ width: size, height: size, fontSize: size * 0.3 }}
    >
      {iniciales(empresa.nombre)}
    </div>
  );
}

/** Insignia de nivel: chip discreto de esquinas suaves, mayúsculas 10px. */
export function NivelBadge({ nivel, className = "" }: { nivel: EmpresaVitrina["nivel"]; className?: string }) {
  const info = NIVEL_INFO[nivel];
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-700 uppercase leading-none tracking-wide ${info.chip} ${className}`}
    >
      {info.label}
    </span>
  );
}

/** Tarjeta completa para la grilla "Todas las empresas". */
export function VitrinaCard({ empresa }: { empresa: EmpresaVitrina }) {
  const esPagada = empresa.nivel === "pagada";
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-cci-line bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      <MarcaBanda empresa={empresa} />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <NivelBadge nivel={empresa.nivel} />
        </div>
        {empresa.titular && <p className="text-sm font-600 leading-snug text-cci-graphite">{empresa.titular}</p>}
        {empresa.descripcion && (
          <p className="line-clamp-3 text-sm leading-relaxed text-cci-slate">{empresa.descripcion}</p>
        )}

        {empresa.zonas.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {empresa.zonas.map((z) => (
              <span key={z} className="rounded-full bg-cci-paper px-2.5 py-0.5 text-[11px] font-600 text-cci-slate">
                {z}
              </span>
            ))}
          </div>
        )}

        {esPagada && empresa.vigenteHasta && (
          <p className="text-[11px] font-600 text-cci-slate-light">
            Publicación vigente hasta el {formatDate(empresa.vigenteHasta)}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-cci-line pt-4">
          {empresa.emailContacto ? (
            <a
              href={mailtoContacto(empresa.emailContacto, empresa.nombre)}
              className="inline-flex items-center gap-1.5 rounded-full bg-cci-orange px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-cci-orange-dark"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Contactar
            </a>
          ) : (
            <span className="text-xs italic text-cci-slate-light">Contacto por confirmar</span>
          )}
          <Link
            href={`/vitrina/${empresa.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-cci-line px-3.5 py-2 text-xs font-semibold text-cci-graphite transition hover:border-cci-graphite hover:bg-cci-paper"
          >
            Ver ficha
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Tarjeta compacta para el bloque "Socios destacados" (fondo oscuro).
 * Banda de marca adaptada al fondo + titular + enlace a la ficha.
 */
export function VitrinaMiniCard({ empresa }: { empresa: EmpresaVitrina }) {
  return (
    <Link
      href={`/vitrina/${empresa.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition hover:bg-white/[0.07]"
    >
      <MarcaBanda empresa={empresa} dark />
      <div className="flex flex-1 flex-col gap-2 p-5">
        {empresa.titular && <p className="line-clamp-2 text-sm leading-snug text-white/65">{empresa.titular}</p>}
        <span className="mt-auto inline-flex items-center gap-1 text-sm font-600 text-cci-orange-light">
          Ver ficha
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
