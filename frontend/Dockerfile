# Stage 1: Production
FROM node:20-alpine AS production

WORKDIR /app

# Copy the built output from your local system to the image
COPY dist/kaiteki-frontend/server /app/dist/server

CMD ["node", "./dist/server/server.mjs"]