# cci-forms — microservicio de formularios del CCI

Recibe los envíos de los formularios del sitio estático y crea documentos en
Sanity (bandeja interna del equipo, gestionable desde el Studio).

## Endpoints

- `POST /api/postulacion` → documento `postulacion` (requiere: nombre, email, organizacion)
- `POST /api/descarga` → documento `descargaLead` (requiere: nombre, email, organizacion, recursoSlug)
- `POST /api/aporte` → documento `aporte` (requiere: nombre, email, mensaje)
- `POST /api/latam` → documento `aporte` con `tipo: "latam"` (requiere: nombre, email, mensaje)
- `GET /health` → `{ ok: true }`

Todas las respuestas son JSON: `{ ok: true }` o `{ ok: false, error }`.
Cada POST aplica: honeypot (campo oculto `web2`), rate limit por IP (10/min) y
validación de campos obligatorios. CORS restringido a `ALLOWED_ORIGIN`.

## Variables de entorno

| Variable | Descripción |
|---|---|
| `SANITY_PROJECT_ID` | ID del proyecto Sanity (p. ej. `gt9dfhv2`) |
| `SANITY_DATASET` | Dataset (`production`) |
| `SANITY_WRITE_TOKEN` | Token de escritura (permiso Editor). Secreto. |
| `ALLOWED_ORIGIN` | Origen(es) permitido(s), coma-separado. Ej: `https://cci-web-production.up.railway.app` |
| `PORT` | Puerto (Railway lo inyecta; por defecto 8080) |

## Local

```bash
npm install
npm run build
SANITY_PROJECT_ID=gt9dfhv2 SANITY_DATASET=production SANITY_WRITE_TOKEN=xxx ALLOWED_ORIGIN=http://localhost:3000 npm start
```

## Conexión con el sitio

El sitio activa el modo API definiendo `NEXT_PUBLIC_FORMS_API_URL` con la URL de
este servicio. Sin esa variable, el sitio funciona en modo respaldo
(mailto / descarga directa) y este servicio no se usa.

> El despliegue en Railway se realizará de forma guiada. Este repositorio solo
> contiene el código; no lo despliegues automáticamente.
