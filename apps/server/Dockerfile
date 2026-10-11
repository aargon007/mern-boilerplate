FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

FROM base AS pruner
RUN npm install --global turbo@2.11.7
COPY . .
RUN turbo prune server --docker

FROM base AS builder
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full/ .
RUN pnpm turbo run build --filter=server...
# Deploy preserves pnpm's dependency links and copies dist plus public assets.
RUN pnpm --filter server deploy --prod /prod/server

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5001
COPY --from=builder --chown=node:node /prod/server/ .
USER node
EXPOSE 5001
CMD ["node", "dist/server.js"]
