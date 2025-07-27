@echo off
echo Buscando procesos que usan los puertos 3000, 3001, 5000, 7000, 8080 y 9000...

FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') DO (
  echo Terminando proceso en puerto 3000 (PID: %%P)
  taskkill /F /PID %%P
)

FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :3001 ^| findstr LISTENING') DO (
  echo Terminando proceso en puerto 3001 (PID: %%P)
  taskkill /F /PID %%P
)

FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') DO (
  echo Terminando proceso en puerto 5000 (PID: %%P)
  taskkill /F /PID %%P
)

FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :7000 ^| findstr LISTENING') DO (
  echo Terminando proceso en puerto 7000 (PID: %%P)
  taskkill /F /PID %%P
)

FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :8080 ^| findstr LISTENING') DO (
  echo Terminando proceso en puerto 8080 (PID: %%P)
  taskkill /F /PID %%P
)

FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :9000 ^| findstr LISTENING') DO (
  echo Terminando proceso en puerto 9000 (PID: %%P)
  taskkill /F /PID %%P
)

echo Puertos liberados. Ahora puedes iniciar el servidor.
pause