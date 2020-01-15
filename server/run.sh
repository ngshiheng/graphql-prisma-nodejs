#!/usr/bin/env bash

DOCKER_IMAGE_NAME="graphql-prisma-nodejs"
DOCKER_CONTAINER_NAME="yourcontainername"

echo "🐳  Running container from image: $DOCKER_IMAGE_NAME"
docker run -d --name "$DOCKER_CONTAINER_NAME" -e PORT="$PORT" -e ENDPOINT="$ENDPOINT" -e SECRET="$SECRET" -e EXPIRY="$EXPIRY" -e PRISMA_ENDPOINT="$PRISMA_ENDPOINT" -p "$PORT":"$PORT" "$DOCKER_IMAGE_NAME"
echo "🚀  Server is running on http://localhost:$PORT$ENDPOINT"
echo "🛑  To stop the container run 'docker stop $DOCKER_CONTAINER_NAME'"
echo "🏃‍♀️  To start the container run 'docker start $DOCKER_CONTAINER_NAME'"