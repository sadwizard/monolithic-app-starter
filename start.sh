#!/bin/bash

set -a # automatically export all variables
source variables.env
set +a

ADDITION_COMMANDS='up';
if [[ -n "$@" ]]; then
	ADDITION_COMMANDS=$@;
fi

docker-compose -f $NODE_ENV-docker-compose.yml $ADDITION_COMMANDS