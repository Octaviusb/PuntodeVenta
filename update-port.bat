@echo off
echo Actualizando el puerto del backend en el frontend...

set PORT_FILE=punto-de-venta\backend\available_port.txt

if exist %PORT_FILE% (
    set /p PORT=<%PORT_FILE%
    echo Puerto detectado: %PORT%
    
    echo Guardando puerto en localStorage...
    echo const script = document.createElement('script'); > temp.html
    echo script.innerHTML = "localStorage.setItem('backendPort', '%PORT%');"; >> temp.html
    echo document.head.appendChild(script); >> temp.html
    
    start "" temp.html
    timeout /t 2 > nul
    del temp.html
    
    echo Puerto actualizado correctamente.
) else (
    echo Archivo de puerto no encontrado. Usando puerto por defecto (7000).
)

echo.