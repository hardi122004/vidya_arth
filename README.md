# Vidyaअर्थ

AI-powered education platform onboarding & authentication system — built for the Reliance hackathon.

Personalized learning powered by AI. Discover skills, explore personalized learning paths, and achieve your goals with AI.

## Stack

- **Frontend:** React 19 + Vite + TypeScript + Tailwind CSS v4 + Framer Motion + Lucide React
- **Backend:** FastAPI + SQLAlchemy 2.0 + Alembic
- **Database:** PostgreSQL
- **Auth:** JWT (bearer tokens) + bcrypt password hashing

## Project structure

```
edutech/
├── frontend/          React + Vite + TypeScript client
└── backend/            FastAPI + SQLAlchemy + PostgreSQL API
```

---

## 1. Backend setup

### Prerequisites

- Python 3.11+
- A running PostgreSQL server (local install, Docker, or a managed instance)

### Create the database

```bash
# using the postgres CLI
createdb techtrek

# or, from psql
psql -U postgres -c "CREATE DATABASE techtrek;"
```

### Install & configure

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
cp .env.example .env   # then edit .env with your real DB credentials / secret key
```

Key environment variables (`backend/.env`):

| Variable | Description |
|---|---|
| `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_HOST` / `POSTGRES_PORT` / `POSTGRES_DB` | Individual connection parts used to build the DB URL |
| `DATABASE_URL` | Optional full override, e.g. `postgresql+psycopg2://user:pass@host:5432/db` |
| `SECRET_KEY` | JWT signing secret — set a long random value in production |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | JWT lifetime (default 10080 = 7 days) |
| `CORS_ORIGINS` | Comma-separated list of allowed frontend origins |

### Run database migrations

```bash
alembic upgrade head
```

This creates the `users` and `guardians` tables. (The API also auto-creates tables on startup as a convenience, so it will work even if you skip this step — but running migrations is the recommended, production-grade path and is required if you evolve the schema later.)

### Run the API

```bash
uvicorn app.main:app --reload --port 8000
```

The API is now live at `http://localhost:8000`. Interactive docs: `http://localhost:8000/docs`.

---

## 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env   # defaults to http://localhost:8000, adjust if needed
npm run dev
```

The app runs at `http://localhost:5173`.

To produce a production build:

```bash
npm run build
npm run preview
```

---

## API reference

| Method | Path | Description |
|---|---|---|
| `POST` | `/signup` | Create a new user (and guardian record, if under 18) |
| `POST` | `/login` | Authenticate with email + password, returns a JWT |
| `POST` | `/logout` | Stateless logout (client discards the token) |
| `GET` | `/profile` | Returns the authenticated user's profile (requires `Authorization: Bearer <token>`) |
| `GET` | `/health` | Health check |

### Signup payload

Adults (18+):

```json
{
  "full_name": "Ada Lovelace",
  "date_of_birth": "1995-05-10",
  "role": "student",
  "email": "ada@example.com",
  "phone_number": "+1 555-123-4567",
  "password": "supersecret123"
}
```

Minors (under 18) — a guardian account is created alongside the student, no password is collected from the minor:

```json
{
  "full_name": "Timmy Junior",
  "date_of_birth": "2015-01-01",
  "role": "student",
  "guardian_name": "Jordan Smith",
  "guardian_email": "jordan@example.com",
  "guardian_phone": "+1 555-987-6543"
}
```

Age is always (re)computed server-side from `date_of_birth` — the client-detected age shown during onboarding is for UX only and is never trusted for authorization decisions.

## Database schema

**users**
`id, full_name, date_of_birth, age, role (student|parent|teacher), is_minor, email, phone_number, password_hash, created_at`

**guardians**
`id, user_id (FK → users.id, unique), guardian_name, guardian_email, guardian_phone`

A user has at most one guardian record (1:1), created only when the signing-up user is under 18.

## Notes on the auth model

- Minor accounts do not currently collect their own password (per the onboarding spec, only guardian contact details are captured for under-18 signups), so `/login` works for adult accounts. Extending this to guardian-managed login for minors is a natural next step but was out of scope here.
- Duplicate adult accounts are blocked by a unique constraint + pre-check on `email`. Duplicate minor signups are blocked by matching `(full_name, date_of_birth, guardian_email)`.
