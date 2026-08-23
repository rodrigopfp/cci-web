import { SITE_URL } from "@/lib/site";
import { AportaForm } from "@/components/AportaForm";

const DESCRIPCION =
  "Aporta un caso, un proyecto, un dato, un estudio o una corrección al Consejo de Construcción Industrializada. Todo aporte se revisa antes de publicarse.";

export const metadata = {
  title: "Aporta un caso o dato · CCI",
  description: DESCRIPCION,
  alternates: { canonical: `${SITE_URL}/aporta/` },
  openGraph: {
    type: "website",
    title: "Aporta un caso o dato · CCI",
    description: DESCRIPCION,
    url: `${SITE_URL}/aporta/`,
    siteName: "CCI",
  },
};

export default function AportaPage() {
  return (
    <>
      <section className="border-b border-cci-line bg-cci-paper">
        <div className="container-cci py-12 md:py-14">
          <div className="inline-flex w-fit items-center whitespace-nowrap border-l-4 border-cci-orange bg-cci-orange-soft py-2 pl-4 pr-3 text-[11px] font-700 uppercase leading-none tracking-[0.15em] text-cci-orange-dark md:text-xs">
            Contribuir
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-3xl font-900 leading-tight text-cci-ink md:text-5xl">
            Aporta un caso o dato
          </h1>
          <p className="mt-4 max-w-2xl text-cci-slate">
            El conocimiento del sector se construye entre todos. Comparte un caso medido, un proyecto, un
            indicador con fuente, un estudio o una corrección. Lo revisamos antes de publicarlo.
          </p>
        </div>
      </section>

      <section className="container-cci max-w-2xl py-12">
        <AportaForm />
      </section>
    </>
  );
}
