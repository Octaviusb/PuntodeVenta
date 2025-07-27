@echo off
echo Iniciando Sistema de Punto de Venta (Modo Rapido)...

echo.
echo Terminando procesos existentes...
taskkill /F /IM node.exe /T 2>nul

echo.
echo Configurando puerto fijo (3001) para el backend...
echo PORT=3001 > punto-de-venta\backend\.env
echo MONGODB_URI=mongodb://localhost:27017/punto_venta >> punto-de-venta\backend\.env
echo JWT_SECRET=puntoventa_secret_key_2023 >> punto-de-venta\backend\.env
echo NODE_ENV=development >> punto-de-venta\backend\.env

echo.
echo Actualizando configuracion del frontend...
echo // Configuracion fija > punto-de-venta\frontend\src\utils\portReader.js
echo const getBackendPort = () => { >> punto-de-venta\frontend\src\utils\portReader.js
echo   return '3001'; >> punto-de-venta\frontend\src\utils\portReader.js
echo }; >> punto-de-venta\frontend\src\utils\portReader.js
echo export default getBackendPort; >> punto-de-venta\frontend\src\utils\portReader.js

echo.
echo Iniciando backend (puerto 3001)...
start cmd /k "cd punto-de-venta\backend && npm run dev"

echo.
echo Esperando 5 segundos para que el backend inicie...
timeout /t 5 /nobreak > nul

echo.
echo Iniciando frontend...
start cmd /k "cd punto-de-venta\frontend && npm start"

echo.
echo Sistema iniciado con configuracion fija!
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.