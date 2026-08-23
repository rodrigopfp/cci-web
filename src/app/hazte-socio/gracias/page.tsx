import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Gracias por postular · CCI",
  description: "Recibimos tu postulación a socio del CCI. Esto es lo que sigue.",
  robots: { index: false, follow: true },
  alternates: { canonical: `${SITE_URL}/hazte-socio/gracias/` },
};

const MAILTO_AGENDA = `mailto:cci@cdt.cl?subject=${encodeURIComponent("Agendar conversación — membresía CCI")}`;

const PROCESO = [
  "Envías los antecedentes.",
  "El equipo del CCI revisa la postulación.",
  "Conversamos sobre la categoría adecuada.",
  "Se formaliza la incorporación.",
  "Se activa el perfil y la participación.",
];

const RECOMENDADOS = [
  { titulo: "CCI Data", desc: "Los datos y la evidencia de la industrialización en Chile.", href: "/data" },
  { titulo: "Eventos", desc: "Congresos, mesas técnicas y visitas a planta del ecosistema.", href: "/eventos" },
  { titulo: "Conocimiento", desc: "Guías, estudios y herramientas de la biblioteca del CCI.", href: "/conocimiento" },
];

export default function GraciasPage() {
  return (
    <>
      <section
        data-cta="postulacion-enviada"
        data-ubicacion="gracias"
        className="relative overflow-hidden border-b border-cci-line bg-cci-graphite-dark"
      >
        <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: "radial-gradient(circle at 88% 20%, #E04E00 0%, transparent 45%), radial-gradient(circle at 5% 90%, #5C5C5C 0%, transparent 45%)" }} />
        <div className="container-cci relative py-20 text-center md:py-24">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cci-orange">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-3xl font-900 leading-tight text-white md:text-5xl">
            Gracias por postular al CCI
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            Recibimos tu postulación. El equipo del CCI la revisará y se pondrá en contacto contigo.
          </p>
          <div className="mt-8">
            <a href={MAILTO_AGENDA} data-cta="agenda-conversacion" data-ubicacion="gracias" className="btn-primary">
              Agenda una conversación
            </a>
          </div>
        </div>
      </section>

      {/* QUÉ SIGUE — los 5 pasos, sin plazos */}
      <section className="container-cci py-16 md:py-20">
        <div className="mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange">
          <span className="h-[2px] w-6 bg-cci-orange" />
          Qué sigue
        </div>
        <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">El camino desde aquí</h2>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {PROCESO.map((paso, i) => (
            <li key={i} className="flex flex-col gap-3 rounded-2xl border border-cci-line bg-white p-6 shadow-card">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cci-orange font-display text-lg font-900 text-white">{i + 1}</span>
              <p className="text-sm leading-relaxed text-cci-slate">{paso}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* MIENTRAS TANTO — recomendaciones */}
      <section className="bg-cci-paper py-16 md:py-20">
        <div className="container-cci">
          <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">Mientras tanto, explora el CCI</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {RECOMENDADOS.map((r) => (
              <Link key={r.href} href={r.href} className="card-rise group flex flex-col gap-2 rounded-2xl border border-cci-line bg-white p-6 shadow-card">
                <h3 className="font-display text-lg font-800 text-cci-ink group-hover:text-cci-orange-dark">{r.titulo}</h3>
                <p className="text-sm leading-relaxed text-cci-slate">{r.desc}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-cci-orange">
                  Ir
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
