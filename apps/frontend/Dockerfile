FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

FROM base AS pruner
RUN npm install --global turbo@2.11.7
COPY . .
RUN turbo prune frontend --docker

FROM base AS builder
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full/ .
ARG VITE_BASE_API=/api/v1
ENV VITE_BASE_API=$VITE_BASE_API
RUN pnpm turbo run build --filter=frontend...

FROM nginx:stable-alpine AS runner
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
