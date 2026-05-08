# Digital Kangyur Library

Monorepo for the Digital Kangyur Library platform.

- `frontend`: React + Vite web application
- `backend`: Express + Prisma API

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+
- PostgreSQL 14+ (or compatible)

## Project Structure

```text
digital-kangyur-library/
|- frontend/    # Vite React app
|- backend/     # Express API + Prisma
`- package.json # Root script to run both apps
```

## Quick Start

### 1) Clone and install dependencies

From repository root:

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### 2) Configure backend environment

In `backend`, copy `env.example` to `.env`:

```bash
cd backend
cp env.example .env
```

Required values in `backend/.env`:

```env
PORT=3000
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRATION=1h
JWT_REFRESH_EXPIRATION=7d
BASE_URL=http://localhost:3000
CORS_ORIGIN=*
DATABASE_URL=postgresql://postgres:password@localhost:5432/karchag_db1?schema=public
```

Optional (only needed if file upload to S3 is used):

```env
S3_REGION=us-east-1
S3_BUCKET=your-bucket-name
S3_ACCESS_KEY_ID=your-access-key-id
S3_SECRET_ACCESS_KEY=your-secret-access-key
S3_UPLOAD_PREFIX=uploads
S3_ACL=public-read
```

### 3) Prepare database

From `backend`:

```bash
npx prisma generate
npx prisma migrate dev
```

Optional seed data (timeline):

```bash
npm run seed:timeline
```

### 4) Start development servers

From repository root (runs frontend and backend together):

```bash
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000/api/v1`
- Swagger docs: `http://localhost:3000/api-docs`
- Health check: `http://localhost:3000/health`

## Running Services Individually

From `backend`:

```bash
npm run dev
```

From `frontend`:

```bash
npm run dev
```

## Frontend API Configuration

The frontend uses:

- `VITE_API_BASE_URL` if set
- fallback: `http://localhost:3000/api/v1`

If needed, create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

## Build Commands

From `backend`:

```bash
npm run build
```

From `frontend`:

```bash
npm run build
```

Preview frontend production build:

```bash
cd frontend
npm run preview
```

## Useful Scripts

Root:

- `npm run dev` - run frontend and backend concurrently

Backend:

- `npm run dev` - start backend with nodemon
- `npm start` - start backend
- `npm run build` - compile TypeScript
- `npm run type-check` - run TypeScript checks
- `npm run seed:timeline` - seed timeline data

Frontend:

- `npm run dev` - start Vite dev server
- `npm run build` - create production build
- `npm run lint` - run ESLint
- `npm run preview` - preview production build

## Troubleshooting

- Prisma connection error:
  - Confirm PostgreSQL is running.
  - Confirm `DATABASE_URL` in `backend/.env`.
- CORS/API issues:
  - Set `CORS_ORIGIN` in backend `.env`.
  - Set `VITE_API_BASE_URL` in frontend `.env` if backend URL differs.
- Upload API issues:
  - Verify S3 credentials and bucket settings in backend `.env`.
