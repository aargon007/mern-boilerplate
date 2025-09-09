# Docker Setup Guide

This guide explains how to run the MERN Turbo Boilerplate using Docker.

## Available Services

| Service  | Port   | Description                  |
| -------- | ------ | ---------------------------- |
| Frontend | 3000   | React application with Nginx |
| Backend  | 5000   | Express.js API server        |
| Nginx    | 80/443 | Reverse proxy                |

**Note**: MongoDB is not included in Docker setup. Use local, remote, or cloud MongoDB URI.

## Docker Commands

### Building Images

```bash
# build server image
docker-compose build server

# build frontend image
docker-compose build frontend

# Build all images
docker-compose build

# Build without cache
docker-compose build --no-cache
```

### Managing Services

```bash
# Start services
docker-compose up -d

# Start specific service
docker-compose up server

# Stop services
docker-compose stop

# Restart specific service
docker-compose restart server

# Remove all containers and volumes
docker-compose down -v
```

### Viewing Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f server

# Last 100 lines
docker-compose logs --tail=100 server
```


## Individual Service Dockerfiles

### Frontend (`apps/frontend/Dockerfile`)

- Multi-stage build with Node.js and Nginx
- Optimized for production serving
- Includes security headers and caching

### Backend (`apps/server/Dockerfile`)

- Multi-stage build for smaller production image
- Non-root user for security
- Health checks included

### Monorepo (`Dockerfile`)

- Builds entire application in single container
- Server serves both API and frontend
- Useful for simple deployments


## Health Checks

All services include health checks:

- **Frontend**: HTTP check on `/health`
- **Backend**: HTTP check on `/api/v1/health`

## Security Features

- Non-root users in containers
- Security headers in Nginx
- Rate limiting on API endpoints
- Secrets management via environment variables

## Troubleshooting

### Common Issues

1. **Port conflicts**: Change ports in docker-compose.yml
2. **Memory issues**: Increase Docker memory allocation
3. **Permission errors**: Check file ownership and Docker permissions

### Debug Commands

```bash
# Check container status
docker-compose ps

# Inspect container
docker-compose exec server sh

# Check container logs
docker-compose logs server

# Check resource usage
docker stats
```