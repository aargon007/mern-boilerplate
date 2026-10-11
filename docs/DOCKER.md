# Docker

## Run the stack

Install Docker with Compose v2, create root `.env` from `.env.example`, and replace JWT secrets.

```bash
docker compose up --build
docker compose down
```

| Service        | Host address          | Container port |
| -------------- | --------------------- | -------------- |
| Frontend/Nginx | http://localhost:4173 | 80             |
| Express API    | http://localhost:5001 | 5001           |
| MongoDB        | Internal network only | 27017          |

Nginx serves frontend `dist/`, falls back to `index.html` for browser routes, and forwards `/api/` to `server:5001`. The API serves its own landing and not-found pages. It does not serve a sibling frontend folder.

Compose sets the API to production mode and port 5001. It defaults to the bundled database using `mongodb://mongo:27017/myapp`, and waits for MongoDB's ping health check. `DB_URI` from the local `.env` is overridden inside Compose; use `DOCKER_DB_URI` for a hosted/external database. `DOCKER_CLIENT_ORIGIN` defaults to `http://localhost:4173`.

The `mongo-data` volume survives `docker compose down`. `docker compose down --volumes` deletes that database volume; use it only when intentionally discarding development data.

## Image builds

Both Node build stages pin pnpm 9.0.0 and Turborepo 2.11.7, prune the target workspace, install from the frozen lockfile and run `pnpm turbo run build` with the app filter.

The server uses `pnpm --filter server deploy --prod` to retain a self-contained runtime dependency tree, compiled code and public assets. It runs as the Node image's non-root user. Copying only root `node_modules` would lose pnpm workspace dependency links.

The frontend runtime contains Nginx and static files, with no Vite preview process or Node dependencies. `VITE_BASE_API` is a **build argument**, defaulting to `/api/v1`:

```bash
docker compose build frontend
docker compose up -d
```

Build either image independently from the repository root:

```bash
docker build -f apps/server/Dockerfile -t mern-server .
docker build -f apps/frontend/Dockerfile -t mern-frontend .
```

The frontend image's included Nginx proxy expects a hostname `server` on the same Docker network; Compose provides it. Adapt the proxy when using a different deployment environment.

Root `.env` files are excluded from Docker build context. API secrets are injected at runtime. Vite variables are public and embedded in the frontend output.

## Deployment notes

Compose's MongoDB service is intended for local starter use and has no authentication configured. For a public deployment, supply your managed/authenticated database URL, set browser origins and JWT secrets, and terminate HTTPS at your host or reverse proxy. Do not expose the bundled database publicly.

The Docker files were reviewed and the prune/deploy paths were exercised locally. Full image builds need Docker and are not covered by the included API smoke tests.
