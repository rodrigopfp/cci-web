import { getArticles } from "@/sanity/fetch";
import { NoticiasClient } from "./NoticiasClient";

export const metadata = {
  title: "Actualidad · CCI",
  description: "Cobertura editorial, casos de socios y contenido patrocinado sobre construcción industrializada.",
};

export default async function NoticiasPage() {
  const articles = await getArticles();
  return <NoticiasClient articles={articles} />;
}
