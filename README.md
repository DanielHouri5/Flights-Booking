# ✈️ Flights-Booking

A full-stack flight booking system with a modern React frontend, Node.js/Express backend, PostgreSQL database, and CI/CD for Google Cloud Run.

---

## 📦 Codebase & Git Flow

- The code is hosted on a GitHub repository and follows a **Git Flow** branching model:

  - `main`: Stable production-ready code
  - `development`: Latest development changes
  - `production`: Deployed production branch

- Please fork or clone the repository to contribute.

---

## 🚀 Quick Start (Local Development)

1. **Clone the repository**

   ```bash
   # Replace <your-repo-url> with the actual repository URL
   git clone <your-repo-url>
   cd Flights-Booking
   ```

2. **Set up environment variables**

   - Create a `.env` file in the root or use the provided `.env.example` (if exists).
   - See documentation for required variables for Backend and Frontend.

3. **Start with Docker Compose 🐳**

   ```bash
   docker-compose up --build
   ```

   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080
   - DB: localhost:5432

4. **Manual Local Run (without Docker)**

   - **Backend**
     ```bash
     cd Backend
     npm install
     npm run dev
     ```
   - **Frontend**
     ```bash
     cd Frontend
     npm install
     npm run dev
     ```

---

## ⚡ Automation Scripts

- **Docker Compose**: One command to spin up the entire stack for development or testing.
- **CI/CD Pipelines**: Automated build, test, and deployment using GitHub Actions (see `.github/workflows/`).
- **Environment Setup Script**:
  - `scripts/setup-dev.sh` – Sets up local dev environment (installs dependencies, copies .env files if needed, and runs Docker Compose)
  - `scripts/setup-prod.sh` – Prepares and deploys production environment (builds, pushes, and deploys Docker images)
  - _(Scripts are templates; customize as needed for your cloud provider or infra)_

---

## 🧪 Running Tests

### Frontend

- **Unit & Integration:**
  ```bash
  cd Frontend
  npm run test
  ```
- **E2E (Cypress):**
  ```bash
  cd Frontend
  npm run dev &
  npm run e2e
  ```

### Backend

- **Unit & Integration:**
  ```bash
  cd Backend
  npm test
  ```

---

## ☁️ Deployment (Google Cloud Run)

1. **Prerequisites**

   - Google Cloud project & billing enabled
   - Enable Cloud Run & Container Registry APIs
   - Service account with permissions & key in GitHub secrets

2. **CI/CD Pipeline**

   - On push to `main` or `production`, GitHub Actions will:
     - Build & test
     - Build Docker images
     - Deploy to Cloud Run (see `.github/workflows/*-ci.yml`)

3. **Manual Deployment**
   - Build and push Docker images:
     ```bash
     docker build -t gcr.io/<project-id>/flights-backend Backend/
     docker build -t gcr.io/<project-id>/flights-frontend Frontend/
     docker push gcr.io/<project-id>/flights-backend
     docker push gcr.io/<project-id>/flights-frontend
     ```
   - Deploy to Cloud Run:
     ```bash
     gcloud run deploy flights-backend --image gcr.io/<project-id>/flights-backend --platform managed --region us-central1 --allow-unauthenticated --set-env-vars "DATABASE_URL=..."
     gcloud run deploy flights-frontend --image gcr.io/<project-id>/flights-frontend --platform managed --region us-central1 --allow-unauthenticated --set-env-vars "VITE_SERVICE_URL=..."
     ```

---

## 🏗️ Project Structure & Design

```
Backend/      # Node.js/Express API, DB models, tests
Frontend/     # React app, Cypress, unit/integration tests
.github/      # CI/CD workflows
scripts/      # Automation scripts for setup/deployment
```

- **Backend**: RESTful API, PostgreSQL models, business logic, and tests
- **Frontend**: React SPA, API integration, Cypress E2E, Jest unit/integration tests
- **CI/CD**: Automated pipelines for build, test, and deploy
- **Docker**: Containerized services for easy local and cloud deployment

Devops-Flights-Booking/
│
├── .github/
│ └── workflows/
│ ├── backend-ci.yml # Backend CI/CD pipeline
│ └── frontend-ci.yml # Frontend CI/CD pipeline
│
├── Backend/
│ ├── src/
│ │ ├── controllers/ # Express controllers
│ │ ├── data-access/ # DB models & access
│ │ ├── routes/ # API routes
│ │ ├── services/ # Business logic
│ │ └── index.js # Main server entry
│ ├── tests/ # Unit & integration tests
│ ├── .env # Backend-specific environment variables
│ ├── .eslintrc.json # ESLint config
│ ├── babel.config.cjs # Babel config
│ ├── Dockerfile # Backend Docker build
│ ├── jest.config.mjs # Jest config
│ ├── package.json # Backend dependencies & scripts
│ └── seedFlights.js # DB seeding script
│
├── Frontend/
│ ├── cypress/ # Cypress E2E tests
│ ├── src/ # React app source
│ │ ├── **tests**/ # Unit & integration tests (Jest/RTL)
│ │ ├── components/ # Reusable React components (buttons, forms, etc.)
│ │ ├── pages/ # React pages (HomePage, etc.)
│ │ ├── services/ # API service (Axios)
│ │ ├── App.css # Global styles for the app
│ │ ├── App.jsx # Main React app
│ │ ├── index.css # Global styles  
│ │ └── main.jsx # React entry point (creates root and renders App)
│ ├── babel.config.cjs # Babel config
│ ├── cypress.config.js # Cypress config
│ ├── Dockerfile # Frontend Docker build
│ ├── eslint.config.js # ESLint config
│ ├── index.html # HTML entry
│ ├── jest.setup.js # Jest setup
│ ├── nginx.conf # Nginx config for static serving
│ ├── package.json # Frontend dependencies & scripts
│ ├── vite.config.js # Vite config  
├── scripts/ # Automation scripts for setup/deployment
│ ├── setup-dev.sh # Local dev setup script
│ └── setup-prod.sh # Production deploy script
├── .env # Root environment variables (DB, API URLs)
├── .gitattributes # Git line ending rules (LF for .sh scripts)
├── .gitignore # Git ignore rules
├── docker-compose.yml # Multi-service orchestration
├── README.md # Project documentation

---

## 🔄 CI/CD Pipeline Setup

- **GitHub Actions**: Workflows for backend and frontend in `.github/workflows/`
- **Build & Test**: Runs on every push/PR
- **Deploy**: On push to `main` or `production` branches
- **Secrets**: Store cloud credentials and sensitive data in GitHub Secrets

---

## 🐳 Docker & Environment Configuration

- **docker-compose.yml**: Orchestrates all services (frontend, backend, db)
- **Dockerfiles**: Separate for frontend and backend
- **.env files**: Store environment-specific variables
- **Scaling**: Use Docker Compose overrides or Kubernetes for advanced scaling

---

## 🚀 Deployment & Scaling

- **Cloud Run**: Deploys containers with auto-scaling
- **Manual Scaling**: Adjust instance count in Cloud Run settings
- **Advanced**: For high traffic, consider GKE (Kubernetes Engine) or similar

---

## 🛠️ Useful Scripts

- `npm run dev` – Start dev server
- `npm run build` – Build for production
- `npm run lint` – Lint code
- `npm run test` – Run tests
- `npm run e2e` – Run Cypress E2E tests (Frontend)

---

## 🙋‍♂️ Need Help?

- Open an issue or discussion on GitHub!

---

## 📝 License

MIT
