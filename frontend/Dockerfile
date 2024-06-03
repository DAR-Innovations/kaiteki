FROM node:20-alpine As builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build -c production

COPY --from=builder /app/dist/kaiteki-frontend/server /app/dist/server

CMD ["node", "./dist/server/server.mjs"]
