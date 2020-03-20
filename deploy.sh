#!/bin/sh
set -e # Stop script from running if there are any errors

IMAGE="andmedev/ror-booking_cinema-client" # Docker image
GIT_VERSION=$(git describe --always --abbrev --tags --long) # Git hash and tags

# Build and tag image
docker build -t ${IMAGE}:${GIT_VERSION} .
docker tag ${IMAGE}:${GIT_VERSION} ${IMAGE}:latest
docker tag ${IMAGE}:${GIT_VERSION} registry.heroku.com/$HEROKU_APP_NAME/web

# Log in to Docker Hub and push
echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
echo "${HEROKU_PASSWORD}" | docker login -u "${HEROKU_USERNAME}" --password-stdin registry.heroku.com
docker push ${IMAGE}:${GIT_VERSION};
docker push registry.heroku.com/$HEROKU_APP_NAME/web;
heroku container:release web --app $HEROKU_APP_NAME
