import Link from "next/link";
import { getRadarIndicators, getStudies } from "@/sanity/fetch";
import type { Indicator } from "@/data/types";
import { DataStory } from "@/components/DataStory";

export const metadata = {
  title: "CCI Data · La industrialización de Chile, con datos y evidencia",
  description:
    "Scroll-story del Consejo de Construcción Industrializada: la oportunidad habitacional, el desafío de productividad, la respuesta de la industrialización y la evidencia — nacional e internacional —, con cada cifra y su fuente.",
};

// Meta oficial del Plan de Emergencia Habitacional (MINVU, gobierno 2022-2026).
// Dato verificado en minvu.gob.cl. Se modela como Indicator para reutilizar la
// misma tarjeta oficial (MetricCard) que el déficit habitacional del Radar.
const metaPlan: Indicator = {
  id: "meta-peh",
  value: "260.000",
  unit: "viviendas",
  label: "Meta del Plan de Emergencia Habitacional",
  note: "Viviendas que el Estado se comprometió a entregar en el período de gobierno 2022-2026 para reducir el déficit habitacional.",
  status: "real",
  sourceType: "oficial",
  geography: "Chile",
  source: {
    id: "src-peh",
    title: "Plan de Emergencia Habitacional",
    organization: "MINVU",
    year: 2022,
    url: "https://www.minvu.gob.cl/plan-de-emergencia-habitacional/",
    sourceType: "oficial",
  },
};

export default async function DataPage() {
  const [radarIndicators, studies] = await Promise.all([getRadarIndicators(), getStudies()]);

  // Reutilizamos los datos verificados que ya viven en el Radar del sitio.
  const byId = (id: string) => radarIndicators.find((i) => i.id === id);
  const deficit = byId("deficit-radar");
  const empresas = byId("empresas");
  const tipologias = byId("tipologias");
  const studiesInternacionales = studies.filter((s) => s.geography === "Internacional");

  return (
    <>
      <DataStory
        deficit={deficit}
        meta={metaPlan}
        empresas={empresas}
        tipologias={tipologias}
        studiesInternacionales={studiesInternacionales}
      />

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
          <div className="mt-8">
            <Link href="/hazte-socio" className="btn-primary">Postula a ser socio CCI</Link>
          </div>
        </div>
      </section>
    </>
  );
}
