import { MediaKitCard, EditorialPolicyBlock } from "@/components/Blocks";
const audiencias = ["Empresas industrializadoras","Constructoras","Inmobiliarias","Arquitectos","Ingenieros","Sector público","Academia","Proveedores tecnologicos"];
const Icon = ({ d }: { d: string }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;
const formatos = [
  { title: "Publirreportaje", description: "Artículo patrocinado en profundidad, rotulado y con difusión en newsletter.", price: "Desde UF 12", icon: <Icon d="M4 4h16v16H4zM8 9h8M8 13h8M8 17h5" /> },
  { title: "Banner home", description: "Posición grafica premium en la portada del hub durante el período.", price: "Desde UF 8 / mes", icon: <Icon d="M3 5h18v6H3zM3 15h18v4H3z" /> },
  { title: "Newsletter destacado", description: "Espacio editorial en el boletin semanal del sector.", price: "Desde UF 6", icon: <Icon d="M4 6h16v12H4zM4 8l8 5 8-5" /> },
  { title: "Especial tematico", description: "Patrocinio de una cobertura completa sobre un tema clave.", price: "A cotizar", icon: <Icon d="M12 3l9 4.5v9L12 21l-9-4.5v-9z" /> },
  { title: "Entrevista", description: "Conversación editorial con tus lideres técnicos.", price: "Desde UF 9", icon: <Icon d="M7 8h10M7 12h6M5 4h14v12l-4 4v-4H5z" /> },
  { title: "Cobertura de evento", description: "Material editorial de tu evento o participación.", price: "A cotizar", icon: <Icon d="M8 2v4M16 2v4M3 9h18M5 5h14v16H5z" /> },
];
export default function MediaKitPage() {
  return (
    <>
      <section className="border-b border-cci-line bg-cci-graphite-dark"><div className="container-cci py-16">
        <div className="mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange-light"><span className="h-[2px] w-6 bg-cci-orange" />Media Kit</div>
        <h1 className="max-w-3xl font-display text-3xl font-900 leading-tight text-white md:text-5xl">El espacio comercial del medio de referencia del sector</h1>
        <p className="mt-4 max-w-2xl text-white/75">El CCI conecta marcas con la audiencia más calificada de la construcción industrializada en Chile y LATAM.</p>
      </div></section>
      <section className="container-cci py-14"><div className="grid gap-8 md:grid-cols-[1.3fr_1fr]">
        <div><h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">Posicionamiento</h2><p className="mt-3 leading-relaxed text-cci-slate">El CCI es el ecosistema lider de la construcción industrializada en Chile. Su plataforma concentra la conversación técnica, las políticas públicas, los datos y los casos que definen el futuro de la edificación en la región.</p></div>
        <div className="rounded-2xl bg-cci-orange-soft p-7"><h3 className="font-display text-lg font-700 text-cci-orange-dark">Audiencia objetivo</h3><div className="mt-4 flex flex-wrap gap-2">{audiencias.map((a) => <span key={a} className="badge bg-white text-cci-graphite">{a}</span>)}</div></div>
      </div></section>
      <section className="bg-cci-paper py-14"><div className="container-cci">
        <h2 className="mb-7 font-display text-2xl font-800 text-cci-ink md:text-3xl">Formatos comerciales</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{formatos.map((f) => <MediaKitCard key={f.title} {...f} />)}</div>
        <p className="mt-4 text-xs text-cci-slate-light">* Valores referenciales para el prototipo. Las tarifas reales se entregan a solicitud.</p>
      </div></section>
      <section className="container-cci space-y-10 py-14">
        <EditorialPolicyBlock />
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-cci-graphite-dark p-10 text-center text-white"><h3 className="font-display text-2xl font-800 md:text-3xl">Quieres conocer las tarifas?</h3><p className="max-w-xl text-white/70">Solicita el media kit completo con audiencia, formatos y valores actualizados.</p><button className="btn-primary">Solicitar tarifas</button></div>
      </section>
    </>
  );
}
