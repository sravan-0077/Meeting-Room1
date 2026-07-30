#!/bin/bash

set -e

echo "Logging into Docker Hub..."
echo "$DOCKER_PASSWORD" | docker login \
  -u "$DOCKER_USERNAME" \
  --password-stdin

echo "Pulling latest images..."
docker compose -f docker-compose.prod.yml pull

echo "Stopping existing containers..."
docker compose -f docker-compose.prod.yml down

echo "Starting updated containers..."
docker compose -f docker-compose.prod.yml up -d

echo "Cleaning up unused Docker images..."
docker image prune -f

echo "Deployment completed successfully!"