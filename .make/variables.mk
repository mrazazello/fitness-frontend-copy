DC_FILE := $(PROJECT_DIR)/docker-compose.yml
DC := $(DOCKER_COMPOSE) -f $(DC_FILE)
DC_EXEC := $(DC) exec
DC_RUN := $(DC) run

USER_UID := $(id -u)
USER_GID := $(id -g) 


START := echo '...'
FINISH := echo 'OK'


