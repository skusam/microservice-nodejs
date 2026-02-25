# --- Build Stage ---
FROM node:25 AS build

WORKDIR /app

# Nur package.json + lockfile kopieren (bessere Cache-Nutzung)
COPY package*.json ./

# Dependencies installieren
RUN npm install

# Restlichen Code kopieren
COPY . .

# TypeScript build
RUN npm run build


# --- Runtime Stage ---
FROM node:25-slim AS runtime

WORKDIR /app

# Nur notwendige Dateien kopieren
COPY package*.json ./
RUN npm install --omit=dev

# Kompiliertes JS aus dem Build-Container kopieren
COPY --from=build /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/server.js"]
