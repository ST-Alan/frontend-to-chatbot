Se puede crear el saludo basado en la hora. Buen dia, buenas tardes, buenas noches.
--------------------------------------------------------------------------------------------------------------------------------
El thread lo voy a guardar en localStorage, pero seria ideal que este en mongo con todos los threads y que se puedan traer para que el asitente tenga toda la info respectiva

export const AssistantPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const [threadId, setThreadId] = useState<string>()

  // Obtener el threadId, y si no existe, crearlo.
//De momento lo voy a grabar en el local storage, pero deberia guardar un pbjeto con todos los threads y quizas tenerlo en una base de datos
useEffect(() => {
    const threadId = localStorage.getItem('threadId');

  if(threadId){
    setThreadId(threadId) // Si existe threadId lo almacenamos
    //return // Aqui no se puede hacer el return porque seria la funcion de limpieza el useEffect y eso no es lo que quiero ahora
  }else{
    createThreadUseCase() //Sino existe el thread crear unoi
    .then(id=>{ // si todo sale bien vamos a tener el id
      setThreadId(id); //Si tengo el id, se lo asigno al setThreadId del useEffect
      localStorage.setItem('threadId', id) // Y al local storage le configuro el threadId (de localStorage.getItem('threadId');) y el valor del id
    })
  }
}, [])

--------------------------------------------------------------------------------------------------------------------------------

Si recargo el navegardor muchas veces el threadId del localStorage no se eleimina, ni se modifica.

Si lo elimino manualmente y reacargo el crea otro threadId

--------------------------------------------------------------------------------------------------------------------------------
Para que se vea mas bonito el threadId lo voy a colocar como un mensaje en el chat. Esto de la siguiente forma:

useEffect(() => {
  if(threadId){
    setMessages((prev)=> [...prev,{text:`Número de thread ${threadId}`, isGpt: true}])
  }
}, [threadId])

Cada vez que el threadId cambie va a surgir efecto


----------------------------------------------------------------------------------------------------------------------------------------------------------------

Despues de crear el postQuestionUseCase, lo mando a llamar

  const handlePost = async(text:string) =>{
    setIsLoading(true)
    // Defino preview como los mensajes anteriores y tengo uno donde el texto es igual al texto y isGpt en False
    setMessages((prev)=> [...prev, {text:text, isGpt:false}])

    //TODO Desde aca mandar a llamar el UseCase
    await postQuestionUseCase(threadId, text)

    setIsLoading(false);

    // TODO: Agregar el mensaje de isGPT en true

  }

En este caso, desde src/core/use-cases/assistant/postQuestion.use-case.ts deberian venir: postQuestionUseCase = async(threadId:string, question:string)=>

Pero aqui el question cambia por el text

Por la misma razon que todos cambian a text

el threadId de postQuestionUseCase = async(threadId:string, question:string) en determinado lugar del tiempo puede ser nulo, por eso marca el error, entonces hago una validacion arriba, dentro del handlePost y queda asi:

if(!threadId) return


replies quiere decir respuestas. Lo que devuelve replies son las respuestas del asistente


Luego, podemos ver todo el archivo asi:


import { useEffect, useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from "../../components";
import { createThreadUseCase } from "../../../core/use-cases";
import { postQuestionUseCase } from "../../../core/use-cases/assistant/postQuestion.use-case";



interface Message{
  text:string;
  isGpt:boolean;
}


export const AssistantPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const [threadId, setThreadId] = useState<string>()

  // Obtener el threadId, y si no existe, crearlo.
//De momento lo voy a grabar en el local storage, pero deberia guardar un objeto con todos los threads y quizas tenerlo en una base de datos
useEffect(() => {
  const threadId = localStorage.getItem('threadId');

  if(threadId){
    setThreadId(threadId)
  } else{
    createThreadUseCase()
    .then(id=>{
      setThreadId(id);
      localStorage.setItem('threadId', id!)

    })
  }
}, [])

useEffect(() => {
  if(threadId){
    setMessages((prev)=> [...prev,{text:`Número de id de thread ${threadId}`, isGpt: true}])
  }
}, [threadId])




  const handlePost = async(text:string) =>{

    if(!threadId) return

    setIsLoading(true)
    // Defino preview como los mensajes anteriores y tengo uno donde el texto es igual al texto y isGpt en False
    setMessages((prev)=> [...prev, {text:text, isGpt:false}])

    //TODO Desde aca mandar a llamar el UseCase
    const replies = await postQuestionUseCase(threadId, text)

    setIsLoading(false);

    // TODO: Agregar el mensaje de isGPT en true

  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Mensaje de Bienvenida */}
          <GptMessage text={"Buen día, soy Jarvis. ¿En qué puedo ayudarte?"} />

          {
            messages.map((message, index)=>(
              message.isGpt
              ? (
                <GptMessage key={index} text={message.text}/>
              )
              : (
                <MyMessage key={index} text={message.text} />
              )
            ))
          }

{/* Aqui defino que si esta cargando me muestre el loading */}
          {
            isLoading &&(
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader />
              </div>
            )
          }

           


        </div>
      </div>


    <TextMessageBox
      onSendMessage={handlePost}
      placeHolder="Escribe aqui tu mensaje"
      disableCorrections
    />



    </div>
  )
}
--------------------------------------------------------------------------------------------------------------------------------
Se puede hacer de que si se le da un numero de orden llame a un endpoint
--------------------------------------------------------------------------------------------------------------------------------
En:

    for (const reply of replies) {
        for (const message of reply.content) {
            
        }
      
    }

    Puedo hacer filtros para mostrar el mensaje mas reciente, o los mensajes mas recientes.

    De momento voy a mostrar todos para tener el historial
--------------------------------------------------------------------------------------------------------------------------------
    for (const reply of replies) {
        for (const message of reply.content) {
            setMessages((prev)=>[
                ...prev,
                {text: message, isGpt:(reply.role === 'assistant')} // Esto significa que la respuesta es de openai
            ])
        }
      
    }