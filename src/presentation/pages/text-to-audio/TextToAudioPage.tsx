import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxSelect, GptMessageAudio } from "../../components";
import { textToAudioUseCase } from "../../../core/use-cases";

const displaimer = `¿Qué audio quieres generar hoy?
* Todo el audio generado es por AI`


interface TextMessage{
  text:string;
  isGpt:boolean;
  type:'text';
}

interface AudioMessage {
  text: string;
  isGpt: boolean;
  audio: string;
  type:'audio';
}

// todo| Las interfaces y el type lo hago para luego validar si el mensaje es de texto o de audio 
type Message = TextMessage | AudioMessage;

const voices = [
  {id: 'nova',text: 'nova'},
  {id: 'alloy',text: 'alloy'},
  {id: 'echo',text:'echo'},
  {id: 'fable',text:'fable'},
  {id: 'onyx',text:'onyx'},
  {id: 'shimmer',text:'shimmer'},
]

export const TextToAudioPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);


  //Recordar porque a este parametro le puse text y no prompt
  const handlePost = async(text:string, selectedVoice:string) =>{
    setIsLoading(true);
    // Defino preview como los mensajes anteriores y tengo uno donde el texto es igual al texto y isGpt en False
    setMessages((prev)=> [...prev, {text:text, isGpt:false, type:'text'}]);

    //TODO Desde aca mandar a llamar el UseCase
    //Este caso de uso tiene como retorno una respuesta de un archivo mp3. Todo aca viene del caso de uso respectivo
    const {ok, message, audioUrl} = await textToAudioUseCase( text, selectedVoice );
    setIsLoading(false);
    // Si no esta bien, genera este alert
    if (!ok) return alert('No se genero el audio correctamente');

    // TODO: Agregar el mensaje de isGPT en true. Es decir si todo sale bien
    //Como el url podria venir como nulo le agrego ! para evaluarlo. Queda asi:audioUrl!. De lo contrario da error
    setMessages((prev)=> [...prev, {text: `${selectedVoice} -  ${message}`, isGpt:true, type:'audio', audio:audioUrl!, }]);




  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Mensaje de Bienvenida */}
          {/* Aqui se llaman a las chat bubble */}
          <GptMessage text={displaimer} />

          {
            messages.map((message, index)=>(
              message.isGpt
              ? (


                  message.type === 'audio'
                  ?
                  <GptMessageAudio key={index}
                    text={message.text}
                    audio={message.audio}
                  />

                  :
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
        disableCorrections options={voices}    />



    </div>
  )

}
