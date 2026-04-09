# Instrucciones para búsqueda de código

Cuando busques código en este proyecto:
1. Siempre activa el proyecto Serena antes de buscar
2. Usa find_symbol para buscar clases, funciones, tipos e interfaces
3. Usa find_referencing_symbols para encontrar usos de un símbolo
4. Usa search_for_pattern solo como último recurso si find_symbol no encuentra nada
5. Si no encuentras un símbolo, intenta variaciones del nombre (camelCase, PascalCase)
6. Nunca concluyas que algo no existe sin haber intentado al menos find_symbol y search_for_pattern

## Convenciones del proyecto

- Los archivos siempre usan kebab-case separado por guiones (ej: user-repository.ts, auth-service.ts)
- No existen archivos con puntos en el nombre salvo la extensión (ej: nunca user.repository.ts)
- Al buscar un archivo por nombre, usa siempre el patrón kebab-case