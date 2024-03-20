Este es el archivo donde vamos a hacer las consultas al asistente


Vamos a ver cuales son los argumentos necesarios para tener en consideracion aqui

export const postQuestionUseCase = async()=>{
}

Para ello vamos al postman y vemos en localhost:3000/jarvis-assistant/user-question

Que es lo que necesitamos enviarles. En este caso es: "threadId" y "question"

Entonces esos dos siempre los vamos a necesitar de tipo string. De esta forma se identifican los parametros

La peticion POST quedaria asi:
        const resp = await fetch(`${import.meta.env.VITE_ASSISTANT_API}/user-question`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({threadId,question})
        });

--------------------------------------------------------------------------------------------------------------------------------------------
Luego vamos a postman

hacemos una peticion en localhost:3000/jarvis-assistant/user-question

Copiamos la respuesta

Lo se crea una interfaz llamada assistant.response.ts se le da a control + shift + p y se selecciona en "Paste JSON as Code"

y se manda esa interfaz al archivo de barril, luego se importa y se coloca esa interfaz dentro de replies. Queda asi:

Asi queda de momento todo el archivo:
import { QuestionResponse } from "../../../interfaces";

export const postQuestionUseCase = async(threadId:string, question:string)=>{

    try {
        
        const resp = await fetch(`${import.meta.env.VITE_ASSISTANT_API}/user-question`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({threadId,question})
        });

        console.log(resp);

        const replies = await resp.json() as QuestionResponse[]


    } catch (error) {
        console.log(error)
        throw new Error(' Error posting question -|- src/core/use-cases/assistant/postQuestion.use-case.ts')
    }
}


El QuestionResponse es un arreglo porque en la respuesta del postman lo vemos asi:

[
    {
        "role": "user",
        "content": [
            "Esta es una preuba de mensaje"
        ]
    },
    {
        "role": "user",
        "content": [
            "Esta es una prueba de mensaje"
        ]
    },
    {
        "role": "assistant",
        "content": [
            "¡Hola! Bienvenido a Alexim Express. ¿Cómo puedo asistirte hoy? ¿Cuál es tu nombre?"
        ]
    },
    {
        "role": "user",
        "content": [
            "Esta es una prueba de mensaje"
        ]
    },
    {
        "role": "assistant",
        "content": [
            "¡Hola de nuevo! ¿En qué puedo ayudarte hoy? ¿Hay algo específico sobre el servicio de Alexim Express que quisieras saber?"
        ]
    },
    {
        "role": "user",
        "content": [
            "Esta es una prueba de mensaje"
        ]
    },
    {
        "role": "assistant",
        "content": [
            "Parece que estamos teniendo un problema con los mensajes duplicados. No te preocupes, estoy aquí para ayudarte. ¿Hay algo en específico con lo que necesites asistencia respecto a Alexim Express?"
        ]
    },
    {
        "role": "user",
        "content": [
            "Esta es una prueba de mensaje"
        ]
    },
    {
        "role": "assistant",
        "content": [
            "Parece que seguimos teniendo un problema con los mensajes duplicados. No obstante, estoy aquí para asistirte en lo que necesites. Si tienes alguna pregunta o necesitas información sobre cómo usar Alexim Express, no dudes en decirme."
        ]
    },
    {
        "role": "user",
        "content": [
            "Esta es una prueba de mensaje"
        ]
    },
    {
        "role": "assistant",
        "content": [
            "Parece que seguimos teniendo un problema con los mensajes duplicados. No obstante, estoy aquí para asistirte en lo que necesites. Si tienes alguna pregunta específica o necesitas ayuda con algo en particular relacionado con Alexim Express, por favor hazmelo saber."
        ]
    },
    {
        "role": "user",
        "content": [
            "Esta es una prueba de mensaje"
        ]
    },
    {
        "role": "assistant",
        "content": [
            "Entiendo que quizás estés experimentando problemas técnicos. Sin embargo, estoy aquí para ayudarte en lo que necesites. Si tienes alguna pregunta sobre cómo utilizar Alexim Express o cualquier otra consulta, no dudes en hacérmelo saber. Estoy aquí para asistirte."
        ]
    },
    {
        "role": "user",
        "content": [
            "Necesito saber si funciona esta prueba de mensaje"
        ]
    },
    {
        "role": "assistant",
        "content": [
            "¡Sí, tu mensaje ha llegado correctamente! ¿En qué puedo asistirte hoy en relación a Alexim Express? ¿Tienes alguna pregunta en específico o necesitas ayuda con alguna funcionalidad de nuestra página?"
        ]
    },
    {
        "role": "user",
        "content": [
            "Me llamo Alan, quisiera saber algun correo de contacto con ustedes"
        ]
    },
    {
        "role": "assistant",
        "content": [
            "Hola Alan, es un placer ayudarte. Si necesitas contactar con nosotros, puedes escribir a Alan Fermin a través del correo electrónico alan.fermin@alexim.com. También estamos disponibles en el teléfono de asistencia +1.800.123.3212 si prefieres llamar. ¿Hay algo más en que pueda ayudarte?"
        ]
    },
    {
        "role": "user",
        "content": [
            "Me llamo Alan, quisiera saber algun contacto directo con ustedes"
        ]
    },
    {
        "role": "assistant",
        "content": [
            "Hola Alan, claro, puedes contactarnos directamente a través del correo electrónico alan.fermin@alexim.com o si prefieres, puedes llamarnos al teléfono de asistencia +1.800.123.3212. Estamos aquí para cualquier otra consulta o asistencia que necesites. ¿Te puedo ayudar en algo más?"
        ]
    }
]




TODO ESTA METIDO DENTRO DE UN ARREGLO. Por eso QuestionResponse queda asi QuestionResponse[] 

Son arreglos de mensajes


--------------------------------------------------------------------------------------------------------------------------------------------
El codigo queda asi:
import { QuestionResponse } from "../../../interfaces";

export const postQuestionUseCase = async(threadId:string, question:string)=>{

    try {
        
        const resp = await fetch(`${import.meta.env.VITE_ASSISTANT_API}/user-question`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({threadId,question})
        });

        
        const replies = await resp.json() as QuestionResponse[]
        console.log(replies);

        return replies


    } catch (error) {
        console.log(error)
        throw new Error(' Error posting question -|- src/core/use-cases/assistant/postQuestion.use-case.ts')
    }
}
Explicacion:

se elimino el console.log(resp); que estaba antes del const replies = await resp.json() as QuestionResponse[] y que se ejecutaba antes del ReadableStream

Para colocar un console.log(replies); despues del ReadableStream.

Queda asi:

console.log(replies);

De aqui nos vamos a AssistanPage.tsx