import Link from "next/link";
import { getRecursosBiblioteca } from "@/sanity/fetch";
import { TERMINOS, esPublico, getTerminoBySlug } from "@/lib/datos/glosario";
import { SITE_URL } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { HubBuscador, type ItemBusqueda } from "./HubBuscador";

const DESCRIPCION =
  "El hub de conocimiento del CCI: biblioteca, glosario, guías, estudios y normativa de la construcción industrializada, con su estado y su fuente.";

export const metadata = {
  title: "Conocimiento · CCI",
  description: DESCRIPCION,
  alternates: { canonical: `${SITE_URL}/conocimiento/` },
  openGraph: {
    type: "website",
    title: "Conocimiento · CCI",
    description: DESCRIPCION,
    url: `${SITE_URL}/conocimiento/`,
    siteName: "CCI",
  },
};

// Accesos principales del hub (Parte 2.3c). Guías/Estudios/Normativa entran a la
// Biblioteca con el filtro sembrado por parámetro (canonical siempre biblioteca).
const ACCESOS = [
  { label: "Biblioteca", href: "/conocimiento/biblioteca", desc: "Guías, estudios y normativa" },
  { label: "Glosario", href: "/glosario", desc: "El lenguaje común del sector" },
  { label: "Guías", href: "/conocimiento/biblioteca?categoria=guias", desc: "Metodología y buenas prácticas" },
  { label: "Estudios", href: "/conocimiento/biblioteca?categoria=estudios", desc: "Evidencia y mediciones" },
  { label: "Normativa", href: "/conocimiento/biblioteca?categoria=normativa", desc: "Normas y resoluciones" },
  { label: "Panorama LATAM", href: "/data/latam/", desc: "La región de un vistazo" },
];

export default async function ConocimientoHubPage() {
  const recursos = (await getRecursosBiblioteca()).filter((r) => r.estado !== "archivado");
  const publicos = TERMINOS.filter(esPublico);
  const esenciales = TERMINOS.filter((t) => t.estadoEditorial === "validada_cci");
  const guia = recursos.find((r) => r.slug === "guia-integracion-temprana-cci");

  // Últimas actualizaciones (Parte 2.3f): recursos + términos públicos por fecha.
  const ultimas = [
    ...recursos.map((r) => ({
      tipo: "Recurso" as const,
      titulo: r.titulo,
      href: `/conocimiento/${r.slug}`,
      fecha: r.fechaActualizacion || r.fechaPublicacion || "",
    })),
    ...publicos.map((t) => ({
      tipo: "Glosario" as const,
      titulo: t.titulo,
      href: `/glosario/${t.slug}`,
      fecha: t.fechaRevision || "",
    })),
  ]
    .filter((x) => x.fecha)
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
    .slice(0, 6);

  // Buscador unificado (Parte 2.3a).
  const itemsBusqueda: ItemBusqueda[] = [
    ...recursos.map((r) => ({ tipo: "Recurso" as const, titulo: r.titulo, desc: r.bajada ?? "", href: `/conocimiento/${r.slug}` })),
    ...publicos.map((t) => ({ tipo: "Glosario" as const, titulo: t.titulo, desc: t.definicionCorta, href: `/glosario/${t.slug}` })),
  ];

  // Enlace a término solo si está público (borradores: se omite el enlace).
  const termPublico = (slug: string): { href: string; label: string } | null => {
    const t = getTerminoBySlug(slug);
    return t && esPublico(t) ? { href: `/glosario/${slug}`, label: t.titulo } : null;
  };
  const RUTAS = [
    {
      titulo: "Entender la industrialización",
      desc: "Qué significa industrializar y en qué se diferencia de prefabricar.",
      enlaces: [{ href: "/data/#cap4", label: "La metodología en CCI Data" }, termPublico("construccion-industrializada"), termPublico("prefabricacion")],
    },
    {
      titulo: "Certificar una solución",
      desc: "Cómo el MINVU aprueba empresas y tipologías industrializadas (con sus fuentes).",
      enlaces: [termPublico("empresa-industrializadora-ditec"), termPublico("vivienda-industrializada-tipo")],
    },
    {
      titulo: "Medir un proyecto",
      desc: "Los indicadores del estándar nacional de productividad.",
      enlaces: [{ href: "/data/#cap8", label: "Qué medimos en CCI Data" }, termPublico("iplc"), termPublico("m2-persona-dia")],
    },
    {
      titulo: "Implementar integración temprana",
      desc: "La guía práctica para integrar el proyecto desde el diseño.",
      enlaces: [{ href: "/conocimiento/guia-integracion-temprana-cci", label: "Guía de Integración Temprana" }, termPublico("integracion-temprana")],
    },
  ].map((r) => ({ ...r, enlaces: r.enlaces.filter((e): e is { href: string; label: string } => Boolean(e)) }));

  return (
    <>
      {/* a) ENCABEZADO + BUSCADOR */}
      <section className="border-b border-cci-line bg-cci-paper">
        <div className="container-cci py-12 text-center md:py-16">
          <nav aria-label="Ruta de navegación" className="mb-5 flex flex-wrap items-center justify-center gap-1.5 text-xs text-cci-slate-light">
            <Link href="/" className="hover:text-cci-orange-dark">Inicio</Link>
            <span>/</span>
            <span className="text-cci-slate">Conocimiento</span>
          </nav>
          <h1 className="mx-auto max-w-3xl font-display text-3xl font-900 leading-tight text-cci-ink md:text-5xl">
            Conocimiento de la construcción industrializada
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-cci-slate">
            La biblioteca, el glosario y las rutas para entender, certificar, medir e implementar la
            industrialización. Cada recurso, con su estado y su fuente.
          </p>
          <HubBuscador items={itemsBusqueda} />
        </div>
      </section>

      {/* b) BLOQUE EDUCATIVO (teaser migrado desde la portada) */}
      <section className="relative overflow-hidden bg-cci-graphite-dark">
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{ backgroundImage: "radial-gradient(circle at 88% 20%, #E04E00 0%, transparent 45%), radial-gradient(circle at 5% 90%, #5C5C5C 0%, transparent 45%)" }}
        />
        <div className="container-cci relative py-12 text-center md:py-14">
          <h2 className="mx-auto max-w-2xl font-display text-2xl font-900 leading-tight text-white md:text-3xl">
            Industrializar no es solo prefabricar
          </h2>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-white/75">
            Es integrar diseño, ingeniería, producción, logística y montaje desde el inicio.
          </p>
          <div className="mt-6">
            <Link href="/data/#cap4" data-cta="entender-metodologia" data-ubicacion="hub-conocimiento" className="btn-primary">
              Entender la metodología
            </Link>
          </div>
        </div>
      </section>

      {/* c) ACCESOS PRINCIPALES */}
      <section className="container-cci py-14">
        <h2 className="font-display text-2xl font-800 text-cci-ink">Explora por dónde partir</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ACCESOS.map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="card-rise group flex items-center justify-between gap-3 rounded-2xl border border-cci-line bg-white p-5 shadow-card"
            >
              <span>
                <span className="block font-display text-lg font-800 text-cci-ink group-hover:text-cci-orange-dark">{a.label}</span>
                <span className="text-sm text-cci-slate">{a.desc}</span>
              </span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-cci-orange">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* d) RECURSO DESTACADO + e) TÉRMINOS ESENCIALES */}
      <section className="bg-cci-paper py-14">
        <div className="container-cci grid gap-10 lg:grid-cols-[1fr_1fr]">
          {guia && (
            <div>
              <h2 className="text-sm font-700 uppercase tracking-wide text-cci-orange">Recurso destacado</h2>
              <Link
                href={`/conocimiento/${guia.slug}`}
                className="card-rise group mt-4 flex flex-col overflow-hidden rounded-2xl border border-cci-line bg-white shadow-card"
              >
                {guia.portada && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={guia.portada} alt="" aria-hidden="true" className="aspect-[16/9] w-full object-cover" />
                )}
                <div className="flex flex-col gap-2 p-6">
                  <h3 className="font-display text-xl font-800 leading-snug text-cci-ink group-hover:text-cci-orange-dark">{guia.titulo}</h3>
                  {guia.bajada && <p className="text-sm leading-relaxed text-cci-slate">{guia.bajada}</p>}
                  <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-cci-orange">Ver el recurso →</span>
                </div>
              </Link>
            </div>
          )}

          <div>
            <h2 className="text-sm font-700 uppercase tracking-wide text-cci-orange">Términos esenciales</h2>
            <ul className="mt-4 space-y-3">
              {esenciales.map((t) => (
                <li key={t.slug}>
                  <Link href={`/glosario/${t.slug}`} className="group block rounded-xl border border-cci-line bg-white p-4 transition hover:border-cci-slate-light">
                    <span className="font-display text-base font-800 text-cci-ink group-hover:text-cci-orange-dark">{t.titulo}</span>
                    <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-cci-slate">{t.definicionCorta}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/glosario" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cci-orange hover:text-cci-orange-dark">
              Ver el glosario completo →
            </Link>
          </div>
        </div>
      </section>

      {/* f) ÚLTIMAS ACTUALIZACIONES */}
      {ultimas.length > 0 && (
        <section className="container-cci py-14">
          <h2 className="font-display text-2xl font-800 text-cci-ink">Últimas actualizaciones</h2>
          <ul className="mt-6 divide-y divide-cci-line border-y border-cci-line">
            {ultimas.map((u) => (
              <li key={`${u.tipo}-${u.href}`}>
                <Link href={u.href} className="flex flex-wrap items-center justify-between gap-2 py-4 transition hover:bg-cci-paper/60">
                  <span className="flex items-center gap-3">
                    <span className="rounded-full bg-cci-paper px-2 py-0.5 text-[10px] font-700 uppercase tracking-wide text-cci-slate-light">{u.tipo}</span>
                    <span className="font-600 text-cci-ink">{u.titulo}</span>
                  </span>
                  <span className="font-mono text-xs text-cci-slate-light">{formatDate(u.fecha)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* g) RUTAS DE APRENDIZAJE */}
      <section className="bg-cci-paper py-14">
        <div className="container-cci">
          <h2 className="font-display text-2xl font-800 text-cci-ink">Rutas de aprendizaje</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {RUTAS.map((r) => (
              <div key={r.titulo} className="flex flex-col rounded-2xl border border-cci-line bg-white p-6 shadow-card">
                <h3 className="font-display text-lg font-800 text-cci-ink">{r.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cci-slate">{r.desc}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {r.enlaces.map((e) => (
                    <li key={e.href}>
                      <Link href={e.href} className="inline-flex items-center rounded-full border border-cci-line bg-cci-paper px-3 py-1 text-sm font-600 text-cci-graphite transition hover:border-cci-graphite">
                        {e.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* h) CTA DE CIERRE */}
      <section className="container-cci py-16 text-center">
        <h2 className="mx-auto max-w-2xl font-display text-2xl font-900 leading-tight text-cci-ink md:text-3xl">
          De la evidencia a la práctica
        </h2>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/data" data-cta="explora-cci-data" data-ubicacion="hub-conocimiento" className="btn-primary">
            Explora CCI Data
          </Link>
          <Link
            href="/hazte-socio"
            data-cta="hazte-socio"
            data-ubicacion="hub-conocimiento"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cci-line px-5 py-2.5 text-sm font-semibold text-cci-graphite transition hover:border-cci-graphite"
          >
            Hazte socio
          </Link>
        </div>
      </section>
    </>
  );
}
