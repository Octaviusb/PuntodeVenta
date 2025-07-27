@echo off
echo Limpiando archivos temporales y caché del proyecto...

echo.
echo Limpiando node_modules/.cache en el backend...
cd punto-de-venta\backend
rmdir /s /q node_modules\.cache 2>nul

echo.
echo Limpiando node_modules/.cache en el frontend...
cd ..\frontend
rmdir /s /q node_modules\.cache 2>nul

echo.
echo Eliminando archivos temporales...
del /s /q *.log 2>nul
del /s /q *.tmp 2>nul

echo.
echo Limpieza completada.
cd ..\..\
pause