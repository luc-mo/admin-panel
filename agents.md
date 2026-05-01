# Admin Panel — Agent Instructions

General instructions for any AI agent working in this repository (Claude, Kimi, Copilot, etc.).

## Project Overview

RBAC admin panel managing Users, Roles, Permissions, and Endpoints. pnpm monorepo using Onion Architecture.

```
apps/backend/    # Express 5 + Firebase Cloud Functions (Node 24)
apps/frontend/   # React 19 + Vite + Ant Design
packages/core/   # Shared domain models
```

## Stack

- TypeScript 5 strict mode throughout
- Biome for linting and formatting
- Awilix for DI (backend), React providers for DI (frontend)
- Firebase: Cloud Functions, Firestore, Auth

## Architecture Rules

**Onion layers (outside → inside):** infrastructure → application → domain

- `domain/` contains types and interfaces only — no logic, no deps
- `application/` contains use cases — one folder per entity, files: `command.ts`, `index.ts`, `response.ts`
- `infrastructure/` contains everything external: HTTP controllers, Firebase persistence, services, config

**Frontend-specific:**
- Application hooks receive all dependencies as parameters — never import providers or services directly
- Providers mount in this order: `config` → `services` → `router` → `toast` → `auth` → `core-services`
- `core-services-provider` is scoped to the dashboard

**Dependency injection:**
- Backend: Awilix proxy mode. Use `InjectableDependency` mixin. Register everything in `container.ts`.
- Frontend: `createProvider` / `useProviders` / `withProviders` pattern.

## Code Style

- File names: kebab-case. Type is part of the name: `user-repository.ts`, not `user.repository.ts`
- No comments of any kind — not inline, not JSDoc, not block comments
- No over-implementation: implement exactly what is asked, nothing more
- No abstractions beyond what the task requires
- Use cases are never abstracted behind interfaces/ports — abstraction via parameter injection only

## Commits

All commits must follow **Conventional Commits**:

```
<type>(<scope>): <description>
```

Types: `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `style`, `perf`, `ci`

Scope is optional but recommended (`backend`, `frontend`, `core`).

Examples:
- `feat(core): add permission entity timestamps`
- `fix(frontend): resolve auth redirect loop`
- `chore(backend): clean up unused imports`

## What Agents Must Not Do

- Do not add comments, JSDoc, or inline documentation unless explicitly asked
- Do not refactor code outside the scope of the task
- Do not invent or suggest features that were not requested
- Do not add error handling for scenarios that cannot happen
- Do not create abstractions for future hypothetical requirements
