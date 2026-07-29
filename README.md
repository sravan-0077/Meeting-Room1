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

## 🔑 GitHub Secrets Troubleshooting & Checklist

If your GitHub workflow runs successfully but images do NOT appear in Docker Hub, verify the following **3 checklist items**:

### 1. Check GitHub Secrets Names & Values
Go to **GitHub Repository** -> **Settings** -> **Secrets and variables** -> **Actions**:
- `DOCKERHUB_USERNAME`: Your exact Docker Hub account username (e.g., `sravan123`).
- `DOCKERHUB_TOKEN`: A **Personal Access Token** generated from Docker Hub (**Account Settings** -> **Security** -> **New Access Token** with `Read, Write, Delete` permissions).

> [!IMPORTANT]
> If `DOCKERHUB_USERNAME` is missing or misspelled in GitHub Secrets, the tag resolves to `/auth-backend:latest` (empty username), which Docker cannot push!

### 2. Verify Your Branch Name
The workflows trigger on pushes to `main` or `master`:
- If your default branch is `main` or `master`, make sure your push command is:
  ```bash
  git push origin main
  ```

### 3. Check GitHub Actions Run Logs
1. Click the **Actions** tab in your GitHub repository.
2. Click on the latest workflow run (**Backend CI/CD Pipeline** or **Frontend CI/CD Pipeline**).
3. Click **Build & Push Docker Image to Docker Hub**.
4. Check the step output for `docker/build-push-action` to ensure `push: true` executed and check the target image tag (e.g. `yourusername/auth-backend:latest`).
