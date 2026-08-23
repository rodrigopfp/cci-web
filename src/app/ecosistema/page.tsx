import Link from "next/link";

// Ruta renombrada (revisión 22/08): /ecosistema ahora vive en /vitrina.
// En producción, Caddy responde un 301 permanente antes de servir este archivo
// (ver Caddyfile). Este stub es el respaldo para entornos que sirven los
// estáticos sin esa regla: redirige por meta refresh y ofrece el enlace manual.

export const metadata = {
  title: "Redirigiendo a la Vitrina…",
  robots: { index: false, follow: false },
};

export default function EcosistemaRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/vitrina/" />
      <section className="container-cci py-24 text-center">
        <p className="text-cci-slate">
          Esta sección ahora es la <strong>Vitrina</strong>. Redirigiéndote…
        </p>
        <p className="mt-4">
          <Link href="/vitrina" className="btn-primary">Ir a la Vitrina</Link>
        </p>
      </section>
    </>
  );
}
