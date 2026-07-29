# AuthVault - Full-Stack Spring Boot & React Application

A modern full-stack web application featuring a Spring Boot REST API backend and a sleek React frontend with User Registration, Authentication (JWT), and User Dashboard.

---

## 📁 Project Architecture

```
codes-sravan/
├── .github/workflows/
│   ├── backend-ci-cd.yml     # Build & push backend Docker image to Docker Hub
│   └── frontend-ci-cd.yml    # Build & push frontend Docker image to Docker Hub
├── backend/
│   ├── Dockerfile            # Maven 3.9 + Java 17 multi-stage build
│   ├── .dockerignore
│   └── src/
├── frontend/
│   ├── Dockerfile            # Node 22 + NGINX Alpine multi-stage build
│   ├── nginx.conf
│   ├── .dockerignore
│   └── src/
├── docker-compose.yml        # Final Docker Compose file for local & server deployment
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

## 🚀 GitHub Actions CI/CD (Docker Image Build & Push)

1. **Backend Pipeline (`.github/workflows/backend-ci-cd.yml`)**:
   - Triggers on changes to `backend/**`.
   - Packages Spring Boot JAR with JDK 17 (`mvn clean package -DskipTests`).
   - Builds Docker image and pushes to Docker Hub as `${{ secrets.DOCKERHUB_USERNAME }}/auth-backend:latest`.

2. **Frontend Pipeline (`.github/workflows/frontend-ci-cd.yml`)**:
   - Triggers on changes to `frontend/**`.
   - Builds production React bundle with Node 22 (`npm run build`).
   - Builds NGINX Docker image and pushes to Docker Hub as `${{ secrets.DOCKERHUB_USERNAME }}/auth-frontend:latest`.

---

## 🐳 Running with Docker Compose (`docker-compose.yml`)

### Local Build & Run
```bash
docker compose up --build
```

### Running on Server / EC2 from Docker Hub
```bash
export DOCKERHUB_USERNAME="your-dockerhub-username"
docker compose up -d
```
