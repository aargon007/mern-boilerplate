ARG NODE_VERSION=22-alpine

# Base
FROM node:${NODE_VERSION} AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate

# Stage 1: Prune
FROM base AS pruner
RUN npm install -g turbo
COPY . .
RUN turbo prune server --docker

# Stage 2: Install & Build
FROM base AS builder
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

# Uncomment to enable turbo remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM
# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN pnpm turbo build --filter=server

# Stage 3: Runner
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 expressjs \
  && adduser --system --uid 1001 expressjs

# Copy only what's needed for production
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

RUN chown -R expressjs:expressjs /app

USER expressjs

EXPOSE 5000
CMD ["node", "dist/server.js"]