@echo off
echo ===== Iniciando Backend del Sistema de Punto de Venta =====

REM Terminar procesos que puedan estar usando el puerto 7000
echo Liberando puerto 7000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":7000"') do (
    taskkill /F /PID %%a 2>nul
)
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
npm run dev

echo.
echo ===== Backend iniciado =====
echo Backend: http://localhost:7000
echo.
pause