# --- Build Stage ---
FROM node:25-alpine AS build

WORKDIR /app

# Nur package.json + lockfile kopieren (bessere Cache-Nutzung)
COPY package*.json ./

# Dependencies installieren
RUN npm ci

# Restlichen Code kopieren
COPY . .

# TypeScript build
RUN npm run build


# --- Runtime Stage ---
FROM node:25-alpine AS runtime

WORKDIR /app

# Nur Produktions-Dependencies aus dem Build kopieren
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/server.js"]
