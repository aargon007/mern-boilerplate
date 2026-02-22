# Turbo Repo Setup Guide

## Issues Fixed

### 1. ✅ Package Manager Configuration
- **Status**: Yarn v1.22.22 maintained across root and server
- **Note**: Monorepo uses Yarn workspaces which is compatible with this setup
- **Recommendation**: If upgrading to pnpm, create `pnpm-workspace.yaml` and update all `packageManager` fields

### 2. ✅ TypeScript Configuration
- **Frontend**: Both `tsconfig.app.json` and `tsconfig.node.json` now exist and properly configured
- **Server**: Standard `tsconfig.json` configured for Node.js (commonjs module system)
- **Paths**: Frontend supports `@/*` path alias for cleaner imports

### 3. ✅ Environment Variables
- **Created**: `.env` file in root from `.env.example` template
- **Configured**: VITE_PORT=5173 for frontend, PORT=5000 for server
- **Location**: Root `.env` is loaded by turbo tasks automatically
- **Security**: `.gitignore` prevents `.env` from being committed

### 4. ✅ Vite Configuration
- **Port**: Now uses `VITE_PORT` environment variable (defaults to 5173)
- **strictPort**: Changed to false to allow fallback port if 5173 is unavailable
- **Issue Resolution**: No more hardcoded port 3000 conflict

### 5. ✅ Root-Level Code Quality Config
- **Created**: `.eslintrc.json` extending `@repo/eslint-config/base`
- **Created**: `.prettierrc` with standardized formatting rules
- **Created**: `.prettierignore` to exclude build artifacts and dependencies
- **Benefit**: Consistent linting and formatting across the monorepo

### 6. ✅ Turbo Task Configuration
- **dev**: Now has no dependencies (runs all workspaces simultaneously)
- **build**: Properly chains with `^build` dependency
- **start**: Depends on `build` to ensure apps are built before running
- **lint**: Added explicit task configuration with caching enabled
- **Caching**: Dev tasks don't cache (persistent: true), build tasks do cache

### 7. ✅ Root Package.json Scripts
- **Removed**: `dotenv` CLI from scripts (no longer needed)
- **Simplified**: Commands now directly call `turbo` with environment from `.env`
- **Better**: Cleaner script commands without redundant dotenv wrapping

## Project Structure

```
.
├── .env                          # Environment variables (created)
├── .env.example                  # Template (existing)
├── .eslintrc.json               # Root ESLint config (created)
├── .prettierrc                  # Root Prettier config (created)
├── .prettierignore              # Prettier ignore file (created)
├── turbo.json                   # Turbo configuration (updated)
├── package.json                 # Root package.json (updated)
├── apps/
│   ├── frontend/
│   │   ├── tsconfig.json        # References app and node configs
│   │   ├── tsconfig.app.json    # Already exists, verified
│   │   ├── tsconfig.node.json   # Already exists, verified
│   │   ├── vite.config.ts       # Updated with env var
│   │   └── package.json
│   └── server/
│       ├── tsconfig.json        # Node.js configuration
│       └── package.json
└── packages/
    ├── eslint-config/
    └── typescript-config/
```

## Quick Start

1. **Install dependencies**:
   ```bash
   yarn install
   ```

2. **Verify environment setup**:
   ```bash
   cat .env  # Check variables are loaded
   ```

3. **Start development**:
   ```bash
   yarn dev
   ```
   - Frontend will run on http://localhost:5173
   - Server will run on http://localhost:5000

4. **Build for production**:
   ```bash
   yarn build
   ```

5. **Start production server**:
   ```bash
   yarn start
   ```

## Troubleshooting

### Port Already in Use
If port 5173 is already in use, change VITE_PORT in `.env`:
```
VITE_PORT=3000
```
The app will use the specified port or fall back to the next available.

### Build Fails
Ensure you run `yarn build` before `yarn start`. The turbo task `start` now depends on `build`.

### ESLint Errors
Run `yarn lint` to check for issues, or `apps/frontend/package.json lint` has a max-warnings limit of 0.

### TypeScript Errors
Verify `tsconfig` references are correct:
- Frontend uses `tsconfig.app.json` for application code
- Frontend uses `tsconfig.node.json` for build config (vite.config.ts)

## Environment Variables Reference

| Variable | Default | Description |
|----------|---------|-------------|
| VITE_BASE_API | `/api/v1` | Frontend API base URL |
| VITE_PORT | `5173` | Frontend development port |
| NODE_ENV | `development` | Server environment |
| DB_URI | `mongodb://localhost:27017/myapp` | MongoDB connection string |
| PORT | `5000` | Server port |
| JWT_ACCESS_SECRET | `secret` | JWT signing secret (change in production!) |
| JWT_REFRESH_SECRET | `secret` | JWT refresh secret (change in production!) |
| CLIENT_URL | `http://localhost:5173` | CORS allowed client origin |

## Security Notes

- Replace all `secret` values in `.env` with strong random strings for production
- Never commit `.env` files (already in `.gitignore`)
- Use `.env.production` for production-only variables
- Store sensitive values in deployment platform's secrets manager
