import { useState } from "react"
import { GptMessage, GptOrthographyMessage, MyMessage, TextMessageBoxSelect, TypingLoader } from "../../components"
import { orthographyUseCase } from "../../../core/use-cases";
import { OrthographyResponse } from '../../../interfaces/orthography.response';


interface Message{
  text:string;
  isGpt:boolean;
  info?:OrthographyResponse
}


export const OrthographyPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async(text:string) =>{
    setIsLoading(true)
    // Defino preview como los mensajes anteriores y tengo uno donde el texto es igual al texto y isGpt en False
    setMessages((prev)=> [...prev, {text:text, isGpt:false}])

    //TODO Desde aca mandar a llamar el UseCase

    // const data = await orthographyUseCase(text);
    // Lo desestructuro, borro todos los data.ok data.userScore|errors|message y lo dejo asi:
    const {ok, errors, message,userScore} = await orthographyUseCase(text);
    // console.log(data)

    if(!ok){
      setMessages((prev)=> [...prev, {text:'No se pudo realizar la conexion', isGpt:true}])
    }else{
      setMessages((prev)=> [...prev, {
        text:message,
        isGpt:true,
        info:{ userScore,errors,message }
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
          <GptMessage text={"Hola, puedes escribir tu texto en espanol y te ayudo con las correcciones"} />

          {
            messages.map((message, index)=>(
              message.isGpt
              ? (
                // Como lo tengo en duro, creo un gpt message que se encargue de recibirlo tal cual viene de chatgpt
                // <GptMessage key={index} text="Esto es OpenAi" />
                <GptOrthographyMessage
                 key={index}
                //  Todo esto:
                //  errors={message.info!.errors}
                //  userScore={message.info!.userScore}
                //  message={message.info!.message}
                // Es equivalente a esto:
                {...message.info!}
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

{/* Esta es para TextMessageBox.tsx - Solo para escribir */}
    {/* <TextMessageBox
      onSendMessage={handlePost}
      placeHolder="Escribe aqui tu mensaje"
      disableCorrections
    /> */}

    {/* Esta es para TextMessageBoxFile.tsx - Para escribir y adjuntar fotos*/}
    {/* <TextMessageBoxFile
      onSendMessage={handlePost}
      placeHolder="Escribe aqui tu mensaje"
    /> */}

    <TextMessageBoxSelect
    // onSendMessage={console.log}
    onSendMessage={handlePost}
      options={[{id:"1", text:"Hola"},{id:"2", text:"Mundo"} ]}
    />


    </div>
  )
}
