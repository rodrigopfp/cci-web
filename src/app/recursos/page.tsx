import Link from "next/link";

// Ruta renombrada (Fase 2 · paso 4): /recursos se fusionó en la Biblioteca
// editorial (/conocimiento). En producción, Caddy responde un 301 permanente
// antes de servir este archivo (ver Caddyfile). Este stub es el respaldo para
// entornos que sirven los estáticos sin esa regla: meta refresh + enlace manual.

export const metadata = {
  title: "Redirigiendo a Conocimiento…",
  robots: { index: false, follow: false },
};

export default function RecursosRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/conocimiento/" />
      <section className="container-cci py-24 text-center">
        <p className="text-cci-slate">
          Los recursos ahora viven en la <strong>Biblioteca de Conocimiento</strong>. Redirigiéndote…
        </p>
        <p className="mt-4">
          <Link href="/conocimiento" className="btn-primary">Ir a Conocimiento</Link>
        </p>
      </section>
    </>
  );
}
