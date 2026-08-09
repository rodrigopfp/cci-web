# Panel de administración (Sanity)

Guía para instalar el panel donde se edita el contenido del sitio sin tocar código.

**Estado actual:** los esquemas y la migración están listos en este repositorio.
Falta crear la cuenta de Sanity y conectar las piezas. Sigue los pasos en orden.

---

## Cómo va a funcionar

```
Tu compañera edita  →  Sanity guarda  →  avisa a GitHub  →  Railway recompila
   (panel web)          (contenido)        (puente)          (sitio actualizado)
```

El sitio sigue siendo estático: se recompila cada vez que alguien publica. Tarda
dos o tres minutos en aparecer el cambio. A cambio, en producción no corre
ningún servidor y la seguridad se mantiene intacta.

---

## Paso 1 — Crear el proyecto en Sanity

1. Entra a **sanity.io** y crea una cuenta (puedes usar tu cuenta de GitHub).
2. Crea un proyecto nuevo. Llámalo **CCI**.
3. Cuando lo cree, anota el **Project ID**: es un código corto tipo `a1b2c3d4`.
4. Asegúrate de que el dataset se llame **production** (es el nombre por defecto).

---

## Paso 2 — Instalar el panel en tu computador

En PowerShell, dentro de la carpeta del proyecto:

```bash
cd studio
npm install
```

Crea un archivo llamado `.env` **dentro de la carpeta `studio`** con el ID que
anotaste:

```
SANITY_STUDIO_PROJECT_ID=a1b2c3d4
```

Luego inicia sesión y prueba el panel localmente:

```bash
npx sanity login
npm run dev
```

Se abre en `http://localhost:3333`. Deberías ver el menú lateral con Noticias,
Radar, Evidencia y el resto.

---

## Paso 3 — Cargar el contenido actual

El repositorio incluye **`sanity-import.ndjson`**, que contiene los 99
documentos del sitio (noticias, indicadores, empresas certificadas, hitos,
estudios, eventos y recursos) ya convertidos al formato de Sanity.

Desde la carpeta `studio`:

```bash
npx sanity dataset import ../sanity-import.ndjson production
```

Cuando termine, recarga el panel y verás todo el contenido cargado.

> Si más adelante necesitas regenerar ese archivo desde el código:
> `npx tsx scripts/exportar-a-sanity.ts` en la raíz del proyecto.

---

## Paso 4 — Publicar el panel en internet

Para que tu compañera pueda entrar sin instalar nada:

```bash
npx sanity deploy
```

Te pedirá elegir un nombre. Quedará en una dirección tipo
**`cci.sanity.studio`**. Esa es la que le pasas a ella.

Para darle acceso: sanity.io → tu proyecto → **Members** → **Invite**.
Con el rol *Editor* puede crear y publicar contenido, pero no cambiar la
configuración del proyecto.

---

## Paso 5 — Conectar la publicación automática

Esta parte hace que al publicar en Sanity el sitio se actualice solo.

### 5.1 Datos de Railway

En Railway, abre tu servicio. La URL de la página contiene los identificadores:

```
railway.app/project/PROJECT_ID/service/SERVICE_ID?environmentId=ENVIRONMENT_ID
```

Anota `SERVICE_ID` y `ENVIRONMENT_ID`.

Luego, en Railway → **Account Settings → Tokens**, crea un token y anótalo.

### 5.2 Guardar los datos en GitHub

En GitHub → tu repositorio → **Settings → Secrets and variables → Actions →
New repository secret**. Crea tres:

| Nombre | Valor |
| --- | --- |
| `RAILWAY_TOKEN` | el token que creaste |
| `RAILWAY_SERVICE_ID` | el SERVICE_ID |
| `RAILWAY_ENVIRONMENT_ID` | el ENVIRONMENT_ID |

### 5.3 Crear el aviso desde Sanity

Necesitas un token de GitHub: **GitHub → Settings (tu perfil) → Developer
settings → Personal access tokens → Fine-grained tokens**. Dale acceso solo al
repositorio `cci-web`, con permiso de **Contents: Read and write**.

Luego, en **sanity.io → tu proyecto → API → Webhooks → Create webhook**:

- **Name:** Publicar sitio
- **URL:** `https://api.github.com/repos/TU-USUARIO/cci-web/dispatches`
- **Dataset:** production
- **Trigger on:** Create, Update, Delete
- **HTTP method:** POST
- **HTTP Headers:**
  - `Authorization` = `Bearer TU_TOKEN_DE_GITHUB`
  - `Accept` = `application/vnd.github+json`
- **Projection (cuerpo del mensaje):**
  ```
  {"event_type": "sanity-publicado"}
  ```

### 5.4 Probar

Publica cualquier cambio pequeño en el panel. En GitHub → pestaña **Actions**
debería aparecer el flujo «Publicar cambios de contenido» ejecutándose, y
enseguida un despliegue nuevo en Railway.

Si algo falla, puedes lanzarlo a mano desde Actions → *Publicar cambios de
contenido* → **Run workflow**, y así aislar dónde está el problema.

---

## Paso 6 — Conectar el sitio a Sanity

**Este paso todavía no está hecho.** Hoy el sitio lee el contenido desde los
archivos de `src/data/`. Una vez que el contenido esté cargado y verificado en
Sanity, hay que cambiar esa capa para que lea desde Sanity.

Es un cambio acotado —la capa de datos ya está aislada justamente para esto—
pero conviene hacerlo cuando los pasos anteriores estén funcionando, para no
mezclar problemas.

Mientras tanto el sitio funciona normalmente con los archivos actuales.

---

## Costos

El plan gratuito de Sanity cubre de sobra un sitio de este tamaño. Los límites
que importan son el número de usuarios y el volumen de consultas a la API; con
un sitio estático que consulta solo al compilar, el consumo es mínimo.
