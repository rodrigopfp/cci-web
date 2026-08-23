// Testimonios de socios (Fase 2 · paso 7).
//
// TODO (Rodrigo): aún NO hay testimonios confirmados. La sección queda preparada
// y OCULTA: cuando existan testimonios reales y autorizados, complétalos abajo y
// se mostrarán automáticamente. No inventar testimonios.

interface Testimonio {
  nombre: string;
  cargo: string;
  organizacion: string;
  texto: string;
}

const TESTIMONIOS: Testimonio[] = [];

export function Testimonios() {
  if (TESTIMONIOS.length === 0) return null;

  return (
    <section className="bg-cci-paper py-16 md:py-20">
      <div className="container-cci">
        <div className="mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange">
          <span className="h-[2px] w-6 bg-cci-orange" />
          Voces de socios
        </div>
        <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">Lo que dicen quienes ya son parte</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {TESTIMONIOS.map((t) => (
            <blockquote key={t.nombre} className="rounded-2xl border border-cci-line bg-white p-6 shadow-card">
              <p className="text-cci-ink/90">“{t.texto}”</p>
              <footer className="mt-4 text-sm">
                <span className="font-700 text-cci-ink">{t.nombre}</span>
                <span className="block text-cci-slate">{t.cargo} · {t.organizacion}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
