FROM node:17-alpine AS dev-deps
RUN mkdir /app && chown node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install

FROM node:17-alpine AS production-deps
RUN mkdir /app && chown node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json yarn.lock ./
COPY --chown=node:node ./prisma ./prisma
RUN yarn install --production
RUN yarn generate

FROM dev-deps AS compile
WORKDIR /app
USER node
COPY --chown=node:node . ./
RUN yarn generate
RUN yarn build

FROM node:17-alpine AS final
RUN mkdir /app && chown node:node /app
WORKDIR /app
USER node
COPY --chown=node:node --from=production-deps /app/node_modules ./node_modules
#COPY --chown=node:node --from=compile /app/node_modules/@prisma ./node_modules/@prisma
COPY --chown=node:node --from=compile /app/dist ./dist
CMD ["node", "dist/index.js"]