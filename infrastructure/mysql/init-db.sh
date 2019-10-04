#!/bin/bash

set -e

mysql -u'root' -p'123' <<EOSQL
	CREATE USER 'appadmin'@'%' IDENTIFIED BY '123456';

	CREATE DATABASE IF NOT EXISTS app;

	GRANT ALL PRIVILEGES ON app.* TO 'appadmin'@'%';

	FLUSH PRIVILEGES;

	USE app;

	# SOURCE /usr/eventgo-22-06-19.sql;
EOSQL