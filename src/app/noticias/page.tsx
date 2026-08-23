import Link from "next/link";
import { getArticles } from "@/sanity/fetch";
import { NoticiasClient } from "./NoticiasClient";

export const metadata = {
  title: "Actualidad · CCI",
  description: "Cobertura editorial, casos de socios y contenido patrocinado sobre construcción industrializada.",
};

export default async function NoticiasPage() {
  const articles = await getArticles();
  return (
    <>
      <NoticiasClient articles={articles} />

      {/* VOCES — enlace visible a la sección de referentes */}
      <section className="bg-cci-paper">
        <div className="container-cci flex flex-col items-start justify-between gap-5 py-12 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <div className="mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange">
              <span className="h-[2px] w-6 bg-cci-orange" />
              Voces del CCI
            </div>
            <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">
              Los referentes de la industrialización
            </h2>
            <p className="mt-2 text-cci-slate">
              Columnas y entrevistas de quienes están transformando la construcción en Chile y Latinoamérica.
            </p>
          </div>
          <Link href="/voces" className="btn-primary shrink-0 whitespace-nowrap">
            Ver todas las voces
          </Link>
        </div>
      </section>
    </>
  );
}
