import Link from "next/link";
import { notFound } from "next/navigation";
import { getEmpresaVitrinaBySlug, getEmpresaVitrinaSlugs } from "@/sanity/fetch";
import { VitrinaLogo, NivelBadge } from "@/components/VitrinaCard";
import { mailtoContacto } from "@/lib/vitrina";
import { formatDate } from "@/lib/format";
import {
  ETIQUETAS_ACTOR,
  ETIQUETAS_SOLUCION,
  ETIQUETAS_MATERIAL,
  ETIQUETAS_CAPACIDAD,
  ETIQUETAS_REGION,
  ETIQUETAS_COBERTURA,
  ETIQUETAS_RELACION,
  ETIQUETAS_VALIDACION,
  etiqueta,
} from "@/lib/datos/taxonomia-vitrina";

export async function generateStaticParams() {
  const slugs = await getEmpresaVitrinaSlugs();
  if (slugs.length === 0) return [{ slug: "_sin-empresas" }];
  return slugs.map((slug) => ({ slug }));
}

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
/** "2026-08-24" → "agosto 2026". */
function mesAno(iso: string): string {
  const [y, m] = iso.slice(0, 7).split("-");
  return `${MESES[Number(m) - 1] ?? ""} ${y}`.trim();
}

// Grupo de "pastillas" para una dimensión de la taxonomía. No renderiza nada si
// la lista viene vacía (regla dura: campos vacíos no se muestran).
function Grupo({
  titulo,
  valores,
  mapa,
  tono = "orange",
}: {
  titulo: string;
  valores: string[];
  mapa: Record<string, string>;
  tono?: "orange" | "blue" | "slate";
}) {
  if (!valores || valores.length === 0) return null;
  const cls =
    tono === "blue"
      ? "bg-cci-blue-soft text-cci-blue"
      : tono === "slate"
      ? "bg-cci-paper text-cci-slate"
      : "bg-cci-orange-soft text-cci-orange-dark";
  return (
    <div>
      <h2 className="mb-3 text-sm font-700 uppercase tracking-wide text-cci-slate">{titulo}</h2>
      <div className="flex flex-wrap gap-2">
        {valores.map((v) => (
          <span key={v} className={`rounded-full px-3 py-1 text-sm font-600 ${cls}`}>
            {etiqueta(mapa, v)}
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function EmpresaVitrinaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const empresa = await getEmpresaVitrinaBySlug(slug);
  if (!empresa) notFound();

  const fichaCompleta = empresa.nivel !== "bronce";
  const esPagada = empresa.nivel === "pagada";

  // Un perfil está "en actualización" mientras la organización no lo valide.
  const enActualizacion =
    !empresa.validationStatus ||
    empresa.validationStatus === "en_actualizacion" ||
    empresa.validationStatus === "pendiente";

  // Entrada única de validación: la propia organización confirma o corrige su
  // perfil (el mailto directo desapareció de la ficha; vive como respaldo dentro
  // de /vitrina/validar).
  const validarHref = `/vitrina/validar?empresa=${encodeURIComponent(empresa.slug)}`;

  // Insignia "Validado por la organización · [mes año]" (solo con estado + fecha).
  const validadoPorOrg =
    empresa.validationStatus === "validado_por_organizacion" && Boolean(empresa.fechaValidacion);
  const mesAnoValidacion = empresa.fechaValidacion ? mesAno(empresa.fechaValidacion) : "";

  const cobertura =
    empresa.coverageType ? etiqueta(ETIQUETAS_COBERTURA, empresa.coverageType) : undefined;

  return (
    <article className="container-cci max-w-4xl py-10">
      <Link
        href="/vitrina"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-cci-slate hover:text-cci-orange-dark"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Volver a la Vitrina
      </Link>

      {/* CABECERA */}
      <header className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <VitrinaLogo empresa={empresa} size={88} />
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <NivelBadge nivel={empresa.nivel} />
            {empresa.cciRelationship
              .filter((r) => !r.startsWith("socio_") && r !== "profesional" && r !== "academia")
              .map((r) => (
                <span key={r} className="rounded-md bg-cci-paper px-2 py-0.5 text-[10px] font-700 uppercase tracking-wide text-cci-slate">
                  {etiqueta(ETIQUETAS_RELACION, r)}
                </span>
              ))}
            {/* Insignia neutra (estilo del indicador de evidencia): NO es un
                sello del CCI, solo indica que la organización confirmó sus datos. */}
            {validadoPorOrg && (
              <span
                className="inline-flex w-fit items-center rounded-md border border-cci-line bg-cci-paper px-2 py-0.5 text-[10px] font-700 uppercase tracking-wide text-cci-slate"
                title="Información confirmada por la propia organización. No constituye una certificación del CCI."
              >
                Validado por la organización · {mesAnoValidacion}
              </span>
            )}
          </div>
          <h1 className="font-display text-3xl font-900 leading-tight text-cci-ink md:text-4xl">{empresa.nombre}</h1>
          {empresa.titular && <p className="mt-2 text-lg text-cci-slate">{empresa.titular}</p>}
          {empresa.anioDesde && <p className="mt-1 text-sm text-cci-slate-light">Opera desde {empresa.anioDesde}</p>}
        </div>
      </header>

      {/* Aviso de publicación pagada */}
      {esPagada && (
        <div className="mt-6 rounded-lg border border-dashed border-cci-orange bg-cci-orange-soft px-5 py-4 text-sm text-cci-graphite">
          <span className="font-700 text-cci-orange-dark">Publicación pagada.</span> Esta es una empresa no socia. El
          CCI no respalda sus afirmaciones técnicas o comerciales.
          {empresa.vigenteHasta && <> Vigente hasta el {formatDate(empresa.vigenteHasta)}.</>}
        </div>
      )}

      {/* DESCRIPCIÓN */}
      {empresa.descripcion && (
        <section className="mt-8 border-t border-cci-line pt-8">
          <p className="whitespace-pre-line text-[17px] leading-[1.75] text-cci-ink/90">{empresa.descripcion}</p>
        </section>
      )}

      {/* CLASIFICACIÓN (taxonomía) */}
      {(empresa.actorTypes.length > 0 ||
        empresa.solutions.length > 0 ||
        empresa.materials.length > 0 ||
        empresa.capabilities.length > 0 ||
        empresa.regions.length > 0 ||
        cobertura) && (
        <section className="mt-8 grid gap-6 border-t border-cci-line pt-8 sm:grid-cols-2">
          <Grupo titulo="Tipo de actor" valores={empresa.actorTypes} mapa={ETIQUETAS_ACTOR} />
          <Grupo titulo="Soluciones" valores={empresa.solutions} mapa={ETIQUETAS_SOLUCION} />
          <Grupo titulo="Materiales" valores={empresa.materials} mapa={ETIQUETAS_MATERIAL} tono="slate" />
          <Grupo titulo="Capacidades" valores={empresa.capabilities} mapa={ETIQUETAS_CAPACIDAD} tono="slate" />
          {(empresa.regions.length > 0 || cobertura) && (
            <div>
              <h2 className="mb-3 text-sm font-700 uppercase tracking-wide text-cci-slate">Cobertura</h2>
              <div className="flex flex-wrap gap-2">
                {cobertura && (
                  <span className="rounded-full bg-cci-graphite px-3 py-1 text-sm font-600 text-white">{cobertura}</span>
                )}
                {empresa.regions.map((r) => (
                  <span key={r} className="rounded-full bg-cci-blue-soft px-3 py-1 text-sm font-600 text-cci-blue">
                    {etiqueta(ETIQUETAS_REGION, r)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* DIRECCIÓN / PLANTAS */}
      {empresa.direccionPlantas.length > 0 && (
        <section className="mt-8 border-t border-cci-line pt-8">
          <h2 className="mb-3 text-sm font-700 uppercase tracking-wide text-cci-slate">Dirección y plantas</h2>
          <ul className="space-y-1 text-cci-ink/90">
            {empresa.direccionPlantas.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </section>
      )}

      {/* GALERÍA — no en fichas bronce */}
      {fichaCompleta && empresa.galeria.length > 0 && (
        <section className="mt-10 border-t border-cci-line pt-8">
          <h2 className="mb-4 font-display text-xl font-800 text-cci-ink">Galería</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {empresa.galeria.map((url, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={url}
                alt={`${empresa.nombre} — imagen ${i + 1}`}
                loading="lazy"
                className="aspect-[3/2] w-full rounded-xl border border-cci-line object-cover"
              />
            ))}
          </div>
        </section>
      )}

      {/* PROYECTOS DESTACADOS — no en fichas bronce */}
      {fichaCompleta && empresa.proyectosDestacados.length > 0 && (
        <section className="mt-10 border-t border-cci-line pt-8">
          <h2 className="mb-4 font-display text-xl font-800 text-cci-ink">Proyectos destacados</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {empresa.proyectosDestacados.map((p, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-cci-line bg-white shadow-card">
                {p.imagen && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.imagen} alt={p.titulo} loading="lazy" className="aspect-[3/2] w-full object-cover" />
                )}
                <div className="p-5">
                  <h3 className="font-display text-base font-800 text-cci-ink">{p.titulo}</h3>
                  {p.descripcion && <p className="mt-2 text-sm leading-relaxed text-cci-slate">{p.descripcion}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CERTIFICACIONES */}
      {empresa.certificaciones.length > 0 && (
        <section className="mt-8 border-t border-cci-line pt-8">
          <h2 className="mb-3 text-sm font-700 uppercase tracking-wide text-cci-slate">Certificaciones</h2>
          <div className="flex flex-wrap gap-2">
            {empresa.certificaciones.map((c) => (
              <span key={c} className="rounded-full bg-cci-paper px-3 py-1 text-sm font-600 text-cci-graphite">
                {c}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* CONTACTO / VALIDACIÓN */}
      <section className="mt-10 border-t border-cci-line pt-8">
        {empresa.emailContacto || empresa.sitioWeb || empresa.telefono ? (
          <div className="flex flex-wrap items-center gap-3">
            {empresa.emailContacto && (
              <a href={mailtoContacto(empresa.emailContacto, empresa.nombre)} className="btn-primary">
                Contactar
              </a>
            )}
            {empresa.sitioWeb && (
              <a
                href={empresa.sitioWeb}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cci-line px-5 py-2.5 text-sm font-semibold text-cci-graphite transition hover:border-cci-graphite hover:bg-cci-paper"
              >
                Sitio web
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17 17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
            {empresa.telefono && <span className="text-sm text-cci-slate">Tel: {empresa.telefono}</span>}
          </div>
        ) : (
          <div className="rounded-xl border border-cci-line bg-cci-paper px-5 py-5">
            <p className="font-600 text-cci-ink">Perfil en actualización</p>
            <p className="mt-1 text-sm text-cci-slate">
              Estamos completando y validando la información de esta organización con su equipo.
            </p>
          </div>
        )}

        {/* CTA único de validación: la organización confirma o corrige su perfil. */}
        <div className="mt-4">
          <Link
            href={validarHref}
            data-cta="valida-perfil"
            data-ubicacion="ficha-vitrina"
            className="inline-flex items-center gap-1.5 rounded-full border border-cci-line px-5 py-2.5 text-sm font-semibold text-cci-graphite transition hover:border-cci-graphite hover:bg-cci-paper"
          >
            ¿Eres esta organización? Validar o corregir este perfil
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Nota discreta de la insignia (solo si está validado por la organización). */}
        {validadoPorOrg && (
          <p className="mt-4 text-xs leading-snug text-cci-slate-light">
            Información confirmada por la propia organización. No constituye una certificación del CCI.
          </p>
        )}

        {/* Estado de validación + fecha (discreto, no alarmista) */}
        <p className="mt-5 text-xs text-cci-slate-light">
          {empresa.validationStatus && (
            <>Estado del perfil: {etiqueta(ETIQUETAS_VALIDACION, empresa.validationStatus)}.</>
          )}
          {empresa.lastVerifiedAt && <> Última actualización: {formatDate(empresa.lastVerifiedAt.slice(0, 10))}.</>}
          {enActualizacion && !empresa.emailContacto && !empresa.sitioWeb && (
            <> La información se está completando con la organización.</>
          )}
        </p>
      </section>
    </article>
  );
}
