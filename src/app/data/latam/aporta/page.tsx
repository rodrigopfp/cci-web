import { SITE_URL } from "@/lib/site";
import { AporteLatamForm } from "@/components/AporteLatamForm";

const DESCRIPCION =
  "Aporta una fuente, una corrección, un caso o una organización al Panorama LATAM del CCI. Todo aporte se revisa antes de publicarse.";

export const metadata = {
  title: "Aporta al Panorama LATAM · CCI",
  description: DESCRIPCION,
  robots: { index: false, follow: true },
  alternates: { canonical: `${SITE_URL}/data/latam/aporta/` },
};

export default function AportaLatamPage() {
  return (
    <>
      <section className="border-b border-cci-line bg-cci-paper">
        <div className="container-cci py-12 md:py-14">
          <div className="inline-flex w-fit items-center whitespace-nowrap border-l-4 border-cci-orange bg-cci-orange-soft py-2 pl-4 pr-3 text-[11px] font-700 uppercase leading-none tracking-[0.15em] text-cci-orange-dark md:text-xs">
            Panorama LATAM
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-3xl font-900 leading-tight text-cci-ink md:text-5xl">
            Aporta información de tu país
          </h1>
          <p className="mt-4 max-w-2xl text-cci-slate">
            El panorama regional se construye con fuentes verificables. Comparte una fuente, una
            corrección, un caso o una organización. Lo revisamos antes de publicarlo.
          </p>
        </div>
      </section>
      <section className="container-cci max-w-2xl py-12">
        <AporteLatamForm />
      </section>
    </>
  );
}
