FROM node:20-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build 

FROM nginx:alpine

COPY --from=build /app/dist/kaiteki-frontend/browser /usr/share/nginx/html/kaiteki

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]