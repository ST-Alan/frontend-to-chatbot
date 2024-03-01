import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from "../../components";
import { prosConsUseCase } from "../../../core/use-cases";




interface Message{
  text:string;
  isGpt:boolean;
}


export const ProsConsPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async(text:string) =>{
    setIsLoading(true)
    // Defino preview como los mensajes anteriores y tengo uno donde el texto es igual al texto y isGpt en False
    setMessages((prev)=> [...prev, {text:text, isGpt:false}])

    //TODO Desde aca mandar a llamar el UseCase

    const {ok, content} = await prosConsUseCase(text);
    // const {ok, errors, message,userScore} = await prosConsUseCase(text);

    if(!ok){
      setMessages((prev)=> [...prev, {text:'No se pudo realizar la conexion', isGpt:true}])
    }else{
      setMessages((prev)=> [...prev, {
        text:content,
        isGpt:true,
      }])
    }

    setIsLoading(false);

    // TODO: Agregar el mensaje de isGPT en true

  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Mensaje de Bienvenida */}
          <GptMessage text={"Puedes escribir lo que sea que quieras que compare y te doy mismpuntos de vista"} />

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
