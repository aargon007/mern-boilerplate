# Dependency upgrade review

Reviewed on **2026-10-11** after `pnpm up --recursive --latest`.

## Compatibility decisions

| Finding                                                                            | Change                                                                                                              |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Babel 8 requires newer Node patch releases                                         | Declare Node `^22.18.0                                                                                              |     | >=24.11.0`; keep Node 22 in Docker and CI |
| Turbo is already at registry latest 2.11.7                                         | Keep that version; update schema URL, task descriptions and package-manager declaration                             |
| `start` was cacheable despite long-running servers                                 | Mark `start` persistent and uncached; retain its build dependency                                                   |
| Root `.env` was not loaded by Vite                                                 | Set root `envDir`, load config values explicitly and add API proxy                                                  |
| Shared development `NODE_ENV` leaked into frontend builds                          | Set production mode explicitly with `cross-env` in the frontend build script                                        |
| Build hashes missed root environment variants and shell overrides                  | Add `.env*` inputs and `VITE_*`/`PORT` hash variables                                                               |
| TypeScript 7 removed `baseUrl` and Node10 resolution                               | Remove `baseUrl`, use relative paths and NodeNext server resolution                                                 |
| typescript-eslint cannot consume TypeScript 7's API                                | Alias `typescript` to `@typescript/typescript6@6.0.2`, and use TypeScript 7 via `@typescript/native` for app builds |
| Fresh isolated pnpm installs exposed nonportable inferred router declaration types | Annotate Express router exports explicitly                                                                          |
| Old `ts-node-dev` depends on the JavaScript TS API                                 | Replace it with `tsx watch`                                                                                         |
| Node types targeted Node 26 while runtime targets Node 22                          | Align both apps to `@types/node` 22                                                                                 |
| Router 8 has its own types                                                         | Remove the obsolete Router 5 `@types/react-router` package                                                          |
| Shared ESLint default export was an obsolete legacy config                         | Make default/base exports use the Node flat config; remove duplicated parser/plugin declarations                    |
| Unused catalogs listed stale versions and pnpm 9 predates catalogs                 | Remove unused catalogs; retain aligned manifest versions                                                            |
| Root dotenv CLI and server lint-staged had no consumers                            | Remove unused tooling and redundant scripts                                                                         |
| Numeric environment declarations hid string values                                 | Validate/convert server settings, including JWT expiry seconds                                                      |
| Mongoose save hook used an old callback signature                                  | Use an async hook and hash only when the password changes                                                           |
| API expected a raw JWT but frontend sends Bearer tokens                            | Parse the Bearer scheme and return 401 for invalid/expired tokens                                                   |
| Shutdown could immediately terminate connections                                   | Close HTTP and MongoDB connections on errors/signals with a timeout                                                 |
| Production API tried to serve a nonexistent sibling frontend directory             | Serve API assets independently; frontend runs under Nginx                                                           |
| Docker copied incomplete pnpm dependency trees and mismatched ports                | Use standalone `pnpm deploy`, include public assets, align ports and provide MongoDB                                |
| In-app docs used Yarn/npm and nonexistent Turbo commands                           | Update commands, package filters, repository links and setup steps                                                  |

Other application libraries upgraded by the user remain at their selected current versions. Some frontend dependencies (forms, dates, motion and component variants) are currently unused starter options; remove them when narrowing the application scope.

The pnpm executable remains pinned to 9.0.0. Updating application dependencies does not update the package manager. A pnpm major migration should be reviewed separately, including lockfile and deploy behavior.

## Validation and limits

- Workspace lint, builds and type-checking pass with the compatibility setup. The local checks ran on Node 25.8.2; CI and Docker select the current Node 22 line.
- API runtime smoke tests pass without MongoDB.
- A standalone production deployment package loads and includes its compiled files and public assets.
- Frozen-lockfile installation and pruning are checked separately from container execution.
- Production mode is explicit in frontend builds; docs load on their own route. Bundle sizes depend on application additions.
- Docker is not installed in the review environment; full images/Compose were not run.
- The existing incomplete auth UI/profile/refresh flow is described in [API scope](API.md).

Official references: [Turborepo 2.11](https://turborepo.dev/blog/2-11), [TypeScript 7 and side-by-side API compatibility](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/), [Vite migration](https://vite.dev/guide/migration).
