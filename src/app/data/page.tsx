import Link from "next/link";
import { getStudies } from "@/sanity/fetch";
import { DataStory } from "@/components/DataStory";
import { SITE_URL } from "@/lib/site";

const DESCRIPCION =
  "Scroll-story del Consejo de Construcción Industrializada: la oportunidad habitacional, el desafío de productividad, la respuesta de la industrialización y la evidencia — nacional e internacional —, con cada cifra y su fuente.";

export const metadata = {
  title: "CCI Data · La industrialización de Chile, con datos y evidencia",
  description: DESCRIPCION,
  alternates: { canonical: `${SITE_URL}/data/` },
  openGraph: {
    type: "website",
    title: "CCI Data · La industrialización de Chile, con datos y evidencia",
    description: DESCRIPCION,
    url: `${SITE_URL}/data/`,
    siteName: "CCI",
  },
};

export default async function DataPage() {
  // Las cifras salen del registro único (src/lib/datos). De Sanity solo se traen
  // las tarjetas de estudios internacionales (evidencia cualitativa del cap 04).
  const studies = await getStudies();
  const studiesInternacionales = studies.filter((s) => s.geography === "Internacional");

  return (
    <>
      <DataStory studiesInternacionales={studiesInternacionales} />

      {/* BANDA DE CIERRE — postulación a socio (honor y pertenencia) */}
      <section className="relative overflow-hidden bg-cci-graphite-dark">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{ backgroundImage: "radial-gradient(circle at 88% 20%, #E04E00 0%, transparent 45%), radial-gradient(circle at 5% 90%, #5C5C5C 0%, transparent 45%)" }}
        />
        <div className="container-cci relative py-16 text-center md:py-20">
          <div className="mx-auto inline-flex w-fit items-center whitespace-nowrap border-l-4 border-cci-orange bg-white/[0.06] py-2 pl-4 pr-3 text-[11px] font-700 uppercase leading-none tracking-[0.15em] text-[#F5EEE6] md:text-xs">
            Membresía
          </div>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-900 leading-tight text-white md:text-4xl">
            Postula a ser socio CCI
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            Las empresas e instituciones que están transformando la construcción en Chile ya son parte
            del CCI. Suma a tu organización a ese ecosistema.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/hazte-socio" data-cta="hazte-socio" data-ubicacion="cierre-data" className="btn-primary">
              Postula a ser socio CCI
            </Link>
            <Link
              href="/aporta"
              data-cta="aporta"
              data-ubicacion="cierre-data"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Aporta un caso o dato
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
