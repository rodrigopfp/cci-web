// ============================================================================
// COMUNAS Y ZONAS TÉRMICAS — helpers y validación (buscador de /data/vit)
// ============================================================================
// Los datos viven en comunas-zonas.ts (GENERADO por scripts/rutas/generar-
// comunas.ts a partir de la tabla de la Ditec y de las coordenadas de
// cabecera). Aquí van la búsqueda sin tildes y la validación que corre en el
// build: recalcula con comunas-reglas.ts la zona del centro urbano y las
// condiciones en palabras, y las compara con lo escrito en el archivo generado.
// ============================================================================

import { COMUNAS, COMUNAS_META } from "./comunas-zonas";
import { ZONAS_TERMICAS, type ComunaZona, type ZonaTermica } from "./comunas-tipos";
import { normalizarNombre, regionLarga } from "./normalizar";
import {
  CORRECCIONES_COORDENADAS, CUT_PREFIJO_REGION, METODO_CENTRO_URBANO, MINUTOS_AL_FILO,
  condicionEnPalabras, minutosAlMeridiano, textoVerificar, zonaCentroUrbano,
} from "./comunas-reglas";

export { COMUNAS, COMUNAS_META, ZONAS_TERMICAS, normalizarNombre, regionLarga };
export type { ComunaZona, ZonaTermica };

export const COMUNAS_POR_CUT: Record<string, ComunaZona> = Object.fromEntries(COMUNAS.map((c) => [c.cut, c]));

/** Nombres con que se puede encontrar una comuna: el de la Ditec y sus alias. */
export function nombresDeBusqueda(c: { nombre: string; alias?: string[] }): string[] {
  return [c.nombre, ...(c.alias ?? [])];
}

/**
 * Autocompletado: coincidencia sin tildes sobre el nombre y sus alias; primero
 * las que EMPIEZAN igual, luego las que contienen el texto; dentro de cada
 * grupo, orden alfabético.
 */
export function buscarComunas(texto: string, max = 8): ComunaZona[] {
  const n = normalizarNombre(texto);
  if (!n) return [];
  const empiezan: ComunaZona[] = [];
  const contienen: ComunaZona[] = [];
  for (const c of COMUNAS) {
    const nombres = nombresDeBusqueda(c).map(normalizarNombre);
    if (nombres.some((x) => x.startsWith(n))) empiezan.push(c);
    else if (nombres.some((x) => x.includes(n))) contienen.push(c);
  }
  const alfa = (a: ComunaZona, b: ComunaZona) => a.nombre.localeCompare(b.nombre, "es");
  return [...empiezan.sort(alfa), ...contienen.sort(alfa)].slice(0, max);
}

// --- Validación (se integra a scripts/validar-datos.ts) --------------------
// Resultados documentados de la zona del centro urbano en las 8 comunas
// partidas por meridiano (corrida del 21.09.2026). Si cambia la fuente de
// coordenadas y alguno se mueve, el build lo dice.
const ZONA_CENTRO_DOCUMENTADA: Record<string, ZonaTermica> = {
  Antofagasta: "A", Taltal: "A", Copiapó: "B", "La Serena": "C", "La Higuera": "C", Ovalle: "B", "La Ligua": "C", "La Unión": "F",
};
// Alias de búsqueda que deben existir (grafía oficial/INE distinta de la Ditec).
const ALIAS_ESPERADOS: Record<string, string> = {
  Paiguano: "Paihuano", Calera: "La Calera", Llaillay: "Llay-Llay", Coihaique: "Coyhaique", Aisén: "Aysén", Tiltil: "Til Til", "O'Higgins": "O' Higgins",
};
const TIPOS_PARTICION = new Set(["ninguna", "altitud", "meridiano", "meridiano y altitud"]);

export function validarComunas(): string[] {
  const errores: string[] = [];
  if (COMUNAS.length !== COMUNAS_META.comunas) errores.push(`comunas: ${COMUNAS.length} registros, la meta declara ${COMUNAS_META.comunas}.`);
  if (COMUNAS.length !== 345) errores.push(`comunas: se esperaban 345 comunas de la Ditec, hay ${COMUNAS.length}.`);
  const filas = COMUNAS.reduce((n, c) => n + c.zonas.length, 0);
  if (filas !== 410) errores.push(`comunas: se esperaban 410 filas de la Ditec, hay ${filas}.`);
  const partidas = COMUNAS.filter((c) => c.zonas.length > 1);
  if (partidas.length !== 59) errores.push(`comunas: se esperaban 59 comunas con más de una zona, hay ${partidas.length}.`);
  if (COMUNAS_META.metodoCentroUrbano !== METODO_CENTRO_URBANO) errores.push("comunas: la meta declara un método distinto del de comunas-reglas.ts.");

  const cuts = new Set<string>();
  const nombres = new Set<string>();
  for (const c of COMUNAS) {
    const d = `comuna "${c.nombre}" (${c.region})`;
    if (!/^\d{5}$/.test(c.cut)) errores.push(`${d}: CUT inválido "${c.cut}".`);
    if (cuts.has(c.cut)) errores.push(`${d}: CUT repetido "${c.cut}".`);
    cuts.add(c.cut);
    const prefijo = CUT_PREFIJO_REGION[c.region];
    if (!prefijo) errores.push(`${d}: región fuera del catálogo de la Ditec.`);
    else if (!c.cut.startsWith(prefijo)) errores.push(`${d}: el CUT ${c.cut} no es de la región (prefijo ${prefijo}).`);
    const k = `${normalizarNombre(c.region)}|${normalizarNombre(c.nombre)}`;
    if (nombres.has(k)) errores.push(`${d}: comuna repetida.`);
    nombres.add(k);

    if (!Number.isFinite(c.lat) || !Number.isFinite(c.lon)) errores.push(`${d}: sin coordenadas.`);
    // Chile continental e insular (Isla de Pascua −109°, Juan Fernández −79°).
    else if (c.lat > -17 || c.lat < -56.5 || c.lon > -66 || c.lon < -110) errores.push(`${d}: coordenadas fuera de Chile (${c.lat}, ${c.lon}).`);
    const corr = CORRECCIONES_COORDENADAS[c.cut];
    if (corr && (c.lat !== corr.lat || c.lon !== corr.lon || c.coordenadasNota !== corr.nota))
      errores.push(`${d}: la corrección documentada de coordenadas no está aplicada (regenerar con generar-comunas.ts).`);
    if (!corr && c.coordenadasNota) errores.push(`${d}: trae coordenadasNota sin corrección documentada en comunas-reglas.ts.`);

    if (!c.zonas.length) errores.push(`${d}: sin zonas.`);
    for (const z of c.zonas) {
      if (!ZONAS_TERMICAS.includes(z.zona as ZonaTermica)) errores.push(`${d}: zona fuera de A–I: "${z.zona}".`);
      // Las palabras deben salir de la regla literal (y viceversa).
      let esperado = "";
      try { esperado = condicionEnPalabras(z); } catch (e) { errores.push(`${d}: ${(e as Error).message}`); }
      if (z.condicion !== esperado) errores.push(`${d}: zona "${z.zona}" con condición "${z.condicion}", pero la regla literal da "${esperado}".`);
      if (c.zonas.length > 1 && !z.meridiano && !z.altitud) errores.push(`${d}: zona "${z.zona}" sin regla literal en una comuna partida.`);
    }
    if (!TIPOS_PARTICION.has(c.tipoParticion)) errores.push(`${d}: tipoParticion fuera de catálogo "${c.tipoParticion}".`);
    if (!c.zonas.some((z) => z.zona === c.zonaCentroUrbano)) errores.push(`${d}: zonaCentroUrbano "${c.zonaCentroUrbano}" no está entre sus zonas.`);

    if (c.zonas.length > 1) {
      if (c.metodoCentroUrbano !== METODO_CENTRO_URBANO) errores.push(`${d}: comuna partida sin el método de la zona del centro urbano.`);
      if (c.tipoParticion === "ninguna") errores.push(`${d}: tiene ${c.zonas.length} zonas pero tipoParticion "ninguna".`);
      const usaMeridiano = c.zonas.some((z) => z.meridiano), usaAltitud = c.zonas.some((z) => z.altitud);
      if (c.tipoParticion.includes("meridiano") !== usaMeridiano || c.tipoParticion.includes("altitud") !== usaAltitud)
        errores.push(`${d}: tipoParticion "${c.tipoParticion}" no calza con las reglas de sus zonas.`);
      // Recalcular la zona del centro urbano con las mismas reglas del generador.
      let recalculada: string | null = null;
      try { recalculada = zonaCentroUrbano(c.zonas, c.lon); } catch (e) { errores.push(`${d}: ${(e as Error).message}`); }
      if (recalculada !== c.zonaCentroUrbano) errores.push(`${d}: zonaCentroUrbano "${c.zonaCentroUrbano}" no coincide con la regla (recalculada: "${recalculada}").`);
      // Marca "verificar": presente si y solo si la cabecera queda al filo del meridiano.
      const filo = minutosAlMeridiano(c.zonas, c.lon);
      const esperadoVerificar = filo && filo.minutos < MINUTOS_AL_FILO ? textoVerificar(filo.minutos, filo.meridiano) : undefined;
      if ((c.verificar ?? undefined) !== esperadoVerificar) errores.push(`${d}: la marca "verificar" no coincide con la regla (esperado: ${esperadoVerificar ?? "sin marca"}).`);
    } else if (c.metodoCentroUrbano !== null || c.tipoParticion !== "ninguna" || c.verificar) {
      errores.push(`${d}: una sola zona, pero declara partición, método o marca "verificar".`);
    }
  }
  for (const [nombre, esperado] of Object.entries(ZONA_CENTRO_DOCUMENTADA)) {
    const c = COMUNAS.find((x) => x.nombre === nombre && x.tipoParticion !== "altitud");
    if (!c) errores.push(`comunas: falta la comuna partida por meridiano "${nombre}".`);
    else if (c.zonaCentroUrbano !== esperado) errores.push(`comunas: zona del centro urbano de ${nombre} = "${c.zonaCentroUrbano}", documentada "${esperado}".`);
  }
  for (const [nombre, alias] of Object.entries(ALIAS_ESPERADOS)) {
    const c = COMUNAS.find((x) => x.nombre === nombre);
    if (!c) errores.push(`comunas: falta la comuna "${nombre}".`);
    else if (!(c.alias ?? []).some((a) => normalizarNombre(a) === normalizarNombre(alias))) errores.push(`comunas: "${nombre}" debe llevar el alias de búsqueda "${alias}".`);
  }
  const ligua = COMUNAS.find((x) => x.nombre === "La Ligua");
  if (ligua && !ligua.verificar) errores.push(`comunas: La Ligua debe llevar la marca "verificar" (cabecera a 1,3 minutos del meridiano 71°15').`);
  return errores;
}
