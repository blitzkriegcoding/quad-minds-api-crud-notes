This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Antes que nada
Instalar el servidor `json-server` de manera global para que esté disponible y puedan realizarse pruebas.

`npm i -g json-server` + enter

además dentro de la carpeta del proyecto existe un archivo llamado `data_generator.js` que puede ser ejecutado de la siguiente manera:

`node data_generator.js` + enter

Lo cual generará una pequeña base datos de 1000 registros para hacer pruebas.

## Datos de prueba
Dado a que hay problemas con el CORS de la API disponibilizada por Swagger, he utilizado `json-server`, el cual hay que ejecutarlo de la siguiente manera:

`json-server --watch db.json -p 4001` + enter

## Aviso
Antes de inicializar las pruebasm, es necesaria la instalación de los paquetes utilizados:

`npm install` + enter


## Ejecución del Frontend

El el directorio del proyecto, ejecute:

`npm start` + enter

Ejecuta la aplicación en modo desarrollo.<br>
Abrir [http://localhost:3000](http://localhost:3000) para verlo en el navegador
