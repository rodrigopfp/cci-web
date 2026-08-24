import { getEmpresasVitrina } from "@/sanity/fetch";
import { SITE_URL } from "@/lib/site";
import { VitrinaClient } from "./VitrinaClient";

const DESCRIPCION =
  "Directorio del ecosistema de la construcción industrializada en Chile: empresas socias y publicaciones identificadas, por tipo de solución y zona.";

export const metadata = {
  title: "Vitrina de socios · CCI",
  description: DESCRIPCION,
  alternates: { canonical: `${SITE_URL}/vitrina/` },
  openGraph: {
    type: "website",
    title: "Vitrina de socios · CCI",
    description: DESCRIPCION,
    url: `${SITE_URL}/vitrina/`,
    siteName: "CCI",
  },
};

export default async function VitrinaPage() {
  const empresas = await getEmpresasVitrina();
  return <VitrinaClient empresas={empresas} />;
}
