#!/bin/bash
docker-compose up -d redis postgres

docker-compose run --rm app \
  yarn install

docker-compose run --rm app \
  npx prisma generate

# Ininitalize Database
DB_URL="https://tenta.davebay.net/public/dumps/db-latest.sql.gz"
curl $DB_URL | gzip -d > "./db.sql" 
docker-compose cp "./db.sql" postgres:/db.sql
docker-compose exec postgres psql -d course-portal -f /db.sql
# rm "./db.sql"

docker-compose run --rm app \
  npx prisma db push

#cd "./web" && yarn install
