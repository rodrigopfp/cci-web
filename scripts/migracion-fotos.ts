/**
 * MIGRACIÓN puntual (se ejecuta una sola vez):
 *
 *  1. Parchea las 15 noticias con fotoUrl + colorDesde + colorHasta, tomando
 *     los valores de src/data/articles.ts (foto de Unsplash y colores del
 *     degradado image.from / image.to que no se habían migrado).
 *  2. Borra los 3 indicadores huérfanos (código muerto de pendingIndicators):
 *     empresas-cl, plantas-cl, viviendas-ind-cl.
 *
 * Se ejecuta desde la carpeta studio con el token del usuario ya logueado:
 *   cd studio
 *   npx sanity exec ../scripts/migracion-fotos.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";
import { articles } from "../src/data/articles.respaldo";

const client = getCliClient({ apiVersion: "2024-10-01" });

const HUERFANOS = ["empresas-cl", "plantas-cl", "viviendas-ind-cl"];

async function run() {
  console.log(`\n== 1. Parcheando ${articles.length} noticias ==`);
  let parchadas = 0;
  for (const a of articles) {
    const doc = await client.fetch<{ _id: string } | null>(
      `*[_type=="noticia" && slug.current==$slug][0]{_id}`,
      { slug: a.slug }
    );
    if (!doc?._id) {
      console.warn(`  !! No se encontró la noticia con slug: ${a.slug}`);
      continue;
    }
    await client
      .patch(doc._id)
      .set({
        fotoUrl: a.photo,
        colorDesde: a.image.from,
        colorHasta: a.image.to,
      })
      .commit();
    parchadas++;
    console.log(`  OK ${a.slug}`);
  }
  console.log(`  -> ${parchadas}/${articles.length} noticias parchadas.`);

  console.log(`\n== 2. Borrando indicadores huérfanos ==`);
  const ids = await client.fetch<string[]>(
    `*[_type=="indicador" && clave in $claves]._id`,
    { claves: HUERFANOS }
  );
  for (const id of ids) {
    await client.delete(id);
    console.log(`  Borrado: ${id}`);
  }
  console.log(`  -> ${ids.length} indicadores borrados.`);

  // Verificación
  const pendientes = await client.fetch<number>(
    `count(*[_type=="indicador" && grupo=="pendiente"])`
  );
  const conFoto = await client.fetch<number>(
    `count(*[_type=="noticia" && defined(fotoUrl)])`
  );
  console.log(`\n== Verificación ==`);
  console.log(`  indicadores grupo "pendiente": ${pendientes} (esperado 3)`);
  console.log(`  noticias con fotoUrl: ${conFoto} (esperado 15)`);
}

run().catch((e) => {
  console.error("ERROR:", e);
  process.exit(1);
});
