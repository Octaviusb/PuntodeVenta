@echo off
echo Instalando bibliotecas de UI y gráficos...

cd punto-de-venta\frontend

echo.
echo Instalando Material UI...
call npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

echo.
echo Instalando Chart.js y React-Chartjs-2...
call npm install chart.js react-chartjs-2

echo.
echo Instalando bibliotecas adicionales...
call npm install react-transition-group framer-motion

echo.
echo Instalación completada!
pause