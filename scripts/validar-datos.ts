/**
 * Validación de las capas de datos tipadas del repo (patrón Paso 1).
 *
 * Hoy valida el Glosario técnico (Fase 2 · paso 3). A medida que se agreguen más
 * conjuntos de datos tipados (fuentes.ts, etc.), añade aquí sus validadores.
 *
 * FALLA (exit 1) si hay errores. La misma validación se ejecuta además durante
 * `next build` (las páginas del glosario llaman a assertGlosarioValido), de modo
 * que el build también se detiene ante datos inválidos.
 *
 * Uso:  npx tsx scripts/validar-datos.ts
 */
import { validarGlosario, TERMINOS } from "../src/lib/datos/glosario";

function main() {
  const errores = validarGlosario();
  const publicados = TERMINOS.filter((t) => t.publicado).length;

  console.log(`Glosario: ${TERMINOS.length} términos (${publicados} publicados, ${TERMINOS.length - publicados} borradores).`);

  if (errores.length > 0) {
    console.error(`\n✖ ${errores.length} error(es) de validación:`);
    for (const e of errores) console.error(`  - ${e}`);
    process.exit(1);
  }
  console.log("✔ Glosario válido.");
}

main();
