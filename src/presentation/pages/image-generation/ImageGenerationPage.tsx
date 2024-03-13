import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBox, GptMessageImage } from "../../components";
import { imageGenerationUseCase } from "../../../core/use-cases";

interface Message{
  text:string;
  isGpt:boolean;
  info?:{
    imageUrl: string;
    alt: string;
  }
}


export const ImageGenerationPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async(text:string) =>{
    setIsLoading(true)
    // Defino preview como los mensajes anteriores y tengo uno donde el texto es igual al texto y isGpt en False
    setMessages((prev)=> [...prev, {text:text, isGpt:false}])

    //TODO Desde aca mandar a llamar el UseCase
    const imageInfo = await imageGenerationUseCase(text);
    setIsLoading(false);

    if(!imageInfo){
      return setMessages((prev)=>[...prev,{text:'No se pudo generar la imagen -|- src/presentation/pages/image-generation/ImageGenerationPage.tsx', isGpt:true}])
    }


    setMessages((prev)=>[...prev,{text:text, isGpt:true,info:{imageUrl:imageInfo.url,alt:imageInfo.alt}}])


    // TODO: Agregar el mensaje de isGPT en true

  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Mensaje de Bienvenida */}
          <GptMessage text={"Hola, ¿Qué imagen quieres generar hoy?"} />

          {
            messages.map((message, index)=>(
              message.isGpt
              ? (
                <GptMessageImage
                  key={index}
                  text={message.text} 
                  imageUrl={message.info?.imageUrl!}
                  alt={message.info?.alt!}
                />
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
