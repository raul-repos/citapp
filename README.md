# CITAPP
---
Citapp es una aplicación web que te ayuda a organizar tus reuniones.

Hecho con Next.js, puedes ver el proyecto en producción [aquí](https://citapp.raulcalvo.dev/)

## Como desplegar el proyecto en local:
Es necesario tener instalado lo siguiente en el ordenador para poder ejecutar de forma local la aplicación:
- Docker v26
- node v18
- npm v10

Probablemente funcione con otras versiones, pero no se ha comprobado.

En un sistema windows, es suficiente con abrir una terminal cmd o powershell y ejecutar el archivo `windows_setup.cmd`.
Para un sistema linux, o windows usando WSL, será necesario ejecutar el archivo `linux_setup.sh`

Al ejecutar dicho script se instalarán en local las dependencias necesarias para ejecutar la aplicación, se creará una base de datos en un contenedor Docker, ejecutando después la aplicación.

La aplicación se despliega en el puerto `3000`, y las credenciales para acceder a la aplicación son las siguientes:

| Usuario | Contraseña |
|---------|------------|
| usuarioPrueba | pass123 |
| usuarioPrueba2 | pass123 |
