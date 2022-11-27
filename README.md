# Tutorial de como empezar una API con NodeJS y Express (usando TS)

## 1. Instala TypeScript

```bash
npm install typescript -D
```

### Comenarios
* `npm install` es para instalar dependencias
* `-D` es para instalar dependencias de desarrollo

## 2. Crea un archivo tsconfig.json

### 2.1 Primero añade al package.json un script de compilación
```json
  "scripts": {
    "tsc": "tsc",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

### 2.1 Después crea el archivo tsconfig.json corriendo el comando
```bash
npm run tsc -- --init
```

#### Comentarios
* El -- --init es para que llegue el parametro a tsc
