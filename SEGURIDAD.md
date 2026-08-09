# Seguridad y mantenimiento

## Decisión de arquitectura: sitio estático

El sitio se compila a **HTML, CSS y JS planos** (`output: "export"` en
`next.config.mjs`). En producción no queda ningún servidor Node ejecutándose.

Esto importa: la mayoría de las vulnerabilidades graves reportadas en Next.js
durante 2025–2026 afectan a Server Actions, middleware y rutas de API. Este
sitio no usa ninguna de esas funciones, y con exportación estática ni siquiera
existen como superficie de ataque.

**Si en el futuro se necesita una función de servidor** (por ejemplo un
formulario con backend propio o un panel de administración), hay que quitar
`output: "export"` y volver a evaluar la seguridad desde cero.

## Versión de Next.js

El proyecto usa **Next.js 16.2.x (Active LTS)**.

Importante: la rama 14.x, con la que se desarrolló el prototipo, **ya no recibe
parches de seguridad**. No se debe volver a ella.

## Cabeceras de seguridad

Configuradas en el **`Caddyfile`** (que es lo que se usa en Railway). También se
incluyen `netlify.toml` y `vercel.json` con las mismas cabeceras, por si algún
día se migra el hosting.

| Cabecera | Qué previene |
| --- | --- |
| `Content-Security-Policy` | Carga de scripts o recursos desde orígenes no autorizados |
| `X-Frame-Options: DENY` | Que el sitio se incruste en un iframe ajeno (clickjacking) |
| `X-Content-Type-Options: nosniff` | Que el navegador interprete archivos como un tipo distinto |
| `Strict-Transport-Security` | Conexiones sin cifrar |
| `Referrer-Policy` | Filtración de URLs internas al navegar a otros sitios |
| `Permissions-Policy` | Acceso a cámara, micrófono y ubicación |

Si agregas un recurso externo nuevo (una fuente, un script de analítica, un
video incrustado), hay que declararlo en la CSP o el navegador lo bloqueará.
Recuerda actualizarla en los tres archivos para mantenerlos coherentes.

## En producción no corre Next.js

El `Dockerfile` usa dos etapas: Node compila el sitio y Caddy sirve los archivos
resultantes. El contenedor publicado **no contiene Node, ni el código fuente, ni
node_modules**: solo HTML, CSS, JS y un servidor de archivos.

## Rutina de mantenimiento

**Cada mes:**
```bash
npm audit          # revisar vulnerabilidades conocidas
npm outdated       # ver qué dependencias tienen versión nueva
```

**Cuando aparezca un aviso de seguridad de Next.js:** actualizar dentro de la
misma rama LTS y volver a desplegar.

```bash
npm install next@latest
npm run build      # verificar que sigue compilando
```

## Cuentas y accesos

Recomendaciones para el CCI como institución:

- El repositorio y el hosting deben estar **a nombre del CCI**, no de una
  persona. Si están en una cuenta personal, el sitio queda atado a esa persona.
- Activar **verificación en dos pasos** en las cuentas de GitHub y del hosting.
- Dar acceso solo a quienes editan, y revisarlo cuando alguien cambia de rol.
- El dominio debe estar registrado a nombre del CCI, con los datos de contacto
  del Consejo.

## Pendientes antes de publicar

- [ ] El formulario de «Publica con nosotros» **no envía nada**: es una
      demostración visual. Conectar un servicio de formularios antes de
      publicarlo, o retirarlo temporalmente.
- [ ] Las descargas de la sección Recursos son **simuladas**. Subir los archivos
      reales o retirar la sección.
- [ ] Los valores del Media Kit son **referenciales inventados**. Reemplazar por
      las tarifas reales o retirar los montos.
- [ ] Los eventos de la agenda son de ejemplo. Reemplazar por la agenda real.
- [ ] Verificar la licencia de la tipografía Museo Sans antes de usarla en web.
- [ ] Reemplazar el PNG del logo por el SVG oficial del CCI.
