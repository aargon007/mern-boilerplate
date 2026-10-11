# AGENTS

This repository is a PNPM workspace MERN monorepo managed with Turborepo.

## Workspace Layout

- `apps/frontend`: React 19 + Vite 8 + Tailwind CSS 4 frontend
- `apps/server`: Express 5 + Mongoose + Zod API server
- `packages/eslint-config`: shared ESLint config package
- `packages/typescript-config`: shared TypeScript config package

## Package Manager

- Use `pnpm`
- The repo expects Node `^22.18.0 || >=24.11.0` and pnpm `9.0.0`
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

## Toolchain Compatibility

- App `tsc` builds use TypeScript 7 through the `@typescript/native` alias.
- Keep `typescript` aliased to `@typescript/typescript6` for ESLint, formatting and alias tooling until their APIs support TypeScript 7.
- Server dev uses `tsx watch`; compiled output is CommonJS with NodeNext resolution.
- Read `docs/UPGRADE.md` and `docs/ENVIRONMENT.md` before changing compatibility or environment handling.

## File-Scoped Commands

- Lint: `pnpm --filter frontend exec eslint src/path.tsx` or `pnpm --filter server exec eslint src/path.ts`.
- Runtime tests: `pnpm turbo run test --filter=server` (builds first).

## Commit Attribution

- AI-authored commits must include the agent's name in a `Co-Authored-By` trailer.

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
