import Link from "next/link";

// Ruta fusionada (revisión 22/08, prompt 2): la evidencia ahora vive dentro de
// CCI Data, capítulo 4 (/data#cap4). En producción, Caddy responde un 301
// permanente antes de servir este archivo (ver Caddyfile). Este stub es el
// respaldo para entornos que sirven los estáticos sin esa regla: redirige por
// meta refresh y ofrece el enlace manual.

export const metadata = {
  title: "Redirigiendo a CCI Data…",
  robots: { index: false, follow: false },
};

export default function EvidenciaRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/data/#cap4" />
      <section className="container-cci py-24 text-center">
        <p className="text-cci-slate">
          La evidencia ahora vive dentro de <strong>CCI Data</strong>. Redirigiéndote…
        </p>
        <p className="mt-4">
          <Link href="/data/#cap4" className="btn-primary">Ir a la evidencia en CCI Data</Link>
        </p>
      </section>
    </>
  );
}
