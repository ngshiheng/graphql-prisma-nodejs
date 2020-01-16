#!/usr/bin/env bash

# Note: Use 'docker-compose up -d' for quick setup

DOCKER_IMAGE_NAME="graphql-prisma-nodejs"

echo "🐳  Building docker image for: $DOCKER_IMAGE_NAME"
docker build -t "$DOCKER_IMAGE_NAME" .
docker images
