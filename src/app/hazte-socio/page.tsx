import Link from "next/link";

// Versión mínima funcional (revisión 22/08, prompt 1/3). El prompt 3 la
// convertirá en la página completa. El correo es el que ya usa el sitio para
// la postulación a socio (ver /nosotros): cci@cdt.cl.

export const metadata = {
  title: "Postula a ser socio CCI",
  description:
    "Pertenecer al Consejo de Construcción Industrializada es sumarse al ecosistema que está transformando la construcción en Chile. Postula a ser socio CCI.",
};

const MAILTO = "mailto:cci@cdt.cl?subject=Postulaci%C3%B3n%20a%20socio%20CCI";

export default function HazteSocioPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-cci-line bg-cci-graphite-dark">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{ backgroundImage: "radial-gradient(circle at 88% 20%, #E04E00 0%, transparent 45%), radial-gradient(circle at 5% 90%, #5C5C5C 0%, transparent 45%)" }}
        />
        <div className="container-cci relative py-20 md:py-24">
          <div className="inline-flex w-fit items-center whitespace-nowrap border-l-4 border-cci-orange bg-white/[0.06] py-2 pl-4 pr-3 text-[11px] font-700 uppercase leading-none tracking-[0.15em] text-[#F5EEE6] md:text-xs">
            Membresía
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-900 leading-[1.05] text-white md:text-5xl">
            Postula a ser <span className="text-cci-orange">socio CCI</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            Ser socio del Consejo de Construcción Industrializada es integrarse al ecosistema que está
            transformando la construcción en Chile y Latinoamérica: donde se sientan los estándares del
            sector, se comparte conocimiento técnico y se trabaja junto al Estado, la industria y la
            academia.
          </p>
        </div>
      </section>

      {/* CUERPO */}
      <section className="container-cci max-w-3xl py-16">
        <div className="space-y-6 text-lg leading-relaxed text-cci-slate">
          <p>
            Formar parte del CCI es un reconocimiento y una responsabilidad. Las empresas e
            instituciones que ya son socias comparten una convicción: que industrializar es el camino
            para construir con más productividad, más control y menos incertidumbre.
          </p>
          <p>
            El prestigio del Consejo lo construyen quienes ya están dentro. Sumar a tu organización es
            hacer visible su compromiso con ese estándar y participar de una red que representa al
            sector ante el país.
          </p>
          <p>
            Si quieres postular, escríbenos y conversemos. Cuéntanos brevemente quiénes son y por qué
            quieren ser parte.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href={MAILTO} className="btn-primary">Postula a ser socio CCI</a>
          <Link href="/nosotros" className="btn-ghost">Conoce al CCI</Link>
        </div>
        <p className="mt-4 text-sm text-cci-slate-light">
          La postulación se gestiona por correo electrónico: cci@cdt.cl
        </p>
      </section>
    </>
  );
}
