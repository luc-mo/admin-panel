# Serena — Reglas de búsqueda de código
SIEMPRE sigue estas reglas sin excepción al consultar código:

## Reglas obligatorias
- NUNCA busques código sin antes activar el proyecto Serena
- SIEMPRE usa find_symbol como primera herramienta para buscar clases, funciones, tipos e interfaces
- SIEMPRE usa find_referencing_symbols para encontrar usos de un símbolo
- SOLO usa search_for_pattern si find_symbol no devuelve resultados
- NUNCA concluyas que un símbolo no existe sin haber ejecutado find_symbol Y search_for_pattern
- Si find_symbol falla, intenta variaciones del nombre: camelCase, PascalCase, sin prefijos

## Convenciones del proyecto
- Los archivos SIEMPRE usan kebab-case (ej: user-repository.ts, auth-service.ts)
- NUNCA existen archivos con puntos en el nombre salvo la extensión
- Al construir patrones de búsqueda, usa SIEMPRE kebab-case