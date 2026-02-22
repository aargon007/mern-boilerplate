# Quick Start Guide

## One-Time Setup

### 1. Install Node Version Manager (nvm)
```bash
# macOS/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Windows (use WSL2 or PowerShell version)
# https://github.com/coreybutler/nvm-windows/releases
```

### 2. Use Correct Node Version
```bash
nvm use
# Should output: Now using node v20.12.2
```

### 3. Install Dependencies
```bash
yarn install
# or: npm install
```

### 4. Create Environment File
```bash
cp .env.example .env
# Then edit .env with your actual values (MongoDB URI, JWT secret, etc.)
```

### 5. Verify Setup
```bash
node scripts/verify-setup.js
```

## Daily Development

### Start Development Server
```bash
npm run dev
# Starts both frontend (localhost:5173) and server (localhost:5000)
```

### Build for Production
```bash
npm run build
# Builds both frontend and server
```

### Run Linting
```bash
npm run lint
# Checks all code for issues
```

### Format Code
```bash
npm run format
# Automatically formats all code
```

## Working with Specific Apps

### Frontend Only
```bash
npm run dev -- --filter=frontend
npm run build:frontend
npm run start:frontend
```

### Server Only
```bash
npm run dev -- --filter=server
npm run build:server
npm run start:server
```

## Useful Commands

```bash
# See all available commands
cat package.json | grep '"scripts"' -A 20

# Clear cache and reinstall
rm -rf node_modules .turbo
npm install

# Check TypeScript types
npm run build

# Debug ESLint
npm run lint -- --debug

# Format specific file
npx prettier --write <file>

# Check dependencies
npm list --depth=0
```

## Directory Structure

```
project-root/
├── apps/
│   ├── frontend/          # React app (port 5173)
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   └── server/            # Express API (port 5000)
│       ├── src/
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   ├── eslint-config/     # Shared ESLint rules
│   └── typescript-config/ # Shared TypeScript configs
│
├── .env                   # Environment variables (not in git)
├── .env.example          # Example env file (in git)
├── .editorconfig         # Editor settings
├── .eslintrc.json        # ESLint rules
├── .gitignore            # Git ignore rules
├── .nvmrc                # Node version
├── .npmrc                # npm configuration
├── .prettierrc            # Prettier formatting
├── package.json          # Root package config
├── turbo.json            # Turbo build config
└── pnpm-workspace.yaml   # pnpm workspace config (optional)
```

## Ports

- **Frontend**: http://localhost:5173 (Vite dev server)
- **Server**: http://localhost:5000 (Express API)
- **Frontend Built**: Run `npm run start:frontend` to serve built version

## Environment Variables

```
NODE_ENV=development          # Environment type
MONGODB_URI=...              # MongoDB connection
JWT_SECRET=...               # JWT signing key
VITE_PORT=5173              # Frontend port
SERVER_PORT=5000            # Server port
```

## Common Issues & Fixes

### Issue: Port Already in Use
```bash
# Kill process on port 5173
lsof -i :5173 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Kill process on port 5000
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### Issue: Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
npm install
```

### Issue: Port 5173 Says "Conflict"
```bash
# Ensure VITE_PORT is set in .env (not 3000)
# The vite.config.ts should use process.env.VITE_PORT
echo "VITE_PORT=5173" >> .env
```

### Issue: ESLint Errors
```bash
# Fix ESLint issues automatically
npm run lint -- --fix

# Or use prettier
npm run format
```

## Documentation Files

- **IMPROVEMENTS_SUMMARY.md** - Overview of all changes made
- **SETUP_IMPROVEMENTS.md** - Detailed setup and troubleshooting
- **SETUP_CHECKLIST.md** - Pre-development validation checklist
- **PNPM_MIGRATION_GUIDE.md** - How to migrate to pnpm (optional)
- **TURBO_SETUP_GUIDE.md** - Complete Turbo configuration details

## Need Help?

1. Check SETUP_IMPROVEMENTS.md for detailed explanations
2. Check SETUP_CHECKLIST.md to validate your setup
3. Run `node scripts/verify-setup.js` for automated validation
4. Check error messages carefully for specific solutions
5. See Troubleshooting section in SETUP_IMPROVEMENTS.md

## First Time Setup Timeline

Expected time: **5-10 minutes**

1. Clone repo (1 min)
2. `nvm use` (10 sec)
3. `npm install` (2-3 min)
4. `cp .env.example .env` (10 sec)
5. Edit `.env` with values (1 min)
6. `node scripts/verify-setup.js` (10 sec)
7. `npm run dev` (1 min)

## Verification

All working when you see:

```
✓ Frontend running at http://localhost:5173
✓ Server running at http://localhost:5000
✓ Both apps are responsive
✓ No error messages in console
```

## Next Steps

1. Read IMPROVEMENTS_SUMMARY.md for understanding the setup
2. Review SETUP_CHECKLIST.md and complete all items
3. Start development with `npm run dev`
4. Read individual app READMEs (if they exist)
5. Check documentation in SETUP_IMPROVEMENTS.md

---

**Last Updated**: February 2026
**Status**: Ready for Development ✅
