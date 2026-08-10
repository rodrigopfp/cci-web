/**
 * Regla de lenguaje del sitio: en los textos visibles no se usa "modular" /
 * "modulares"; se dice "construcción industrializada" / "proyectos
 * industrializados" / etc.
 *
 * Este script aplica el reemplazo en el CONTENIDO DE SANITY (lo que el sitio
 * lee en build). Solo toca campos de PROSA visible; NO toca nombres propios de
 * empresas ni títulos de informes en inglés (campos `nombre`/`titulo`), ni URLs.
 *
 * Los reemplazos son por frase, para que la redacción quede natural y para no
 * alcanzar por accidente los nombres propios (que llevan "Modular" en mayúscula).
 *
 * Idempotente: re-ejecutar no cambia nada si ya está aplicado.
 * Ejecutar:  npx tsx scripts/reemplazar-modular.ts
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
      // sigue
    }
  }
  throw new Error("Falta SANITY_WRITE_TOKEN en .env.local");
}

const client = createClient({
  projectId: "gt9dfhv2",
  dataset: "production",
  apiVersion: "2024-10-01",
  token: cargarToken(),
  useCdn: false,
});

/** Reemplazo por frase (natural y seguro). No toca "Modular" de nombres propios
 *  (mayúscula) ni "modular construction" en inglés. */
function fix(s: string): string {
  if (typeof s !== "string") return s;
  return s
    .replace(/construcción modular/g, "construcción industrializada")
    .replace(/conjunto modular/g, "conjunto industrializado")
    .replace(/soluciones modulares/g, "soluciones industrializadas")
    .replace(/proyectos modulares/g, "proyectos industrializados")
    .replace(/edificios modulares/g, "edificios industrializados")
    .replace(/edificio modular/g, "edificio industrializado")
    .replace(/viviendas modulares/g, "viviendas industrializadas")
    .replace(/vivienda modular/g, "vivienda industrializada");
}

type Block = { _type?: string; children?: { _type?: string; text?: string }[] };
type Doc = {
  _id: string;
  _type: string;
  nota?: string;
  hallazgo?: string;
  detalle?: string;
  bajada?: string;
  cuerpo?: Block[];
};

async function main() {
  const docs = await client.fetch<Doc[]>(
    `*[_type in ["indicador","estudio","hito","noticia"]]{_id,_type,nota,hallazgo,detalle,bajada,cuerpo}`
  );

  let cambiados = 0;
  for (const d of docs) {
    const set: Record<string, unknown> = {};

    for (const campo of ["nota", "hallazgo", "detalle", "bajada"] as const) {
      const v = d[campo];
      if (typeof v === "string") {
        const nuevo = fix(v);
        if (nuevo !== v) set[campo] = nuevo;
      }
    }

    if (Array.isArray(d.cuerpo)) {
      let tocado = false;
      const cuerpo = d.cuerpo.map((b) => {
        if (!b?.children) return b;
        const children = b.children.map((c) => {
          if (typeof c?.text === "string") {
            const nuevo = fix(c.text);
            if (nuevo !== c.text) {
              tocado = true;
              return { ...c, text: nuevo };
            }
          }
          return c;
        });
        return { ...b, children };
      });
      if (tocado) set.cuerpo = cuerpo;
    }

    if (Object.keys(set).length > 0) {
      await client.patch(d._id).set(set).commit();
      cambiados++;
      console.log(`  ✔ [${d._type}] ${d._id} — ${Object.keys(set).join(", ")}`);
    }
  }

  console.log(`\nListo: ${cambiados} documento(s) actualizado(s) en Sanity.`);
}

main().catch((err) => {
  console.error("Error:", err instanceof Error ? err.message : err);
  process.exit(1);
});
