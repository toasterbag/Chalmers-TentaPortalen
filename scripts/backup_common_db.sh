#!/bin/bash
docker-compose exec -T postgres pg_dump -d course-portal-common
