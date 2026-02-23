# Multi-stage build for Turbo monorepo React frontend

FROM node:22-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Stage 1: Prune the monorepo
FROM base AS pruner
WORKDIR /app

RUN npm install -g turbo
COPY . .
# "frontend" must match the "name" field in apps/frontend/package.json
RUN turbo prune frontend --docker

# Stage 2: Install dependencies
FROM base AS installer
WORKDIR /app

# Copy pruned lockfile + workspace manifests (no source yet)
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Install only the deps needed for this app
RUN pnpm install --frozen-lockfile

# Copy pruned source files
COPY --from=pruner /app/out/full/ .

# Build the frontend app
ARG VITE_BASE_API
ENV VITE_BASE_API=$VITE_BASE_API
RUN pnpm turbo run build --filter=frontend...

# Stage 3: Run vite preview
FROM base AS runner
WORKDIR /app

COPY --from=installer /app/apps/frontend/dist ./apps/frontend/dist
COPY --from=installer /app/apps/frontend/package.json ./apps/frontend/package.json
COPY --from=installer /app/apps/frontend/vite.config.ts ./apps/frontend/vite.config.ts
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/package.json ./package.json

WORKDIR /app/apps/frontend

EXPOSE 4173
CMD ["pnpm", "start"]