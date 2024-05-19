dc_dev = docker compose --env-file .env.dev -f docker-compose.dev.yml
dc_prod = docker compose --env-file .env.prod -f docker-compose.prod.yml
dc-exec-dev = $(dc_dev) exec -T -u $(OPTIONS)

.SILENT:

CONTAINER ?= app
SHELL_CMD ?= bash
OPTIONS ?= -u root

# Docker

run-dev:
	${dc_dev} up -d --build

run-prod:
	${dc_prod} up -d --build

build-dev:
	${dc_dev} build --no-cache

build-prod:
	${dc_prod} build

stop-dev:
	${dc_dev} stop

stop-prod:
	${dc_prod} stop

down-dev:
	${dc_dev} down

down-prod:
	${dc_prod} down

logs-dev:
	${dc_dev} logs -f $(CONTAINER)

logs-prod:
	${dc_prod} logs -f $(CONTAINER)

logs-all-dev:
	${dc_dev} logs -f

logs-all-prod:
	${dc_prod} logs -f

restart-dev:
	$(dc_dev) restart $(CONTAINER)

restart-prod:
	$(dc_prod) restart $(CONTAINER)

shell:
	$(dc_dev) exec $(OPTIONS) $(CONTAINER) $(SHELL_CMD)

shell-root:
	$(MAKE) shell OPTIONS="-u root"

ps-dev:
	${dc_dev} ps

ps-prod:
	${dc_prod} ps

# Migrations

migration:
	$(dc_dev) exec $(OPTIONS) $(CONTAINER) alembic revision --autogenerate -m "$(message)"

migration-upgrade:
	$(dc_dev) exec $(OPTIONS) $(CONTAINER) alembic upgrade head

migration-downgrade:
	$(dc_dev) exec $(OPTIONS) $(CONTAINER) alembic downgrade -1

migration-current:
	$(dc_dev) exec $(OPTIONS) $(CONTAINER) alembic current

migration-history:
	$(dc_dev) exec $(OPTIONS) $(CONTAINER) alembic history

# Sh scripts calling
create-admin:
	@read -p "Enter username: " username; \
	read -p "Enter email: " email; \
	read -p "Enter password: " password; \
	$(dc_dev) exec $(OPTIONS) $(CONTAINER) ../create_admin.sh -u $$username -e $$email -p $$password

# Requirements
pip-list:
	$(dc_dev) exec $(OPTIONS) $(CONTAINER) pip list
