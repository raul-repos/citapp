:: script.cmd

@echo off
echo **********************************
echo ***** instalando dependencias ****
echo **********************************
npm install
echo **********************************
echo ****** creando base de datos *****
echo **********************************
echo.
echo ******** Docker Postgresql *******
docker run --name database --rm -p 5432:5432 -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres
timeout /T 10
echo ********** Poblando BBDD *********
npx prisma migrate dev
npm run db-seed
timeout /T 10
echo **********************************
echo ****** iniciando aplicacion ******
echo **********************************
npm run dev