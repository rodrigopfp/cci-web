import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { terminosPublicados } from "@/lib/datos/glosario";
import { getRecursosBiblioteca } from "@/sanity/fetch";
import { PAISES_LATAM } from "@/lib/datos/latam";

// Sitemap del sitio. Con output: "export" se genera /sitemap.xml en build.
// Los términos del glosario en BORRADOR no se incluyen; los recursos archivados
// tampoco.
export const dynamic = "force-static";

const RUTAS_PRINCIPALES = [
  "",
  "noticias",
  "data",
  "data/latam",
  "vitrina",
  "eventos",
  "eici",
  "nosotros",
  "hazte-socio",
  "conocimiento",
  "conocimiento/biblioteca",
  "voces",
  "publica",
  "media-kit",
  "glosario",
  "privacidad",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = RUTAS_PRINCIPALES.map((r) => ({
    url: `${SITE_URL}/${r ? r + "/" : ""}`,
  }));

  const glosario = terminosPublicados().map((t) => ({
    url: `${SITE_URL}/glosario/${t.slug}/`,
    lastModified: t.fechaRevision,
  }));

  const recursos = (await getRecursosBiblioteca())
    .filter((r) => r.slug && r.estado !== "archivado")
    .map((r) => ({
      url: `${SITE_URL}/conocimiento/${r.slug}/`,
      lastModified: r.fechaActualizacion || r.fechaPublicacion,
    }));

  const latam = PAISES_LATAM.filter((p) => p.estadoFicha !== "en_levantamiento").map((p) => ({
    url: `${SITE_URL}/data/latam/${p.codigo}/`,
    lastModified: p.ultimaActualizacion,
  }));

  return [...base, ...glosario, ...recursos, ...latam];
}
