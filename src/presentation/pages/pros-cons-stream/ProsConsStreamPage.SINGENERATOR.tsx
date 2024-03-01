import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from "../../components";
import { prosConsStreamUseCase } from "../../../core/use-cases";




interface Message{
  text:string;
  isGpt:boolean;
}


export const ProsConsStreamPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async(text:string) =>{
    setIsLoading(true)
    // Defino preview como los mensajes anteriores y tengo uno donde el texto es igual al texto y isGpt en False
    setMessages((prev)=> [...prev, {text:text, isGpt:false}])

    //TODO Desde aca mandar a llamar el UseCase

    const reader = await prosConsStreamUseCase( text );

    setIsLoading(false);

    if(!reader) return alert('No se pudo generar el reader')
    // TODO: Generar el ultimo mensaje
    const decoder = new TextDecoder();
    let message ='';
    setMessages((messages)=>[...messages, {text:message, isGpt:true}])

    while(true){
      const { value, done } = await reader.read();
      if(done) break;

      const decodedChunk = decoder.decode(value,{stream:true});
      message += decodedChunk

      setMessages((messages)=>{
        const newMessages = [...messages];
        newMessages[newMessages.length -1].text = message;
        return newMessages
      })
    }


  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Mensaje de Bienvenida */}
          <GptMessage text={"¿Qué deseas comparar hoy?"} />

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


    <TextMessageBox
      onSendMessage={handlePost}
      placeHolder="Escribe aqui tu mensaje"
      disableCorrections
    />



    </div>
  )
}
