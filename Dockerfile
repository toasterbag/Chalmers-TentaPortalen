FROM node:latest
#WORKDIR /usr/src/tenta-web
#COPY ./web/package.json ./
#COPY ./web/yarn.lock ./
#RUN npm install
#COPY ./web .
#RUN npm run build

WORKDIR /usr/src/tenta-server
COPY ./server/package.json ./
COPY ./server/yarn.lock ./
RUN npm install
COPY ./server .
ADD ./.env ./.env
RUN npx prisma generate
RUN npm run build

CMD [ "node", "." ]

