# AuthVault - Full-Stack Spring Boot & React Application

A modern full-stack web application featuring a Spring Boot REST API backend and a sleek React frontend with User Registration, Authentication (JWT), and User Dashboard.

---

## 📁 Project Architecture

```
codes-sravan/
├── .github/workflows/
│   ├── backend-ci-cd.yml     # Builds & pushes backend image to Docker Hub
│   └── frontend-ci-cd.yml    # Builds & pushes frontend image to Docker Hub
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

## 🔑 Required GitHub Repository Secrets

Set these in your GitHub Repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

| Secret Name | Example Value | Description |
| :--- | :--- | :--- |
| `DOCKERHUB_USERNAME` | `yourusername` | Your exact Docker Hub Username |
| `DOCKERHUB_TOKEN` | `dckr_pat_xxxxx` | Your Docker Hub **Personal Access Token** |

---

## 🚀 How to Manually Trigger Workflow in GitHub

1. Go to your GitHub Repository.
2. Click the **Actions** tab at the top.
3. Select **Backend CI/CD Pipeline** or **Frontend CI/CD Pipeline** on the left menu.
4. Click **Run workflow** → Select `main` branch → Click **Run workflow**.

---

## 🐳 Docker Compose Usage

### Local Build & Run
```bash
docker compose up --build
```

### Server Run from Docker Hub
```bash
export DOCKERHUB_USERNAME="yourusername"
docker compose up -d
```
