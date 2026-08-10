/**
 * Semilla del singleton "eici" (configuración de la página del Encuentro).
 *
 * createOrReplace con _id fijo "eici-config": re-ejecutar actualiza el mismo
 * documento, nunca duplica. La página /eici lee este singleton en el build.
 *
 * Ejecutar:  npx tsx scripts/cargar-eici.ts
 * Requiere SANITY_WRITE_TOKEN (permiso Editor) en .env.local — nunca se commitea.
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function cargarToken(): string {
  if (process.env.SANITY_WRITE_TOKEN) return process.env.SANITY_WRITE_TOKEN.trim();
  for (const archivo of [".env.local", ".env"]) {
    try {
      const txt = readFileSync(resolve(process.cwd(), archivo), "utf8");
      for (const linea of txt.split(/\r?\n/)) {
        const m = linea.match(/^\s*SANITY_WRITE_TOKEN\s*=\s*(.+?)\s*$/);
        if (m) return m[1].replace(/^["']|["']$/g, "").trim();
      }
    } catch {
      // el archivo puede no existir; seguimos con el siguiente
    }
  }
  throw new Error(
    "Falta SANITY_WRITE_TOKEN. Créalo en sanity.io/manage (API > Tokens, permiso " +
      "Editor) y agrégalo a .env.local como: SANITY_WRITE_TOKEN=<valor>"
  );
}

const client = createClient({
  projectId: "gt9dfhv2",
  dataset: "production",
  apiVersion: "2024-10-01",
  token: cargarToken(),
  useCdn: false,
});

async function main() {
  const doc = {
    _id: "eici-config",
    _type: "eici",
    tituloProximaEdicion: "EICI 2027",
    fechaInicio: "2027-09-08",
    fechaFin: "2027-09-10",
    // lugar: se deja sin definir → la página muestra "Por confirmar".
    emailCallForSpeakers: "cci@cdt.cl",
    mostrarCallForSpeakers: true,
    galeria: [],
  };
  await client.createOrReplace(doc);
  console.log(`  ✔ ${doc._id} — ${doc.tituloProximaEdicion} (${doc.fechaInicio} a ${doc.fechaFin})`);
  console.log("\nListo: singleton EICI publicado en Sanity (dataset production).");
}

main().catch((err) => {
  console.error("Error al cargar EICI:", err instanceof Error ? err.message : err);
  process.exit(1);
});
