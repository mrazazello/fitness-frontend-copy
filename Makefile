
SHELL=/bin/bash
BASE_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
ROOT_DIR := $(BASE_DIR)/.make
include $(ROOT_DIR)/init.mk

### build ###

install: yarn-install ##@install First install application

yarn-install: ##@install Yarn install packages
	@$(DC_RUN) --rm --workdir=/var/app --entrypoint="/bin/bash -c yarn install" client

update: yarn-install ##@update Update application


build: ##@build Build all or c=<name> services
	@$(DC) build $(c)

clean: confirm ##@build Stop all and removes containers, networks, volumes, and images
	@$(DC) down -v
	@$(DC) rm -f -v

pull: ##@build Pull images
	@$(DC) pull

### build ###

### process ###
start: ##@process Start all or c=<name> containers in background
	@$(DC) up -d --build $(c)

stop: ##@process Stop all or c=<name> containers
	@$(DC) stop $(c)

restart: stop start ##@process Restart all or c=<name> containers
### process ###

### shell ###

bash: ##@shell Exec bash - exists container
	@$(DC_EXEC) --workdir=/var/app  client /bin/bash

bash-run: ##@shell Run bash - new container
	@$(DC_RUN) --rm --workdir=/var/app client /bin/bash

lint-staged: ##@shell Run lint staged through npx
	@$(DC_RUN) --rm -T --workdir=/var/app --entrypoint="/bin/bash -c 'export NO_UPDATE_NOTIFIER=1;git config --global user.email \"docker@interso.ru\";git config --global user.name \"internal docker\";yarn run lint-staged'" client

lint: ##@shell Run lint all
	@$(DC_RUN) --rm -T --workdir=/var/app --entrypoint="/bin/bash -c 'export NO_UPDATE_NOTIFIER=1;git config --global user.email \"docker@interso.ru\";git config --global user.name \"internal docker\";yarn run lint'" client

### shell ###
permissions: ##@shell Fix permissions
	chown -R $(CONTAINER_UID):$(CONTAINER_GID) $(BASE_DIR)/app

### info ###
ps: ##@info Show all or c=<name> status of containers
	@$(DC) ps $(c)

logs: ##@info Show all or c=<name> logs of containers
	@$(DC) logs --tail=200 -f $(c)

### info ###



