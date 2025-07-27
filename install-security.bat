@echo off
echo Instalando dependencias de seguridad para el backend...

cd punto-de-venta\backend
npm install helmet express-rate-limit express-mongo-sanitize --save

echo.
echo Dependencias de seguridad instaladas correctamente.
echo.
echo Reiniciando el servidor...
cd ..\..\
call restart-server.bat