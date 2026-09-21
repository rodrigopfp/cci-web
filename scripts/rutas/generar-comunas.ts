/**
 * Genera src/lib/datos/comunas-zonas.ts a partir de dos insumos versionados:
 *
 *   scripts/fichas-vit/zonas-termicas-comunas.csv
 *     Tabla comuna → zona térmica curada a mano desde el PDF de la Ditec
 *     (Zonificación térmica por comuna según NCh1079). 410 filas, 345 comunas,
 *     59 con más de una zona. No incluye la comuna Antártica.
 *
 *   scripts/fichas-vit/coordenadas-comunas-altazor.csv
 *     Coordenadas de la cabecera comunal + código CUT. Dataset público
 *     github.com/altazor-1967/Comunas-de-Chile ("Latitud - Longitud Chile.csv",
 *     a partir de Wikipedia, Anexo: Comunas de Chile). PROVISIONAL, a
 *     reemplazar por una capa oficial (IDE Chile / BCN / INE).
 *
 * Y calcula, para las comunas con más de una zona, la ZONA DEL CENTRO URBANO
 * con las reglas de src/lib/datos/comunas-reglas.ts (las mismas que usa el
 * validador para recalcular y comparar):
 *   · partición por altitud → la zona de la franja más baja;
 *   · partición por meridiano → longitud de la cabecera vs. meridiano de la
 *     regla ("> 71°" = longitud oeste mayor que 71°, es decir, más al oeste);
 *   · ambas (Antofagasta, Taltal, Copiapó) → primero meridiano, luego la
 *     franja más baja.
 *
 * Se ejecuta a mano:  npx tsx scripts/rutas/generar-comunas.ts
 * Falla (exit 1) si los conteos del CSV no son los esperados, si alguna
 * comuna de la Ditec no cruza con las coordenadas o si alguna de las 8
 * comunas partidas por meridiano da una zona distinta de la documentada.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  CORRECCIONES_COORDENADAS, METODO_CENTRO_URBANO, MINUTOS_AL_FILO,
  condicionEnPalabras, minutosAlMeridiano, textoVerificar, zonaCentroUrbano,
} from "../../src/lib/datos/comunas-reglas";
import { normalizarNombre } from "../../src/lib/datos/normalizar";

const RAIZ = resolve(__dirname, "..", "..");
const CSV_ZONAS = resolve(RAIZ, "scripts/fichas-vit/zonas-termicas-comunas.csv");
const CSV_COORDS = resolve(RAIZ, "scripts/fichas-vit/coordenadas-comunas-altazor.csv");
const SALIDA = resolve(RAIZ, "src/lib/datos/comunas-zonas.ts");

const ESPERADO = { filas: 410, comunas: 345, partidas: 59, altitud: 51, meridiano: 5, ambas: 3 };
// Resultados esperados de la zona del centro urbano en las 8 comunas partidas
// por meridiano (decisión documentada en la corrida del 21.09.2026).
const ESPERADO_MERIDIANO: Record<string, string> = {
  Antofagasta: "A", Taltal: "A", Copiapó: "B", "La Serena": "C", "La Higuera": "C", Ovalle: "B", "La Ligua": "C", "La Unión": "F",
};
// Cruce por nombre normalizado. Alias Ditec → dataset de coordenadas.
const ALIAS: Record<string, string> = {
  paiguano: "paihuano",
  calera: "la calera",
  llaillay: "llay-llay",
  coihaique: "coyhaique",
  aisen: "aysen",
  // Dos grafías más del dataset de coordenadas, detectadas en la corrida del 21.09.2026.
  tiltil: "til til",
  "o'higgins": "o' higgins",
};

// ---------------------------------------------------------------- utilidades
function parseCsv(texto: string): string[][] {
  const filas: string[][] = [];
  let fila: string[] = [], campo = "", enComillas = false;
  const t = texto.replace(/^﻿/, "");
  for (let i = 0; i < t.length; i++) {
    const ch = t[i];
    if (enComillas) {
      if (ch === '"') {
        if (t[i + 1] === '"') { campo += '"'; i++; } else enComillas = false;
      } else campo += ch;
    } else if (ch === '"') enComillas = true;
    else if (ch === ",") { fila.push(campo); campo = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && t[i + 1] === "\n") i++;
      fila.push(campo); filas.push(fila); fila = []; campo = "";
    } else campo += ch;
  }
  if (campo.length || fila.length) { fila.push(campo); filas.push(fila); }
  return filas.filter((f) => f.some((c) => c.trim() !== ""));
}
function registros(ruta: string): Record<string, string>[] {
  const [cab, ...resto] = parseCsv(readFileSync(ruta, "utf8"));
  const claves = cab.map((c) => c.trim());
  return resto.map((f) => Object.fromEntries(claves.map((k, i) => [k, (f[i] ?? "").trim()])));
}

// ---------------------------------------------------------------- carga
const zonasCsv = registros(CSV_ZONAS);
const coordsCsv = registros(CSV_COORDS);

type FilaZona = { region: string; provincia: string; comuna: string; zona: string; meridiano: string; altitud: string; tipo: string };
const filas: FilaZona[] = zonasCsv.map((r) => ({
  region: r["region"], provincia: r["provincia"], comuna: r["comuna"], zona: r["zona_termica"],
  meridiano: r["condicion_meridiano_oeste"], altitud: r["condicion_altitud_msnm"], tipo: r["tipo_particion"],
}));

const porComuna = new Map<string, FilaZona[]>();
for (const f of filas) {
  const k = `${f.region}|${f.comuna}`;
  if (!porComuna.has(k)) porComuna.set(k, []);
  porComuna.get(k)!.push(f);
}
const partidas = [...porComuna.values()].filter((v) => v.length > 1);
const conteo = {
  filas: filas.length, comunas: porComuna.size, partidas: partidas.length,
  altitud: partidas.filter((v) => v[0].tipo === "altitud").length,
  meridiano: partidas.filter((v) => v[0].tipo === "meridiano").length,
  ambas: partidas.filter((v) => v[0].tipo === "meridiano y altitud").length,
};
const errores: string[] = [];
for (const k of Object.keys(ESPERADO) as (keyof typeof ESPERADO)[])
  if (conteo[k] !== ESPERADO[k]) errores.push(`Conteo "${k}": esperado ${ESPERADO[k]}, obtenido ${conteo[k]}.`);

// Coordenadas: índice por nombre normalizado (con desambiguación por región si hiciera falta).
type Coord = { cut: string; comuna: string; region: string; lat: number; lon: number };
const coords: Coord[] = coordsCsv.map((r) => ({
  cut: r["CUT (Código Único Territorial)"].padStart(5, "0"),
  comuna: r["Comuna"], region: r["Región"],
  lat: Number(r["Latitud (Decimal)"]), lon: Number(r["Longitud (decimal)"]),
})).filter((c) => c.comuna && Number.isFinite(c.lat) && Number.isFinite(c.lon));
const coordPorNombre = new Map<string, Coord[]>();
for (const c of coords) {
  const n = normalizarNombre(c.comuna);
  if (!coordPorNombre.has(n)) coordPorNombre.set(n, []);
  coordPorNombre.get(n)!.push(c);
}

// ---------------------------------------------------------------- cruce + zona del centro urbano
interface ZonaSalida { zona: string; meridiano?: string; altitud?: string; condicion: string }
interface ComunaSalida {
  cut: string; nombre: string; alias?: string[]; region: string; provincia: string; lat: number; lon: number;
  zonas: ZonaSalida[]; tipoParticion: string; zonaCentroUrbano: string; metodoCentroUrbano: string | null; verificar?: string;
  coordenadasNota?: string;
}
const salida: ComunaSalida[] = [];
const noCruzan: string[] = [];
const resultadoMeridiano: Record<string, string> = {};

for (const [, v] of porComuna) {
  const f0 = v[0];
  let n = normalizarNombre(f0.comuna);
  n = ALIAS[n] ?? n;
  let cands = coordPorNombre.get(n) ?? [];
  if (cands.length > 1) {
    const rn = normalizarNombre(f0.region);
    const filtro = cands.filter((c) => normalizarNombre(c.region).includes(rn) || rn.includes(normalizarNombre(c.region)));
    if (filtro.length === 1) cands = filtro;
  }
  if (cands.length !== 1) { noCruzan.push(`${f0.comuna} (${f0.region}) → ${cands.length} coincidencias`); continue; }
  let c = cands[0];
  const corr = CORRECCIONES_COORDENADAS[c.cut];
  if (corr) c = { ...c, lat: corr.lat, lon: corr.lon };

  const zonas: ZonaSalida[] = v.map((f) => {
    const z: ZonaSalida = { zona: f.zona, condicion: condicionEnPalabras({ meridiano: f.meridiano || undefined, altitud: f.altitud || undefined }) };
    if (f.meridiano) z.meridiano = f.meridiano;
    if (f.altitud) z.altitud = f.altitud;
    return z;
  });

  let zonaCentro = v[0].zona;
  let metodo: string | null = null;
  let verificar: string | undefined;
  if (v.length > 1) {
    metodo = METODO_CENTRO_URBANO;
    const zc = zonaCentroUrbano(zonas, c.lon);
    if (!zc) { errores.push(`${f0.comuna}: ninguna regla de meridiano se cumple con lon ${c.lon}.`); continue; }
    zonaCentro = zc;
    if (f0.tipo !== "altitud") resultadoMeridiano[f0.comuna] = zonaCentro;
    const filo = minutosAlMeridiano(zonas, c.lon);
    if (filo && filo.minutos < MINUTOS_AL_FILO) verificar = textoVerificar(filo.minutos, filo.meridiano);
  }
  const registro: ComunaSalida = {
    cut: c.cut, nombre: f0.comuna, region: f0.region, provincia: f0.provincia, lat: c.lat, lon: c.lon,
    zonas, tipoParticion: f0.tipo, zonaCentroUrbano: zonaCentro, metodoCentroUrbano: metodo,
  };
  // Grafía del dataset de coordenadas (coincide con la oficial/INE) como alias de búsqueda.
  if (normalizarNombre(c.comuna) !== normalizarNombre(f0.comuna)) registro.alias = [c.comuna.replace(/\s+/g, " ").trim()];
  if (verificar) registro.verificar = verificar;
  if (corr) registro.coordenadasNota = corr.nota;
  salida.push(registro);
}

if (noCruzan.length) errores.push(`Comunas de la Ditec sin coordenadas: ${noCruzan.join("; ")}`);
const cuts = new Set(salida.map((s) => s.cut));
if (cuts.size !== salida.length) errores.push("Códigos CUT repetidos tras el cruce.");

console.log(`Conteos: ${JSON.stringify(conteo)}`);
console.log("Zona del centro urbano en comunas partidas por meridiano:");
for (const [com, esp] of Object.entries(ESPERADO_MERIDIANO)) {
  const obt = resultadoMeridiano[com];
  console.log(`  ${com.padEnd(12)} obtenido ${obt ?? "-"} · esperado ${esp} ${obt === esp ? "✔" : "✖ DISTINTO"}`);
  if (obt !== esp) errores.push(`Zona del centro urbano de ${com}: obtenido ${obt}, esperado ${esp}.`);
}
for (const s of salida) if (s.verificar) console.log(`  · verificar: ${s.nombre} — ${s.verificar}`);
console.log(`Alias de búsqueda: ${salida.filter((s) => s.alias).map((s) => `${s.nombre}→${s.alias![0]}`).join(", ")}`);

if (errores.length) {
  console.error(`\n✖ ${errores.length} error(es):`);
  for (const e of errores) console.error(`  - ${e}`);
  process.exit(1);
}

// ---------------------------------------------------------------- escritura
const hoy = new Date().toISOString().slice(0, 10);
const cabecera = `// ============================================================================
// COMUNAS Y ZONAS TÉRMICAS — ARCHIVO GENERADO. NO EDITAR A MANO.
// ============================================================================
// Generado por scripts/rutas/generar-comunas.ts el ${hoy} a partir de
//   · scripts/fichas-vit/zonas-termicas-comunas.csv (Ditec Minvu, zonificación
//     térmica por comuna según NCh1079; ${conteo.filas} filas, ${conteo.comunas} comunas,
//     ${conteo.partidas} con más de una zona; no incluye la comuna Antártica).
//   · scripts/fichas-vit/coordenadas-comunas-altazor.csv (cabeceras comunales
//     y CUT; dataset provisional, a reemplazar por una capa oficial).
// La zona del centro urbano de las comunas partidas es ${METODO_CENTRO_URBANO}
// (reglas en comunas-reglas.ts; el validador las recalcula y compara).
// Tipos y validación: src/lib/datos/comunas.ts.
// ============================================================================

import type { ComunaZona } from "./comunas-tipos";

export const COMUNAS_META = {
  generadoEl: "${hoy}",
  fuenteZonas: "ditec-zonas-termicas-comunas",
  fuenteCoordenadas: "coordenadas-comunas-altazor",
  fuenteCentroUrbano: "cci-zona-centro-urbano",
  metodoCentroUrbano: "${METODO_CENTRO_URBANO}",
  filasDitec: ${conteo.filas},
  comunas: ${conteo.comunas},
  comunasConVariasZonas: ${conteo.partidas},
  comunasSinIncluir: ["Antártica"],
} as const;

export const COMUNAS: ComunaZona[] = `;
const cuerpo = JSON.stringify(salida, null, 1)
  .replace(/\n\s*"(\w+)":/g, (m, k) => `\n${m.match(/^\n\s*/)?.[0].slice(1) ?? ""}${k}:`);
writeFileSync(SALIDA, `${cabecera}${cuerpo};\n`, "utf8");
console.log(`\n✔ ${salida.length} comunas escritas en ${SALIDA}`);
