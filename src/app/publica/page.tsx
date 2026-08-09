import { SubmitNewsForm } from "@/components/SubmitNewsForm";
import { EditorialPolicyBlock } from "@/components/Blocks";

const formatos = [
  { t: "Noticia de socio", d: "Publica hitos y lanzamientos de tu empresa con rotulado de socio." },
  { t: "Publirreportaje", d: "Un artículo en profundidad con formato patrocinado y claramente identificado." },
  { t: "Aporte de datos", d: "Suma proyectos y métricas verificables al observatorio del sector." },
  { t: "Entrevista", d: "Da voz a tus lideres técnicos en un formato de conversación editorial." },
  { t: "Banner", d: "Visibilidad grafica en posiciones premium del hub y el newsletter." },
  { t: "Especial tematico", d: "Patrocina una cobertura completa sobre un tema relevante." },
];
const pasos = [
  { n: 1, t: "Enviar información", d: "Completa el formulario con tu propuesta y material de referencia." },
  { n: 2, t: "Revisión editorial", d: "El equipo evalua pertinencia, calidad y formato adecuado." },
  { n: 3, t: "Edición y aprobación", d: "Ajustamos titulo, bajada y estilo, y validamos contigo." },
  { n: 4, t: "Publicación y difusión", d: "Se publica en el hub y se difunde en newsletter y redes." },
];

export default function PublicaPage() {
  return (
    <>
      <section className="border-b border-cci-line bg-cci-graphite-dark"><div className="container-cci py-16">
        <div className="mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange-light"><span className="h-[2px] w-6 bg-cci-orange" />Publica con nosotros</div>
        <h1 className="max-w-3xl font-display text-3xl font-900 leading-tight text-white md:text-5xl">Tu mensaje, en el medio de referencia del sector</h1>
        <p className="mt-4 max-w-2xl text-white/75">Llega a quienes deciden en construcción industrializada: empresas, constructoras, inmobiliarias, arquitectos, ingenieros, sector público y academia.</p>
      </div></section>
      <section className="container-cci py-14"><div className="grid gap-6 md:grid-cols-3">
        {[{ t: "Audiencia calificada", d: "Lectores técnicos y tomadores de decisión del ecosistema." },{ t: "Autoridad del CCI", d: "Tu contenido junto a la cobertura de mayor credibilidad del sector." },{ t: "Difusión multicanal", d: "Hub, newsletter y redes sociales en un solo paquete." }].map((b) => <div key={b.t} className="rounded-xl border border-cci-line bg-white p-6 shadow-card"><h3 className="font-display text-lg font-700 text-cci-graphite">{b.t}</h3><p className="mt-2 text-sm text-cci-slate">{b.d}</p></div>)}
      </div></section>
      <section className="bg-cci-paper py-14"><div className="container-cci">
        <h2 className="mb-7 font-display text-2xl font-800 text-cci-ink md:text-3xl">Formatos disponibles</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{formatos.map((f) => <div key={f.t} className="rounded-xl border border-cci-line bg-white p-5 shadow-card"><h3 className="font-600 text-cci-ink">{f.t}</h3><p className="mt-1 text-sm text-cci-slate">{f.d}</p></div>)}</div>
      </div></section>
      <section className="bg-cci-graphite-dark py-14"><div className="container-cci">
        <h2 className="mb-8 font-display text-2xl font-800 text-white md:text-3xl">El proceso en 4 pasos</h2>
        <div className="grid gap-6 md:grid-cols-4">{pasos.map((s) => <div key={s.n}><div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-cci-orange font-display text-lg font-800 text-white">{s.n}</div><h3 className="font-600 text-white">{s.t}</h3><p className="mt-1 text-sm text-white/65">{s.d}</p></div>)}</div>
      </div></section>
      <section className="container-cci py-16">
        <div className="mb-7 max-w-2xl"><h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">Envía tu propuesta</h2><p className="mt-2 text-cci-slate">Completa el formulario y el equipo editorial se pondra en contacto.</p></div>
        <SubmitNewsForm />
      </section>
      <section className="container-cci pb-16"><EditorialPolicyBlock /></section>
    </>
  );
}
