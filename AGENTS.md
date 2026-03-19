# AGENTS

This repository is a PNPM workspace MERN monorepo managed with Turborepo.

## Workspace Layout

- `apps/frontend`: React 19 + Vite 8 + Tailwind CSS 4 frontend
- `apps/server`: Express 5 + Mongoose + Zod API server
- `packages/eslint-config`: shared ESLint config package
- `packages/typescript-config`: shared TypeScript config package

## Package Manager

- Use `pnpm`
- The repo expects Node `>=22`
- Run workspace tasks from the root unless package-local execution is required

## Turborepo Rules

- Use `turbo run <task>` in scripts and automation
- Keep task implementations in package `package.json` files
- Register shared task behavior in [`turbo.json`](/Users/aargon/Workspaces/Boilerplate/mern-boilerplate/turbo.json)
- Do not add root task logic unless there is no package-level home for it

Common root commands:

- `pnpm dev`
- `pnpm build`
- `pnpm lint`
- `pnpm start`

## Frontend Notes

- Vite 8 is in use
- Use native Vite TS path resolution via `resolve.tsconfigPaths: true`
- Do not reintroduce `vite-tsconfig-paths`
- React Compiler is wired through `@vitejs/plugin-react` plus `@rolldown/plugin-babel`
- Shared ESLint config is imported from `@repo/eslint-config/react`
- Shared TS config is imported from `@repo/typescript-config/vite.json`

## Server Notes

- ESLint uses flat config at `apps/server/eslint.config.mjs`
- Shared ESLint config is imported from `@repo/eslint-config/node`
- Shared TS config is imported from `@repo/typescript-config/node.json`
- Build output goes to `apps/server/dist`

## Dependency Hygiene

- Prefer aligning shared toolchain versions across the monorepo
- Keep shared ESLint dependencies in `packages/eslint-config`
- Avoid duplicating TypeScript/ESLint helper packages in app workspaces unless the app truly needs a direct dependency
- When changing package versions, refresh `pnpm-lock.yaml`

## Validation

Before finishing changes that touch tooling, config, or dependencies, run:

```bash
pnpm turbo run lint
pnpm turbo run build
```

## Known Caveat

- `eslint-plugin-react-hooks@7.0.1` warns about an ESLint peer range that stops at ESLint 9, but the repo currently works on ESLint 10. Treat it as an upstream metadata warning unless lint actually breaks.
