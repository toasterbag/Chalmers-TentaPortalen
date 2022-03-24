#!/bin/bash
yarn install

docker-compose app run \
  npx prisma generate

docker-compose app run \
  npx prisma db push

# Ininitalize Database
DB_URL="https://tenta.davebay.net/public/dumps/db-latest.sql.gz"
curl $DB_URL | gzip -d | docker-compose exec -T postgres psql -d course-portal

cd "./web" && yarn install
