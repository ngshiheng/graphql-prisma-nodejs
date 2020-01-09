#!/usr/bin/env bash

DOCKER_IMAGE_NAME="graphql-prisma-nodejs"

echo "🐳  Building docker image for: ${DOCKER_IMAGE_NAME}"
docker build -t ${DOCKER_IMAGE_NAME} .
docker images

# TODO: Add 'docker push [OPTIONS] NAME[:TAG]'
