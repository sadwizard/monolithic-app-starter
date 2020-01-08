#!/bin/bash

set -e

mysql -u"$DATABASE_USER" -p"$DATABASE_PASSWORD" <<EOSQL
	CREATE USER 'mastergetadmin'@'%' IDENTIFIED BY '123456';
	CREATE DATABASE IF NOT EXISTS masterget;
	GRANT ALL PRIVILEGES ON masterget.* TO 'mastergetadmin'@'%';
	FLUSH PRIVILEGES;
	USE masterget;
	SOURCE /usr/initial-tables.sql;
EOSQL