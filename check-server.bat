@echo off
echo Verificando el estado del servidor...

echo.
echo Verificando puerto 9000...
netstat -ano | findstr :9000 | findstr LISTENING
if %ERRORLEVEL% EQU 0 (
    echo El servidor backend está en ejecución en el puerto 9000.
) else (
    echo El servidor backend NO está en ejecución en el puerto 9000.
)

echo.
echo Verificando puerto 3000...
netstat -ano | findstr :3000 | findstr LISTENING
if %ERRORLEVEL% EQU 0 (
    echo El servidor frontend está en ejecución en el puerto 3000.
) else (
    echo El servidor frontend NO está en ejecución en el puerto 3000.
)

echo.
echo Verificando puerto 3002...
netstat -ano | findstr :3002 | findstr LISTENING
if %ERRORLEVEL% EQU 0 (
    echo El servidor frontend está en ejecución en el puerto 3002.
) else (
    echo El servidor frontend NO está en ejecución en el puerto 3002.
)

echo.
echo Verificación completada.
pause