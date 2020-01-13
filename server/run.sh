#!/usr/bin/env bash

DOCKER_IMAGE_NAME="graphql-prisma-nodejs"
DOCKER_CONTAINER_NAME="yourcontainername"

echo "🐳  Running container from image: ${DOCKER_IMAGE_NAME}"
docker run -d --name ${DOCKER_CONTAINER_NAME} -p 4000:4000 ${DOCKER_IMAGE_NAME}
echo "🚀  Server is running on http://localhost:4000/graphql"
echo "🛑  To stop the container run 'docker stop ${DOCKER_CONTAINER_NAME}'"
echo "🏃‍♀️  To start the container run 'docker start ${DOCKER_CONTAINER_NAME}'"