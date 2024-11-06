import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, GptMessageAudio, TextMessageBoxSelectSwapiVoice } from "../../components";
import { textToAudioUseCase } from "../../../core/use-cases";

const disclaimer = `Vamos a generar una nueva saga de Star War.
Inventa una emoción y vamos a ello..!
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
  type:'audio'
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

const idFilm = [
  { id: '1', text:1 },
  { id: '2', text:2 },
  { id: '3', text:3 },
  { id: '4', text:4 },
  { id: '5', text:5 },
  { id: '6', text:6 },
  { id: '7', text:7 },
];

export const TextToAudioPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);


  const handlePost = async( selectedVoice:string,idFilm:string,idPerson:string,idPlanet:string,idSpecies:string,idStarship:string,idVehicle:string,emocion:string ) =>{
    setIsLoading(true);

    const newMessage = `Busca en SWAPI 
    el film que tenga el id:"${ idFilm }"
    el id:${ idPerson } para obtener un personaje,
    el id:${ idPlanet } para obtener un planeta,
    el id:${ idSpecies } para obtener una especie,
    el id:${ idStarship } para obtener una starship,
    el id:${ idVehicle } para obtener un vehículo,
    una vez obtenidos estos datos, toma la emoción ${emocion} y crea un resumen de una nueva saga de la película, basada en estos datos que te estoy brindando con la voz de ${selectedVoice}
    `


    setMessages((prev)=> [...prev, {text:newMessage, isGpt:false, type:'text'}]);

    const {ok, message, audioUrl} = await textToAudioUseCase( selectedVoice,Number(idFilm),idPerson,idPlanet,idSpecies,idStarship,idVehicle,emocion );
    setIsLoading(false);
    // Si no esta bien, genera este alert
    if (!ok) return alert('No se genero el audio correctamente');

    setMessages((prev)=> [...prev, {text: `${selectedVoice} -  ${message}`, isGpt:true, type:'audio', audio:audioUrl!, }]);

  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Mensaje de Bienvenida */}
          {/* Aqui se llaman a las chat bubble */}
          <GptMessage text={disclaimer} />

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


    <TextMessageBoxSelectSwapiVoice
        onSendMessage={handlePost}
        placeHolder="Escribe una emoción o una trama: Amor, Acción, Trama de Romeo y Julieta"
        pHIdPerson="Escribe el id de Personaje"
        pHIdPlanet="Escribe el id de Planeta"
        pHIdSpecies="Escribe el id de Especie"
        pHIdStarship="Escribe el id de Starship"
        pHIdVehicle="Escribe el id de Vehiculo"
        disableCorrections 
        options={idFilm}
        optionsVoice={voices}
    />
    </div>
  )

}
