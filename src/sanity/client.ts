import { createClient } from "@sanity/client";

/**
 * Cliente de Sanity para LECTURA en tiempo de compilación.
 *
 * El sitio es 100% estático (output: "export"): este cliente solo se usa al
 * compilar, nunca desde el navegador del visitante. Por eso useCdn: true — se
 * consulta la API con caché de Sanity, más rápida y suficiente para un build.
 *
 * projectId y dataset se leen de variables de entorno (NEXT_PUBLIC_*) para no
 * incrustar identificadores en el código. En desarrollo viven en .env.local;
 * en producción (Railway) se inyectan como ARG/ENV antes de `npm run build`.
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    "Faltan variables de entorno de Sanity. Define NEXT_PUBLIC_SANITY_PROJECT_ID " +
      "y NEXT_PUBLIC_SANITY_DATASET en .env.local (desarrollo) o en Railway (producción)."
  );
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  useCdn: true,
});
