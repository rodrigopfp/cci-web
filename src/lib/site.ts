// URL pública del sitio, usada para canonical, Open Graph, JSON-LD y sitemap.
// Default: el dominio Railway donde el sitio vive HOY (evita canonical/OG a un
// dominio inexistente). El dominio oficial (www.construccionindustrializada.cl)
// se activará vía NEXT_PUBLIC_SITE_URL cuando exista.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://cci-web-production.up.railway.app";
