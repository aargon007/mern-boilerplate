# Workspace and Turborepo

## Packages

| Workspace name            | Path                         | Purpose                               |
| ------------------------- | ---------------------------- | ------------------------------------- |
| `frontend`                | `apps/frontend`              | React UI and Vite build               |
| `server`                  | `apps/server`                | Express API and compiled Node runtime |
| `@repo/eslint-config`     | `packages/eslint-config`     | Shared flat lint configurations       |
| `@repo/typescript-config` | `packages/typescript-config` | Shared TypeScript options             |

Both apps declare the shared configuration packages with `workspace:*`. Keep actual task implementations in package scripts and orchestration in root `turbo run <task>` scripts. The shared config packages are consumed directly and need no build output.

## Task graph

| Task        | Dependencies                             | Cache/output           | Lifecycle  |
| ----------- | ---------------------------------------- | ---------------------- | ---------- |
| `build`     | Dependency workspaces' `build` tasks     | Cache `dist/**`        | Exits      |
| `lint`      | Dependency workspaces' `lint` tasks      | Cache success/logs     | Exits      |
| `typecheck` | Dependency workspaces' `typecheck` tasks | Cache success/logs     | Exits      |
| `test`      | Same workspace's `build`                 | Cache success/logs     | Exits      |
| `dev`       | None                                     | Uncached               | Persistent |
| `start`     | Same workspace's `build`                 | Uncached               | Persistent |
| `format`    | None                                     | Uncached; edits source | Exits      |

`^lint` and `^typecheck` create dependency graph traversal through configuration packages even when those packages have no corresponding script. Changes to shared configuration invalidate downstream checks. Builds likewise depend on configuration packages through `^build`.

Package names drive filters:

```bash
pnpm turbo run build --filter=frontend
pnpm turbo run build --filter=frontend...
pnpm turbo run lint --filter='[main]'
pnpm turbo run build --dry=json
pnpm turbo run build --force
```

A trailing `...` includes dependency workspaces. The `[main]` filter selects workspaces changed relative to a local Git ref named `main`; use a ref that exists in your clone. `--dry=json` shows the planned tasks without running them. `--force` bypasses cache reads.

Turbo caches locally in `.turbo`. Remote caching is optional; use `pnpm turbo login` and `pnpm turbo link` only when you want to connect a remote cache provider.

## Configuration

- Frontend extends `@repo/typescript-config/vite.json` and uses native Vite `resolve.tsconfigPaths: true`.
- React Compiler runs through `@vitejs/plugin-react` and `@rolldown/plugin-babel`.
- Server uses `NodeNext` resolution with CommonJS output, then `tsc-alias` rewrites `@/` paths for Node.
- Server development uses `tsx watch`; production runs the compiled `dist/server.js`.
- `@repo/eslint-config/react` and `/node` are flat configs; the package's default and `/base` exports also resolve to the Node flat config.
- `typescript` is the TypeScript 6 compatibility API alias. App builds use the `tsc` executable supplied by `@typescript/native` (an alias of TypeScript 7).
- Both `packageManager` and the Turborepo 2.11 `devEngines.packageManager` declaration specify pnpm 9.0.0. The legacy field remains for Corepack compatibility.
- pnpm 9.0.0 is retained deliberately. A move to pnpm 12 is a separate package-manager migration; update lockfiles, CI, Docker, peer/build-script behavior and deployment commands together.

Turborepo 2.11 can write a managed guidance block into `AGENTS.md` when detecting an agent. Keep that block; its instructions point to version-matched docs bundled with the installed `turbo` package.

## Dependencies and upgrades

```bash
pnpm --filter frontend add <package>
pnpm --filter server add <package>
pnpm --filter @repo/eslint-config add <lint-plugin>
pnpm add -Dw <root-tool>
pnpm outdated --recursive
pnpm up --recursive --latest
pnpm install
pnpm turbo run lint
pnpm turbo run build
pnpm turbo run typecheck test
```

Review manifests and release notes after a major upgrade. Preserve the TypeScript aliases until the lint/format/alias tools support the new compiler API. Align shared toolchain versions and commit `pnpm-lock.yaml` with manifest changes. ESLint plugins belong in the shared config package, while each app declares its own command-line tools.

`pnpm format` formats app files using their own Prettier configuration. To format root documentation, run `pnpm exec prettier --write README.md 'docs/**/*.md'`.

## CI and pruning

The GitHub workflow installs from the frozen lockfile on Node 22 and runs lint, build, type-check and tests. API smoke tests set their own environment fixtures; CI needs no MongoDB or secrets for them.

Docker uses `turbo prune <app> --docker` to create smaller build workspaces. Keep dev configuration packages during the build. Turborepo 2.11's `--production` pruning flag excludes development-only workspace packages; it is useful for runtime preparation, but should not replace the prune step that builds these apps. The server image uses `pnpm deploy --prod` after building to produce a standalone runtime tree.

Official references: [Turborepo 2.11 release](https://turborepo.dev/blog/2-11), [configuration](https://turborepo.dev/docs/reference/configuration), [environment variables](https://turborepo.dev/docs/crafting-your-repository/using-environment-variables), [pruning](https://turborepo.dev/docs/reference/prune).
