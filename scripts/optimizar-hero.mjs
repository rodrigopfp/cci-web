// Optimiza las 4 fotos del carrusel del hero.
// Lee de la carpeta de origen (Downloads) y escribe en /public/hero/
// como hero-1..4 en .jpg progresivo (1600px, q~70) y .webp.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "C:/Users/rodri/Downloads";
const OUT = path.resolve(process.cwd(), "public/hero");
fs.mkdirSync(OUT, { recursive: true });

const files = [
  { src: "0H3A1665.jpg", out: "hero-1", qJpg: 70, qWebp: 70 },
  { src: "0H3A5432.jpg", out: "hero-2", qJpg: 70, qWebp: 70 },
  // Osaka: imagen clara y muy detallada → comprime peor; bajamos calidad para
  // mantenerla bajo ~250 KB. En webp el detalle infla el peso, así que su
  // calidad va aún más baja para que el webp nunca supere a su propio jpg.
  { src: "EXPO OSAKA CCI 1.jpeg", out: "hero-3", qJpg: 60, qWebp: 48 },
  { src: "0H3A7163.jpg", out: "hero-4", qJpg: 70, qWebp: 70 },
];

const WIDTH = 1600;

for (const f of files) {
  const input = path.join(SRC, f.src);
  const meta = await sharp(input).metadata();
  const pipeline = () =>
    sharp(input).rotate().resize({ width: WIDTH, withoutEnlargement: true });

  await pipeline()
    .jpeg({ quality: f.qJpg, progressive: true, mozjpeg: true })
    .toFile(path.join(OUT, `${f.out}.jpg`));

  await pipeline()
    .webp({ quality: f.qWebp, effort: 6 })
    .toFile(path.join(OUT, `${f.out}.webp`));

  const jpgSize = fs.statSync(path.join(OUT, `${f.out}.jpg`)).size;
  const webpSize = fs.statSync(path.join(OUT, `${f.out}.webp`)).size;
  console.log(
    `${f.out}  src=${meta.width}x${meta.height}  jpg=${(jpgSize / 1024).toFixed(0)}KB  webp=${(webpSize / 1024).toFixed(0)}KB`
  );
}
