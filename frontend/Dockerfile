FROM node:latest as build

WORKDIR /frontend

COPY package.json .
RUN yarn install

COPY . .
RUN yarn run build

FROM nginx:latest
COPY --from=build /frontend/dist/kaiteki-frontend/browser/ /usr/share/nginx/html/