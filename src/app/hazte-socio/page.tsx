import Link from "next/link";
import { getEmpresasVitrina } from "@/sanity/fetch";
import { MuroSocios } from "@/components/MuroSocios";

// Página completa de postulación a socio (revisión 22/08, prompt 3/3). El tono
// es de HONOR: lenguaje de postulación, generosidad al mostrar lo que se gana y
// prestigio transmitido por quienes ya están dentro. Sin precios y sin prometer
// procesos de selección que no existen. El correo es el que ya usa el sitio.

export const metadata = {
  title: "Postula a ser socio CCI",
  description:
    "El CCI reúne a las empresas, instituciones, academia y profesionales que están transformando la construcción en Chile. Postula a ser socio y forma parte de esa transformación.",
};

const MAILTO = "mailto:cci@cdt.cl?subject=Postulaci%C3%B3n%20a%20socio%20CCI";

const EJES = [
  {
    n: "01",
    titulo: "Incidencia",
    desc: "Participa en los grupos técnicos que están definiendo estándares, normativa y política pública del sector.",
  },
  {
    n: "02",
    titulo: "Inteligencia",
    desc: "Accede primero a los datos, estudios y el Radar que el CCI levanta y verifica.",
  },
  {
    n: "03",
    titulo: "Conexión",
    desc: "Vincúlate con el ecosistema completo: industrializadoras, mandantes, proveedores y academia.",
  },
  {
    n: "04",
    titulo: "Conocimiento",
    desc: "Formación, giras técnicas, seminarios y buenas prácticas del sector.",
  },
  {
    n: "05",
    titulo: "Posicionamiento",
    desc: "Visibilidad editorial en la plataforma del CCI, siempre con contenido claramente rotulado.",
  },
  {
    n: "06",
    titulo: "Oportunidades",
    desc: "Presencia en la Vitrina, en eventos y en las instancias donde el sector se encuentra.",
  },
];

const CATEGORIAS = [
  { label: "Oro", destacada: true },
  { label: "Plata", destacada: false },
  { label: "Bronce", destacada: false },
  { label: "Academia", destacada: false },
  { label: "Profesionales", destacada: false },
];

const TRANSPARENCIA = [
  {
    titulo: "Socio CCI",
    desc: "Pertenece al Consejo, participa en su gobernanza técnica y accede a los seis ejes de valor.",
    destacada: true,
  },
  {
    titulo: "Patrocinador",
    desc: "Apoya iniciativas o eventos puntuales, sin membresía.",
    destacada: false,
  },
  {
    titulo: "Publicidad",
    desc: "Contenido comercial, siempre rotulado y separado de la línea editorial.",
    destacada: false,
  },
];

function Kicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className={`mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide ${
        dark ? "text-cci-orange-light" : "text-cci-orange"
      }`}
    >
      <span className="h-[2px] w-6 bg-cci-orange" />
      {children}
    </div>
  );
}

export default async function HazteSocioPage() {
  const empresas = await getEmpresasVitrina();

  return (
    <>
      {/* a) HERO (grafito) */}
      <section className="relative overflow-hidden border-b border-cci-line bg-cci-graphite-dark">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{ backgroundImage: "radial-gradient(circle at 88% 20%, #E04E00 0%, transparent 45%), radial-gradient(circle at 5% 90%, #5C5C5C 0%, transparent 45%)" }}
        />
        <div className="container-cci relative py-20 md:py-24">
          <Kicker dark>Para el ecosistema</Kicker>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-900 leading-[1.05] text-white md:text-5xl">
            Postula a ser <span className="text-cci-orange">socio CCI</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            El CCI reúne a las empresas, instituciones, academia y profesionales que están
            transformando la construcción en Chile. Pertenecer es formar parte de esa transformación —
            y de quienes la están midiendo.
          </p>
          <div className="mt-8">
            <a href={MAILTO} className="btn-primary">Postula por correo</a>
          </div>
        </div>
      </section>

      {/* b) SEIS EJES DE VALOR */}
      <section className="container-cci py-16 md:py-20">
        <Kicker>Qué ganas al pertenecer</Kicker>
        <h2 className="max-w-3xl font-display text-2xl font-800 leading-tight text-cci-ink md:text-3xl">
          Seis ejes de valor para tu organización
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EJES.map((e) => (
            <div
              key={e.n}
              className="card-rise group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-cci-line bg-white p-7 shadow-card"
            >
              <span className="font-display text-3xl font-900 leading-none text-cci-orange">{e.n}</span>
              <h3 className="font-display text-lg font-800 text-cci-ink">{e.titulo}</h3>
              <p className="text-sm leading-relaxed text-cci-slate">{e.desc}</p>
              <span className="sweep" />
            </div>
          ))}
        </div>
      </section>

      {/* c) CATEGORÍAS DE MEMBRESÍA (sin precios) */}
      <section className="bg-cci-paper py-16 md:py-20">
        <div className="container-cci">
          <Kicker>Categorías de membresía</Kicker>
          <h2 className="max-w-3xl font-display text-2xl font-800 leading-tight text-cci-ink md:text-3xl">
            Un nivel para cada tipo de organización
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {CATEGORIAS.map((c) => (
              <span
                key={c.label}
                className={`inline-flex items-center rounded-full px-5 py-2.5 text-sm font-700 ${
                  c.destacada
                    ? "bg-cci-orange text-white shadow-card"
                    : "border border-cci-line bg-white text-cci-graphite"
                }`}
              >
                {c.label}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-2xl leading-relaxed text-cci-slate">
            Conversemos cuál es el nivel adecuado para tu organización. Escríbenos y te contamos los
            alcances de cada categoría.
          </p>
          <div className="mt-6">
            <a href={MAILTO} className="btn-primary">Conversemos por correo</a>
          </div>
        </div>
      </section>

      {/* d) TRANSPARENCIA */}
      <section className="container-cci py-16 md:py-20">
        <Kicker>Transparencia</Kicker>
        <h2 className="max-w-3xl font-display text-2xl font-800 leading-tight text-cci-ink md:text-3xl">
          Socio, patrocinador y publicidad no son lo mismo
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TRANSPARENCIA.map((t) => (
            <div
              key={t.titulo}
              className={`flex flex-col gap-3 rounded-2xl p-7 ${
                t.destacada
                  ? "bg-cci-graphite-dark text-white shadow-card"
                  : "border border-cci-line bg-white text-cci-ink"
              }`}
            >
              <h3 className={`font-display text-xl font-800 ${t.destacada ? "text-white" : "text-cci-ink"}`}>
                {t.titulo}
              </h3>
              <p className={`text-sm leading-relaxed ${t.destacada ? "text-white/75" : "text-cci-slate"}`}>
                {t.desc}
              </p>
              {t.destacada && (
                <span className="mt-2 w-fit rounded-full bg-cci-orange px-3 py-1 text-[11px] font-700 uppercase tracking-wide text-white">
                  Membresía
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* e) YA SON PARTE — muro compacto */}
      <section className="bg-cci-paper py-16 md:py-20">
        <div className="container-cci">
          <Kicker>Ya son parte</Kicker>
          <h2 className="max-w-3xl font-display text-2xl font-800 leading-tight text-cci-ink md:text-3xl">
            Las organizaciones que ya están dentro
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-cci-slate">
            El prestigio del Consejo lo construyen quienes ya son socios. Súmate a ese ecosistema.
          </p>
          <div className="mt-8">
            <MuroSocios empresas={empresas} compact />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/nosotros#socios"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cci-orange hover:text-cci-orange-dark"
            >
              Ver el muro completo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CIERRE — CTA mailto */}
      <section className="relative overflow-hidden bg-cci-graphite-dark">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{ backgroundImage: "radial-gradient(circle at 88% 20%, #E04E00 0%, transparent 45%), radial-gradient(circle at 5% 90%, #5C5C5C 0%, transparent 45%)" }}
        />
        <div className="container-cci relative py-16 text-center md:py-20">
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-900 leading-tight text-white md:text-4xl">
            Suma a tu organización al CCI
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            Cuéntanos brevemente quiénes son y por qué quieren ser parte. Conversemos.
          </p>
          <div className="mt-8">
            <a href={MAILTO} className="btn-primary">Postula por correo</a>
          </div>
          <p className="mt-4 text-sm text-white/50">La postulación se gestiona por correo: cci@cdt.cl</p>
        </div>
      </section>
    </>
  );
}
