# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn run build -c production

# Stage 2: Production
FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app/dist/kaiteki-frontend/server /app/dist/server

CMD ["node", "./dist/server/server.mjs"]
