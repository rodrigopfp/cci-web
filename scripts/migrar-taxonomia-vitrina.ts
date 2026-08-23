/**
 * Migración CONSERVADORA de la taxonomía de la Vitrina (Fase 2 · paso 2).
 *
 * Mapea la clasificación actual (nivel + categorias + zonas) a la nueva
 * taxonomía multiatributo SOLO donde la correspondencia es inequívoca y 1:1.
 * Todo lo ambiguo queda VACÍO. Prohibido adivinar por nombre o rubro aparente.
 *
 *  - validationStatus = "en_actualizacion" para todas (nadie ha validado aún).
 *  - minvuStatus queda vacío (se llena con el registro oficial DITEC luego).
 *  - No toca descripción, slug ni nivel.
 *  - Usa setIfMissing: re-ejecutar NO pisa ediciones humanas posteriores.
 *
 * Uso:
 *   npx tsx scripts/migrar-taxonomia-vitrina.ts            (dry-run: solo tabla)
 *   npx tsx scripts/migrar-taxonomia-vitrina.ts --apply    (escribe en Sanity)
 *
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
      /* el archivo puede no existir */
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

// --- Reglas de mapeo INEQUÍVOCAS (1:1) -------------------------------------

// nivel → relación con el CCI (D6). Determinista.
const NIVEL_A_RELACION: Record<string, string> = {
  oro: "socio_oro",
  plata: "socio_plata",
  bronce: "socio_bronce",
  academia: "academia",
  profesional: "profesional",
  pagada: "no_socio_publicado",
};

// categoría actual → dimensión nueva. SOLO las inequívocas.
// Ambiguas a propósito ausentes: "servicios", "instalaciones", "ingeniería y diseño".
const CATEGORIA_A_MATERIAL: Record<string, string> = {
  "hormigón prefabricado": "hormigon",
  "madera/CLT": "madera",
  "acero liviano": "acero",
};
const CATEGORIA_A_SOLUCION: Record<string, string> = {
  "módulos 3D": "modulos_3d",
  envolvente: "fachadas_envolventes",
};

// zona actual → región/macrozona (D5). Determinista.
const ZONA_A_REGION: Record<string, string> = {
  "Todo Chile": "todo_chile",
  Norte: "norte",
  Centro: "centro",
  Sur: "sur",
  Austral: "austral",
  Internacional: "internacional",
};
const MACROZONAS = new Set(["norte", "centro", "sur", "austral"]);

function coverageDe(regions: string[]): string | undefined {
  if (regions.includes("todo_chile")) return "nacional";
  if (regions.length === 1 && regions[0] === "internacional") return "internacional";
  if (regions.includes("latam")) return "latam";
  if (regions.some((r) => MACROZONAS.has(r))) return "macrozona";
  if (regions.length > 0) return "regional";
  return undefined;
}

type Doc = {
  _id: string;
  nombre: string;
  nivel?: string;
  categorias?: string[];
  zonas?: string[];
};

type Mapa = {
  actorTypes: string[];
  solutions: string[];
  materials: string[];
  regions: string[];
  coverageType?: string;
  cciRelationship: string[];
};

function mapear(d: Doc): Mapa {
  const cats = Array.isArray(d.categorias) ? d.categorias : [];
  const zonas = Array.isArray(d.zonas) ? d.zonas : [];

  const actorTypes: string[] = [];
  if (d.nivel === "academia") actorTypes.push("academia");

  const materials = [...new Set(cats.map((c) => CATEGORIA_A_MATERIAL[c]).filter(Boolean))] as string[];
  const solutions = [...new Set(cats.map((c) => CATEGORIA_A_SOLUCION[c]).filter(Boolean))] as string[];
  const regions = [...new Set(zonas.map((z) => ZONA_A_REGION[z]).filter(Boolean))] as string[];
  const cciRelationship = d.nivel && NIVEL_A_RELACION[d.nivel] ? [NIVEL_A_RELACION[d.nivel]] : [];

  return { actorTypes, solutions, materials, regions, coverageType: coverageDe(regions), cciRelationship };
}

async function main() {
  const apply = process.argv.includes("--apply");
  const docs = await client.fetch<Doc[]>(
    `*[_type == "empresaVitrina"]{_id, nombre, nivel, categorias, zonas} | order(nombre asc)`
  );

  console.log(`\n${apply ? "APLICANDO" : "DRY-RUN"} · ${docs.length} organizaciones\n`);
  console.log(
    "NOMBRE".padEnd(34),
    "NIVEL".padEnd(12),
    "ACTOR".padEnd(10),
    "SOLUC.".padEnd(20),
    "MATERIAL".padEnd(10),
    "REGIONES".padEnd(12),
    "REL. CCI"
  );
  console.log("-".repeat(120));

  const vacios = {
    actorTypes: 0,
    solutions: 0,
    materials: 0,
    capabilities: 0,
    regions: 0,
    cciRelationship: 0,
  };

  for (const d of docs) {
    const m = mapear(d);
    if (m.actorTypes.length === 0) vacios.actorTypes++;
    if (m.solutions.length === 0) vacios.solutions++;
    if (m.materials.length === 0) vacios.materials++;
    vacios.capabilities++; // ninguna capacidad se mapea automáticamente
    if (m.regions.length === 0) vacios.regions++;
    if (m.cciRelationship.length === 0) vacios.cciRelationship++;

    console.log(
      (d.nombre ?? "").slice(0, 33).padEnd(34),
      (d.nivel ?? "").padEnd(12),
      m.actorTypes.join(",").padEnd(10),
      m.solutions.join(",").slice(0, 19).padEnd(20),
      m.materials.join(",").padEnd(10),
      m.regions.join(",").slice(0, 11).padEnd(12),
      m.cciRelationship.join(",")
    );

    if (apply) {
      const patch = client.patch(d._id);
      // setIfMissing: nunca pisa lo que un humano ya haya completado.
      const set: Record<string, unknown> = { validationStatus: "en_actualizacion" };
      if (m.actorTypes.length) set.actorTypes = m.actorTypes;
      if (m.solutions.length) set.solutions = m.solutions;
      if (m.materials.length) set.materials = m.materials;
      if (m.regions.length) set.regions = m.regions;
      if (m.coverageType) set.coverageType = m.coverageType;
      if (m.cciRelationship.length) set.cciRelationship = m.cciRelationship;
      await patch.setIfMissing(set).commit({ autoGenerateArrayKeys: true });
    }
  }

  console.log("\nDimensiones que quedaron VACÍAS (sin mapeo inequívoco):");
  console.log(`  actorTypes:      ${vacios.actorTypes}/${docs.length}`);
  console.log(`  solutions:       ${vacios.solutions}/${docs.length}`);
  console.log(`  materials:       ${vacios.materials}/${docs.length}`);
  console.log(`  capabilities:    ${vacios.capabilities}/${docs.length}  (ninguna se mapea automáticamente)`);
  console.log(`  regions:         ${vacios.regions}/${docs.length}`);
  console.log(`  cciRelationship: ${vacios.cciRelationship}/${docs.length}`);
  console.log(`\nvalidationStatus = "en_actualizacion" para las ${docs.length}. minvuStatus queda vacío.`);
  console.log(apply ? "\n✔ Aplicado en Sanity (setIfMissing)." : "\n(DRY-RUN) Añade --apply para escribir.");
}

main().catch((err) => {
  console.error("Error en la migración:", err instanceof Error ? err.message : err);
  process.exit(1);
});
