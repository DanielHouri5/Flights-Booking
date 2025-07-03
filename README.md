# ✈️ Flights-Booking

A full-stack flight booking system with a modern React frontend, Node.js/Express backend, PostgreSQL database, and CI/CD for Google Cloud Run.

---

## 🚀 Quick Start (Local Development)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Flights-Booking
```

### 2. Environment Variables

Create a `.env` file in the root or use the provided `.env.example` (if exists).

#### Example for Backend:

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=pass
POSTGRES_DB=flight_booking
DATABASE_URL=postgres://postgres:pass@localhost:5432/flight_booking
```

#### Example for Frontend:

```
VITE_SERVICE_URL=http://localhost:8080
```

### 3. Start with Docker Compose 🐳

```bash
docker-compose up --build
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:8080
- DB: localhost:5432

### 4. Manual Local Run (without Docker)

#### Backend

```bash
cd Backend
npm install
npm run dev
```

#### Frontend

```bash
cd Frontend
npm install
npm run dev
```

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

- **Lint & Tests:**
  ```bash
  cd Backend
  npm run lint
  npm test
  ```

---

## ☁️ Deployment (Google Cloud Run)

### 1. Prerequisites

- Google Cloud project & billing enabled
- Enable Cloud Run & Container Registry APIs
- Service account with permissions & key in GitHub secrets

### 2. CI/CD

- On push to `main` or `production`, GitHub Actions will:
  - Build & test
  - Build Docker images
  - Deploy to Cloud Run (see `.github/workflows/*-ci.yml`)

### 3. Manual Deployment

- Build and push Docker images:
  ```bash
  docker build -t gcr.io/<project-id>/flights-backend Backend/
  docker build -t gcr.io/<project-id>/flights-frontend Frontend/
  docker push gcr.io/<project-id>/flights-backend
  docker push gcr.io/<project-id>/flights-frontend
  ```
- Deploy to Cloud Run:
  ```bash
  gcloud run deploy flights-backend --image gcr.io/<project-id>/flights-backend --platform managed --region us-central1 --allow-unauthenticated
  gcloud run deploy flights-frontend --image gcr.io/<project-id>/flights-frontend --platform managed --region us-central1 --allow-unauthenticated
  ```

---

## 📁 Project Structure

```
Backend/      # Node.js/Express API, DB models, tests
Frontend/     # React app, Cypress, unit/integration tests
.github/      # CI/CD workflows
```

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
