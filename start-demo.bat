@echo off
echo Iniciando Demo del Sistema de Punto de Venta...

echo.
echo Paso 1: Limpiando procesos y caché...
call kill-ports.bat
call clean-project.bat

echo.
echo Paso 2: Creando usuario administrador...
cd punto-de-venta\backend
call npm run create-admin
cd ..\..

echo.
echo Paso 3: Iniciando el sistema...
call start-app.bat

echo.
echo Demo iniciada! Credenciales de acceso:
echo Usuario: admin@admin.com
echo Contraseña: admin123
echo.