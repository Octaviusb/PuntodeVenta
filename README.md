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
   PORT=7000
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

### 4. Inicio Rápido (Windows)

Para iniciar tanto el backend como el frontend con un solo comando, puedes usar el script `start-app.bat` incluido en la raíz del proyecto:

```
cd C:\Users\Octaviusb\Desktop\PuntoVenta
start-app.bat
```

Este script:
1. Termina cualquier proceso que esté usando los puertos necesarios
2. Inicia el servidor backend
3. Espera 5 segundos
4. Inicia el frontend

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

## Características Implementadas

### Seguridad

- **Autenticación JWT**: Protección de rutas con tokens JWT
- **Middleware de Seguridad**:
  - Helmet: Protección de cabeceras HTTP
  - Rate Limiting: Prevención de ataques de fuerza bruta
  - MongoDB Sanitize: Prevención de inyección NoSQL
  - Limitación de tamaño de body: Prevención de ataques DoS
- **CORS Configurado**: Restricción de orígenes permitidos
- **Claves Secretas Seguras**: Generación automática de claves aleatorias

- **Autenticación y Autorización**:
  - Login seguro con JWT
  - Protección de rutas según rol de usuario
  - Gestión de sesiones

- **Dashboard (Tablero Principal)**:
  - Resumen de ventas diarias y mensuales
  - Indicadores clave de rendimiento
  - Productos más vendidos
  - Actividad reciente

- **Ventas**:
  - Punto de Venta con interfaz rápida
  - Cálculo automático de vuelto
  - Emisión de voucher/comprobante
  - Historial de transacciones
  - Reportes por fecha

- **Productos e Inventario**:
  - Agregar, editar y eliminar productos
  - Control de stock en tiempo real
  - Categorización de productos
  - Unidades de medida personalizables

- **Caja**:
  - Apertura y cierre de caja
  - Registro de ingresos y egresos
  - Control de movimientos de efectivo
  - Reportes de caja diarios

- **Compras**:
  - Registro de compras a proveedores
  - Actualización automática del inventario
  - Historial de compras
  - Reportes de compras

- **Administración**:
  - Configuración de datos de la empresa
  - Personalización de logo para comprobantes
  - Gestión de clientes y proveedores

- **Seguridad**:
  - Administración de usuarios
  - Asignación de roles (admin, vendedor, inventario)
  - Registro de logs de acceso
  - Control de permisos por módulo

## Solución de Problemas

- **Error de conexión a MongoDB**: Verifica que el servicio de MongoDB esté activo y que la URI en el archivo `.env` sea correcta.

- **Error al iniciar el backend**: Asegúrate de tener todas las dependencias instaladas con `npm install`.

- **Error: Cannot find module 'bcryptjs'**: Si encuentras este error al ejecutar `npm run init-db`, instala las dependencias faltantes con:
  ```
  npm install bcryptjs jsonwebtoken express-validator
  ```

- **Error: Cannot find module 'helmet'**: Si encuentras este error al iniciar el backend, instala las dependencias de seguridad con:
  ```
  cd C:\Users\Octaviusb\Desktop\PuntoVenta
  install-security.bat
  ```

- **Error: listen EADDRINUSE: address already in use**: Este error indica que el puerto ya está en uso. Tienes dos opciones:

  1. Cambiar el puerto en el archivo `.env` a otro valor menos común:
     ```
     PORT=7000
     ```

  2. Ejecutar el script `kill-ports.bat` incluido en la raíz del proyecto para terminar los procesos que están usando los puertos 3000, 3001 y 7000:
     ```
     cd C:\Users\Octaviusb\Desktop\PuntoVenta
     kill-ports.bat
     ```

- **Error: Module not found: Error: Can't resolve './pages/Dashboard'**: Este error ocurre cuando faltan componentes en el frontend. Asegúrate de que todos los componentes referenciados en `App.js` existan o comenta las líneas que hacen referencia a componentes que aún no has creado.

- **Error: export 'Switch' was not found in 'react-router-dom'**: Este error ocurre porque estás usando una versión más reciente de react-router-dom que no incluye el componente Switch. Actualiza tu código para usar `Routes` en lugar de `Switch` y el atributo `element` en lugar de `component`.

- **Error al iniciar el frontend**: Verifica que la URL de la API en `services/api.js` apunte a la dirección correcta del backend.

- **Problemas de rendimiento o comportamiento extraño**: Prueba a limpiar la caché y los archivos temporales con:
  ```
  cd C:\Users\Octaviusb\Desktop\PuntoVenta
  clean-project.bat
  ```

## Desarrollo y Contribución

Este proyecto está en desarrollo activo. Para contribuir:

1. Haz un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Haz commit de tus cambios (`git commit -am 'Añadir nueva característica'`)
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crea un Pull Request

## Próximas Mejoras

- Implementación de sistema de facturación electrónica
- Integración con impresoras de tickets
- Aplicación móvil para vendedores
- Análisis avanzado de datos de ventas
- Gestión de proveedores y compras#   P u n t o V e n t a  
 