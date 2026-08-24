import { Suspense } from "react";
import { getRecursosBiblioteca } from "@/sanity/fetch";
import { SITE_URL } from "@/lib/site";
import { ConocimientoClient } from "../ConocimientoClient";

const DESCRIPCION =
  "Biblioteca del Consejo de Construcción Industrializada: guías, estudios, normativa y herramientas del sector, con su estado y su fuente.";

// La Biblioteca (índice de recursos) vive aquí; /conocimiento es el hub. Las
// vistas filtradas usan ?categoria=... pero el canonical es siempre esta ruta.
export const metadata = {
  title: "Biblioteca · Conocimiento CCI",
  description: DESCRIPCION,
  alternates: { canonical: `${SITE_URL}/conocimiento/biblioteca/` },
  openGraph: {
    type: "website",
    title: "Biblioteca · Conocimiento CCI",
    description: DESCRIPCION,
    url: `${SITE_URL}/conocimiento/biblioteca/`,
    siteName: "CCI",
  },
};

export default async function BibliotecaPage() {
  const recursos = (await getRecursosBiblioteca()).filter((r) => r.estado !== "archivado");
  return (
    <Suspense fallback={null}>
      <ConocimientoClient recursos={recursos} />
    </Suspense>
  );
}
