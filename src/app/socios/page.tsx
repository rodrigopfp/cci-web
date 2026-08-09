import { getPartners } from "@/sanity/fetch";
import { SociosClient } from "./SociosClient";

export const metadata = {
  title: "Ecosistema · Empresas certificadas · CCI",
  description: "Empresas industrializadoras certificadas por la DITEC del MINVU. Filtra por tipo de solución.",
};

export default async function SociosPage() {
  const partners = await getPartners();
  return <SociosClient partners={partners} />;
}
