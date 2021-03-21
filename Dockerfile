FROM node:14
WORKDIR /usr/src/tenta-web
COPY package.json ./
COPY yarn.lock ./
