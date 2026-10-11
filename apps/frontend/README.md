# Frontend

React 19, Vite 8, Tailwind CSS 4, Redux Toolkit and React Router 8. Source is under `src/`; browser routes are in `src/routes/Routes.tsx` and state/API examples in `src/redux/`.

From the repository root:

```bash
pnpm turbo run dev --filter=frontend
pnpm turbo run build --filter=frontend
pnpm turbo run lint typecheck --filter=frontend
```

Create root `.env` from `.env.example`. Vite uses root `envDir` and proxies `/api` to the API's configured `PORT`. Builds go to `apps/frontend/dist`. `start` uses local Vite preview on port 4173; Docker serves static files with Nginx.

Native TypeScript aliases are enabled with `resolve.tsconfigPaths: true`; do not add `vite-tsconfig-paths`. React Compiler uses the React and Rolldown Babel plugins.

See the [setup guide](../../docs/QUICK_START.md), [environment guide](../../docs/ENVIRONMENT.md), and [unfinished auth examples](../../docs/API.md).
