export const createThreadUseCase = async() =>{

    try {

        //Peticiones
        const resp = await fetch(`${import.meta.env.VITE_ASSISTANT_API}/create-thread`

        
    } catch (error) {
        Aqui va lo que sucede si no se puede crear el thread
    }



}
------------------------------------------------------------------------------------------------------
Aqui el endpoint que voy a conectar con el asistente.

Para el asistente se creo un nuevo modulo, y ese modulo se llama jarvis-assistant, entonces mi url cambia, y para ello creo una nueva variable de entorno

En const resp = await fetch(`${import.meta.env.VITE_ASSISTANT_API}/create-thread`}) el /create-thread, sale del endpoint creado en: nest-gpt/src/jarvis-assistant/jarvis-assistant.controller.ts

Esto es una peticion get:
nest-gpt/src/jarvis-assistant/jarvis-assistant.controller.ts

Esto es una peticion post:
const resp = await fetch(`${import.meta.env.VITE_ASSISTANT_API}/create-thread`,{
            method:'POST'
        })

Conb esto yo estaria esperando el id que devuelve el postman al hacer la peticion a:
localhost:3000/jarvis-assistant/create-thread

Esta es la respuesta del json:
{
    "id": "thread_UwoyJpCWkxGnAK1bmEofw0dS"
}
------------------------------------------------------------------------------------------------------
Esto:
export const createThreadUseCase = async() =>{

    try {
        
        const resp = await fetch(`${import.meta.env.VITE_ASSISTANT_API}/create-thread`,{
            method:'POST'
        })

        const { id } = await resp.json()


    } catch (error) {
        
    }

}

Especificamente en: const {id} = await resp.json()

Lo que hago es desestructurar algo que viene del await de la respuesta punto Json

Como nose el tipo de datos de la respuesta .json entonces le digo que el id es de dtipo string de la siguiente forma:

const { id } = await resp.json() as {id:string};

------------------------------------------------------------------------------------------------------

Por ahora se queda esto aqui y nos vamos a AssistantPage: src/presentation/pages/assintant/AssistantPage.tsx