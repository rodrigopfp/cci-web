/**
 * Carga inicial de la Vitrina con los socios reales del CCI.
 *
 * Fuente: directorio público de asociados del CCI
 * (construccionindustrializada.cl/asociados). Es contenido de PRESENTACIÓN:
 * cada empresa afinará su ficha después desde el panel.
 *
 * Reglas aplicadas (ver instrucciones):
 *  - No se inventan cifras, años, logros, clientes ni frases promocionales.
 *    El "titular" es solo el rubro genérico (o la profesión, en profesionales).
 *  - No se cargan logos: todas usan la marca tipográfica de respaldo.
 *  - No se inventan correos, teléfonos ni URLs: emailContacto y sitioWeb quedan
 *    vacíos (la ficha ofrece validar el perfil; no muestra el contacto).
 *  - zonas = ["Todo Chile"] provisional para todas.
 *  - Categorías provisionales: se cargan tal cual; Rodrigo las corregirá.
 *  - createOrReplace con _id estable "empresa-<slug>": re-ejecutar no duplica.
 *
 * Ejecutar:  npx tsx scripts/cargar-vitrina.ts
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
      // el archivo puede no existir; seguimos con el siguiente
    }
  }
  throw new Error(
    "Falta SANITY_WRITE_TOKEN. Créalo en sanity.io/manage (API > Tokens, permiso " +
      "Editor) y agrégalo a .env.local como: SANITY_WRITE_TOKEN=<valor>"
  );
}

const client = createClient({
  projectId: "gt9dfhv2",
  dataset: "production",
  apiVersion: "2024-10-01",
  token: cargarToken(),
  useCdn: false,
});

function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quitar acentos (marcas combinantes)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Titular = rubro genérico (neutro, sin datos inventados) según la categoría.
const TITULAR: Record<string, string> = {
  "hormigón prefabricado": "Hormigón prefabricado",
  "madera/CLT": "Madera / CLT",
  "acero liviano": "Acero liviano",
  "módulos 3D": "Módulos 3D",
  envolvente: "Envolvente",
  instalaciones: "Instalaciones",
  "ingeniería y diseño": "Ingeniería y diseño",
  servicios: "Servicios para la construcción",
};

type ConCategoria = { nombre: string; cat: keyof typeof TITULAR };

const ORO: ConCategoria[] = [
  { nombre: "Tecno Fast", cat: "módulos 3D" },
  { nombre: "Knauf", cat: "envolvente" },
  { nombre: "Cía Industrial El Volcán S.A.", cat: "envolvente" },
  { nombre: "Icafal", cat: "servicios" },
  { nombre: "Axis Desarrollos Constructivos", cat: "servicios" },
  { nombre: "Atco Sabinco", cat: "módulos 3D" },
  { nombre: "Melón", cat: "hormigón prefabricado" },
  { nombre: "Promet", cat: "servicios" },
  { nombre: "Socovesa", cat: "servicios" },
  { nombre: "Eterna SpA", cat: "envolvente" },
  { nombre: "Prefabricadas Premium", cat: "hormigón prefabricado" },
  { nombre: "CO-OL Construcciones Modulares", cat: "módulos 3D" },
  { nombre: "Constructora Vive", cat: "servicios" },
  { nombre: "Biourban", cat: "servicios" },
  { nombre: "Grupo Geométrica", cat: "servicios" },
  { nombre: "Técnicas Chile", cat: "servicios" },
  { nombre: "Etex Chile", cat: "envolvente" },
];

const PLATA: ConCategoria[] = [
  { nombre: "Tensocret", cat: "hormigón prefabricado" },
  { nombre: "Echeverría Izquierdo", cat: "servicios" },
  { nombre: "VMB Ingeniería Estructural", cat: "ingeniería y diseño" },
  { nombre: "Simpson Strong-Tie", cat: "instalaciones" },
  { nombre: "Bravo Izquierdo", cat: "ingeniería y diseño" },
  { nombre: "Casas Delano PyV", cat: "madera/CLT" },
  { nombre: "Sodimac", cat: "servicios" },
  { nombre: "Alcop", cat: "servicios" },
  { nombre: "Spoerer Ingenieros", cat: "ingeniería y diseño" },
  { nombre: "Constructora Santa Magdalena", cat: "acero liviano" },
  { nombre: "Facoro", cat: "madera/CLT" },
  { nombre: "Ecomac", cat: "servicios" },
  { nombre: "AGF Aceros", cat: "acero liviano" },
  { nombre: "Constructora Noval", cat: "servicios" },
];

const BRONCE: ConCategoria[] = [
  { nombre: "RC Tecnova", cat: "servicios" },
  { nombre: "E2E", cat: "servicios" },
  { nombre: "IDIEM", cat: "servicios" },
  { nombre: "Hormipret", cat: "hormigón prefabricado" },
  { nombre: "Canada House", cat: "madera/CLT" },
  { nombre: "R&V Fundaciones y Contenciones", cat: "servicios" },
  { nombre: "Boetek", cat: "instalaciones" },
  { nombre: "Hormisur Inein", cat: "hormigón prefabricado" },
  { nombre: "Boetsch", cat: "ingeniería y diseño" },
  { nombre: "René Lagos Engineers", cat: "ingeniería y diseño" },
  { nombre: "Constructora Carrán", cat: "servicios" },
  { nombre: "Euroconstructora", cat: "servicios" },
  { nombre: "Valencia y Lizana", cat: "servicios" },
  { nombre: "Polpaico", cat: "hormigón prefabricado" },
  { nombre: "LD Constructora", cat: "servicios" },
  { nombre: "Archiplan", cat: "ingeniería y diseño" },
  { nombre: "Flesan", cat: "servicios" },
  { nombre: "Jonas", cat: "servicios" },
  { nombre: "Bricsa Construcción", cat: "servicios" },
  { nombre: "Ingepanel", cat: "envolvente" },
  { nombre: "Elfle", cat: "instalaciones" },
  { nombre: "Easywood", cat: "madera/CLT" },
  { nombre: "PyT Ltda.", cat: "servicios" },
  { nombre: "Bostik", cat: "envolvente" },
  { nombre: "Pietra", cat: "servicios" },
  { nombre: "Amaro Rivera", cat: "servicios" },
  { nombre: "Aitue", cat: "servicios" },
  { nombre: "Isiete", cat: "servicios" },
  { nombre: "Ararat", cat: "servicios" },
  { nombre: "Sto Chile", cat: "envolvente" },
  { nombre: "Grupo SCM", cat: "servicios" },
  { nombre: "Crillón", cat: "servicios" },
  { nombre: "CMPC Maderas", cat: "madera/CLT" },
  { nombre: "Suelotest", cat: "servicios" },
  { nombre: "MM Diseño e Ingeniería", cat: "ingeniería y diseño" },
];

// Academia: solo nombre (sin categorías ni descripción).
const ACADEMIA: string[] = [
  "Pontificia Universidad Católica de Chile",
  "Universidad Autónoma de Chile",
  "Universidad Andrés Bello",
  "Universidad Central",
  "Universidad Mayor",
  "IP Chile",
  "Universidad Tecnológica Metropolitana (UTEM)",
  "Universidad Técnica Federico Santa María",
  "Universidad Católica del Maule",
];

// Profesionales: nombre + profesión (en el titular), sin descripción comercial.
const PROFESIONALES: { nombre: string; profesion: string }[] = [
  { nombre: "Rodrigo López Ortíz", profesion: "Ingeniero industrial" },
  { nombre: "José Manuel Hevia Leiva", profesion: "Químico" },
  { nombre: "Jorge Bremer", profesion: "Arquitecto" },
  { nombre: "Julio Carrillo Echeverría", profesion: "Constructor civil" },
  { nombre: "Catalina Besser", profesion: "Arquitecta" },
  { nombre: "Sebastián Llanos Pinchart", profesion: "Constructor civil" },
  { nombre: "Rodrigo Reyes Jara", profesion: "Ingeniero industrial" },
  { nombre: "Ítalo Sepúlveda", profesion: "Ingeniero constructor" },
  { nombre: "Jorge Perelló Nieto", profesion: "Arquitecto" },
  { nombre: "Cristian Pino Infante", profesion: "Arquitecto" },
  { nombre: "Boris Naranjo Carrasco", profesion: "Constructor civil" },
  { nombre: "Felipe Espinoza Norambuena", profesion: "Constructor civil" },
  { nombre: "Francesca Pesce Orrego", profesion: "Ingeniera comercial" },
  { nombre: "Macarena Guzmán", profesion: "Arquitecta" },
  { nombre: "Eduardo Díaz", profesion: "Arquitecto" },
  { nombre: "Josefa Acevedo", profesion: "Constructora civil" },
  { nombre: "Claudio Pérez", profesion: "Ingeniero constructor" },
  { nombre: "Pamela Sanhueza", profesion: "Arquitecta" },
  { nombre: "Tomás Vera", profesion: "Arquitecto" },
  { nombre: "Daniel Pizarro R.", profesion: "Arquitecto" },
  { nombre: "Fernando Cortés Alcapio", profesion: "Arquitecto" },
  { nombre: "Tamara Orellana", profesion: "Ingeniera civil" },
];

type Doc = Record<string, unknown> & { _id: string };

function base(nombre: string, nivel: string): Doc {
  const slug = slugify(nombre);
  return {
    // Prefijo "vitrina-": el patrón "empresa-<slug>" ya lo usan los documentos
    // del tipo "empresa" (Ecosistema) y colisionaría (createOrReplace no puede
    // cambiar el _type de un documento existente).
    _id: `vitrina-${slug}`,
    _type: "empresaVitrina",
    nombre,
    slug: { _type: "slug", current: slug },
    nivel,
    zonas: ["Todo Chile"],
    activo: true,
  };
}

function construirDocs(): Doc[] {
  const docs: Doc[] = [];
  for (const nivel of [
    { lista: ORO, nombre: "oro" as const },
    { lista: PLATA, nombre: "plata" as const },
    { lista: BRONCE, nombre: "bronce" as const },
  ]) {
    for (const e of nivel.lista) {
      docs.push({ ...base(e.nombre, nivel.nombre), titular: TITULAR[e.cat], categorias: [e.cat] });
    }
  }
  for (const nombre of ACADEMIA) docs.push(base(nombre, "academia"));
  for (const p of PROFESIONALES) docs.push({ ...base(p.nombre, "profesional"), titular: p.profesion });
  return docs;
}

async function main() {
  const docs = construirDocs();

  // Aviso si dos nombres generan el mismo slug (colisionarían el _id).
  const vistos = new Map<string, string>();
  for (const d of docs) {
    if (vistos.has(d._id)) {
      throw new Error(`Slug duplicado: "${d.nombre}" y "${vistos.get(d._id)}" comparten _id ${d._id}`);
    }
    vistos.set(d._id, d.nombre as string);
  }

  const conteo: Record<string, number> = {};
  for (const d of docs) {
    await client.createOrReplace(d);
    conteo[d.nivel as string] = (conteo[d.nivel as string] ?? 0) + 1;
    console.log(`  ✔ ${d._id} — ${d.nombre} [${d.nivel}]`);
  }

  console.log("\nResumen por nivel:");
  for (const nivel of ["oro", "plata", "bronce", "academia", "profesional"]) {
    console.log(`  ${nivel}: ${conteo[nivel] ?? 0}`);
  }
  console.log(`\nListo: ${docs.length} empresas publicadas en la Vitrina (dataset production).`);
}

main().catch((err) => {
  console.error("Error al cargar la Vitrina:", err instanceof Error ? err.message : err);
  process.exit(1);
});
