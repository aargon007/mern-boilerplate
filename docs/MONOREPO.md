# Monorepo Notes

## Workspace Layout

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

## Tooling

- Package manager: PNPM workspaces
- Task runner: Turborepo
- Frontend bundler: Vite 8
- Shared lint config: `packages/eslint-config`
- Shared TS config: `packages/typescript-config`

## Turborepo Rules

- Root scripts should delegate with `turbo run <task>`
- Package scripts hold the actual task implementation
- Shared task behavior is configured in `turbo.json`

## Frontend

- React 19 + Vite 8 + Tailwind CSS 4
- Uses native Vite TS path resolution
- React Compiler is wired through `@vitejs/plugin-react` and `@rolldown/plugin-babel`
- Shared ESLint config import: `@repo/eslint-config/react`
- Shared TS config import: `@repo/typescript-config/vite.json`

## Server

- Express 5 + Mongoose + Zod
- ESLint flat config file: `apps/server/eslint.config.mjs`
- Shared ESLint config import: `@repo/eslint-config/node`
- Shared TS config import: `@repo/typescript-config/node.json`

## Validation

After changing tooling or dependencies, run:

```bash
pnpm turbo run lint
pnpm turbo run build
```

## Known Caveat

`eslint-plugin-react-hooks@7.0.1` still warns about an ESLint peer range that ends at ESLint 9, while this repo uses ESLint 10. Lint currently works, so treat it as an upstream metadata warning unless behavior breaks.
