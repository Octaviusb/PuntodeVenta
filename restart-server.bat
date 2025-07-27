@echo off
echo Reiniciando el servidor y limpiando la cache...

echo Terminando procesos que puedan estar usando los puertos necesarios...
call kill-ports.bat

echo.
echo Limpiando cache de node_modules...
cd punto-de-venta\backend
rmdir /s /q node_modules\.cache 2>nul
cd ..\..\

echo.
echo Iniciando el servidor backend...
start cmd /k "cd punto-de-venta\backend && npm run dev"

echo.
echo Esperando 5 segundos para que el backend inicie...
timeout /t 5 /nobreak > nul

echo.
echo Iniciando el frontend...
start cmd /k "cd punto-de-venta\frontend && npm start"

echo.
echo Sistema reiniciado! Abre tu navegador en http://localhost:3000
echo.