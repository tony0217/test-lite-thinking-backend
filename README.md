<p align="center" style="background-color:'black'">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>

   <a href="https://litethinking.com/home" target="blank"><img src="https://litethinking.com/static/media/Logo_Lite_Thinking_Sin_Fondo.0aa257fac8571af0f71e.png" width="200" alt="lite Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
yarn install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Clonar el archivo ```.env.template``` y renombar la copia a ```
.env```

5. Llenar las variables de entorno definidas en el ```.env```

6. Ejecutar la aplicación en dev:
```
yarn start:dev
```

7. Reconstruir la base de datos con la semilla
```
url/api/v1/seed
```

## Stack usado
* MongoDB
* Nest

# Production Build
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de prod


# Notas
aws redeploy sin cambios:
```
comandos
```
