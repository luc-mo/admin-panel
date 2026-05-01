# Admin Panel — Claude Context

## Project

RBAC admin panel: manages Users, Roles, Permissions, and Endpoints. pnpm monorepo with Onion Architecture applied consistently across frontend and backend.

```
apps/backend/    # Express 5 + Firebase Cloud Functions (Node 24)
apps/frontend/   # React 19 + Vite + Ant Design
packages/core/   # Shared domain models (User, Role, Permission, Endpoint)
```

## Commands

| Task | Command |
|---|---|
| Backend dev | `pnpm dev` (from `apps/backend`) |
| Frontend dev | `pnpm dev` (from `apps/frontend`) |
| Firebase emulator | `pnpm emulator` (from `apps/backend`) |
| Build backend | `pnpm build` (from `apps/backend`) |
| Build frontend | `pnpm build` (from `apps/frontend`) |
| Lint + fix | `pnpm lint` (root) |
| Format + fix | `pnpm format` (root) |
| Lint check | `pnpm lint:check` (root) |

## Stack

- **Language:** TypeScript 5 (strict mode)
- **Linter/Formatter:** Biome (extends `@snowdrive/biome-config`)
- **Backend:** Express 5, Awilix DI (proxy mode), Firebase Admin SDK, Firestore, Winston
- **Frontend:** React 19, Vite 8, Ant Design 6, React Router 7, Axios, Firebase SDK
- **Core:** Pure TypeScript, multi-format output (CJS + ESM + types via tsup)

## Architecture

Both apps follow **Onion Architecture**. Layers (outside → inside): infrastructure → application → domain.

**Backend:**
- `domain/` — pure entity types (no logic)
- `application/` — use cases organized by entity folder, each with `command.ts`, `index.ts`, `response.ts`
- `infrastructure/` — controllers, persistence, external services, env config
- DI via Awilix; `InjectableDependency` mixin handles constructor injection with `_`-prefixed private deps
- All registrations live in `container.ts`

**Frontend:**
- `domain/` — types and interfaces only
- `application/` — granular use case hooks receiving deps as params; return `execute`, `data`, `loadings`, etc.
- `infrastructure/` — config, API service singletons, client factories per entity
- `ui/` — providers, pages, layouts, components, router
- Provider mounting order: `config` → `services` → `router` → `toast` → `auth` → `core-services`
- `core-services-provider` is scoped to the dashboard

## Conventions

- File names: kebab-case. The file type is part of the name — `core-services-provider.ts`, not `core-services.provider.ts`
- No comments of any kind. Code must be self-explanatory.
- Use cases are called directly — no interfaces or port abstractions. Abstraction via parameter injection.
- Application-layer hooks receive deps as parameters; they never consume providers directly.
- Never over-implement. Do exactly what is asked, nothing more.

## Commits

Use **Conventional Commits** for every commit:

```
<type>(<scope>): <description>
```

Types: `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `style`, `perf`, `ci`

Examples:
- `feat(backend): add update-permission use case`
- `fix(frontend): correct role form validation`
- `chore: update pnpm lockfile`

Scope is optional but recommended (e.g., `backend`, `frontend`, `core`).
