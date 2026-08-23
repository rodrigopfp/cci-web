/**
 * Exporta la Vitrina a un CSV de validación humana (Fase 2 · paso 2).
 *
 * Una fila por organización, una columna por dimensión con los valores actuales
 * y columnas vacías ("estado" y "observaciones") para que Rodrigo y el equipo
 * CCI completen la validación con las empresas y el registro oficial del MINVU.
 *
 * Los valores multiatributo se separan con "; ". La columna "estado" recibe uno
 * de los valores de estadoValidacion (validado_por_organizacion, fuente_oficial,
 * revisado_por_cci, en_actualizacion, pendiente); el importador la aplica.
 *
 * Uso:  npx tsx scripts/exportar-vitrina-csv.ts
 * Genera vitrina-validacion.csv en la raíz del repo. Solo LEE (no necesita token
 * de escritura, pero reutiliza el mismo cargador por comodidad).
 */
import { createClient } from "@sanity/client";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { COLUMNAS } from "./columnas-vitrina";

function cargarToken(): string | undefined {
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
  return undefined;
}

const client = createClient({
  projectId: "gt9dfhv2",
  dataset: "production",
  apiVersion: "2024-10-01",
  token: cargarToken(),
  useCdn: false,
});

function celda(v: unknown): string {
  const s = v === undefined || v === null ? "" : String(v);
  return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function lista(v: unknown): string {
  return Array.isArray(v) ? v.filter(Boolean).join("; ") : "";
}

type Doc = Record<string, unknown> & { _id: string };

async function main() {
  const docs = await client.fetch<Doc[]>(
    `*[_type == "empresaVitrina"] | order(nombre asc){
      _id, "slug": slug.current, nombre, nivel,
      actorTypes, solutions, materials, capabilities, regions, coverageType, cciRelationship,
      minvuStatus, certificaciones, direccionPlantas,
      sitioWeb, emailContacto, telefono, validationStatus, lastVerifiedAt
    }`
  );

  const filas = docs.map((d) => {
    const minvu = (d.minvuStatus ?? {}) as {
      approvedCompany?: boolean;
      resolutions?: string[];
      plants?: string[];
      vitCount?: number;
    };
    return [
      d._id,
      d.slug,
      d.nombre,
      d.nivel,
      lista(d.actorTypes),
      lista(d.solutions),
      lista(d.materials),
      lista(d.capabilities),
      lista(d.regions),
      d.coverageType,
      lista(d.cciRelationship),
      minvu.approvedCompany === undefined ? "" : minvu.approvedCompany,
      lista(minvu.resolutions),
      lista(minvu.plants),
      minvu.vitCount ?? "",
      lista(d.certificaciones),
      lista(d.direccionPlantas),
      d.sitioWeb,
      d.emailContacto,
      d.telefono,
      d.validationStatus,
      d.lastVerifiedAt,
      "", // estado (a completar)
      "", // observaciones
    ]
      .map(celda)
      .join(",");
  });

  // BOM para que Excel abra los acentos en UTF-8.
  const csv = "﻿" + [COLUMNAS.join(","), ...filas].join("\r\n") + "\r\n";
  const salida = resolve(process.cwd(), "vitrina-validacion.csv");
  writeFileSync(salida, csv, "utf8");
  console.log(`✔ ${docs.length} organizaciones exportadas a ${salida}`);
}

main().catch((err) => {
  console.error("Error al exportar el CSV:", err instanceof Error ? err.message : err);
  process.exit(1);
});
