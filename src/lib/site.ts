// URL pública del sitio, usada para canonical, Open Graph, JSON-LD y sitemap.
// Se puede sobreescribir con NEXT_PUBLIC_SITE_URL en el entorno de build.
// ⚠️ Verificar el dominio definitivo del hub CCI si difiere de este valor.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.construccionindustrializada.cl";
