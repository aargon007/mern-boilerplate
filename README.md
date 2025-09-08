# MERN Turborepo starter

A modern, production-ready MERN stack boilerplate with Turborepo, TypeScript, and Docker support.

## 🚀 Quick Start

### Local Development

```bash
git clone https://github.com/aargon007/mern-turbo-boilerplate
cd mern-turbo-boilerplate
yarn install
yarn dev
```

### Docker Deployment

```bash
# Copy and configure environment
cp .env.docker.example .env.docker

# Start all services
docker-compose --env-file .env.docker up -d
```

## 📚 Documentation

- [Docker Setup Guide](./DOCKER.md) - Complete Docker deployment guide
- [Improvements Roadmap](./IMPROVEMENTS.md) - Planned enhancements and features

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Redux Toolkit
- **Backend**: Node.js, Express.js, TypeScript, MongoDB, Mongoose
- **Tools**: Turborepo, Vite, ESLint, Prettier
- **Deployment**: Docker, Docker Compose, Nginx
