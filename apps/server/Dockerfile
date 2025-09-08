# 1. Base image
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# 2. Prune step (create minimal workspace for server)
FROM base AS pruner
COPY . .
RUN yarn global add turbo
RUN turbo prune --scope=server --docker

# 3. Install & Build
FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ ./
RUN yarn install --frozen-lockfile

COPY --from=pruner /app/out/full/ ./
RUN yarn dotenv -- turbo build --filter=server...

# 4. Runtime
FROM node:22-alpine AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 expressjs \
  && adduser --system --uid 1001 expressjs

# Copy only what's needed
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/package.json ./package.json

# Install only production deps
RUN yarn install --production --frozen-lockfile --ignore-scripts --prefer-offline

# Change ownership to non-root user
RUN chown -R expressjs:expressjs /app

USER expressjs

EXPOSE 5000
CMD ["node", "dist/server.js"]