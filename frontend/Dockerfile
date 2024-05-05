FROM node:20-alpine as build-stage

WORKDIR /frontend

COPY package*.json ./
RUN yarn install

COPY .. .
RUN npm run build --omit=dev

# Stage 2: Serve the angular app with Nginx
FROM nginx:alpine
COPY --from=build-stage /frontend/dist/kaiteki-frontend /usr/share/nginx/html
