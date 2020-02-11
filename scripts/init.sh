#!/bin/bash

# start mongodb & kafka container
docker-compose up -d

# give some time to bacame kafka avaiable
sleep 20

# create room-reservation topic
docker exec -it reservation_kafka sh -c "/opt/bitnami/kafka/bin/kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 3 --topic room-reservation"

# start api gate way
cd api-gateway
docker-compose up -d

echo "creating sample data"
docker exec -it reservation_api_gateway sh -c "node /usr/src/app/src/seed/run.js"

# start api gate way
cd ../reservation-service
docker-compose up -d
