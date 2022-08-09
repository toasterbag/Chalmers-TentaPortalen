#!/bin/bash
docker-compose up -d redis postgres

docker-compose run --rm app \
  yarn install

docker-compose run --rm app \
  npx prisma generate --schema ./prisma-common/schema.prisma

docker-compose run --rm app \
  npx prisma generate --schema ./prisma-restricted/schema.prisma

docker-compose exec postgres psql -c 'CREATE DATABASE "course-portal-common"'
docker-compose exec postgres psql -c 'CREATE DATABASE "course-portal-restricted"'

# Ininitalize Database
DB_URL="https://tenta.chs.se/public/dumps/db-latest.sql.gz"
curl $DB_URL | gzip -d > "./db.sql" 


docker-compose cp "./db.sql" postgres:/db.sql
docker-compose exec postgres psql -d course-portal-common -f /db.sql

docker-compose run --rm app \
  npx prisma db push --schema ./prisma-common/schema.prisma

docker-compose run --rm app \
  npx prisma db push --schema ./prisma-restricted/schema.prisma

#cd "./web" && yarn install
