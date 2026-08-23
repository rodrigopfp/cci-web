import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { terminosPublicados } from "@/lib/datos/glosario";

// Sitemap del sitio. Con output: "export" se genera /sitemap.xml en build.
// Los términos del glosario en BORRADOR (publicado: false) NO se incluyen; solo
// aparecen los publicados.
export const dynamic = "force-static";

const RUTAS_PRINCIPALES = [
  "",
  "noticias",
  "data",
  "vitrina",
  "eventos",
  "eici",
  "nosotros",
  "hazte-socio",
  "recursos",
  "voces",
  "publica",
  "media-kit",
  "glosario",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = RUTAS_PRINCIPALES.map((r) => ({
    url: `${SITE_URL}/${r ? r + "/" : ""}`,
  }));

  const glosario = terminosPublicados().map((t) => ({
    url: `${SITE_URL}/glosario/${t.slug}/`,
    lastModified: t.fechaRevision,
  }));

  return [...base, ...glosario];
}
