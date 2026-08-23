import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Política de privacidad · CCI",
  description:
    "Cómo el Consejo de Construcción Industrializada trata los datos personales recogidos en los formularios del sitio.",
  alternates: { canonical: `${SITE_URL}/privacidad/` },
};

// {/* BORRADOR — validar con el CCI y asesoría legal antes del lanzamiento oficial. */}

export default function PrivacidadPage() {
  return (
    <article className="container-cci max-w-3xl py-12 md:py-16">
      <div className="mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange">
        <span className="h-[2px] w-6 bg-cci-orange" />
        Política de privacidad
      </div>
      <h1 className="font-display text-3xl font-900 leading-tight text-cci-ink md:text-4xl">
        Política de privacidad
      </h1>
      <p className="mt-3 rounded-lg border border-dashed border-cci-orange bg-cci-orange-soft px-4 py-3 text-sm text-cci-graphite">
        Borrador de referencia. Pendiente de validación por el CCI y su asesoría legal antes del
        lanzamiento oficial.
      </p>

      <div className="prose-cci mt-8 space-y-6 text-[17px] leading-[1.75] text-cci-ink/90">
        <section>
          <h2 className="font-display text-xl font-800 text-cci-ink">Responsable</h2>
          <p>
            El responsable del tratamiento de los datos personales es el Consejo de Construcción
            Industrializada (CCI). Para cualquier consulta sobre esta política puedes escribir a{" "}
            <a href="mailto:cci@cdt.cl" className="font-600 text-cci-orange hover:text-cci-orange-dark">cci@cdt.cl</a>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-800 text-cci-ink">Qué datos recogemos</h2>
          <p>
            A través de los formularios del sitio podemos recoger datos que tú entregas
            voluntariamente, como nombre, correo, organización, cargo y país, junto al recurso o la
            gestión que motiva el contacto. No solicitamos datos sensibles.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-800 text-cci-ink">Para qué los usamos</h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>Gestionar postulaciones a socio y su seguimiento.</li>
            <li>Entregar los recursos solicitados y material técnico relacionado.</li>
            <li>Responder consultas y mantener contacto cuando lo autorizas.</li>
          </ul>
          <p className="mt-3">
            No vendemos ni cedemos tus datos a terceros con fines comerciales.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-800 text-cci-ink">Tus derechos</h2>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación y cancelación de tus datos escribiendo
            a{" "}
            <a href="mailto:cci@cdt.cl" className="font-600 text-cci-orange hover:text-cci-orange-dark">cci@cdt.cl</a>.
            Atenderemos tu solicitud en un plazo razonable.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-800 text-cci-ink">Conservación</h2>
          <p>
            Conservamos los datos durante el tiempo necesario para las finalidades descritas o mientras
            exista una relación con el CCI, salvo que solicites su eliminación antes.
          </p>
        </section>
      </div>

      <div className="mt-10">
        <Link href="/conocimiento" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cci-slate hover:text-cci-orange-dark">
          Volver a la biblioteca
        </Link>
      </div>
    </article>
  );
}
