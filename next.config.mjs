/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // EXPORTACIÓN ESTÁTICA.
  // El sitio se compila a HTML, CSS y JS planos: no queda ningún servidor
  // Node ejecutándose en producción. Es la decisión de seguridad más
  // importante del proyecto, porque elimina de raíz toda la superficie de
  // ataque del lado del servidor (Server Actions, middleware, API routes).
  // Contrapartida: no se pueden usar funciones de servidor. Si algún día se
  // necesitan (por ejemplo, un formulario con backend propio), habrá que
  // quitar esta línea y volver a evaluar la seguridad.
  output: "export",

  // La optimización de imágenes de Next requiere servidor; con export estático
  // se sirven tal cual. Las fotos ya vienen dimensionadas desde el origen.
  images: { unoptimized: true },

  // URLs con barra final: /radar/ en vez de /radar. Evita redirecciones
  // innecesarias en hostings de archivos estáticos.
  trailingSlash: true,
};

export default nextConfig;
