# Quick start

## Requirements

- Node 22.18+ on the Node 22 line, or 24.11+; `.nvmrc` selects the Node 22 line.
- pnpm 9.0.0, matching `packageManager`, `devEngines.packageManager`, CI and Docker.
- MongoDB locally or a reachable MongoDB URL. Docker Compose provides a database for container development.

## Setup

```bash
nvm use
corepack enable
corepack prepare pnpm@9.0.0 --activate
pnpm install --frozen-lockfile
cp .env.example .env
```

Edit `.env`, configure `DB_URI`, and replace the two JWT secrets with different random values. Start your database before running the API.

```bash
pnpm dev
```

The frontend runs on port 5173 and the API on port 5001 by default. The frontend's `/api` proxy forwards requests to the API port configured in `.env`.

## Work on one app

```bash
pnpm turbo run dev --filter=frontend
pnpm turbo run dev --filter=server
pnpm turbo run build --filter=frontend
pnpm turbo run lint --filter=server
```

## Verify changes

```bash
pnpm turbo run lint
pnpm turbo run build
pnpm turbo run typecheck test
```

`test` waits for builds and runs the server's Node runtime tests. They check JWT lifetimes, built API assets, invalid request validation and unauthorized responses without connecting to MongoDB. Database-backed registration/login flows need separate integration verification.

## Preview builds

```bash
pnpm start
```

The API connects to MongoDB and the frontend preview runs on port 4173. Set `CLIENT_ORIGIN=http://localhost:4173` if making requests directly to the API from this preview. Preview uses the same `/api` proxy as development; use Nginx or another static host for deployment.

## Troubleshooting

| Symptom                                          | Check                                                                                     |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Invalid server environment                       | Create root `.env` and fill the variables reported in the error                           |
| Database connection fails                        | Start MongoDB and verify `DB_URI`; inside a container, localhost points to that container |
| Port already in use                              | Stop the other service or change `VITE_PORT`/`PORT`; Vite uses a strict frontend port     |
| Browser requests return HTML instead of API JSON | Keep `VITE_BASE_API=/api/v1` for the included proxy; verify the API is running            |
| TypeScript API or ESLint fails after upgrading   | Restore the TypeScript 6 compatibility alias; see [upgrade review](UPGRADE.md)            |
| Build seems stale                                | Run `pnpm turbo run build --force` to bypass cache reads                                  |
