/**
 * Carga inicial de "Voces de la industrialización" en Sanity.
 *
 * Usa createOrReplace con _id estable ("voz-<slug>") y _type "voz", de modo que
 * re-ejecutar el script actualiza los mismos documentos en vez de duplicarlos.
 *
 * Datos reales verificados en la web del CCI. Solo Rodrigo Araya lleva una
 * entrevista de MUESTRA (él la autoriza y editará después). Las otras 4 voces
 * llevan únicamente nombre, cargo y organización: su ficha mostrará
 * "Entrevista próximamente". No se inventan citas ni datos para ellas.
 *
 * Ejecutar:  npx tsx scripts/cargar-voces.ts
 * Requiere SANITY_WRITE_TOKEN (permiso Editor) en .env.local — nunca se commitea.
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Carga SANITY_WRITE_TOKEN desde el entorno o, si no está, desde .env.local/.env
// (sin dependencias: parser mínimo). El token jamás se imprime.
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

interface QA {
  pregunta: string;
  respuesta: string;
}

interface VozInput {
  slug: string;
  orden: number;
  nombre: string;
  cargo: string;
  organizacion: string;
  fraseDestacada?: string;
  entrevista?: QA[];
}

const voces: VozInput[] = [
  {
    slug: "rodrigo-araya-valenzuela",
    orden: 2,
    nombre: "Rodrigo Araya Valenzuela",
    cargo: "Vicepresidente de Posicionamiento Estratégico y Operaciones, CCI",
    organizacion: "Gerente General de Prefabricadas Premium",
    fraseDestacada:
      "Industrializar la vivienda es construir con más control y menos improvisación, para elevar el estándar en cada obra.",
    // Entrevista de MUESTRA (editable por Rodrigo). Solo visión cualitativa:
    // sin cifras ni datos duros, para no publicar números sin fuente.
    entrevista: [
      {
        pregunta: "¿Por qué industrializar la construcción?",
        respuesta:
          "Porque nos permite construir con más control y previsibilidad. Llevar buena parte del trabajo a un entorno de fábrica ordena el proceso, reduce la improvisación en terreno y hace que la calidad deje de depender de las condiciones de cada faena. Para mí, industrializar es sobre todo una forma de construir mejor y de manera más consistente.",
      },
      {
        pregunta: "¿Qué cambia en la obra cuando se industrializa?",
        respuesta:
          "Cambia la lógica del trabajo. La obra se vuelve más un proceso de montaje que de fabricación en terreno, con etapas planificadas y coordinadas desde antes. Eso ordena los tiempos, mejora las condiciones de trabajo y permite anticipar problemas en lugar de resolverlos sobre la marcha. El equipo pasa a operar con más método y menos urgencia.",
      },
      {
        pregunta: "¿Qué rol juega la vivienda industrializada certificada?",
        respuesta:
          "La certificación es clave para dar confianza. Ordena las reglas, define estándares comunes y permite que distintos actores hablen el mismo lenguaje. Para que la industrialización crezca de forma seria, necesitamos que la calidad esté respaldada por un marco reconocido, y no solo por la buena voluntad de cada empresa.",
      },
      {
        pregunta: "¿Qué viene para el sector?",
        respuesta:
          "Veo un sector que está madurando. Cada vez más empresas se suman, se profesionaliza la cadena y la industrialización deja de ser una apuesta para volverse una manera habitual de construir. El desafío ahora es sostener ese avance con colaboración, formación de capacidades y una mirada de largo plazo.",
      },
    ],
  },
  {
    slug: "pabla-ortuzar",
    orden: 1,
    nombre: "Pabla Ortúzar",
    cargo: "Presidenta del CCI",
    organizacion: "Socia de Archiplan S.A.",
  },
  {
    slug: "gian-capurro",
    orden: 3,
    nombre: "Gian Capurro",
    cargo: "Director del CCI · Líder del GT de Vinculación Nacional",
    organizacion: "Gerente General de Constructora Santa Magdalena",
  },
  {
    slug: "tatiana-martinez",
    orden: 4,
    nombre: "Tatiana Martínez",
    cargo: "Presidenta del CCI 2022-2024",
    organizacion: "Gerente General de Hormipret",
  },
  {
    slug: "lucia-simons",
    orden: 5,
    nombre: "Lucía Simons",
    cargo: "Coordinadora Ejecutiva del CCI",
    organizacion: "Consejo de Construcción Industrializada",
  },
];

async function main() {
  for (const v of voces) {
    const doc = {
      _id: `voz-${v.slug}`,
      _type: "voz",
      nombre: v.nombre,
      slug: { _type: "slug", current: v.slug },
      cargo: v.cargo,
      organizacion: v.organizacion,
      orden: v.orden,
      ...(v.fraseDestacada ? { fraseDestacada: v.fraseDestacada } : {}),
      ...(v.entrevista
        ? {
            entrevista: v.entrevista.map((qa, i) => ({
              _key: `qa-${i + 1}`,
              _type: "parQyR",
              pregunta: qa.pregunta,
              respuesta: qa.respuesta,
            })),
          }
        : {}),
    };
    await client.createOrReplace(doc);
    console.log(`  ✔ ${doc._id} — ${v.nombre}`);
  }
  console.log(`\nListo: ${voces.length} voces publicadas en Sanity (dataset production).`);
}

main().catch((err) => {
  console.error("Error al cargar voces:", err instanceof Error ? err.message : err);
  process.exit(1);
});
