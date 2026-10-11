# Environment variables

Copy `.env.example` to **root `.env`**. Both apps use this shared local file. It is ignored by Git and Docker's build context. Runtime environment variables override file values.

Vite loads root `.env`, `.env.local`, and mode-specific files using its normal precedence. The server loads root `.env` only, resolved from its source/build location. For deployment, inject the server's variables through the process environment or Compose.

## Variables

| Variable                 | Default/example                   | Meaning                                          |
| ------------------------ | --------------------------------- | ------------------------------------------------ |
| `VITE_BASE_API`          | `/api/v1`                         | Browser API base; embedded in the frontend build |
| `VITE_PORT`              | `5173`                            | Local frontend development port                  |
| `NODE_ENV`               | `development`                     | API mode: development, production or test        |
| `PORT`                   | `5001`                            | API port, validated as an integer from 1–65535   |
| `DB_URI`                 | `mongodb://127.0.0.1:27017/myapp` | Required MongoDB connection URL                  |
| `CLIENT_ORIGIN`          | `http://localhost:5173`           | Allowed browser origin for credentialed API CORS |
| `BCRYPT_SALT_ROUNDS`     | `10`                              | Password hash cost, integer from 4–31            |
| `JWT_ACCESS_SECRET`      | Replace the example               | Required access-token signing secret             |
| `JWT_REFRESH_SECRET`     | Replace the example               | Reserved for the unfinished refresh-token flow   |
| `JWT_ACCESS_EXPIRES_IN`  | `15m`                             | Access-token lifetime                            |
| `JWT_REFRESH_EXPIRES_IN` | `7d`                              | Reserved refresh-token lifetime                  |
| `DOCKER_DB_URI`          | `mongodb://mongo:27017/myapp`     | Compose API database override                    |
| `DOCKER_CLIENT_ORIGIN`   | `http://localhost:4173`           | Compose API CORS override                        |

JWT durations accept positive integer seconds (`900`) or values ending in `s`, `m`, `h` or `d`. The server converts them to seconds before signing JWTs. Environment values start as strings; the server validates and converts ports, hash cost and durations instead of declaring process variables as numbers.

## Frontend and caching

All `VITE_*` values are public. Keep secrets out of that prefix. Only prefixed values are exposed through `import.meta.env`; the Vite config may read `PORT` to configure its local proxy.

Turbo does not load `.env` for either app. The apps load it themselves. Build inputs explicitly include root and package `.env*` files, so changing file values invalidates the cache. `VITE_*` and `PORT` passed by the shell are included in build hashes. Uncached `dev` and `start` tasks pass through the API runtime variables under Turbo's default strict environment mode.

The frontend build script explicitly sets `NODE_ENV=production` with `cross-env`, so the shared local API setting `NODE_ENV=development` cannot embed React development code in deployment builds.

Changing `VITE_BASE_API` in a running container does not alter compiled JavaScript. Set it as a Docker build argument and rebuild the frontend image.

A shared root `.env` keeps this small starter easy to configure. If splitting into independently managed applications, move to app-specific environment files and update both loaders and Turbo inputs together.
