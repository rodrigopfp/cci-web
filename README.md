# Plataforma CCI — Prototipo navegable

Plataforma digital del **Consejo de Construccion Industrializada (CCI)**: medio editorial + datos y evidencia de la industrializacion en Chile. Next.js (App Router) + TypeScript + Tailwind, datos mock, sin backend.

## Correr localmente
Requisitos: Node.js 20+.
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # genera el sitio estático en /out
```

## Documentación del proyecto
- **[GUIA-DE-EDICION.md](GUIA-DE-EDICION.md)** — cómo editar contenido sin ser programador. Empieza por aquí.
- **[DESPLIEGUE.md](DESPLIEGUE.md)** — publicar en Railway + GitHub y trabajar entre varias personas.
- **[CMS-SANITY.md](CMS-SANITY.md)** — instalar el panel de administración de contenido.
- **[SEGURIDAD.md](SEGURIDAD.md)** — arquitectura de seguridad, mantenimiento y pendientes antes de publicar.

## Arquitectura
Next.js 16 (App Router) + TypeScript + Tailwind, con **exportación estática**: el
sitio se publica como archivos planos, sin servidor. Todo el contenido vive en
`src/data/`, separado de la interfaz.

## Identidad visual (Manual CCI, enero 2026)
- **Logo**: isotipo hexagono-cubo reconstruido en SVG (`src/components/Logo.tsx`): version facetada (naranjos #F6BA8C / #E87430 / #E04E00 + rombo blanco) para fondo blanco, y version outline en una tinta para fondos de color, segun regla 1.4 del manual (sobre naranja/gris/negro el logo completo va en blanco).
- **Paleta**: tokens en `tailwind.config.ts` con los colores oficiales — naranjos #E04E00/#E87430/#F6BA8C, gris corporativo #5C5C5C, azules secundarios #005CAD/#009DE6. `orange-dark` y `graphite-dark` son tonos funcionales (hover/fondos), no de marca.
- **Tipografia**: el manual exige **Museo Sans / Museo Display** (fuente comercial con licencia). Mientras no se disponga del webfont licenciado, el sitio usa **Mulish**, el sustituto libre mas cercano. Para activar Museo Sans: reemplazar el @import y las variables en `src/app/globals.css`.

## Gobernanza del dato
- Tipos en `src/data/types.ts`: `SourceType` (oficial/cci/empresa/academica/internacional/estimacion) y `DataStatus` (real/mock/pending).
- Indicadores y estudios reales citados en `src/data/indicators.ts` (Censo 2024 MINVU, McKinsey, ASCE, WEF, Comision Europea). Cada cifra enlaza a su fuente original. Lo que el CCI aun no mide se muestra como "En levantamiento" — regla del proyecto: no inventar datos.

## Estructura
```
src/app         rutas (home, noticias, evidencia, socios, recursos, eventos, publica, media-kit)
src/components  componentes reutilizables (Logo, MetricCard, ArticleCard, Blocks...)
src/data        capa de datos mock (contrato para futuro CMS)
src/lib         formato y etiquetas de gobernanza
```

## Conexion futura a CMS
La capa `src/data/` es el contrato: migrar a Sanity/Strapi/Directus/WordPress headless implica reemplazar solo esa capa manteniendo las firmas de las funciones (`getArticleBySlug`, etc.).
