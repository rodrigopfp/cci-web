/**
 * Importa la planilla de validación corregida a Sanity (Fase 2 · paso 2).
 *
 * Lee vitrina-validacion.csv (misma cabecera que genera exportar-vitrina-csv.ts),
 * arma un patch por organización y lo aplica. La columna "estado" define el nuevo
 * validationStatus; al aplicar, se sella lastVerifiedAt con la fecha/hora actual.
 *
 * Conservador: solo escribe las columnas que traen valor. Un valor "-" borra
 * (unset) esa dimensión de forma explícita. Los arreglos se separan por ";".
 *
 * Uso:
 *   npx tsx scripts/importar-vitrina-csv.ts            (dry-run: muestra cambios)
 *   npx tsx scripts/importar-vitrina-csv.ts --apply    (escribe en Sanity)
 *
 * Requiere SANITY_WRITE_TOKEN (permiso Editor) en .env.local.
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { COLUMNAS } from "./columnas-vitrina";

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
      /* opcional */
    }
  }
  throw new Error("Falta SANITY_WRITE_TOKEN en .env.local (API > Tokens, permiso Editor).");
}

const client = createClient({
  projectId: "gt9dfhv2",
  dataset: "production",
  apiVersion: "2024-10-01",
  token: cargarToken(),
  useCdn: false,
});

// --- Parser CSV mínimo (RFC4180: comillas, comas y saltos dentro de comillas) --
function parseCSV(texto: string): string[][] {
  const limpio = texto.replace(/^﻿/, "");
  const filas: string[][] = [];
  let campo = "";
  let fila: string[] = [];
  let enComillas = false;
  for (let i = 0; i < limpio.length; i++) {
    const c = limpio[i];
    if (enComillas) {
      if (c === '"') {
        if (limpio[i + 1] === '"') {
          campo += '"';
          i++;
        } else enComillas = false;
      } else campo += c;
    } else if (c === '"') {
      enComillas = true;
    } else if (c === ",") {
      fila.push(campo);
      campo = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && limpio[i + 1] === "\n") i++;
      fila.push(campo);
      campo = "";
      if (fila.some((x) => x.length > 0)) filas.push(fila);
      fila = [];
    } else campo += c;
  }
  if (campo.length > 0 || fila.length > 0) {
    fila.push(campo);
    if (fila.some((x) => x.length > 0)) filas.push(fila);
  }
  return filas;
}

// "-" = borrar explícito; "" = no tocar. Devuelve {accion,valor}.
function multi(v: string): { touch: boolean; unset: boolean; valor: string[] } {
  const t = v.trim();
  if (t === "") return { touch: false, unset: false, valor: [] };
  if (t === "-") return { touch: true, unset: true, valor: [] };
  return { touch: true, unset: false, valor: t.split(";").map((s) => s.trim()).filter(Boolean) };
}
function simple(v: string): { touch: boolean; unset: boolean; valor: string } {
  const t = v.trim();
  if (t === "") return { touch: false, unset: false, valor: "" };
  if (t === "-") return { touch: true, unset: true, valor: "" };
  return { touch: true, unset: false, valor: t };
}

const CAMPOS_MULTI = [
  "actorTypes", "solutions", "materials", "capabilities", "regions", "cciRelationship",
  "certificaciones", "direccionPlantas",
] as const;
const CAMPOS_SIMPLE = ["coverageType", "sitioWeb", "emailContacto", "telefono"] as const;

async function main() {
  const apply = process.argv.includes("--apply");
  const ruta = resolve(process.cwd(), "vitrina-validacion.csv");
  const filas = parseCSV(readFileSync(ruta, "utf8"));
  if (filas.length < 2) throw new Error("El CSV no tiene filas de datos.");

  const cabecera = filas[0].map((h) => h.trim());
  const esperado = COLUMNAS.join(",");
  if (cabecera.join(",") !== esperado) {
    console.warn("⚠ La cabecera no coincide exactamente con la esperada. Se mapeará por nombre de columna.");
  }
  const idx = (nombre: string) => cabecera.indexOf(nombre);

  let conCambios = 0;
  for (const fila of filas.slice(1)) {
    const get = (col: string) => (idx(col) >= 0 ? (fila[idx(col)] ?? "") : "");
    const id = get("id").trim();
    if (!id) continue;

    const set: Record<string, unknown> = {};
    const unset: string[] = [];

    for (const campo of CAMPOS_MULTI) {
      const r = multi(get(campo));
      if (!r.touch) continue;
      if (r.unset) unset.push(campo);
      else set[campo] = r.valor;
    }
    for (const campo of CAMPOS_SIMPLE) {
      const r = simple(get(campo));
      if (!r.touch) continue;
      if (r.unset) unset.push(campo);
      else set[campo] = r.valor;
    }

    // minvuStatus (objeto)
    const minvuApproved = simple(get("minvuApproved"));
    const minvuRes = multi(get("minvuResolutions"));
    const minvuPlants = multi(get("minvuPlants"));
    const minvuVit = simple(get("minvuVitCount"));
    if (minvuApproved.touch || minvuRes.touch || minvuPlants.touch || minvuVit.touch) {
      const minvu: Record<string, unknown> = {};
      if (minvuApproved.touch && !minvuApproved.unset) minvu.approvedCompany = /^(true|sí|si|1|x)$/i.test(minvuApproved.valor);
      if (minvuRes.touch && !minvuRes.unset) minvu.resolutions = minvuRes.valor;
      if (minvuPlants.touch && !minvuPlants.unset) minvu.plants = minvuPlants.valor;
      if (minvuVit.touch && !minvuVit.unset && minvuVit.valor) minvu.vitCount = Number(minvuVit.valor);
      if (Object.keys(minvu).length > 0) set.minvuStatus = minvu;
    }

    // estado -> validationStatus (+ sello de verificación)
    const estado = get("estado").trim();
    if (estado) {
      set.validationStatus = estado;
      set.lastVerifiedAt = new Date().toISOString();
    }

    if (Object.keys(set).length === 0 && unset.length === 0) continue;
    conCambios++;

    const resumen = [
      ...Object.keys(set).map((k) => `${k}=${Array.isArray(set[k]) ? (set[k] as string[]).join("|") : set[k]}`),
      ...unset.map((k) => `-${k}`),
    ].join("  ");
    console.log(`${apply ? "PATCH" : "DRY"} ${get("nombre") || id}: ${resumen}`);

    if (apply) {
      let patch = client.patch(id);
      if (Object.keys(set).length) patch = patch.set(set);
      if (unset.length) patch = patch.unset(unset);
      await patch.commit({ autoGenerateArrayKeys: true });
    }
  }

  console.log(`\n${conCambios} organizaciones ${apply ? "actualizadas" : "con cambios (dry-run)"}.`);
  console.log(apply ? "✔ Importación aplicada." : "(DRY-RUN) Añade --apply para escribir.");
}

main().catch((err) => {
  console.error("Error al importar el CSV:", err instanceof Error ? err.message : err);
  process.exit(1);
});
