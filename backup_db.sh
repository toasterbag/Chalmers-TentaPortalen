#!/bin/bash
docker-compose -f docker-compose.dev.yml exec postgres pg_dump -d course-portal