# Stage 1: Base + Prune
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN yarn global add turbo

COPY . .
RUN turbo prune --scope=frontend --docker

# Stage 2: Install & Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=base /app/out/json/ ./
RUN yarn install --frozen-lockfile

COPY --from=base /app/out/full/ ./
RUN yarn build

# Stage 3: Production with Nginx
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html
COPY apps/frontend/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/apps/frontend/dist ./
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
