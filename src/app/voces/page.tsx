import { getVoces } from "@/sanity/fetch";
import { VozCard } from "@/components/VozCard";

export const metadata = {
  title: "Voces de la industrialización · CCI",
  description:
    "Referentes del sector de la construcción industrializada en Chile: quiénes la impulsan, en sus propias palabras.",
};

export default async function VocesPage() {
  const voces = await getVoces();

  return (
    <>
      {/* ENCABEZADO */}
      <section className="border-b border-cci-line bg-cci-graphite-dark">
        <div className="container-cci py-16">
          <div className="mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange-light">
            <span className="h-[2px] w-6 bg-cci-orange" />
            Voces
          </div>
          <h1 className="max-w-3xl font-display text-3xl font-900 leading-tight text-white md:text-5xl">
            Voces de la industrialización
          </h1>
          <p className="mt-4 max-w-2xl text-white/75">
            Quiénes están impulsando la construcción industrializada en Chile, en sus propias
            palabras. Entrevistas breves a referentes del sector.
          </p>
        </div>
      </section>

      {/* GRILLA o ESTADO VACÍO */}
      <section className="container-cci py-14">
        {voces.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-cci-line bg-cci-paper px-8 py-16 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-cci-orange-soft text-cci-orange">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1v4M12 19v4M4.2 4.2l2.8 2.8M17 17l2.8 2.8M1 12h4M19 12h4M4.2 19.8L7 17M17 7l2.8-2.8" strokeLinecap="round" />
              </svg>
            </div>
            <h2 className="font-display text-xl font-800 text-cci-ink">Sección en levantamiento</h2>
            <p className="mt-2 text-cci-slate">
              Pronto las primeras voces del sector. Estamos preparando las entrevistas a quienes
              están construyendo la industrialización en Chile.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {voces.map((voz) => (
              <VozCard key={voz.id} voz={voz} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
