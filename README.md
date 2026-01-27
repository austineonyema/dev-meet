# dev-meet — Full-Stack Monorepo (NestJS + React + TanStack Query)

**One repo. Two apps. One shared contract.**  
A production-minded full-stack starter built during development of the `dev-meet` project:

- `api/` — NestJS backend (Prisma, JWT auth, RBAC-ready)
- `client/` — React front-end (Vite, TypeScript, TanStack Query, React Router)
- `shared/` — types and DTOs shared between server & client

This README gives you everything you need to run, develop, test and extend the project as a senior engineer would.

---

## Table of contents

1. [Quick status](#quick-status)
2. [Tech stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Repo layout](#repo-layout)
5. [Getting started (local dev)](#getting-started-local-dev)
6. [Database: Prisma setup & migrations](#database-prisma-setup--migrations)
7. [Running both apps concurrently](#running-both-apps-concurrently)
8. [Auth & RBAC overview](#auth--rbac-overview)
9. [Frontend: data fetching & shared types](#frontend-data-fetching--shared-types)
10. [Build & deploy notes](#build--deploy-notes)
11. [Testing, linting & formatting](#testing-linting--formatting)
12. [Troubleshooting (common issues)](#troubleshooting-common-issues)
13. [Extending the project — senior tips](#extending-the-project---senior-tips)
14. [Acknowledgements & license](#acknowledgements--license)

---

## Quick status

- Monorepo structure established (`dev-meet/` with `api/`, `client/`, `shared/`).
- Backend: NestJS + Prisma + JWT auth scaffolded; RBAC via Guards/Decorators planned and demonstrated.
- Frontend: React + Vite + TypeScript with TanStack Query, React Router and Axios.
- Shared typing pattern implemented for request/response contracts; date serialization strategy agreed (backend uses `Date`, API DTOs use `string` ISO dates).

---

## Tech stack

- **Backend:** Node.js, NestJS, Prisma, PostgreSQL (or MySQL), JWT, Redis (optional caching/queues)
- **Frontend:** React (TypeScript), Vite, TanStack Query, React Router, Axios
- **Monorepo tools:** plain npm monorepo (root `package.json`), optional `concurrently` to manage dev processes
- **Dev tools:** Prettier, ESLint, Husky (optional), Docker (optional for production/dev parity)

---

## Prerequisites

- Node.js (use latest LTS; keep an eye on security advisories)
- npm (or yarn/pnpm)
- PostgreSQL (or your choice DB) running and accessible
- Optional: Docker + Docker Compose if you prefer containerized local DB

---

## Repo layout

```
dev-meet/
├── api/ # NestJS backend
│ ├── src/
│ ├── prisma/
│ ├── package.json
│ └── tsconfig.json
├── client/ # React frontend (Vite)
│ ├── src/
│ ├── package.json
│ └── tsconfig.json
├── shared/ # shared types (User, DTOs, etc.)
│ └── types/
│ └── user.ts
├── package.json # (optional) root scripts e.g. start:all
└── README.md

---

## Getting started (local dev)

### 1. Clone & install

```bash 
git clone git@github.com:yourusername/dev-meet.git
cd dev-meet

cd api && npm install
cd ../client && npm install

npm install




### 2. Environment variables

Create .env files.

api/.env

```bash
DATABASE_URL=postgresql://user:pass@localhost:5432/devmeet
JWT_SECRET=replace_with_a_secure_random_value
PORT=3000
REDIS_URL=redis://localhost:6379  # optional
```

client/.env
```bash
VITE_API_BASE_URL=http://localhost:3000/api/v1
```
Use openssl rand -base64 32 to generate a secure JWT_SECRET. 32 bytes is a strong default


---
## Database: Prisma setup & migrations

From api/:

Initialize Prisma (if not already):

```bash 
npx prisma init

```
Update prisma/schema.prisma with your User model and any relations.

Run migration:

```bash 
npx prisma migrate dev --name init

```
Generate client:

```bash 
npx prisma generate

```
Optional: seed script — add prisma/seed.ts and run:

```bash
npm run prisma:seed

```
Note on updatedAt: Add @updatedAt in the Prisma schema to auto-update timestamps, otherwise set updatedAt: new Date() manually on updates.