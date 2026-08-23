import Link from "next/link";
import type { EmpresaVitrina, NivelVitrina } from "@/data/types";
import { ordenNivel } from "@/lib/vitrina";

// Muro institucional de socios del CCI, por categoría. SIN elementos comerciales
// (sin botones de contacto ni precios): es pertenencia, no directorio de venta.
//
// Datos reales del CMS (documentos empresaVitrina). Se excluye el nivel "pagada"
// (publicación comercial, no membresía). Cada marca enlaza a su ficha de Vitrina
// cuando tiene slug; si no, se muestra sin enlace. Si hay logo autorizado se usa;
// si no, monograma + nombre (como la maqueta).

const NIVELES_MURO: { nivel: NivelVitrina; label: string }[] = [
  { nivel: "oro", label: "Socios Oro" },
  { nivel: "plata", label: "Socios Plata" },
  { nivel: "bronce", label: "Socios Bronce" },
  { nivel: "academia", label: "Academia" },
  { nivel: "profesional", label: "Socios Profesionales" },
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

function BrandTile({ empresa, featured = false }: { empresa: EmpresaVitrina; featured?: boolean }) {
  const monoSize = featured ? "h-12 w-12 text-base" : "h-10 w-10 text-sm";
  const content = (
    <div
      className={`group flex h-full items-center gap-3 rounded-xl border bg-white transition ${
        featured
          ? "border-[#E7D9B0] px-5 py-4 hover:border-[#C9B473] hover:shadow-card"
          : "border-cci-line px-4 py-3 hover:border-cci-slate-light hover:shadow-card"
      }`}
    >
      {empresa.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={empresa.logo}
          alt={empresa.nombre}
          loading="lazy"
          className={`${monoSize} shrink-0 rounded-lg border border-cci-line object-contain p-1`}
        />
      ) : (
        <span
          className={`flex ${monoSize} shrink-0 items-center justify-center rounded-lg font-display font-900 tracking-tight ${
            featured ? "bg-[#F3EAD1] text-[#8A6A20]" : "bg-cci-paper text-cci-slate"
          }`}
        >
          {iniciales(empresa.nombre)}
        </span>
      )}
      <span
        className={`line-clamp-2 font-display font-800 uppercase leading-tight tracking-[0.05em] text-cci-graphite ${
          featured ? "text-sm" : "text-[13px]"
        }`}
      >
        {empresa.nombre}
      </span>
    </div>
  );

  return empresa.slug ? (
    <Link href={`/vitrina/${empresa.slug}`} title={`Ver la ficha de ${empresa.nombre} en la Vitrina`}>
      {content}
    </Link>
  ) : (
    content
  );
}

export function MuroSocios({ empresas, compact = false }: { empresas: EmpresaVitrina[]; compact?: boolean }) {
  // Fuera del muro institucional: publicaciones pagadas (comerciales).
  const visibles = empresas.filter((e) => e.nivel !== "pagada");

  if (visibles.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-cci-line bg-cci-paper px-6 py-10 text-center text-sm text-cci-slate">
        El muro de socios se está actualizando.
      </p>
    );
  }

  // Muro compacto (p. ej. /hazte-socio): grilla plana priorizando los niveles de
  // mayor visibilidad. Sin encabezados de nivel.
  if (compact) {
    const muestra = [...visibles]
      .sort((a, b) => ordenNivel(a.nivel) - ordenNivel(b.nivel) || a.nombre.localeCompare(b.nombre))
      .slice(0, 18);
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {muestra.map((e) => (
          <BrandTile key={e.id} empresa={e} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {NIVELES_MURO.map(({ nivel, label }) => {
        const grupo = visibles.filter((e) => e.nivel === nivel);
        if (grupo.length === 0) return null;
        const featured = nivel === "oro";
        return (
          <div key={nivel}>
            <div className="mb-4 flex items-baseline gap-3 border-b border-cci-line pb-2">
              <h3 className="font-display text-lg font-800 text-cci-ink">{label}</h3>
              <span className="font-mono text-xs tabular-nums text-cci-slate-light">
                {grupo.length}
              </span>
            </div>
            <div
              className={`grid gap-3 ${
                featured
                  ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                  : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              }`}
            >
              {grupo.map((e) => (
                <BrandTile key={e.id} empresa={e} featured={featured} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
