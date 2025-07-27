@echo off
echo ===== Iniciando Sistema de Punto de Venta =====

REM Terminar procesos que puedan estar usando los puertos necesarios
echo Liberando puertos...
taskkill /F /IM node.exe /T 2>nul
timeout /t 2 /nobreak >nul

REM Verificar si MongoDB está en ejecución
echo Verificando MongoDB...
netstat -ano | findstr ":27017" >nul
if %errorlevel% neq 0 (
    echo ADVERTENCIA: MongoDB no parece estar en ejecución.
    echo Por favor, inicie MongoDB antes de continuar.
    echo Para iniciar MongoDB: Servicios (services.msc) ^> MongoDB ^> Iniciar
    pause
)

REM Iniciar el backend
echo Iniciando el servidor backend en el puerto 7000...
cd /d %~dp0punto-de-venta\backend
start cmd /k "npm run dev"

REM Esperar a que el backend esté listo
echo Esperando a que el backend esté listo...
timeout /t 5 /nobreak >nul

REM Iniciar el frontend
echo Iniciando el frontend en el puerto 3000...
cd /d %~dp0punto-de-venta\frontend
start cmd /k "npm start"

echo.
echo ===== Sistema iniciado =====
echo Backend: http://localhost:7000
echo Frontend: http://localhost:3000
echo.
echo Presione cualquier tecla para cerrar esta ventana.
pause >nul