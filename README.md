# AuthVault - Full-Stack Spring Boot & React Application

A modern full-stack web application featuring a Spring Boot REST API backend and a sleek React frontend with User Registration, Authentication (JWT), and User Dashboard.

---

## 🚀 Project Overview

- **Backend**: Spring Boot 3.2 (Java 17), Spring Security, Spring Data JPA, H2 In-Memory Database, JWT Auth.
- **Frontend**: React (Vite), Glassmorphism Design System, Lucide Icons, Password Strength Indicator, Form Validation.

---

## 📁 Directory Structure

```
codes-sravan/
├── backend/
│   ├── src/main/java/com/example/authdemo/
│   │   ├── controller/      # REST API Controllers (AuthController)
│   │   ├── dto/             # Data Transfer Objects (SignUpRequest, LoginRequest, AuthResponse)
│   │   ├── model/           # JPA Entities (User)
│   │   ├── repository/      # Spring Data Repositories (UserRepository)
│   │   └── security/        # JWT & Security Configuration (SecurityConfig, JwtTokenProvider)
│   ├── src/main/resources/  # application.properties & Database setup
│   └── pom.xml              # Maven dependencies
│
└── frontend/
    ├── src/
    │   ├── components/      # React Components (Login, Signup, Dashboard, Navbar)
    │   ├── services/        # API Integration layer (api.js)
    │   ├── App.jsx          # Application Shell & Routing
    │   └── index.css        # Glassmorphic Styling & Animations
    ├── package.json
    └── vite.config.js
```

---

## 🛠️ How to Run the Application

### 1. Start the Spring Boot Backend

Open a terminal in `codes-sravan/backend`:

```bash
cd backend
.\mvnw.cmd spring-boot:run
```

The Spring Boot REST API will start at:  
👉 **`http://localhost:8080`**

H2 Database Console is available at:  
👉 **`http://localhost:8080/h2-console`**  
*(JDBC URL: `jdbc:h2:mem:authdb`, Username: `sa`, Password: `password`)*

---

### 2. Start the React Frontend

Open a second terminal in `codes-sravan/frontend`:

```bash
cd frontend
npm install
npm run dev
```

The React Web App will launch at:  
👉 **`http://localhost:5173`**

---

## ✨ Key Features

1. **User Registration (Signup)**:
   - Full Name, Email, Password, Confirm Password validation.
   - Real-time visual password strength meter.
   - Duplicate email prevention.
   - Password hashing with BCrypt.

2. **User Authentication (Login)**:
   - Secure authentication returning JWT Bearer token.
   - Toggle password visibility.
   - Session persistence in `localStorage`.

3. **User Dashboard**:
   - Protected route requiring valid JWT token.
   - Personalized greeting and user avatar generator.
   - Real-time session status & account creation timestamp.
   - One-click Logout clearing token & session.
