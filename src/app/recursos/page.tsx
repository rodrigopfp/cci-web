import { resources } from "@/data/resources";
import { ResourceCard } from "@/components/Blocks";
export default function RecursosPage() {
  return (
    <>
      <section className="border-b border-cci-line bg-cci-paper"><div className="container-cci py-14">
        <div className="mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange"><span className="h-[2px] w-6 bg-cci-orange" />Centro de recursos</div>
        <h1 className="font-display text-3xl font-900 text-cci-ink md:text-5xl">Documentos técnicos, guías y estudios</h1>
        <p className="mt-3 max-w-2xl text-cci-slate">Material descargable para profesionales del sector. (Descargas simuladas en este prototipo.)</p>
      </div></section>
      <section className="container-cci py-12"><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{resources.map((r) => <ResourceCard key={r.id} resource={r} />)}</div></section>
    </>
  );
}
