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

# Variables públicas de Sanity. Next.js las INCRUSTA en el bundle en tiempo de
# compilación, así que deben estar en el entorno ANTES de `npm run build`.
# Railway entrega las variables del servicio como build args con el mismo
# nombre; aquí las recibimos como ARG y las exponemos como ENV para el build.
# Sin ellas, el sitio compilaría sin projectId y quedaría vacío.
ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET=production
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=$NEXT_PUBLIC_SANITY_PROJECT_ID
ENV NEXT_PUBLIC_SANITY_DATASET=$NEXT_PUBLIC_SANITY_DATASET

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
