/**
 * Vista interna del glosario por estado editorial (uso del equipo por CLI).
 *
 * Lista los términos agrupados por estadoEditorial con su fecha de revisión y
 * naturaleza. NO crea ninguna vista pública de borradores; es solo para el
 * equipo editorial. No falla el build.
 *
 * Uso:  npm run glosario-estado   (o  npx tsx scripts/glosario-estado.ts)
 */
import { TERMINOS, type EstadoEditorial } from "../src/lib/datos/glosario";

const ORDEN: EstadoEditorial[] = [
  "validada_cci",
  "revision_grupo_tecnico",
  "borrador",
  "archivada",
];

const ETIQUETA: Record<EstadoEditorial, string> = {
  validada_cci: "Validada CCI (pública, indexable)",
  revision_grupo_tecnico: "En revisión por grupo técnico (pública, indexable)",
  borrador: "Borrador (no pública, noindex)",
  archivada: "Archivada (redirige a su reemplazo)",
};

function main() {
  console.log(`\nGLOSARIO CCI — ${TERMINOS.length} términos por estado editorial\n`);

  for (const estado of ORDEN) {
    const items = TERMINOS.filter((t) => t.estadoEditorial === estado).sort((a, b) =>
      a.titulo.localeCompare(b.titulo, "es")
    );
    if (items.length === 0) continue;
    console.log(`── ${ETIQUETA[estado]} · ${items.length} ──`);
    for (const t of items) {
      const fecha = t.fechaRevision ? ` · rev. ${t.fechaRevision}` : "";
      const nat = t.naturaleza ? ` · ${t.naturaleza}` : "";
      const dest = t.reemplazadoPor ? ` → ${t.reemplazadoPor}` : "";
      console.log(`   • ${t.titulo}  [${t.slug}]${nat}${fecha}${dest}`);
    }
    console.log("");
  }

  const publicos = TERMINOS.filter(
    (t) => t.estadoEditorial === "validada_cci" || t.estadoEditorial === "revision_grupo_tecnico"
  ).length;
  console.log(`Resumen: ${publicos} públicos · ${TERMINOS.length - publicos} no públicos.\n`);
}

main();
