@echo off
echo Buscando un puerto disponible...

set BASE_PORT=7000
set MAX_PORT=7100
set PORT=%BASE_PORT%

:LOOP
netstat -ano | findstr :%PORT% | findstr LISTENING > nul
if %ERRORLEVEL% EQU 0 (
  echo Puerto %PORT% está en uso, probando el siguiente...
  set /a PORT+=1
  if %PORT% GTR %MAX_PORT% (
    echo No se encontró ningún puerto disponible entre %BASE_PORT% y %MAX_PORT%.
    set PORT=%BASE_PORT%
    goto :END
  )
  goto :LOOP
) else (
  echo Puerto disponible encontrado: %PORT%
)

:END
echo %PORT% > punto-de-venta\backend\available_port.txt
echo Puerto guardado en punto-de-venta\backend\available_port.txt

echo.
echo Actualizando archivo .env...
echo PORT=%PORT% > punto-de-venta\backend\.env
echo MONGODB_URI=mongodb://localhost:27017/punto_venta >> punto-de-venta\backend\.env
echo JWT_SECRET=puntoventa_secret_key_2023 >> punto-de-venta\backend\.env
echo NODE_ENV=development >> punto-de-venta\backend\.env

echo Archivo .env actualizado con el puerto %PORT%.
echo.