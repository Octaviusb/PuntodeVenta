@echo off
echo ===================================================
echo    Configuracion y Ejecucion del Sistema de Punto de Venta
echo ===================================================

echo.
echo [1/5] Terminando procesos existentes...
taskkill /F /IM node.exe /T 2>nul

echo.
echo [2/5] Instalando dependencias del frontend...
cd punto-de-venta\frontend
call npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
call npm install chart.js react-chartjs-2
call npm install react-transition-group framer-motion

echo.
echo [3/5] Configurando puerto fijo (3001) para el backend...
cd ..\backend
echo PORT=3001 > .env
echo MONGODB_URI=mongodb://localhost:27017/punto_venta >> .env
echo JWT_SECRET=puntoventa_secret_key_2023 >> .env
echo NODE_ENV=development >> .env

echo.
echo [4/5] Iniciando backend (puerto 3001)...
start cmd /k "cd C:\Users\Octaviusb\Desktop\PuntoVenta\punto-de-venta\backend && npm run dev"

echo.
echo [5/5] Iniciando frontend...
start cmd /k "cd C:\Users\Octaviusb\Desktop\PuntoVenta\punto-de-venta\frontend && npm start"

echo.
echo ===================================================
echo    Sistema iniciado con interfaz mejorada!
echo    Backend: http://localhost:3001
echo    Frontend: http://localhost:3000
echo ===================================================
echo.
echo Credenciales de acceso:
echo Usuario: admin@admin.com
echo Contraseña: admin123
echo.
pause