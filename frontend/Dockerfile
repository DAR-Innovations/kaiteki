FROM node:latest as build

WORKDIR /frontend

COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn run build

# Stage 2: Serve the angular app with Nginx
FROM nginx:alpine
COPY --from=build-stage /frontend/dist/kaiteki-frontend/browser/ /usr/share/nginx/html/