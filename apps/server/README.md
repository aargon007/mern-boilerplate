# API server

Express 5 with Mongoose 9, Zod 4, JWT and bcrypt. Modules live under `src/modules/`; routes mount at `/api/v1`. Middleware, errors, helpers and response utilities have their own folders.

From the repository root:

```bash
pnpm turbo run dev --filter=server
pnpm turbo run build --filter=server
pnpm turbo run lint typecheck --filter=server
pnpm turbo run test --filter=server
pnpm start:server
```

Create root `.env` from `.env.example` and start MongoDB. Settings are validated before startup. Development uses `tsx watch`; builds compile with TypeScript 7 and rewrite aliases with `tsc-alias`; production starts `dist/server.js`.

The API serves landing/not-found HTML from `public/` independently of the frontend. Docker deploys `dist/`, `public/` and production dependencies. SIGINT/SIGTERM close the HTTP server and MongoDB connection.

See [API scope](../../docs/API.md), [environment settings](../../docs/ENVIRONMENT.md), and [Docker](../../docs/DOCKER.md). Runtime smoke tests use explicit fixtures and do not require MongoDB; registration and login need database integration testing.
