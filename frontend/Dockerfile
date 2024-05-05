FROM node:latest as build

WORKDIR /frontend

COPY package.json .
RUN yarn install

COPY . .
RUN yarn run build
