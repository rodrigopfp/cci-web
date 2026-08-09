import Link from "next/link";
import type { Partner, Resource } from "@/data/types";
import { formatDate } from "@/lib/format";
import { CCICubeOutline } from "./Logo";

export function SectionHeader({ kicker, title, href, hrefLabel = "Ver todo", dark = false }: { kicker?: string; title: string; href?: string; hrefLabel?: string; dark?: boolean; }) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        {kicker && <div className="mb-1 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange"><span className="h-[2px] w-6 bg-cci-orange" />{kicker}</div>}
        <h2 className={`font-display text-2xl font-800 md:text-3xl ${dark ? "text-white" : "text-cci-ink"}`}>{title}</h2>
      </div>
      {href && <Link href={href} className={`hidden whitespace-nowrap text-sm font-semibold sm:inline-flex sm:items-center sm:gap-1 ${dark ? "text-white/80 hover:text-cci-orange-light" : "text-cci-graphite hover:text-cci-orange-dark"}`}>{hrefLabel}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>}
    </div>
  );
}

/**
 * Marca tipográfica de empresa. Es un sustituto generado, NO el logotipo real:
 * los logotipos oficiales requieren el archivo y la autorización de cada empresa.
 */
export function PartnerLogo({ partner, size = 56 }: { partner: Partner; size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-xl font-display font-900 tracking-tight text-white"
      style={{ background: partner.logoColor, width: size, height: size, fontSize: size * 0.36 }}
    >
      {partner.logoInitials}
    </div>
  );
}

export function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="card-rise group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-cci-line bg-white p-6 shadow-card">
      <div className="flex items-start gap-4">
        <PartnerLogo partner={partner} />
        <div className="min-w-0">
          <h3 className="font-display text-base font-800 leading-snug text-cci-ink">{partner.name}</h3>
          <span className="badge mt-1.5 bg-cci-paper text-cci-slate">{partner.category}</span>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-cci-slate">{partner.description}</p>
      <Link href="/radar" className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-cci-orange hover:text-cci-orange-dark">Ver en el Radar<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
      <span className="sweep" />
    </div>
  );
}

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="card-rise group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-cci-line bg-white p-6 shadow-card">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cci-blue-soft text-cci-blue"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinejoin="round" /><path d="M14 2v6h6" strokeLinejoin="round" /></svg></div>
        <span className="annot text-cci-slate"><span className="annot-bar bg-cci-orange" />{resource.type}</span>
      </div>
      <div><h3 className="font-display text-lg font-700 leading-snug text-cci-ink">{resource.title}</h3><p className="mt-2 text-sm leading-relaxed text-cci-slate">{resource.description}</p></div>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-cci-line pt-4">
        <span className="font-mono text-[11px] text-cci-slate-light">{resource.format} · {resource.weight}</span>
        <button className="annot inline-flex items-center gap-1.5 text-cci-orange hover:text-cci-orange-dark">Descargar<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v12M7 11l5 5 5-5M5 21h14" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
      </div>
      <span className="sweep" />
    </div>
  );
}

export function MediaKitCard({ title, description, price, icon }: { title: string; description: string; price: string; icon: React.ReactNode; }) {
  return (
    <div className="card-rise group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-cci-line bg-white p-6 shadow-card">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cci-orange-soft text-cci-orange">{icon}</div>
      <h3 className="font-display text-lg font-700 text-cci-ink">{title}</h3>
      <p className="text-sm leading-relaxed text-cci-slate">{description}</p>
      <div className="mt-auto border-t border-cci-line pt-4"><span className="text-xs uppercase tracking-wide text-cci-slate-light">Referencia</span><div className="font-display text-xl font-800 text-cci-graphite">{price}</div></div>
      <span className="sweep" />
    </div>
  );
}

export function EditorialPolicyBlock() {
  const rules = [
    { t: "Independencia editorial", d: "El contenido editorial del CCI se produce con criterio periodístico y no está condicionado por relaciones comerciales." },
    { t: "Rotulado de contenido", d: "Toda noticia de socio y todo publirreportaje se identifica de forma visible y no se confunde con la cobertura editorial." },
    { t: "Trazabilidad del dato", d: "Cada cifra publicada indica su fuente, su tipo y su fecha. Distinguimos dato oficial, internacional, académico y estimación propia." },
    { t: "Datos, no promesas", d: "No publicamos estadísticas sin fuente ni presentamos como propio un dato que no hemos levantado. Lo que está en desarrollo se marca como tal." },
  ];
  return (
    <div className="rounded-2xl border border-cci-line bg-cci-paper p-7 md:p-9">
      <h3 className="font-display text-xl font-800 text-cci-graphite">Nuestros principios</h3>
      <p className="mt-1 text-sm text-cci-slate">La credibilidad es nuestro principal activo. Estos principios protegen al lector, al socio y al dato.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {rules.map((r) => (
          <div key={r.t} className="flex gap-3">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cci-orange text-white"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
            <div><div className="font-700 text-cci-ink">{r.t}</div><p className="text-sm text-cci-slate">{r.d}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Banda de llamados a la acción.
 *
 * Se resuelve como una sola superficie de grafito dividida por filos verticales
 * —lectura de panel de control, no de tres tarjetas de color— con el hexágono
 * del isotipo como marca de agua sangrando por la esquina. Cada columna lleva
 * su anotación monoespaciada y un enlace cuyo subrayado recorre todo el ancho
 * al pasar el cursor.
 */
export function CTASection() {
  const ctas = [
    {
      annot: "Para empresas",
      title: "Envía tu noticia",
      desc: "Hitos, lanzamientos y casos de tu empresa, con revisión editorial previa.",
      label: "Enviar noticia",
      href: "/publica",
    },
    {
      annot: "Para el observatorio",
      title: "Aporta un dato",
      desc: "Proyectos y métricas verificables que ayuden a cerrar los vacíos del Radar.",
      label: "Cómo aportar",
      href: "/publica",
    },
    {
      annot: "Para el ecosistema",
      title: "Hazte socio",
      desc: "Suma visibilidad editorial y participa en los grupos técnicos del Consejo.",
      label: "Quiero asociarme",
      href: "#",
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-cci-graphite-dark">
      {/* marca de agua: hexágono del isotipo sangrando por la esquina */}
      <div className="pointer-events-none absolute -right-20 -top-24 hidden opacity-[0.07] md:block">
        <CCICubeOutline size={360} color="#FFFFFF" strokeWidth={1.5} />
      </div>

      <div className="relative grid md:grid-cols-3">
        {ctas.map((c, i) => (
          <Link
            key={c.title}
            href={c.href}
            className={`group flex flex-col gap-3 p-8 transition-colors hover:bg-white/[0.04] md:p-9 ${
              i > 0 ? "border-t border-white/10 md:border-l md:border-t-0" : ""
            }`}
          >
            <span className="annot text-cci-orange-light">
              <span className="annot-bar bg-cci-orange" />
              {c.annot}
            </span>
            <h3 className="font-display text-xl font-800 leading-tight text-white">{c.title}</h3>
            <p className="text-sm leading-relaxed text-white/65">{c.desc}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-700 text-white">
              {c.label}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {/* filo que recorre el ancho al pasar el cursor */}
            <span className="mt-1 block h-[2px] w-0 bg-cci-orange transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </div>
    </div>
  );
}
