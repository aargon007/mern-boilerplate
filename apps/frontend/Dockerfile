# Multi-stage build for Turbo monorepo React frontend

# 1. Base image with turbo
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# 2. Prune step (create minimal workspace for frontend)
FROM base AS pruner
COPY . .
RUN yarn global add turbo
RUN turbo prune --scope=frontend --docker

# 3. Install & Build
FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ ./
RUN yarn install --frozen-lockfile

COPY --from=pruner /app/out/full/ ./
RUN yarn turbo build --filter=frontend...

# 4. Production with Nginx
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html
COPY apps/frontend/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/apps/frontend/dist ./
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
