# Quick Start

## Requirements

- Node.js 22+
- PNPM 9

## Install

```bash
git clone https://github.com/aargon007/mern-boilerplate
cd mern-boilerplate
pnpm install
```

## Run Everything

```bash
pnpm dev
```

This runs the frontend and server through Turborepo.

## Run Individual Apps

Frontend:

```bash
pnpm --filter frontend dev
```

Server:

```bash
pnpm --filter server dev
```

## Build

```bash
pnpm build
```

## Validate

```bash
pnpm lint
pnpm build
```

## Useful Root Commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm start
pnpm build:frontend
pnpm build:server
pnpm start:frontend
pnpm start:server
```
