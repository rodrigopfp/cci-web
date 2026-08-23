import { getRecursosBiblioteca } from "@/sanity/fetch";
import { SITE_URL } from "@/lib/site";
import { ConocimientoClient } from "./ConocimientoClient";

const DESCRIPCION =
  "Biblioteca del Consejo de Construcción Industrializada: guías, estudios, normativa y herramientas del sector, con su estado y su fuente.";

export const metadata = {
  title: "Conocimiento · Biblioteca CCI",
  description: DESCRIPCION,
  alternates: { canonical: `${SITE_URL}/conocimiento/` },
  openGraph: {
    type: "website",
    title: "Conocimiento · Biblioteca CCI",
    description: DESCRIPCION,
    url: `${SITE_URL}/conocimiento/`,
    siteName: "CCI",
  },
};

export default async function ConocimientoPage() {
  const recursos = await getRecursosBiblioteca();
  return <ConocimientoClient recursos={recursos} />;
}
