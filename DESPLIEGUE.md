# Publicar el sitio (Railway + GitHub)

Guía paso a paso. Se hace una sola vez; después, publicar es solo subir cambios.

---

## Cómo funciona

```
Tu computador  →  GitHub  →  Railway  →  sitio publicado
   (editas)      (guarda    (compila y     (visitantes)
                 historial)   sirve)
```

Cada vez que subes un cambio a GitHub, Railway lo detecta, compila el sitio y lo
publica automáticamente. No hay que subir archivos a mano.

**Importante:** en producción no se ejecuta Next.js. El `Dockerfile` compila el
sitio a archivos estáticos y luego los sirve con Caddy, un servidor de archivos
mínimo. Eso mantiene la superficie de ataque casi en cero.

---

## Paso 1 — Crear el repositorio en GitHub

1. Entra a github.com y crea un repositorio **privado** llamado `cci-web`.
   Créalo en la cuenta u organización del **CCI**, no en una cuenta personal
   (ver la sección de gobernanza más abajo).
2. En tu computador, dentro de la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Versión inicial del sitio CCI"
git branch -M main
git remote add origin https://github.com/ORGANIZACION/cci-web.git
git push -u origin main
```

Reemplaza `ORGANIZACION` por el nombre real de la cuenta.

---

## Paso 2 — Conectar Railway

1. Entra a railway.app → **New Project** → **Deploy from GitHub repo**.
2. Elige el repositorio `cci-web`.
3. Railway detecta el `Dockerfile` automáticamente y compila. No hay que
   configurar variables de entorno: el sitio no usa ninguna.
4. Cuando termine, entra al servicio → **Settings** → **Networking** →
   **Generate Domain**. Railway te da una URL para probar.

La primera compilación tarda unos minutos. Las siguientes son más rápidas
porque Railway reutiliza las capas del Docker.

---

## Paso 3 — Dominio propio

En Railway: **Settings → Networking → Custom Domain**, y escribe el dominio que
usará el sitio. Railway te indicará qué registro DNS crear.

Quien administre el dominio del CCI debe agregar ese registro. El certificado
HTTPS lo emite Railway automáticamente.

---

## Publicar un cambio (el día a día)

```bash
git add .
git commit -m "Agrega noticia sobre el seminario VIT"
git push
```

Railway lo publica solo. Si algo sale mal, en Railway puedes volver a una
versión anterior desde el historial de despliegues.

---

## Trabajar entre dos personas

Para que dos personas editen sin pisarse:

1. Cada una trabaja en su **rama**:
   ```bash
   git checkout -b noticias-agosto
   # ...editar...
   git add .
   git commit -m "Noticias de agosto"
   git push -u origin noticias-agosto
   ```
2. En GitHub se abre un **pull request**. Se revisa el cambio y se aprueba.
3. Al fusionarlo a `main`, Railway publica.

GitHub compila automáticamente cada propuesta de cambio
(`.github/workflows/verificar.yml`). Si el sitio no compila, aparece en rojo
antes de llegar a producción.

**Recomendado:** en GitHub → Settings → Branches, protege la rama `main` para
exigir que los cambios pasen por pull request. Así nadie publica sin revisión,
ni siquiera por accidente.

---

## Gobernanza: a nombre de quién

Esta decisión importa más de lo que parece.

El repositorio, el proyecto de Railway y el dominio deberían estar a nombre del
**CCI como institución**, con al menos dos personas con acceso de administrador.
Si quedan en una cuenta personal, el sitio del gremio depende de esa persona:
el día que cambie de rol o no esté disponible, nadie puede publicar ni recuperar
el acceso.

Lo más simple: crear una **organización de GitHub** para el CCI e invitar ahí a
quienes editen. Railway se conecta a esa organización.

Activa verificación en dos pasos en ambas cuentas.

---

## Costos

Railway cobra por uso. Este sitio es estático y muy liviano, así que el consumo
es bajo, pero **no es gratis y el contenedor está siempre encendido**.

Si en algún momento el costo importa, Netlify y Vercel alojan sitios estáticos
como este sin costo en su plan gratuito. El proyecto ya incluye `netlify.toml` y
`vercel.json` listos, así que migrar sería cuestión de conectar el mismo
repositorio. No es urgente: es una salida disponible si se necesita.

---

## Antes de publicar de verdad

Revisa la lista de pendientes en **[SEGURIDAD.md](SEGURIDAD.md)**. Hay contenido
de demostración que no debe quedar público: el formulario no envía nada, las
descargas son simuladas, los precios del Media Kit son inventados y los eventos
de la agenda son de ejemplo.
