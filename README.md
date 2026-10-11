# MERN Turborepo Starter

A pnpm workspace with a React frontend, Express API, and shared lint/TypeScript configuration. Turborepo schedules tasks and caches build outputs.

## Stack

| Area       | Tools                                                                                          |
| ---------- | ---------------------------------------------------------------------------------------------- |
| Frontend   | React 19, Vite 8, Tailwind CSS 4, Redux Toolkit, React Router 8                                |
| API        | Express 5, Mongoose 9, Zod 4, JWT, bcrypt                                                      |
| Tooling    | Turborepo 2.11.7, TypeScript 7 builds with TypeScript 6 API compatibility, ESLint 10, Prettier |
| Containers | Nginx frontend, Node API, MongoDB 8                                                            |

## Quick start

Use Node **22.18+ on the Node 22 line, or 24.11+** and **pnpm 9.0.0** (the repository's pinned version). You also need MongoDB locally or a MongoDB connection URL.

```bash
git clone https://github.com/aargon007/mern-boilerplate
cd mern-boilerplate
corepack enable
corepack prepare pnpm@9.0.0 --activate
pnpm install --frozen-lockfile
cp .env.example .env
# Edit .env: configure MongoDB and replace both JWT secrets.
pnpm dev
```

Open the frontend at <http://localhost:5173>, the API at <http://localhost:5001>, and the starter's docs page at <http://localhost:5173/docs>. Vite proxies `/api` to the API in development.

## Commands

Run these from the repository root:

| Command                                     | Purpose                                                               |
| ------------------------------------------- | --------------------------------------------------------------------- |
| `pnpm dev`                                  | Run both apps with file watching                                      |
| `pnpm build`                                | Type-check and build both apps into their own `dist/` folders         |
| `pnpm lint`                                 | Lint both apps                                                        |
| `pnpm typecheck`                            | Check TypeScript without emitting application code                    |
| `pnpm test`                                 | Build apps and run API runtime smoke tests; no database required      |
| `pnpm start`                                | Build and run the API plus Vite's local frontend preview on port 4173 |
| `pnpm format`                               | Format the app workspaces                                             |
| `pnpm build:frontend` / `pnpm build:server` | Build one app                                                         |
| `pnpm start:frontend` / `pnpm start:server` | Build and start one app                                               |

Use `pnpm turbo run dev --filter=frontend` or `--filter=server` to run one development task. `pnpm --filter <name> <script>` runs a package script directly, bypassing Turbo's cache and task dependencies.

Vite preview is for local verification. The Docker frontend serves the compiled static files with Nginx.

## Structure

```text
apps/frontend/                  React UI, Redux state, routes and styles
apps/server/src/                API modules, middleware, helpers and config
apps/server/public/             API landing and not-found pages
apps/server/tests/              Built API smoke tests
packages/eslint-config/         Shared flat ESLint configurations
packages/typescript-config/     Shared base, Vite and Node TS configurations
docker/nginx/                   Static frontend and API proxy configuration
docs/                           Setup, environment, Docker and maintenance guides
.github/workflows/ci.yml         Install, lint, build, type-check and test
```

## Docker

After creating `.env` and setting JWT secrets:

```bash
docker compose up --build
```

Open <http://localhost:4173>. Compose includes MongoDB with a persistent volume. See the [Docker guide](docs/DOCKER.md) for environment overrides and image behavior.

## Starter scope

The API has registration, login and password-change examples. The frontend has home/docs pages and a dashboard scaffold. Login screens, profile retrieval and refresh-token handling are unfinished; this is a development foundation rather than a complete authentication product. See [API and starter limitations](docs/API.md).

## Documentation

- [Quick start and troubleshooting](docs/QUICK_START.md)
- [Environment variables](docs/ENVIRONMENT.md)
- [Workspace, Turbo tasks and upgrades](docs/MONOREPO.md)
- [Docker](docs/DOCKER.md)
- [API and starter limitations](docs/API.md)
- [Dependency upgrade review](docs/UPGRADE.md)
