/**
 * Validación de las capas de datos tipadas del repo (patrón Paso 1).
 *
 * Valida el Glosario técnico (paso 3) y el registro de indicadores + fuentes
 * (paso 1). FALLA (exit 1) ante errores; ADVIERTE sin fallar el resto.
 *
 * Corre como `prebuild` (package.json), por lo que `npm run build` y el
 * redespliegue automático se detienen ante datos inválidos. Además, las páginas
 * del glosario llaman a assertGlosarioValido() durante el render.
 *
 * Uso:  npx tsx scripts/validar-datos.ts
 */
import { validarGlosario, TERMINOS, esPublico } from "../src/lib/datos/glosario";
import { INDICADORES_LISTA } from "../src/lib/datos/indicadores";
import { FUENTES } from "../src/lib/datos/fuentes";
import { SOURCE_TYPES, CATEGORIES, VERIFICATION_STATUSES } from "../src/lib/datos/tipos-indicadores";
import { EVIDENCIA } from "../src/lib/datos/evidencia";
import { validarLatam, PAISES_LATAM } from "../src/lib/datos/latam";

// Slugs que legítimamente pueden valer 0 (hoy ninguno). Whitelist explícita.
const CERO_PERMITIDO = new Set<string>();

const HOY = new Date().toISOString().slice(0, 10);

function esFuturo(iso?: string): boolean {
  return Boolean(iso) && (iso as string).slice(0, 10) > HOY;
}
function diasHasta(iso: string): number {
  return Math.round((new Date(iso).getTime() - new Date(HOY).getTime()) / 86400000);
}

function validarIndicadores(): { errores: string[]; avisos: string[] } {
  const errores: string[] = [];
  const avisos: string[] = [];
  const vistos = new Set<string>();
  const fuentesUsadas = new Set<string>();

  // Las fuentes también se referencian desde el glosario: cuéntalas como usadas
  // para no marcar como huérfanas las que solo usan los términos (p. ej. planbim).
  for (const t of TERMINOS) for (const fid of t.fuentes) fuentesUsadas.add(fid);

  for (const i of INDICADORES_LISTA) {
    const donde = `indicador "${i.slug}"`;

    if (vistos.has(i.slug)) errores.push(`Slug duplicado: "${i.slug}".`);
    vistos.add(i.slug);
    fuentesUsadas.add(i.sourceId);

    // sourceId existe
    if (!FUENTES[i.sourceId]) errores.push(`${donde}: sourceId inexistente "${i.sourceId}".`);

    // value no vacío/null/0 (salvo whitelist)
    const v = i.value;
    const vacio = v === undefined || v === null || v === "" || (typeof v === "number" && v === 0 && !CERO_PERMITIDO.has(i.slug));
    if (vacio) errores.push(`${donde}: value vacío, nulo o 0 no permitido.`);

    // scope obligatorio
    if (!i.scope?.trim()) errores.push(`${donde}: scope vacío (es obligatorio).`);

    // catálogos
    if (!SOURCE_TYPES.includes(i.sourceType)) errores.push(`${donde}: sourceType fuera de catálogo: "${i.sourceType}".`);
    if (!CATEGORIES.includes(i.category)) errores.push(`${donde}: category fuera de catálogo: "${i.category}".`);

    // Evidencia (Fase 3 · ajuste 6):
    // 1) todo sourceType usado DEBE tener etiqueta en evidencia.ts.
    const info = EVIDENCIA[i.sourceType];
    if (!info) {
      errores.push(`${donde}: sourceType "${i.sourceType}" sin etiqueta en evidencia.ts.`);
    } else {
      // 2) un indicador declared_by_organization DEBE traer caveat.
      if (info.requiereCaveat && !i.caveat?.trim())
        errores.push(`${donde}: sourceType "${i.sourceType}" exige caveat y no lo tiene.`);
      // 3) aviso: survey / documented_case con scope demasiado escueto.
      if ((i.sourceType === "survey" || i.sourceType === "documented_case") && (i.scope?.trim().length ?? 0) < 15)
        avisos.push(`${donde}: sourceType "${i.sourceType}" con scope muy escueto (<15 car.); conviene precisar el universo.`);
    }
    if (!VERIFICATION_STATUSES.includes(i.verificationStatus))
      errores.push(`${donde}: verificationStatus fuera de catálogo: "${i.verificationStatus}".`);

    // fechas coherentes
    if (esFuturo(i.cutoffDate)) errores.push(`${donde}: cutoffDate en el futuro (${i.cutoffDate}).`);
    if (esFuturo(i.lastVerifiedAt)) errores.push(`${donde}: lastVerifiedAt en el futuro (${i.lastVerifiedAt}).`);
    if (i.nextReviewAt && i.nextReviewAt.slice(0, 10) < i.lastVerifiedAt.slice(0, 10))
      errores.push(`${donde}: nextReviewAt (${i.nextReviewAt}) anterior a lastVerifiedAt (${i.lastVerifiedAt}).`);

    // El registro solo contiene cifras que la portada y /data ya publican:
    // ninguna puede quedar en borrador o pendiente de verificación.
    if (i.verificationStatus === "draft" || i.verificationStatus === "pending_verification")
      errores.push(`${donde}: verificationStatus "${i.verificationStatus}" en un indicador consumido por una vista publicada.`);

    // Avisos (no fallan)
    if (i.nextReviewAt) {
      const d = diasHasta(i.nextReviewAt);
      if (d < 0) avisos.push(`${donde}: nextReviewAt vencida (${i.nextReviewAt}).`);
      else if (d <= 30) avisos.push(`${donde}: nextReviewAt a ${d} días (${i.nextReviewAt}).`);
    }
  }

  // Avisos de fuentes
  for (const [id, f] of Object.entries(FUENTES)) {
    if (!f.url) avisos.push(`fuente "${id}": sin url.`);
    if (!fuentesUsadas.has(id)) avisos.push(`fuente "${id}": no referenciada por ningún indicador (huérfana).`);
  }

  return { errores, avisos };
}

function main() {
  const erroresGlosario = validarGlosario();
  const publicos = TERMINOS.filter(esPublico).length;
  const { errores: erroresInd, avisos } = validarIndicadores();
  const erroresLatam = validarLatam();

  console.log(`Glosario: ${TERMINOS.length} términos (${publicos} públicos, ${TERMINOS.length - publicos} borradores).`);
  console.log(`Indicadores: ${INDICADORES_LISTA.length} · Fuentes: ${Object.keys(FUENTES).length}.`);
  console.log(`Panorama LATAM: ${PAISES_LATAM.length} países (${PAISES_LATAM.filter((p) => p.estadoFicha !== "en_levantamiento").length} con contenido).`);

  const errores = [
    ...erroresGlosario.map((e) => `[glosario] ${e}`),
    ...erroresInd.map((e) => `[indicadores] ${e}`),
    ...erroresLatam.map((e) => `[latam] ${e}`),
  ];

  if (avisos.length > 0) {
    console.warn(`\n⚠ ${avisos.length} aviso(s):`);
    for (const a of avisos) console.warn(`  - ${a}`);
  }

  if (errores.length > 0) {
    console.error(`\n✖ ${errores.length} error(es) de validación:`);
    for (const e of errores) console.error(`  - ${e}`);
    process.exit(1);
  }
  console.log("\n✔ Datos válidos (glosario + indicadores + fuentes).");
}

main();
