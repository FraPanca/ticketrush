# Stage 1: build
FROM node:24-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Stage 2: test
FROM build AS test
RUN npm run test

# Stage 3: production
FROM node:24-alpine AS production
WORKDIR /app
COPY --from=test /app/package.json /tmp/test-gate
COPY package*.json ./
RUN npm ci --omit=dev
COPY --chown=node:node src/ ./src/
ENV NODE_ENV=production
EXPOSE 3001
USER node
CMD ["node", "src/app.js"]