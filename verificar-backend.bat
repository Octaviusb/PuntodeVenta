@echo off
echo Verificando backend...
curl -v http://localhost:7000/api/test
pause