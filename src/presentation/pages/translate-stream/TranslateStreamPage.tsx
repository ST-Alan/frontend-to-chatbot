import {  useRef, useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxSelect } from "../../components";
import { translateTexStreamUseCase } from "../../../core/use-cases";




interface Message{
  text:string;
  isGpt:boolean;
}

const languages = [
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "inglés", text: "Inglés" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
];

export const TranslateStreamPage = () => {

  const abortController = useRef(new AbortController())
  const isRunning = useRef(false)

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async(prompt:string, lang:string) =>{

    if(isRunning.current){
      abortController.current.abort()
      abortController.current = new AbortController()
    }


    setIsLoading(true)
    isRunning.current = true;
    const newMessage = `Traduce: "${ prompt }" al idioma ${ lang }`
    // Defino preview como los mensajes anteriores y tengo uno donde el texto es igual al texto y isGpt en False
    setMessages((prev)=> [...prev, {text:newMessage, isGpt:false}])

    //TODO Desde aca mandar a llamar el UseCase

    // await translateTexStreamUseCase( prompt,lang) //abortController.current.signal 
    // Ahora la constante reader va a hacer igual al await translateTexStreamUseCase( prompt,lang)
    // En esta linea const reader = al reader del src/core/use-cases/translateTextStream.use-case.ts porque retorna un reader
    const reader = await translateTexStreamUseCase( prompt,lang, abortController.current.signal) //abortController.current.signal 
    setIsLoading(false);

    if(!reader) return alert('No se pudo generar el reader')

    // TODO: Agregar el mensaje de isGPT en true su todo sale bien

    // Tan pronto se tiene el reader ya se puede quitar el setIsLoading porque ya vamos a tener informacion
    // Entonces aca se genera el ultimo mensaje
    // Aqui se hace el decoder que en un principio estaba en el .use-case
    const decoder = new TextDecoder();
    let message = '';
    setMessages((messages)=> [...messages, {text:message, isGpt:true}]);

    while(true){
      const {value, done} = await reader.read();
      //Si el mensaje esta listo, esta en done, entonces esta completo, hacemos el break
      if(done)break;
      //Caso contrario, tenemos un pedazo de texto por evalue, por lo que veo aca el decode

      const decodedChunk = decoder.decode(value,{stream:true});
      message += decodedChunk;

      setMessages((messages)=> {
        const newMessages = [...messages]
        newMessages[newMessages.length - 1 ].text = message
        return newMessages
      });

      isRunning.current = false;

    }



  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Mensaje de Bienvenida */}
          <GptMessage text={"¿Qué quieres que traduzca hoy?"} />

          {
            messages.map((message, index)=>(
              message.isGpt
              ? (
                <GptMessage key={index} text={message.text} />
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


    <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeHolder="Escribe aqui tu mensaje"
        disableCorrections options={languages}    />



    </div>
  )
}
