# Guía de edición del sitio CCI

Esta guía es para **editar el contenido del sitio sin ser programador**. Está pensada
para trabajar con ayuda de Claude, pero también sirve para editar a mano.

---

## Lo primero: cómo está organizado

Todo el contenido del sitio vive en una sola carpeta: **`src/data/`**.
No necesitas tocar nada fuera de ahí para las tareas habituales.

| Quiero cambiar… | Abro este archivo |
| --- | --- |
| Noticias | `src/data/articles.ts` |
| Cifras del Radar y empresas certificadas | `src/data/radar.ts` |
| Indicadores y estudios de Evidencia | `src/data/indicators.ts` |
| Línea de tiempo de hitos | `src/data/hitos.ts` |
| Empresas del Ecosistema | `src/data/partners.ts` |
| Eventos y recursos descargables | `src/data/resources.ts` |

---

## Regla de oro del proyecto

> **No se publica ninguna cifra sin fuente.**

Cada dato numérico del sitio indica de dónde viene, de qué tipo es y cuándo se
verificó. Si un dato todavía no existe, se marca como *En levantamiento* en vez
de inventar un número. Esto no es un capricho de diseño: es lo que hace que el
sitio sea citable por periodistas y por el sector público.

Cuando agregues un dato, completa siempre:

- `sourceType`: `oficial` · `cci` · `empresa` · `academica` · `internacional` · `estimacion`
- `status`: `real` (verificado) · `mock` (ejemplo) · `pending` (en levantamiento)
- `source`: título, organización, año y enlace al documento original
- `lastUpdated`: fecha en que se verificó

---

## Cómo agregar una noticia

Abre `src/data/articles.ts` y copia un bloque existente completo, desde `{` hasta
`},`. Luego cambia los campos:

```ts
{
  id: "n16",                          // un identificador único, no repetido
  slug: "titulo-en-minusculas-con-guiones",  // define la URL de la noticia
  title: "Título de la noticia",
  excerpt: "Bajada de dos o tres líneas.",
  category: "Normativa y certificación",     // debe ser una de las categorías válidas
  type: "editorial",                  // editorial | socio | patrocinado
  date: "2026-08-15",                 // formato AAAA-MM-DD
  author: "Redacción CCI",
  image: { from: "#E04E00", to: "#005CAD", label: "Etiqueta sobre la foto" },
  photo: "https://...",               // opcional: URL de la foto de portada
  readingMinutes: 4,
  sourceUrl: "https://...",           // enlace a la publicación original
  sourceName: "MINVU · DITEC",
  content: [
    "Primer párrafo.",
    "Segundo párrafo.",
  ],
},
```

**Categorías válidas** (deben escribirse exactamente así):
País y políticas públicas · Vivienda industrializada · Innovación y productividad ·
Casos de socios · Normativa y certificación · Sostenibilidad · Opinión experta ·
Eventos CCI · Internacional · Publirreportajes

**Sobre `type`:** esta es la etiqueta que protege la credibilidad editorial.
`editorial` es contenido propio del CCI, `socio` es una noticia aportada por una
empresa socia, y `patrocinado` es un publirreportaje pagado. Nunca marques como
`editorial` algo que una empresa pagó o envió: el sitio lo rotula visiblemente y
esa distinción es la base de la confianza del lector.

---

## Cómo actualizar el Radar

Cuando la DITEC certifique una nueva empresa, abre `src/data/radar.ts` y agrega
una línea al final del listado `certifiedCompanies`:

```ts
{ name: "Nombre Empresa SpA", resolution: "Res. Ex. N°123", date: "2026-09-01", year: 2026 },
```

Los contadores de la portada y del Radar se recalculan solos. No hay que tocar
ningún número a mano.

Si la empresa ya estaba certificada y recibe una segunda resolución, agrega
`repeat: true` para que no se cuente dos veces.

---

## Trabajar con Claude

La forma más cómoda de editar es pedirle a Claude que lo haga por ti. Ejemplos de
instrucciones que funcionan bien:

- «Agrega una noticia sobre [tema], con fuente [enlace], en la categoría Normativa.»
- «La DITEC certificó a [empresa] con la Res. Ex. N°X del [fecha]. Agrégala al Radar.»
- «Cambia el texto del hero de la portada por: [nuevo texto].»
- «Agrega un hito a la línea de tiempo: [qué pasó], en [fecha], con fuente [enlace].»

Siempre dile a Claude **de dónde sacaste el dato**. Si no tienes fuente, díselo
también: marcará el dato como pendiente en vez de publicarlo como verificado.

---

## Antes de publicar: revisa siempre

1. **Ortografía y tildes.** El sitio está en español de Chile y las tildes importan.
2. **Que la fuente exista y abra.** Haz clic en el enlace antes de publicar.
3. **Que el dato diga lo que dices que dice.** Los estudios internacionales hablan
   de otros mercados; no los presentes como si midieran Chile.
4. **Que compile.** Corre `npm run build` en la terminal. Si aparece un error,
   pásaselo a Claude tal cual: casi siempre es una coma o una comilla.

---

## Comandos que vas a usar

```bash
npm install       # solo la primera vez, o al cambiar de versión
npm run dev       # ver el sitio en tu computador: http://localhost:3000
npm run build     # comprobar que todo compila antes de publicar
```

---

## Qué NO tocar sin ayuda técnica

- `next.config.mjs` — contiene la configuración de exportación estática, que es
  lo que mantiene el sitio seguro.
- `netlify.toml` y `vercel.json` — cabeceras de seguridad.
- La carpeta `src/components/` — el diseño de los componentes.
- `package.json` — versiones de las dependencias.

Si algo de esto necesita cambiar, pídelo con Claude explicando qué quieres lograr,
y revisa el resultado antes de publicar.
