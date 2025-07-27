@echo off
echo ===== Diagnostico del Sistema de Punto de Venta =====
echo.

REM Verificar MongoDB
echo Verificando MongoDB...
netstat -ano | findstr ":27017" >nul
if %errorlevel% equ 0 (
    echo [OK] MongoDB esta en ejecucion en el puerto 27017.
) else (
    echo [ERROR] MongoDB no esta en ejecucion.
    echo Para iniciar MongoDB: Servicios (services.msc) ^> MongoDB ^> Iniciar
)

REM Verificar backend
echo.
echo Verificando backend...
netstat -ano | findstr ":7000" >nul
if %errorlevel% equ 0 (
    echo [OK] El backend parece estar en ejecucion en el puerto 7000.
) else (
    echo [ERROR] El backend no esta en ejecucion en el puerto 7000.
)

REM Verificar frontend
echo.
echo Verificando frontend...
netstat -ano | findstr ":3000" >nul
if %errorlevel% equ 0 (
    echo [OK] El frontend parece estar en ejecucion en el puerto 3000.
) else (
    echo [ERROR] El frontend no esta en ejecucion en el puerto 3000.
)

REM Verificar configuracion
echo.
echo Verificando configuracion...
if exist "%~dp0punto-de-venta\backend\.env" (
    echo [OK] Archivo .env del backend encontrado.
    type "%~dp0punto-de-venta\backend\.env" | findstr "PORT=7000" >nul
    if %errorlevel% equ 0 (
        echo [OK] Puerto configurado correctamente en .env (7000).
    ) else (
        echo [ERROR] Puerto no configurado correctamente en .env.
    )
) else (
    echo [ERROR] Archivo .env del backend no encontrado.
)

if exist "%~dp0punto-de-venta\frontend\src\config.js" (
    echo [OK] Archivo config.js del frontend encontrado.
    type "%~dp0punto-de-venta\frontend\src\config.js" | findstr "apiUrl: 'http://localhost:7000/api'" >nul
    if %errorlevel% equ 0 (
        echo [OK] URL de API configurada correctamente en config.js.
    ) else (
        echo [ERROR] URL de API no configurada correctamente en config.js.
    )
) else (
    echo [ERROR] Archivo config.js del frontend no encontrado.
)

echo.
echo ===== Acciones recomendadas =====
echo.
echo 1. Asegurese de que MongoDB este en ejecucion
echo 2. Ejecute el script start-backend.bat para iniciar el backend
echo 3. Una vez que el backend este funcionando, inicie el frontend
echo.
echo ===== Fin del diagnostico =====

pause