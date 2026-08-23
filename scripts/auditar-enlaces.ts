/**
 * Auditoría de enlaces externos de las fuentes (fuentes.ts).
 *
 * Revisa los url http(s) de cada fuente y reporta los caídos. NO corre en el
 * build: es una tarea manual y periódica.
 *
 * Uso:  npm run auditar-enlaces   (o: npx tsx scripts/auditar-enlaces.ts)
 */
import { FUENTES } from "../src/lib/datos/fuentes";

const TIMEOUT_MS = 12000;

async function revisar(url: string): Promise<{ ok: boolean; detalle: string }> {
  const intento = async (method: "HEAD" | "GET") => {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        method,
        redirect: "follow",
        signal: ctrl.signal,
        headers: { "user-agent": "CCI-link-audit/1.0 (+https://construccionindustrializada.cl)" },
      });
      return { status: res.status, ok: res.ok };
    } finally {
      clearTimeout(t);
    }
  };
  try {
    let r = await intento("HEAD");
    // Muchos servidores no permiten HEAD: reintentar con GET ante 4xx/5xx.
    if (!r.ok) r = await intento("GET");
    return { ok: r.ok, detalle: `HTTP ${r.status}` };
  } catch (e) {
    return { ok: false, detalle: e instanceof Error ? e.message : String(e) };
  }
}

async function main() {
  const entradas = Object.values(FUENTES).filter((f) => f.url && /^https?:\/\//i.test(f.url));
  const internos = Object.values(FUENTES).filter((f) => f.url && f.url.startsWith("/"));
  const sinUrl = Object.values(FUENTES).filter((f) => !f.url);

  console.log(`Auditando ${entradas.length} enlaces externos de fuentes.ts…\n`);
  const caidos: string[] = [];

  for (const f of entradas) {
    const r = await revisar(f.url as string);
    console.log(`${r.ok ? "✔" : "✖"} [${f.id}] ${r.detalle} — ${f.url}`);
    if (!r.ok) caidos.push(`${f.id} (${r.detalle}) — ${f.url}`);
  }

  if (internos.length) console.log(`\n(${internos.length} enlace(s) interno(s) omitido(s): ${internos.map((f) => f.id).join(", ")})`);
  if (sinUrl.length) console.log(`(${sinUrl.length} fuente(s) sin url: ${sinUrl.map((f) => f.id).join(", ")})`);

  console.log(`\n${caidos.length === 0 ? "✔ Sin enlaces caídos." : `✖ ${caidos.length} enlace(s) caído(s):`}`);
  for (const c of caidos) console.log(`  - ${c}`);
}

main().catch((err) => {
  console.error("Error en la auditoría:", err instanceof Error ? err.message : err);
  process.exit(1);
});
