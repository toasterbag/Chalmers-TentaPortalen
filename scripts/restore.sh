POSTGRES_CONTAINER="course-portal-postgres"
APP_CONTAINER="course-portal-app"

[[ $1 ]] || echo "Hello" && exit

tar -xvf "$1" .docker
docker-compose exec app npm install
cat .docker/db.sql | docker-compose exec postgres psql $DATABASE_URL

