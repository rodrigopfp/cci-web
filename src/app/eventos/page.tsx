import { getEvents } from "@/sanity/fetch";
import { formatDate } from "@/lib/format";
export default async function EventosPage() {
  const events = await getEvents();
  return (
    <>
      <section className="border-b border-cci-line bg-cci-paper"><div className="container-cci py-14">
        <div className="mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange"><span className="h-[2px] w-6 bg-cci-orange" />Agenda</div>
        <h1 className="font-display text-3xl font-900 text-cci-ink md:text-5xl">Eventos CCI</h1>
        <p className="mt-3 max-w-2xl text-cci-slate">Congresos, webinars, mesas técnicas y visitas a planta del ecosistema industrializado.</p>
      </div></section>
      <section className="container-cci py-12"><div className="flex flex-col gap-5">
        {events.map((ev) => (
          <div key={ev.id} className="card-rise group relative grid gap-5 overflow-hidden rounded-xl border border-cci-line bg-white p-6 shadow-card sm:grid-cols-[auto_1fr_auto] sm:items-center">
            <div className="flex h-20 w-20 flex-col items-center justify-center rounded-xl bg-cci-graphite-dark text-white"><span className="font-display text-2xl font-800 leading-none">{new Date(ev.date + "T00:00:00").getDate()}</span><span className="mt-1 text-[11px] uppercase tracking-wide">{new Date(ev.date + "T00:00:00").toLocaleDateString("es-CL", { month: "short" })}</span></div>
            <div><div className="mb-1 flex flex-wrap items-center gap-2"><span className="badge bg-cci-blue-soft text-cci-blue">{ev.modality}</span><span className="text-xs text-cci-slate-light">{ev.location}</span></div><h3 className="font-display text-xl font-700 text-cci-ink">{ev.title}</h3><p className="mt-1 text-sm text-cci-slate">{ev.description}</p><div className="mt-2 text-xs text-cci-slate-light">{formatDate(ev.date)}</div></div>
            {/* "Inscríbete" solo cuando el evento tiene un mecanismo real de inscripción. */}
            {ev.inscripcionUrl ? (
              <a
                href={ev.inscripcionUrl}
                target={ev.inscripcionUrl.startsWith("http") ? "_blank" : undefined}
                rel={ev.inscripcionUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                data-cta="inscripcion-evento"
                data-ubicacion="eventos"
                className="btn-primary shrink-0 sm:self-center"
              >
                Inscríbete
              </a>
            ) : (
              <span className="shrink-0 text-xs italic text-cci-slate-light sm:self-center">Inscripción por anunciar</span>
            )}
            <span className="sweep" />
          </div>
        ))}
      </div></section>
    </>
  );
}
