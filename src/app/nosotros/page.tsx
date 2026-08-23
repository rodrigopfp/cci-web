import Link from "next/link";
import { NosotrosCifras } from "@/components/NosotrosCifras";
import { MuroSocios } from "@/components/MuroSocios";
import { getEmpresasVitrina } from "@/sanity/fetch";

export const metadata = {
  title: "Quiénes somos · CCI",
  description:
    "El Consejo de Construcción Industrializada (CCI) articula al ecosistema de la construcción industrializada en Chile y Latinoamérica: qué es, su misión y visión, objetivos, cifras y trayectoria.",
};

const EICI_2025 =
  "https://construccionindustrializada.cl/2025/09/25/industrializacion-a-escala-nacional-eici-cierra-su-edicion-2025-con-actividades-a-lo-largo-del-pais/";

// Antetítulo (kicker) con filete naranja, para fondos claros.
function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-1 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange">
      <span className="h-[2px] w-6 bg-cci-orange" />
      {children}
    </div>
  );
}

// Línea de fuente al pie de un bloque (texto plano; la Memoria no tiene URL).
function FuenteTexto({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 text-xs font-600 text-cci-slate-light">{children}</p>;
}

// Objetivos estratégicos del Consejo (Memoria CCI 2022-2024). Cada tarjeta lleva
// una fotografía arriba (gentileza de socios CCI).
const OBJETIVOS = [
  {
    titulo: "Difusión y formación",
    desc: "Posicionar el concepto de industrialización y sus atributos mediante seminarios, capacitación, casos de éxito y buenas prácticas.",
    img: "/nosotros/nosotros-difusion.jpg",
    alt: "Visita técnica a planta industrializada",
  },
  {
    titulo: "Vinculación con el medio",
    desc: "Ser facilitador y articulador entre la industria, el Estado y la academia para aumentar la penetración de la construcción industrializada.",
    img: "/nosotros/nosotros-vinculacion.jpg",
    alt: "Comunidad de socios del CCI reunida",
  },
  {
    titulo: "Productividad y sustentabilidad",
    desc: "Promover la productividad y eficiencia asociadas a la industrialización, a partir de la normalización e integración de estándares y procedimientos de la construcción.",
    img: "/nosotros/nosotros-productividad.jpg",
    alt: "Línea de producción en planta industrializada",
  },
];

// Hitos de la trayectoria (Memoria CCI 2022-2024). El último es futuro/destacado.
const HITOS = [
  { anio: "2017", texto: "El CCI se conforma, impulsado por el programa Construye2025 de Corfo." },
  { anio: "2019", texto: "El Consejo pasa a sustentarse con las membresías de sus socios; parte con 32 asociados." },
  { anio: "2022", texto: "Presencia en Feria Edifica con soluciones habitacionales de socios en la Plaza de la Industrialización." },
  { anio: "2023", texto: "Se publica la norma NCh3744 de construcción industrializada, impulsada desde el CCI, y se realiza el Encuentro Nacional en nueve regiones." },
  { anio: "2025", texto: "Encuentro Internacional de Construcción Industrializada (EICI), con actividades en 14 ciudades." },
  { anio: "2027", texto: "Próxima edición del EICI, los días 8, 9 y 10 de septiembre.", destacado: true, href: "/eici" },
];

export default async function NosotrosPage() {
  const empresas = await getEmpresasVitrina();
  return (
    <>
      {/* 1. HERO — fondo claro y sobrio */}
      <section className="border-b border-cci-line bg-white">
        <div className="container-cci grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <div className="inline-flex w-fit items-center whitespace-nowrap border-l-4 border-cci-orange bg-cci-orange-soft py-2 pl-4 pr-3 text-[11px] font-700 uppercase leading-none tracking-[0.15em] text-cci-orange-dark md:text-xs">
              Quiénes somos
            </div>
            <h1 className="mt-5 font-display text-3xl font-900 leading-[1.08] text-cci-ink md:text-5xl">
              El ecosistema que está industrializando la construcción en Chile y{" "}
              <span className="text-cci-orange">Latam</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cci-slate">
              El Consejo de Construcción Industrializada articula a empresas, profesionales, instituciones y
              academia en torno a un objetivo común: elevar la productividad y la sustentabilidad de la
              construcción a través de la industrialización.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/nosotros/ecosistema-mapa.png"
              alt="Mapa del ecosistema de la construcción industrializada del CCI en Chile y Latinoamérica."
              width={990}
              height={996}
              className="h-auto w-full max-w-[460px]"
            />
          </div>
        </div>
      </section>

      {/* 2. QUÉ ES EL CCI — dos columnas en escritorio */}
      <section className="container-cci py-14 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <Kicker>Qué es el CCI</Kicker>
            <h2 className="font-display text-2xl font-800 leading-tight text-cci-ink md:text-3xl">
              Una entidad técnica y permanente del sector
            </h2>
          </div>
          <div>
            <div className="space-y-4 text-[17px] leading-[1.75] text-cci-ink/90">
              <p>
                El Consejo de Construcción Industrializada (CCI) es una entidad de carácter técnico y permanente
                que convoca a empresas, profesionales independientes, instituciones académicas y entidades
                públicas y privadas, para trabajar de forma colaborativa en el desarrollo técnico, la formación y
                la difusión de buenas prácticas que promuevan la construcción industrializada en Chile.
              </p>
              <p>
                Fue impulsado en 2017 por el programa Construye2025 de Corfo. Desde 2019 se sustenta con las
                membresías de sus socios y su secretaría ejecutiva está a cargo de la Corporación de Desarrollo
                Tecnológico (CDT).
              </p>
              <p className="font-700 text-cci-ink">
                En 2023, con 120 asociados, el CCI se consolidó como el mayor ecosistema de construcción
                industrializada de Latinoamérica.
              </p>
            </div>
            <FuenteTexto>Fuente: Memoria CCI 2022-2024</FuenteTexto>
          </div>
        </div>
      </section>

      {/* 3. MISIÓN Y VISIÓN — bloque oscuro */}
      <section className="bg-cci-graphite-dark py-14 md:py-16">
        <div className="container-cci max-w-4xl">
          <div className="mb-4 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange-light">
            <span className="h-[2px] w-6 bg-cci-orange" />
            Misión
          </div>
          <p className="border-l-4 border-cci-orange pl-6 font-display text-2xl font-800 leading-snug text-white md:text-[2rem]">
            Promover el desarrollo de soluciones industrializadas y prefabricadas que mejoren la calidad, la
            productividad y la sustentabilidad en la edificación, incorporando mejores prácticas, tecnología e
            innovación en toda su cadena de valor.
          </p>

          <div className="my-9 border-t border-white/15" />

          <div className="mb-4 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange-light">
            <span className="h-[2px] w-6 bg-cci-orange" />
            Nuestra visión
          </div>
          <p className="border-l-4 border-cci-orange pl-6 font-display text-2xl font-800 leading-snug text-white md:text-[2rem]">
            Industrializar la construcción en Chile para ser el sector más productivo.
          </p>
        </div>
      </section>

      {/* 4. OBJETIVOS + DESAFÍO */}
      <section className="container-cci py-14 md:py-16">
        <Kicker>Objetivos</Kicker>
        <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">En qué trabaja el Consejo</h2>
        {/* Tarjetas con foto. La grilla y el comportamiento full-bleed en móvil
            se definen en globals.css (.obj-grid / .obj-card) para controlar los
            breakpoints (701px, 1101px) y el orden de las reglas. */}
        <div className="obj-grid mt-7">
          {OBJETIVOS.map((o) => (
            <article key={o.titulo} className="obj-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="obj-card__photo" src={o.img} alt={o.alt} loading="lazy" />
              <div className="obj-card__body">
                <h3 className="font-display text-lg font-800 text-cci-ink">{o.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cci-slate">{o.desc}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Desafío destacado */}
        <div className="mt-6 rounded-r-lg border-l-4 border-cci-orange bg-cci-orange-soft px-6 py-5 text-[17px] leading-relaxed text-cci-graphite">
          <span className="font-800 text-cci-orange-dark">Nuestro desafío:</span> lograr la integración de la
          industrialización desde etapas tempranas de los proyectos, vinculando la cadena de valor completa,
          desde el diseño y la planificación hasta el montaje.
        </div>
        <div className="mt-5 text-xs font-600 text-cci-slate-light">
          <p>Fuente: Memoria CCI 2022-2024</p>
          <p className="mt-1">Fotografías gentileza de socios CCI · Memoria CCI 2022-2024</p>
        </div>
      </section>

      {/* 5. EL ECOSISTEMA EN CIFRAS */}
      <section className="bg-cci-paper py-14 md:py-16">
        <div className="container-cci">
          <Kicker>El ecosistema en cifras</Kicker>
          <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">Trayectoria y alcance</h2>
          <div className="mt-8">
            <NosotrosCifras />
          </div>
        </div>
      </section>

      {/* 6. TRAYECTORIA — línea de tiempo (horizontal en escritorio, vertical en móvil) */}
      <section className="container-cci py-14 md:py-16">
        <Kicker>Trayectoria</Kicker>
        <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">Hitos del Consejo</h2>

        {/* Escritorio: 6 columnas, punto sobre una línea superior continua */}
        <div className="relative mt-10 hidden lg:block">
          <div className="absolute left-0 right-0 top-1.5 h-0.5 bg-cci-line" />
          <ol className="relative grid grid-cols-6 gap-6">
            {HITOS.map((h) => (
              <li key={h.anio}>
                <span
                  className={`block h-3.5 w-3.5 rounded-full border-2 border-white ring-1 ${
                    h.destacado ? "bg-cci-orange ring-cci-orange" : "bg-cci-slate-light ring-cci-line"
                  }`}
                />
                <div className="mt-4 font-mono text-xl font-700 tabular-nums text-cci-orange">{h.anio}</div>
                <p className="mt-2 text-sm leading-snug text-cci-slate">{h.texto}</p>
                {h.href && (
                  <Link href={h.href} className="mt-2 inline-flex items-center gap-1 text-sm font-600 text-cci-orange hover:text-cci-orange-dark">
                    Ver EICI
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Móvil: vertical, con línea a la izquierda */}
        <ol className="relative mt-8 space-y-7 border-l-2 border-cci-line pl-7 lg:hidden">
          {HITOS.map((h) => (
            <li key={h.anio} className="relative">
              <span
                className={`absolute -left-[35px] top-1 h-3.5 w-3.5 rounded-full border-2 border-white ring-1 ${
                  h.destacado ? "bg-cci-orange ring-cci-orange" : "bg-cci-slate-light ring-cci-line"
                }`}
              />
              <div className="font-mono text-lg font-700 tabular-nums text-cci-orange">{h.anio}</div>
              <p className="mt-1 text-sm leading-snug text-cci-slate">{h.texto}</p>
              {h.href && (
                <Link href={h.href} className="mt-1.5 inline-flex items-center gap-1 text-sm font-600 text-cci-orange hover:text-cci-orange-dark">
                  Ver EICI
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              )}
            </li>
          ))}
        </ol>
        <FuenteTexto>Fuente: Memoria CCI 2022-2024</FuenteTexto>
      </section>

      {/* 7. CÓMO SE ORGANIZA */}
      <section className="bg-cci-paper py-14 md:py-16">
        <div className="container-cci max-w-3xl">
          <Kicker>Cómo se organiza</Kicker>
          <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">Socios, categorías y trabajo técnico</h2>
          <div className="mt-5 space-y-4 text-[17px] leading-[1.75] text-cci-ink/90">
            <p>
              El Consejo reúne a sus socios en categorías de membresía —Oro, Plata, Bronce, Profesionales y
              Academia—, junto a los patrocinadores institucionales que respaldan su trabajo.
            </p>
            <p>
              El trabajo se desarrolla en grupos técnicos, plenarios de socios, encuentros técnicos y roadshows,
              conducido por un directorio elegido por los socios.
            </p>
            <p>
              El CCI mantiene alianzas con la AOA, la AICE, el Colegio de Arquitectos y el Colegio de Ingenieros,
              además del trabajo conjunto con la CChC y Construye2025.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/vitrina" className="btn-primary">
              Conoce a las empresas socias
            </Link>
            <Link
              href="/voces"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cci-line bg-white px-5 py-2.5 text-sm font-semibold text-cci-graphite transition hover:border-cci-graphite hover:bg-cci-paper"
            >
              Voces de la industrialización
            </Link>
          </div>
        </div>
      </section>

      {/* 7b. MURO NUESTROS SOCIOS — institucional, por niveles (datos reales CMS) */}
      <section id="socios" className="scroll-mt-[120px] border-t border-cci-line bg-white py-14 md:py-16">
        <div className="container-cci">
          <Kicker>Nuestros socios</Kicker>
          <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">
            Quiénes hacen posible al CCI
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-cci-slate">
            El muro institucional de los socios del Consejo, por categoría. Sin elementos comerciales:
            pertenencia.
          </p>
          <div className="mt-10">
            <MuroSocios empresas={empresas} />
          </div>
        </div>
      </section>

      {/* 8. CIERRE — membresía, fondo oscuro */}
      <section className="bg-cci-graphite-dark py-16 md:py-20">
        <div className="container-cci max-w-4xl">
          <div className="inline-flex w-fit items-center whitespace-nowrap border-l-4 border-cci-orange bg-white/[0.06] py-2 pl-4 pr-3 text-[11px] font-700 uppercase leading-none tracking-[0.15em] text-[#F5EEE6] md:text-xs">
            Membresía
          </div>
          <h2 className="mt-5 font-display text-3xl font-900 leading-tight text-white md:text-4xl">
            Postula a ser socio CCI
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            Postular a socio es integrarse a la red de construcción industrializada más grande de Latinoamérica:
            donde se sientan los estándares del sector, se comparte conocimiento técnico y se trabaja junto al
            Estado, la industria y la academia.
          </p>
          <p className="mt-5 max-w-2xl font-display text-xl font-800 leading-snug text-cci-orange-light">
            Suma a tu organización a ese ecosistema.
          </p>
          <div className="mt-8">
            <a href="mailto:cci@cdt.cl?subject=Postulaci%C3%B3n%20a%20socio%20CCI" className="btn-primary">
              Postular a socio CCI
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
