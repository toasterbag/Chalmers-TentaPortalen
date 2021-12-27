#!/bin/bash
docker-compose -f docker-compose.dev.yml up -d postgres redis
docker-compose -f docker-compose.dev.yml app run \
  npx prisma db push

