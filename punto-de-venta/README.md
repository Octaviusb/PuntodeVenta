# Sistema de Punto de Venta

Este proyecto es un sistema de punto de venta diseñado para pequeñas y medianas empresas, con funcionalidades de gestión de inventario, ventas y usuarios.

## Estructura del Proyecto

- **frontend**: Interfaz de usuario desarrollada con React + Vite
- **punto-de-venta/frontend**: Interfaz de usuario principal con React y Material UI
- **punto-de-venta/backend**: API REST desarrollada con Node.js, Express y MongoDB
- **punto-de-venta/python-api**: API alternativa desarrollada con Python y Flask (opcional)

## Requisitos

- Node.js 14.x o superior
- MongoDB 4.x o superior
- Python 3.8 o superior (opcional, solo para la API de Python)

## Guía de Instalación y Configuración

### 1. Configuración de MongoDB

1. Instala MongoDB en tu sistema siguiendo las instrucciones oficiales:
   - [Instalación de MongoDB](https://docs.mongodb.com/manual/installation/)

2. Inicia el servicio de MongoDB:
   - En Windows: Inicia el servicio "MongoDB" desde Servicios
   - En Linux: `sudo systemctl start mongod`
   - En macOS: `brew services start mongodb-community`

### 2. Configuración del Backend (Node.js)

1. Navega al directorio del backend:
   ```
   cd punto-de-venta/backend
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Verifica que el archivo `.env` tenga la siguiente configuración:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/punto_venta
   NODE_ENV=development
   JWT_SECRET=puntoventa_secret_key_2023
   ```

4. Inicializa la base de datos con un usuario administrador:
   ```
   npm run init-db
   ```

5. Inicia el servidor:
   ```
   npm run dev
   ```

### 3. Configuración del Frontend (React)

1. Navega al directorio del frontend:
   ```
   cd punto-de-venta/frontend
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```
   npm start
   ```

4. Abre tu navegador en `http://localhost:3000`

## Solución de Problemas Comunes

### Error: Could not find a required file. Name: index.html

Si encuentras este error al iniciar el frontend, asegúrate de que exista el archivo `index.html` en la carpeta `public`. Si no existe, créalo con el siguiente contenido:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Sistema de Punto de Venta para pequeñas y medianas empresas"
    />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Punto de Venta</title>
  </head>
  <body>
    <noscript>Necesitas habilitar JavaScript para ejecutar esta aplicación.</noscript>
    <div id="root"></div>
  </body>
</html>
```

También necesitarás crear un archivo `manifest.json` en la misma carpeta:

```json
{
  "short_name": "Punto de Venta",
  "name": "Sistema de Punto de Venta",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

### Error de conexión a MongoDB

Verifica que el servicio de MongoDB esté activo y que la URI en el archivo `.env` sea correcta.

### Error al iniciar el backend

Asegúrate de tener todas las dependencias instaladas con `npm install`.

### Error al iniciar el frontend

Verifica que la URL de la API en `services/api.js` apunte a la dirección correcta del backend.

## Uso del Sistema

1. Accede a la aplicación web en `http://localhost:3000`

2. Inicia sesión con las credenciales predeterminadas:
   - Usuario: admin@example.com
   - Contraseña: admin123

3. Explora las diferentes secciones del sistema:
   - **Dashboard**: Muestra un resumen de ventas y estado del inventario
   - **Ventas**: Gestiona las transacciones de venta
   - **Inventario**: Administra los productos disponibles
   - **Usuarios**: Gestiona los usuarios del sistema (solo administradores)