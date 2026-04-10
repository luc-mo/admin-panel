# Serena MCP — Guía de instalación

Serena es un servidor MCP que provee navegación simbólica de código via Language Server Protocol (LSP). Permite al agente buscar clases, funciones, tipos y referencias directamente sin leer archivos uno por uno, reduciendo el uso de tokens y mejorando la precisión en codebases grandes.

## Prerequisitos

- Python 3.13
- Node.js

## Instalación

### 1. Instalar uv
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### 2. Recargar la terminal
```bash
source ~/.zshrc   # zsh
source ~/.bashrc  # bash
```

### 3. Instalar Serena
```bash
uv tool install --python 3.13 git+https://github.com/oraios/serena
```

## Actualización
```bash
uv tool upgrade serena
```

## Configuración

### 1. Añadir a archivo de MCPs
Agrega el siguiente bloque a tu archivo `.vscode/mcp.json`:
```json
{
  "servers": {
    "serena": {
      "type": "stdio",
      "command": "/Users/<TU_USUARIO>/.local/bin/serena",
      "args": [
        "start-mcp-server",
        "--context", "ide",
        "--project", "${workspaceFolder}",
        "--enable-web-dashboard", "false" // Opcional: habilitar dashboard web para monitoreo
      ]
    }
  }
}
```

### Crear proyecto en Serena
```bash
cd /ruta/del/proyecto
serena project create --language typescript
```

## Uso

### Indexar el proyecto
```bash
cd /ruta/del/proyecto
serena project index
```

### Iniciar el servidor MCP
El MCP server se iniciará automaticamente en VS Code gracias al archivo `.vscode/mcp.json`.

```bash
serena start-mcp-server
```