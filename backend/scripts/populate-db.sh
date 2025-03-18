#!/bin/bash
docker cp db/seed.sql mvst-coffee-challenge-database:/seed.sql

docker exec -i mvst-coffee-challenge-database psql -U postgres -d mvst-coffee-challenge-db -c "\i /seed.sql"
