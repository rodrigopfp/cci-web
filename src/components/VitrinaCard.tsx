import Link from "next/link";
import type { EmpresaVitrina } from "@/data/types";
import { NIVEL_INFO, mailtoContacto } from "@/lib/vitrina";
import { formatDate } from "@/lib/format";

// Marca de respaldo cuando la empresa no cargó logo: iniciales sobre un
// gradiente de marca elegido de forma determinista por el nombre.
const GRADIENTES: [string, string][] = [
  ["#E04E00", "#B84000"],
  ["#005CAD", "#009DE6"],
  ["#3D3D3D", "#5C5C5C"],
];

function iniciales(nombre: string): string {
  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0] ?? "")
    .join("")
    .toUpperCase();
}

function gradiente(nombre: string): [string, string] {
  const suma = [...nombre].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return GRADIENTES[suma % GRADIENTES.length];
}

/** Logo de la empresa (imagen sobre fondo claro) o marca tipográfica de respaldo. */
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
  const [from, to] = gradiente(empresa.nombre);
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-xl font-display font-900 tracking-tight text-white"
      style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`, width: size, height: size, fontSize: size * 0.34 }}
    >
      {iniciales(empresa.nombre)}
    </div>
  );
}

export function NivelBadge({ nivel, className = "" }: { nivel: EmpresaVitrina["nivel"]; className?: string }) {
  const info = NIVEL_INFO[nivel];
  return <span className={`badge ${info.chip} ${className}`}>{info.label}</span>;
}

/** Tarjeta completa para la grilla "Todas las empresas". */
export function VitrinaCard({ empresa }: { empresa: EmpresaVitrina }) {
  const esPagada = empresa.nivel === "pagada";
  return (
    <div className="card-rise group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-cci-line bg-white p-5 shadow-card">
      <div className="flex items-start gap-3">
        <VitrinaLogo empresa={empresa} />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-800 leading-snug text-cci-ink">{empresa.nombre}</h3>
          <div className="mt-1.5">
            <NivelBadge nivel={empresa.nivel} />
          </div>
        </div>
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
      <span className="sweep" />
    </div>
  );
}

/**
 * Tarjeta compacta para superficies OSCURAS (bloque "Socios destacados" y la
 * franja de la portada). Logo sobre chip claro + nombre + titular + enlace.
 */
export function VitrinaMiniCard({ empresa }: { empresa: EmpresaVitrina }) {
  return (
    <Link
      href={`/vitrina/${empresa.slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.07]"
    >
      <VitrinaLogo empresa={empresa} size={52} />
      <div>
        <h3 className="font-display text-base font-800 leading-snug text-white group-hover:text-cci-orange-light">
          {empresa.nombre}
        </h3>
        {empresa.titular && <p className="mt-1 line-clamp-2 text-sm leading-snug text-white/65">{empresa.titular}</p>}
      </div>
      <span className="mt-auto inline-flex items-center gap-1 text-sm font-600 text-cci-orange-light">
        Ver ficha
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5">
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
