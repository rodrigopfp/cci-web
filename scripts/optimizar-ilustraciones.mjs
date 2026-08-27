// Optimiza las 10 ilustraciones (2 bandas + 8 biblioteca) a webp.
// Lee de Descargas (copia, no mueve) y escribe en /public/ilustraciones/.
// Criterio del hero: ancho máx 1600px, objetivo < 250 KB c/u.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "C:/Users/rodri/Downloads";
const OUT_DATA = path.resolve(process.cwd(), "public/ilustraciones/data");
const OUT_CONOC = path.resolve(process.cwd(), "public/ilustraciones/conocimiento");
fs.mkdirSync(OUT_DATA, { recursive: true });
fs.mkdirSync(OUT_CONOC, { recursive: true });

const stamp = (s) => `ChatGPT Image 27 ago 2026, ${s}.png`;

const files = [
  { src: "15_39_39 (2)", out: OUT_DATA, name: "banda-ciclo", q: 78 },
  { src: "15_39_38 (1)", out: OUT_DATA, name: "banda-integracion", q: 78 },
  { src: "15_48_29 (4)", out: OUT_CONOC, name: "productividad", q: 78 },
  { src: "15_53_21 (1)", out: OUT_CONOC, name: "barreras", q: 78 },
  { src: "15_48_28 (1)", out: OUT_CONOC, name: "integracion-temprana", q: 78 },
  { src: "15_53_23 (3)", out: OUT_CONOC, name: "bim", q: 78 },
  { src: "15_53_23 (2)", out: OUT_CONOC, name: "dfma", q: 78 },
  { src: "15_48_28 (2)", out: OUT_CONOC, name: "sostenibilidad", q: 78 },
  { src: "15_48_31 (8)", out: OUT_CONOC, name: "capital-humano", q: 78 },
  { src: "15_48_29 (3)", out: OUT_CONOC, name: "normativa", q: 78 },
];

const WIDTH = 1600;

for (const f of files) {
  const input = path.join(SRC, stamp(f.src));
  const meta = await sharp(input).metadata();
  const outPath = path.join(f.out, `${f.name}.webp`);
  await sharp(input)
    .resize({ width: WIDTH, withoutEnlargement: true })
    .webp({ quality: f.q, effort: 6 })
    .toFile(outPath);
  const size = fs.statSync(outPath).size;
  const rel = path.relative(process.cwd(), outPath).replace(/\\/g, "/");
  console.log(`${(size / 1024).toFixed(0).padStart(4)} KB  ${meta.width}x${meta.height}→${Math.min(WIDTH, meta.width)}w  ${rel}`);
}
