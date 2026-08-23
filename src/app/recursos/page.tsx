import { getResources } from "@/sanity/fetch";
import { ResourceCard } from "@/components/Blocks";

// Guía propia del CCI, publicación con derechos abiertos. El archivo vive en
// /public/recursos y se descarga de verdad (no es una descarga simulada).
const GUIA_PDF = "/recursos/guia-integracion-temprana-cci-2024.pdf";

export const metadata = {
  title: "Recursos · CCI",
  description:
    "Documentos técnicos, guías y estudios sobre construcción industrializada. Incluye la Guía Práctica de Integración Temprana del CCI.",
};

export default async function RecursosPage() {
  const resources = await getResources();
  return (
    <>
      <section className="border-b border-cci-line bg-cci-paper"><div className="container-cci py-14">
        <div className="mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange"><span className="h-[2px] w-6 bg-cci-orange" />Centro de recursos</div>
        <h1 className="font-display text-3xl font-900 text-cci-ink md:text-5xl">Documentos técnicos, guías y estudios</h1>
        <p className="mt-3 max-w-2xl text-cci-slate">Material descargable para profesionales del sector.</p>
      </div></section>

      {/* Recurso destacado: la Guía de Integración Temprana (descarga real) */}
      <section className="container-cci pt-12">
        <div className="relative overflow-hidden rounded-2xl border border-cci-line bg-white p-7 shadow-card md:p-9">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <span className="w-fit rounded-full bg-cci-orange-soft px-2.5 py-1 text-[11px] font-700 uppercase tracking-wide text-cci-orange-dark">
                Guía técnica · CCI 2024
              </span>
              <h2 className="mt-4 font-display text-2xl font-800 leading-snug text-cci-ink">
                Guía Práctica de Integración Temprana en Construcción Industrializada
              </h2>
              <p className="mt-3 text-cci-slate">
                La metodología para coordinar a todos los actores de un proyecto desde su génesis, con
                casos documentados por socios del CCI. Publicación propia del Consejo.
              </p>
              <p className="mt-3 font-mono text-xs text-cci-slate-light">PDF · ~21 MB</p>
            </div>
            <a
              href={GUIA_PDF}
              download
              className="btn-primary shrink-0 self-start whitespace-nowrap"
            >
              Descargar la guía
            </a>
          </div>
        </div>
      </section>

      <section className="container-cci py-12"><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{resources.map((r) => <ResourceCard key={r.id} resource={r} />)}</div></section>
    </>
  );
}
