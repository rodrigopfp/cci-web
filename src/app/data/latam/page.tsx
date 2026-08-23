import Link from "next/link";
import { PAISES_LATAM } from "@/lib/datos/latam";
import { SITE_URL } from "@/lib/site";
import { MapaLatam } from "@/components/MapaLatam";

const DESCRIPCION =
  "Políticas, avances, casos, organizaciones y datos que están transformando la manera de construir en la región.";

export const metadata = {
  title: "Panorama LATAM · CCI Data",
  description: DESCRIPCION,
  alternates: { canonical: `${SITE_URL}/data/latam/` },
  openGraph: { type: "website", title: "Panorama LATAM · CCI Data", description: DESCRIPCION, url: `${SITE_URL}/data/latam/`, siteName: "CCI" },
};

export default function LatamPage() {
  const paises = PAISES_LATAM.map((f) => ({
    codigo: f.codigo,
    nombre: f.nombre,
    estadoFicha: f.estadoFicha,
    resumen: f.resumen,
    numFuentes: f.fuentes.length,
    ultimaActualizacion: f.ultimaActualizacion,
  }));

  return (
    <>
      <section className="border-b border-cci-line bg-cci-graphite-dark">
        <div className="container-cci py-16">
          <div className="mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange-light">
            <span className="h-[2px] w-6 bg-cci-orange" />
            Panorama LATAM
          </div>
          <h1 className="max-w-3xl font-display text-3xl font-900 leading-tight text-white md:text-5xl">
            La construcción industrializada en Latinoamérica
          </h1>
          <p className="mt-4 max-w-2xl text-white/75">{DESCRIPCION}</p>
        </div>
      </section>

      <section className="container-cci py-12 md:py-14">
        <MapaLatam paises={paises} />
        <p className="mt-8 max-w-2xl text-sm text-cci-slate">
          Este panorama se construye por país, solo con fuentes verificables. Los países en
          levantamiento se irán completando con investigación y fuentes.
        </p>
        <div className="mt-6">
          <Link href="/data/latam/aporta" data-cta="aporta-pais" data-ubicacion="latam-portada" className="btn-primary">
            Aporta información de tu país
          </Link>
        </div>
      </section>

      {/* BANDA DE CIERRE — Hazte socio (pendiente del paso 6) */}
      <section className="relative overflow-hidden bg-cci-graphite-dark">
        <div className="absolute inset-0 opacity-[0.16]" style={{ backgroundImage: "radial-gradient(circle at 88% 20%, #E04E00 0%, transparent 45%), radial-gradient(circle at 5% 90%, #5C5C5C 0%, transparent 45%)" }} />
        <div className="container-cci relative py-14 text-center md:py-16">
          <h2 className="mx-auto max-w-3xl font-display text-2xl font-900 leading-tight text-white md:text-3xl">
            Sé parte del ecosistema que está transformando la construcción en la región
          </h2>
          <div className="mt-6">
            <Link href="/hazte-socio" data-cta="hazte-socio" data-ubicacion="cierre-latam" className="btn-primary">
              Postula a ser socio CCI
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
