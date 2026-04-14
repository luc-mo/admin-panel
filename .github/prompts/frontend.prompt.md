# Frontend
## Arquitectura

Capas: `domain`, `application`, `infrastructure`, `ui`.

- `domain` contiene únicamente tipos de objetos de dominio relacionados con el frontend.
- `application` contiene hooks de casos de uso granulares que reciben dependencias como parámetros y retornan `execute`, `data`, `loadings`, etc.
- `infrastructure` contiene configuración, singletons de servicios y factorías de clientes API por entidad.
- `ui` contiene providers, pages, layouts, componentes y router.

## Servicios
Los servicios externos y utilitarios se registran como singletons o factorías en `infrastructure`.

Los servicios de la API propia de la app se ubican en `infrastructure/services/api`. Son clases que reciben una instancia del servicio HTTP como dependencia, y se instancian en `core-services-provider`.

Cada servicio core se organiza en una carpeta con el formato `[nombre]-service`, que contiene `index.ts` con la implementación y `types.d.ts` con los tipos de la request y la response de cada llamado.

La estructura del tipado es la siguiente (ejemplo para request de usuario):
```ts
export interface IFindUsers {
  request: {
    limit: number
    offset: number
  }
  response: {
		data: IJsonUser[]
		limit: number
		offset: number
		total: number
  }
}
```

## Providers
Los providers actúan como contenedor de inyección dependencias reactivo. Se crean con `createProvider`, se consumen llamando con el hook `useProviders`, y se montan en el árbol de componentes con `withProviders`.

### Orden de montaje
Los providers se montan en orden de dependencia. Los primeros cuatro son core y están disponibles en toda la aplicación, `auth-provider` es requerido por los casos de uso que dependen de sesión y `core-services-provider` está scoped al componente Dashboard y depende de `auth-provider` ya que instancia los servicios que requieren autenticación.

```
config-provider
services-provider
router-provider
toast-provider
auth-provider
core-services-provider
```

## Casos de uso
Los casos de uso no se abstraen detrás de ports ni se definen como interfaces. La abstracción se logra por inyección de parámetros. Cuando un caso de uso requiere acceso a providers, los consume mediante el hook `useProviders`. Los providers se utilizan principalmente en los hooks de UI, que forman parte de cada page.

## Convenciones
### Nombre de archivos
- Nomenclatura en guiones para todos los archivos.
- El tipo de archivo forma parte del nombre, no una extensión semántica separada (ej: `core-services-provider.ts`, no `core-services.provider.ts`).

### Nombre de funciones y variables
- El nombre de las funciones de los componentes es en PascalCase.
- El nombre de los componentes de tipo page es simple y autodescriptivo (ej: `Login`, `Users`, `Roles`, etc).
- El nombre de las funciones de los hooks es en camelCase.
- El nombre de las variables y propiedades de objetos es en camelCase.
- El nombre de las clases de los servicios core es en PascalCase y termina con "Service" (ej: `UserService`, `RoleService`, etc).

### Estilo de código
- El código debe ser autoexplicativo. No se añaden comentarios de ningún tipo.