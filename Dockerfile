# ============================================================================
# Despliegue en Railway — construcción en dos etapas.
#
# Etapa 1: compila el sitio con Node y produce archivos estáticos en /out.
# Etapa 2: los sirve con Caddy, un servidor de archivos minúsculo.
#
# Por qué así: en producción NO se ejecuta Next.js. El contenedor final solo
# contiene HTML/CSS/JS y un servidor de archivos. No hay Node corriendo, no hay
# Server Actions ni rutas de API: la superficie de ataque se reduce al mínimo.
# ============================================================================

# ---------- Etapa 1: compilación ----------
FROM node:20-alpine AS build
WORKDIR /app

# Se copian primero los manifiestos para aprovechar la caché de capas:
# si no cambian las dependencias, no se reinstalan en cada despliegue.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Etapa 2: publicación ----------
FROM caddy:2-alpine

# Solo viajan los archivos compilados. El código fuente y node_modules
# se quedan en la etapa anterior y no llegan a producción.
COPY --from=build /app/out /srv
COPY Caddyfile /etc/caddy/Caddyfile

# Railway inyecta PORT en tiempo de ejecución; el Caddyfile lo lee.
EXPOSE 8080
