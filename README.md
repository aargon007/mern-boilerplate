# MERN Turborepo Starter

A MERN monorepo built with PNPM workspaces and Turborepo.

## Stack

- Frontend: React 19, Vite 8, TypeScript, Tailwind CSS 4, Redux Toolkit
- Backend: Express 5, TypeScript, Mongoose, Zod
- Tooling: Turborepo, PNPM, ESLint 10, Prettier
- Deployment: Docker, Docker Compose, Nginx

## Workspace

```text
.
├── apps/
│   ├── frontend/
│   └── server/
├── packages/
│   ├── eslint-config/
│   └── typescript-config/
├── turbo.json
└── pnpm-workspace.yaml
```

## Requirements

- Node.js 22+
- PNPM 9

## Quick Start

```bash
git clone https://github.com/aargon007/mern-boilerplate
cd mern-boilerplate
pnpm install
pnpm dev
```

## Root Commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm start
```

Package-targeted examples:

```bash
pnpm build:frontend
pnpm build:server
pnpm start:frontend
pnpm start:server
```

## App Commands

Frontend:

```bash
pnpm --filter frontend dev
pnpm --filter frontend build
pnpm --filter frontend lint
```

Server:

```bash
pnpm --filter server dev
pnpm --filter server build
pnpm --filter server lint
```

## Monorepo Notes

- Root scripts delegate through `turbo run`
- Shared TypeScript config lives in `packages/typescript-config`
- Shared ESLint config lives in `packages/eslint-config`
- Frontend uses Vite 8 native TS path resolution
- Server uses ESLint flat config at `apps/server/eslint.config.mjs`

## Docker

```bash
docker-compose up --build
```

## Validation

```bash
pnpm turbo run lint
pnpm turbo run build
```

## Documentation

- [Docs Index](./docs/README.md)
- [Docker Guide](./docs/DOCKER.md)
- [Monorepo Notes](./docs/MONOREPO.md)
- [Quick Start Notes](./docs/QUICK_START.md)
