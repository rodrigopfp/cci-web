import Link from "next/link";
import { NosotrosCifras } from "@/components/NosotrosCifras";

export const metadata = {
  title: "Quiénes somos · CCI",
  description:
    "El Consejo de Construcción Industrializada (CCI) articula al ecosistema de la construcción industrializada en Chile: qué es, su misión, sus focos estratégicos y cómo se organiza.",
};

const FUENTE_CCI = "https://construccionindustrializada.cl/quienes-somos/";

// Enlace de fuente reutilizable al pie de un bloque.
function FuenteLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-5 inline-flex items-center gap-1.5 text-xs font-600 text-cci-slate-light hover:text-cci-orange-dark"
    >
      {children}
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 17 17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

const FOCOS = [
  {
    titulo: "Productividad",
    desc: "",
    icon: (
      <path d="M3 3v18h18M7 15l4-4 3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    titulo: "Difusión y formación",
    desc: "Posicionar el concepto de industrialización y sus atributos mediante seminarios, capacitación, casos de éxito y buenas prácticas.",
    icon: <path d="M12 3 2 8l10 5 10-5-10-5zM6 10v6c0 1.5 3 3 6 3s6-1.5 6-3v-6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    titulo: "Vinculación con el medio",
    desc: "Ser facilitador y articulador entre la industria, el Estado y la academia para aumentar la penetración de la construcción industrializada.",
    icon: (
      <>
        <circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" />
        <path d="M7.5 7.8 11 15.5M16.5 7.8 13 15.5M8 6h8" strokeLinecap="round" />
      </>
    ),
  },
];

export default function NosotrosPage() {
  const anios = new Date().getFullYear() - 2017;

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
              El ecosistema que está industrializando la construcción en Chile
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
              alt="Mapa del ecosistema del CCI: el logo del Consejo de Construcción Industrializada sobre un mapamundi con nodos conectados en Sudamérica y el texto «El ecosistema de construcción industrializada más grande de Latinoamérica»."
              width={1514}
              height={893}
              className="h-auto w-full max-w-[460px]"
            />
          </div>
        </div>
      </section>

      {/* 2. QUÉ ES EL CCI */}
      <section className="container-cci py-14 md:py-16">
        <div className="max-w-3xl">
          <div className="mb-1 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange">
            <span className="h-[2px] w-6 bg-cci-orange" />
            Qué es el CCI
          </div>
          <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">
            Una entidad técnica y permanente del sector
          </h2>
          <div className="mt-5 space-y-4 text-[17px] leading-[1.75] text-cci-ink/90">
            <p>
              El Consejo de Construcción Industrializada (CCI) nace como iniciativa impulsada por el programa
              Construye2025 de Corfo, para promover la industrialización como estrategia de desarrollo de la
              industria de la construcción nacional, avanzando en productividad y sustentabilidad.
            </p>
            <p>
              Es una entidad de carácter técnico y permanente: un grupo abierto y convocante que desde 2017
              reúne a actores del mundo público y privado que aportan conocimientos y experiencia al
              mejoramiento de las técnicas de industrialización.
            </p>
            <p>
              Su secretaría ejecutiva la ejerce la CDT y cuenta con el patrocinio de la CChC, Corfo y
              Construye2025, entre otras instituciones.
            </p>
          </div>
          <FuenteLink href={FUENTE_CCI}>Fuente: construccionindustrializada.cl/quienes-somos</FuenteLink>
        </div>
      </section>

      {/* 3. MISIÓN — destacada tipográficamente */}
      <section className="bg-cci-paper py-14 md:py-16">
        <div className="container-cci max-w-4xl">
          <div className="mb-4 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange">
            <span className="h-[2px] w-6 bg-cci-orange" />
            Misión
          </div>
          <p className="border-l-4 border-cci-orange pl-6 font-display text-2xl font-800 leading-snug text-cci-graphite md:text-[2rem]">
            Promover el desarrollo de soluciones industrializadas y prefabricadas que mejoren la calidad, la
            productividad y la sustentabilidad en la edificación, incorporando mejores prácticas, tecnología e
            innovación en toda su cadena de valor.
          </p>
        </div>
      </section>

      {/* 4. TRES FOCOS ESTRATÉGICOS */}
      <section className="container-cci py-14 md:py-16">
        <div className="mb-1 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange">
          <span className="h-[2px] w-6 bg-cci-orange" />
          Focos estratégicos
        </div>
        <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">En qué trabaja el Consejo</h2>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {FOCOS.map((f) => (
            <div key={f.titulo} className="flex flex-col rounded-xl border border-cci-line bg-white p-6 shadow-card">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-cci-orange-soft text-cci-orange">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {f.icon}
                </svg>
              </div>
              <h3 className="font-display text-lg font-800 text-cci-ink">{f.titulo}</h3>
              {f.desc && <p className="mt-2 text-sm leading-relaxed text-cci-slate">{f.desc}</p>}
            </div>
          ))}
        </div>
        <FuenteLink href={FUENTE_CCI}>Fuente: construccionindustrializada.cl/quienes-somos</FuenteLink>
      </section>

      {/* 5. EL ECOSISTEMA EN CIFRAS */}
      <section className="bg-cci-paper py-14 md:py-16">
        <div className="container-cci">
          <div className="mb-1 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange">
            <span className="h-[2px] w-6 bg-cci-orange" />
            El ecosistema en cifras
          </div>
          <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">Trayectoria y alcance</h2>
          <div className="mt-8">
            <NosotrosCifras anios={anios} />
          </div>
        </div>
      </section>

      {/* 6. CÓMO SE ORGANIZA */}
      <section className="container-cci py-14 md:py-16">
        <div className="max-w-3xl">
          <div className="mb-1 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange">
            <span className="h-[2px] w-6 bg-cci-orange" />
            Cómo se organiza
          </div>
          <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">Socios, categorías y trabajo técnico</h2>
          <div className="mt-5 space-y-4 text-[17px] leading-[1.75] text-cci-ink/90">
            <p>
              El Consejo reúne a sus socios en categorías de membresía —Oro, Plata, Bronce, Profesionales y
              Academia—, junto a los patrocinadores institucionales que respaldan su trabajo.
            </p>
            <p>
              El trabajo técnico se organiza en grupos de trabajo, y un directorio elegido por los socios
              conduce la organización y define sus prioridades.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/vitrina" className="btn-primary">
              Conoce a las empresas socias
            </Link>
            <Link
              href="/voces"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cci-line px-5 py-2.5 text-sm font-semibold text-cci-graphite transition hover:border-cci-graphite hover:bg-cci-paper"
            >
              Voces de la industrialización
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CIERRE — membresía, fondo oscuro */}
      <section className="bg-cci-graphite-dark py-16 md:py-20">
        <div className="container-cci max-w-4xl">
          <div className="inline-flex w-fit items-center whitespace-nowrap border-l-4 border-cci-orange bg-white/[0.06] py-2 pl-4 pr-3 text-[11px] font-700 uppercase leading-none tracking-[0.15em] text-[#F5EEE6] md:text-xs">
            Membresía
          </div>
          <h2 className="mt-5 font-display text-3xl font-900 leading-tight text-white md:text-4xl">
            Postula a ser socio CCI
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            Pertenecer al Consejo es integrarse al grupo de empresas, profesionales e instituciones que están
            definiendo cómo se construirá en Chile y Latinoamérica: donde se sientan los estándares del sector,
            se comparte conocimiento técnico y se trabaja junto al Estado, la industria y la academia.
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
