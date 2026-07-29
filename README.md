# AuthVault - Full-Stack Spring Boot & React Application

A modern full-stack web application featuring a Spring Boot REST API backend and a sleek React frontend with User Registration, Authentication (JWT), and User Dashboard.

---

## 📁 Project Architecture & Workflows

```
codes-sravan/
├── .github/workflows/
│   ├── backend-ci-cd.yml     # Build & Push backend image to Docker Hub
│   └── frontend-ci-cd.yml    # Build & Push frontend image to Docker Hub
├── backend/
│   ├── Dockerfile            # Maven 3.9 + Java 17 multi-stage build
│   ├── .dockerignore
│   └── src/
├── frontend/
│   ├── Dockerfile            # Node 22 + NGINX Alpine multi-stage build
│   ├── nginx.conf
│   ├── .dockerignore
│   └── src/
├── docker-compose.yml        # Local development setup
├── docker-compose.prod.yml   # Production EC2 Docker Hub deployment
├── deploy-ec2.sh             # EC2 pull & deploy script
└── README.md
```

---

## 🔑 Required GitHub Secrets

Set these in your GitHub Repo -> **Settings** -> **Secrets and variables** -> **Actions**:

| Secret Name | Description |
| :--- | :--- |
| `DOCKERHUB_USERNAME` | Your Docker Hub Username |
| `DOCKERHUB_TOKEN` | Your Docker Hub Personal Access Token |

---

## 🐳 Docker Build & Push Workflow

### Backend (`.github/workflows/backend-ci-cd.yml`)
1. Checks out code and sets up JDK 17 (`temurin`).
2. Builds Spring Boot package (`mvn clean package -DskipTests`).
3. Logs into Docker Hub using `${{ secrets.DOCKERHUB_USERNAME }}` and `${{ secrets.DOCKERHUB_TOKEN }}`.
4. Builds & pushes `${{ secrets.DOCKERHUB_USERNAME }}/auth-backend:latest`.

### Frontend (`.github/workflows/frontend-ci-cd.yml`)
1. Checks out code and sets up Node 22.
2. Builds production React bundle (`npm run build`).
3. Logs into Docker Hub using `${{ secrets.DOCKERHUB_USERNAME }}` and `${{ secrets.DOCKERHUB_TOKEN }}`.
4. Builds & pushes `${{ secrets.DOCKERHUB_USERNAME }}/auth-frontend:latest`.

---

## ☁️ Deploying on AWS EC2

### Step 1: Connect to your EC2 instance over SSH
```bash
ssh -i /path/to/key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

### Step 2: Login to Docker Hub & Pull Images
```bash
echo "YOUR_DOCKERHUB_TOKEN" | docker login -u "YOUR_DOCKERHUB_USERNAME" --password-stdin
docker pull YOUR_DOCKERHUB_USERNAME/auth-backend:latest
docker pull YOUR_DOCKERHUB_USERNAME/auth-frontend:latest
```

### Step 3: Launch Containers using Docker Compose
```bash
export DOCKERHUB_USERNAME="YOUR_DOCKERHUB_USERNAME"
docker compose -f docker-compose.prod.yml up -d
```
