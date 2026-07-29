#!/bin/bash
set -e

echo "=== 🚀 Starting AWS EC2 Deployment from Docker Hub ==="

# 1. Install Docker & Docker Compose if missing
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    sudo apt-get update -y
    sudo apt-get install -y ca-certificates curl gnupg lsb-release
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update -y
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    sudo usermod -aG docker $USER
fi

# 2. Login to Docker Hub if secrets provided
if [ -n "$DOCKERHUB_TOKEN" ] && [ -n "$DOCKERHUB_USERNAME" ]; then
    echo "Logging in to Docker Hub..."
    echo "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin
fi

# 3. Pull latest images from Docker Hub
echo "Pulling latest images from Docker Hub..."
docker pull ${DOCKERHUB_USERNAME}/auth-backend:latest
docker pull ${DOCKERHUB_USERNAME}/auth-frontend:latest

# 4. Start containers
echo "Starting services using Docker Compose..."
docker compose -f docker-compose.prod.yml up -d --remove-orphans

# 5. Clean up unused image layers
docker image prune -f

echo "=== ✅ EC2 Deployment Complete! ==="
