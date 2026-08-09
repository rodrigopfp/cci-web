/**
 * Carga el listado oficial del MINVU de empresas en convenio directo con la
 * DITEC como documentos `convenioDitec`. Es un listado DISTINTO al de empresas
 * certificadas (incluye a Easywood, que no está entre las certificadas).
 *
 * Requiere un token de escritura (rol Editor/Administrator). Se ejecuta desde
 * la raíz del proyecto:
 *   SANITY_TOKEN=xxxxx npx tsx scripts/cargar-convenios.ts
 * (para obtener el token: `cd studio && npx sanity debug --secrets`)
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "gt9dfhv2",
  dataset: "production",
  apiVersion: "2024-10-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// Listado oficial (MINVU · DITEC). Orden del listado publicado.
const CONVENIOS = [
  "Constructora Santa Magdalena SpA",
  "E2E S.A.",
  "Patagual Home SpA",
  "Tecnotruss S.A.",
  "Easywood S.A.",
  "Baumax SpA",
];

const id = (nombre: string) =>
  `convenio-${nombre.replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase()}`;

async function run() {
  console.log(`\n== Cargando ${CONVENIOS.length} convenios DITEC ==`);
  let tx = client.transaction();
  for (const nombre of CONVENIOS) {
    // createOrReplace: idempotente, no duplica si se vuelve a correr.
    tx = tx.createOrReplace({ _id: id(nombre), _type: "convenioDitec", nombre });
    console.log(`  + ${nombre}`);
  }
  await tx.commit();

  const total = await client.fetch<number>(`count(*[_type=="convenioDitec"])`);
  const nombres = await client.fetch<string[]>(
    `*[_type=="convenioDitec"]|order(nombre asc).nombre`
  );
  console.log(`\n== Verificación ==`);
  console.log(`  documentos convenioDitec: ${total} (esperado 6)`);
  console.log(`  incluye Easywood: ${nombres.some((n) => n.includes("Easywood"))}`);
  console.log(`  ${nombres.join(" | ")}`);
}

run().catch((e) => {
  console.error("ERROR:", e.message || e);
  process.exit(1);
});
