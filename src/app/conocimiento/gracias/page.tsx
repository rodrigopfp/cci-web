import { Suspense } from "react";
import Link from "next/link";
import { getRecursosBiblioteca } from "@/sanity/fetch";
import { urlDescarga } from "@/lib/biblioteca";
import { getTerminoBySlug } from "@/lib/datos/glosario";
import { SITE_URL } from "@/lib/site";
import { GraciasClient, type RecursoGracias } from "./GraciasClient";

// Versión genérica servida como HTML estático (fallback de Suspense): garantiza
// que sin JS —o antes de la hidratación— haya agradecimiento + enlace a la
// Biblioteca. Con JS, GraciasClient lee ?recurso y muestra la versión específica.
function GraciasGenerico() {
  return (
    <section className="relative overflow-hidden border-b border-cci-line bg-cci-graphite-dark">
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{ backgroundImage: "radial-gradient(circle at 88% 20%, #E04E00 0%, transparent 45%), radial-gradient(circle at 5% 90%, #5C5C5C 0%, transparent 45%)" }}
      />
      <div className="container-cci relative py-20 text-center md:py-24">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cci-orange">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="mx-auto mt-6 max-w-3xl font-display text-3xl font-900 leading-tight text-white md:text-5xl">¡Gracias!</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
          Gracias por tu interés en la biblioteca del CCI.
        </p>
        <div className="mt-8">
          <Link href="/conocimiento" className="btn-primary">Volver a la Biblioteca</Link>
        </div>
      </div>
    </section>
  );
}

// Confirmación de descarga: ruta única, noindex y fuera del sitemap (patrón
// /hazte-socio/gracias). El recurso llega por ?recurso=slug (cliente).
export const metadata = {
  title: "Gracias por tu descarga · CCI",
  description: "Confirmación de descarga de un recurso de la biblioteca del CCI.",
  robots: { index: false, follow: true },
  alternates: { canonical: `${SITE_URL}/conocimiento/gracias/` },
};

export default async function ConocimientoGraciasPage() {
  const recursos = await getRecursosBiblioteca();
  const tituloRecurso = (slug: string) => recursos.find((x) => x.slug === slug)?.titulo ?? slug;

  // Mapa liviano slug → datos que la confirmación necesita en cliente.
  const mapa: Record<string, RecursoGracias> = {};
  for (const r of recursos) {
    if (!r.slug || r.estado === "archivado") continue;
    mapa[r.slug] = {
      titulo: r.titulo,
      downloadUrl: urlDescarga(r),
      esExterno: r.esExterno,
      relacionados: r.recursosRelacionados
        .filter((s) => recursos.some((x) => x.slug === s && x.estado !== "archivado"))
        .map((s) => ({ slug: s, titulo: tituloRecurso(s) })),
      glosario: r.terminosGlosario
        .map((s) => ({ slug: s, titulo: getTerminoBySlug(s)?.titulo ?? s }))
        .filter((t) => Boolean(getTerminoBySlug(t.slug))),
    };
  }

  return (
    <Suspense fallback={<GraciasGenerico />}>
      <GraciasClient recursos={mapa} />
    </Suspense>
  );
}
