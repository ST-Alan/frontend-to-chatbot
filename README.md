# FRONTEND CHATBOT

## PASOS PARA TENER EL FRONTEND

## Clonar el Repositorio

Para clonar este repositorio, sigue estos pasos:

1. Abre una terminal.
2. Navega hasta el directorio donde quieres clonar el repositorio.
3. Ejecuta el siguiente comando:

   ```bash
   git clone https://github.com/ST-Alan/frontend-to-chatbot.git
   ```

# Modificar Puntos de conexión con el backend:

Crear un archivo .env
Donde va a tener estas variables:

VITE_GPT_API=https://9wpykorpvl.execute-api.us-east-2.amazonaws.com/production/new-film/
VITE_GPT_API_SWAPI=https://9wpykorpvl.execute-api.us-east-2.amazonaws.com/production/swapi/

En esas dos variables va a cambiar la url base que es la que le genere AWS en su entorno: https://zcbf74uea1.execute-api.us-east-2.amazonaws.com/production/

Si desea puede dejar la mía y el chatbot funciona correctamente, pero si coloca la que genere mi reto de backend al hacer serverless deploy también va a funcionar correctamente



## Instatalar los paquetes
   ```bash
   yarn
   ```

## Configurar .env

En el archivo .env.template está el ejemplo de como se van a configurar. Básicamente colocar las url del servidor


## Ejecutar

Para verlo en local:

   ```bash
   yarn dev
   ```

