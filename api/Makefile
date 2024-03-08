dc_dev = docker compose --env-file .env.dev -f docker-compose.dev.yml
dc_prod = docker compose --env-file .env.prod -f docker-compose.prod.yml

.SILENT:

run-dev:
	${dc_dev} up -d --build

run-prod:
	${dc_prod} up -d --build

build-dev:
	${dc_dev} build

build-prod:
	${dc_prod} build