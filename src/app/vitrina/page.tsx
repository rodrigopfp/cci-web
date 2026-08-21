import { getEmpresasVitrina } from "@/sanity/fetch";
import { VitrinaClient } from "./VitrinaClient";

export const metadata = {
  title: "Vitrina de socios · CCI",
  description:
    "Directorio del ecosistema de la construcción industrializada en Chile: empresas socias y publicaciones identificadas, por tipo de solución y zona.",
};

export default async function VitrinaPage() {
  const empresas = await getEmpresasVitrina();
  return <VitrinaClient empresas={empresas} />;
}
