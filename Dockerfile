FROM node:20-slim

RUN apt-get update && apt-get install -y \
    python3 make g++ \
    chromium \
    dumb-init \
    && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

RUN npm prune --omit=dev && npm cache clean --force

RUN mkdir -p ./data/sessions ./data/media

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main"]
