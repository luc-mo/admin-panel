# Princesitas
Princesitas es un sistema de gestión de usuarios, roles y permisos estructurado arquitecturalmente como un monorepositorio aplicando `Onion Architecture`.

## Monorepo
```
apps/backend/
apps/frontend/
packages/core/
```

## Backend
Capas: `domain`, `application`, `infrastructure`. Los casos de uso viven en `application/` organizados por carpeta con `command.ts`, `index.ts` y `response.ts`. La infraestructura contiene configuración (env), persistencia, servicios externos y controladores HTTP.

Inyección de dependencias con Awilix en modo proxy. El mixin `InjectableDependency` evita constructores repetitivos e inyecta dependencias privadas con prefijo `_`. El registro centralizado vive en `container.ts`.

## Frontend
Capas: `domain`, `application`, `infrastructure`, `ui`.

`domain` contiene únicamente tipos e interfaces. `application` contiene hooks de casos de uso granulares que reciben dependencias como parámetros y retornan `execute`, `data`, `loadings`, etc. `infrastructure` contiene configuración, singletons de servicios y factorías de clientes API por entidad. `ui` contiene providers, pages, layouts, componentes y router.

Los providers actúan como container de dependencias reactivo. Se crean con `createProvider`, se consumen llamando a su metodo `use` o con `useProviders` y se montan en el arbol de componentes con `withProviders`. El orden de montaje es `config-provider` → `services-provider` → `router-provider` → `toast-provider` → `auth-provider` → `core-services-provider`. `core-services-provider` está scoped al dashboard.

`use-auth` gestiona sesión, acciones de autenticación y listeners de Firebase. Es el único caso de uso multiple. El resto de casos de uso son granulares y delegan su utilización a la capa de UI y/o a los hooks de la misma.

## Convenciones
- Nomenclatura en guiones para todos los archivos. El tipo de archivo forma parte del nombre, no una extensión semántica separada: `core-services-provider.ts`, no `core-services.provider.ts`.
- El código debe ser autoexplicativo. No se añaden comentarios de ningún tipo.
- Los casos de uso se llaman directamente, no se definen como interfaces ni se abstraen detrás de ports. La abstracción se logra por inyección de parámetros.
- Los hooks de la capa de aplicación (casos de uso) reciben dependencias como parámetros. No consumen providers directamente.