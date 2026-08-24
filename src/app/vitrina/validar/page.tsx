import { Suspense } from "react";
import Link from "next/link";
import { getEmpresasVitrina } from "@/sanity/fetch";
import { EMAIL_CCI } from "@/lib/forms";
import { SITE_URL } from "@/lib/site";
import { ValidarClient, type EmpresaValidar } from "./ValidarClient";

// Página utilitaria: noindex y fuera del sitemap (no está en RUTAS_PRINCIPALES).
export const metadata = {
  title: "Validar un perfil de la Vitrina · CCI",
  description: "Confirma o corrige la información de una organización de la Vitrina del CCI.",
  robots: { index: false, follow: true },
  alternates: { canonical: `${SITE_URL}/vitrina/validar/` },
};

// Versión genérica servida como HTML estático (fallback de Suspense): sin JS o
// sin parámetro, hay agradecimiento del contexto + enlace a la Vitrina + respaldo.
function GenericoValidar() {
  const mailto = `mailto:${EMAIL_CCI}?subject=${encodeURIComponent("Validación de perfil Vitrina")}&body=${encodeURIComponent(
    "Hola CCI,\n\nQuiero validar o corregir el perfil de mi organización en la Vitrina.\n\nOrganización:\nNombre y cargo:\nCorreo corporativo:\nDatos a confirmar o corregir:\n\nGracias."
  )}`;
  return (
    <section className="container-cci max-w-2xl py-16">
      <h1 className="font-display text-3xl font-900 leading-tight text-cci-ink md:text-4xl">Validar un perfil de la Vitrina</h1>
      <p className="mt-4 text-cci-slate">
        Para validar o corregir la información de una organización, entra desde el botón
        <strong> «Validar o corregir este perfil»</strong> en su ficha de la Vitrina.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/vitrina" className="btn-primary">Ir a la Vitrina</Link>
        <a href={mailto} data-cta="validar-perfil" data-ubicacion="validar-generico" className="inline-flex items-center rounded-full border border-cci-line px-5 py-2.5 text-sm font-semibold text-cci-graphite transition hover:border-cci-graphite">
          Escribir al equipo
        </a>
      </div>
    </section>
  );
}

export default async function ValidarPage() {
  const empresas = await getEmpresasVitrina();
  const mapa: Record<string, EmpresaValidar> = {};
  for (const e of empresas) if (e.slug) mapa[e.slug] = { nombre: e.nombre };

  return (
    <Suspense fallback={<GenericoValidar />}>
      <ValidarClient empresas={mapa} />
    </Suspense>
  );
}
