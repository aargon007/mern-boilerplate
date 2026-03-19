# Docker Guide

## Services

The Docker setup runs:

- `server` on port `5000`
- `frontend` on port `4173`

Definitions live in:

- `docker-compose.yml`
- `apps/server/Dockerfile`
- `apps/frontend/Dockerfile`

## Start

```bash
docker-compose up --build
```

## Stop

```bash
docker-compose down
```

## Environment

The compose file reads from the root `.env`.

Backend-related variables currently referenced by compose:

- `NODE_ENV`
- `PORT`
- `DB_URI`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `JWT_ACCESS_EXPIRES_IN`
- `JWT_REFRESH_EXPIRES_IN`
- `BCRYPT_SALT_ROUNDS`
- `CLIENT_ORIGIN`

Frontend-related variables currently referenced by compose:

- `VITE_BASE_API`

## Notes

- The backend mounts `./logs:/app/logs`
- The frontend depends on the backend service
- If local app ports change, update both compose and app config together
