@echo off
echo ===== Verificando Backend del Sistema de Punto de Venta =====

REM Verificar si el puerto 7000 está en uso
echo Verificando si el puerto 7000 está en uso...
netstat -ano | findstr ":7000" >nul
if %errorlevel% equ 0 (
    echo [OK] El puerto 7000 está en uso. El backend podría estar en ejecución.
) else (
    echo [ERROR] El puerto 7000 no está en uso. El backend no está en ejecución.
)

REM Verificar si MongoDB está en ejecución
echo Verificando MongoDB...
netstat -ano | findstr ":27017" >nul
if %errorlevel% equ 0 (
    echo [OK] MongoDB está en ejecución en el puerto 27017.
) else (
    echo [ERROR] MongoDB no está en ejecución en el puerto 27017.
    echo Para iniciar MongoDB: Servicios (services.msc) ^> MongoDB ^> Iniciar
)

REM Intentar hacer una solicitud al endpoint de prueba
echo Intentando conectar con el backend...
curl -s -o nul -w "%%{http_code}" http://localhost:7000/api/test >temp.txt
set /p status=<temp.txt
del temp.txt

if "%status%"=="200" (
    echo [OK] Conexión exitosa al backend (código 200).
) else (
    echo [ERROR] No se pudo conectar al backend. Código de respuesta: %status%
)

echo.
echo ===== Verificación completada =====
echo.
echo Presione cualquier tecla para iniciar el backend...
pause >nul

REM Iniciar el backend
cd /d %~dp0punto-de-venta\backend
start cmd /k "npm run dev"

echo Backend iniciado. Espere unos segundos antes de intentar acceder al frontend.
timeout /t 5 /nobreak >nul