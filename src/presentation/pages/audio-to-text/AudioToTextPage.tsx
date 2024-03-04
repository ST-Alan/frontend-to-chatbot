import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxFile } from "../../components";
import { audioToTextUseCase } from "../../../core/use-cases";



interface Message{
  text:string;
  isGpt:boolean;
}


export const AudioToTextPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  //Orden para los parametros:
  //En src/presentation/components/chat-input-boxes/TextMessageBoxFile.tsx se esta enviando asi: onSendMessage(message, selectedFile)
  // Es decir, primero el text y despues el sudioFile
  //En la interface esta asi onSendMessage:(message:string, file:File)=>void;
  const handlePost = async(text:string, audioFile:File) =>{
    setIsLoading(true)
    // Defino preview como los mensajes anteriores y tengo uno donde el texto es igual al texto y isGpt en False
    setMessages((prev)=> [...prev, {text:text, isGpt:false}])

    //TODO Desde aca mandar a llamar el UseCase
    // console.log({text, audioFile}) //Para ver lo que vienen como parametro en const handlePost = async(text:string, audioFile:File) =>{

    //Aqui si puedo colocar primero el audioFile
    //De aqui se manda al caso de uso
    const resp = await audioToTextUseCase(audioFile, text)
    setIsLoading(false);
    if(!resp) return; // Si no hay respuesta salgo de aca.

    // TODO: Agregar el mensaje de isGPT en true
    // Es la logica para trabjar este caso de uso
    // Si todo sale bien se va a ejecutar lo que coloque aca

    // console.log({resp});
    // Con Markdown
    const gptMessage = `
## Transcripción:
__Duración:__ ${Math.round(resp.duration)} segundos
## El texto es:
${resp.text}
`

//Asi muestra el texto completo
    setMessages((prev)=> [
      ...prev, {text:gptMessage, isGpt:true}
    ])
//Hasta aqui muestra el texto completo

//De esta forma creo burbujas segun todos los segmentos que nos devuelve. Puede ser un for each o un ciclo for
    for (const segment of resp.segments){
      const segmentMessage = `
__De ${Math.round(segment.start)} a ${Math.round(segment.end)} segundos:__

${ segment.text }
`
setMessages((prev)=> [
  ...prev, {text:segmentMessage, isGpt:true}
])
//Aqui finaliza el codigo extra para que apaezcan diversas burbujas


    }

  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Mensaje de Bienvenida */}
          <GptMessage text={"Hola, ¿Qué audio quieres generar hoy?"} />

          {
            messages.map((message, index)=>(
              message.isGpt
              ? (
                <GptMessage key={index} text={message.text} />
              )
              : (
                // <MyMessage key={index} text={message.text} /> //Original
                // Aqui le digo que si en myMessage no hay nada el mensaje automatico se transcribe el audio
                <MyMessage key={index} text={(message.text === '') ? 'Transcribe el audio':message.text} />
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


    <TextMessageBoxFile
      onSendMessage={handlePost}
      placeHolder="Escribe aqui tu mensaje"
      disableCorrections
      accept="audio/*" //Acepta cualquier archivo de Audio
    />



    </div>
  )
}
