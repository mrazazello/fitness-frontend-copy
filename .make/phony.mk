.PHONY:
	help \
	build clean install \
	start stop restart \
	db bash bash-fpm bash-db bash-nginx bash-redis\
	bash-site-install-worker bash-upload-certificate-worker \
	ps logs logs-site-install-worker logs-cert-upload-worker \
	clear-logs clear-cache clear-assets \
	redis-cli redis-flushall \
	create-database-dump insert-database-dump insert-default-database-dump migrate-database \
    copy-to-container copy-to-host composer-install generate-assets
