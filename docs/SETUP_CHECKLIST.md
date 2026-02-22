# Turbo Monorepo Setup Checklist

## Pre-Development Checklist

- [ ] Node version matches `.nvmrc`: `nvm use`
- [ ] Dependencies installed: `yarn install` or `npm install`
- [ ] `.env` file created from `.env.example`
- [ ] Environment variables configured (MONGODB_URI, JWT_SECRET, etc.)
- [ ] Run `npm run lint` - all linting passes
- [ ] Run `npm run build` - all builds succeed
- [ ] Run `npm run dev` - apps start without errors

## File Structure Validation

- [ ] `.nvmrc` exists (Node 20.12.2)
- [ ] `.env` exists and contains all required variables
- [ ] `.editorconfig` exists for cross-editor consistency
- [ ] `.eslintrc.json` exists at root (single source of truth)
- [ ] No `.eslintrc.js` at root (removed duplicate)
- [ ] `pnpm-workspace.yaml` exists (for future pnpm support)
- [ ] `turbo.json` configured with UI mode
- [ ] `.npmrc` configured for monorepo optimization

## Package Manager Validation

### Current Setup (Yarn 1.22.22)
- [ ] `yarn --version` returns 1.22.22
- [ ] `yarn install` completes without errors
- [ ] No redundant lock files (no package-lock.json)
- [ ] `yarn.lock` is in git

### Package Consistency
- [ ] Root `package.json` has packageManager specified
- [ ] Server `package.json` has packageManager specified
- [ ] Frontend `package.json` uses `"type": "module"`
- [ ] All `package.json` files are valid JSON

## Workspace Dependencies

### Apps
- [ ] `apps/frontend` builds successfully
- [ ] `apps/server` builds successfully
- [ ] Both apps can run in parallel with `npm run dev`

### Shared Packages
- [ ] `@repo/eslint-config` loads without errors
- [ ] `@repo/typescript-config` loads without errors
- [ ] Shared configs extend properly in both apps

## Code Quality

### Linting
- [ ] `npm run lint` passes
- [ ] ESLint config extends shared config
- [ ] No unused disable directives

### Formatting
- [ ] `npm run format` works correctly
- [ ] Prettier ignores specified files (.prettierignore)
- [ ] All file types format properly (ts, tsx, json, md)

### TypeScript
- [ ] `npm run build` TypeScript compilation succeeds
- [ ] No TypeScript errors in apps
- [ ] tsconfig.json files properly configured
- [ ] Frontend has both tsconfig.app.json and tsconfig.node.json

## Environment Configuration

### .env File
- [ ] `.env` exists (not committed to git)
- [ ] All required variables are set:
  - [ ] `NODE_ENV`
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `VITE_PORT`
  - [ ] `SERVER_PORT`
  - [ ] Other required vars

### .gitignore
- [ ] `.env` is in `.gitignore`
- [ ] `node_modules/` is in `.gitignore`
- [ ] `.turbo/` is in `.gitignore`
- [ ] Build outputs are in `.gitignore` (dist, build, out)

## Development Workflow

### Scripts
- [ ] `npm run dev` starts both apps
- [ ] `npm run build` builds all packages
- [ ] `npm run build:frontend` builds only frontend
- [ ] `npm run build:server` builds only server
- [ ] `npm run start` runs built apps
- [ ] `npm run lint` checks all files
- [ ] `npm run format` formats all files

### Turbo Behavior
- [ ] Tasks run in parallel when possible
- [ ] Correct task dependencies respected
- [ ] Cache works: `npm run build` twice, second is faster
- [ ] TUI output shows proper formatting

## Editor Setup

### EditorConfig
- [ ] `.editorconfig` file exists
- [ ] Indentation is 2 spaces (validate in editor)
- [ ] Line endings are LF
- [ ] Files end with newline

### ESLint Plugin
- [ ] VSCode ESLint extension installed (or equivalent)
- [ ] ESLint shows real-time errors
- [ ] Auto-fix on save works (if configured)

### Prettier Plugin
- [ ] VSCode Prettier extension installed (or equivalent)
- [ ] Format on save works (if configured)
- [ ] Uses `.prettierrc` configuration

## CI/CD Readiness (Optional)

- [ ] All scripts work locally
- [ ] No hardcoded paths or machine-specific settings
- [ ] `.nvmrc` ensures CI uses correct Node version
- [ ] `.env` setup documented for CI systems
- [ ] Ready for GitHub Actions workflows

## Performance Validation

- [ ] First build completes in reasonable time
- [ ] Second identical build is noticeably faster (cache working)
- [ ] Dev server starts quickly
- [ ] HMR works properly in frontend

## Team Collaboration

- [ ] All team members can: `nvm use && npm install && npm run dev`
- [ ] Documentation is clear and accessible
- [ ] Setup guide available (SETUP_IMPROVEMENTS.md)
- [ ] No environment-specific issues reported

## Success Criteria

✅ All checkboxes completed = Setup is ready for development!

If any checkbox fails:
1. Check SETUP_IMPROVEMENTS.md for detailed explanations
2. Check the specific error message
3. Refer to the Troubleshooting section in SETUP_IMPROVEMENTS.md
4. Review individual app READMEs if available
