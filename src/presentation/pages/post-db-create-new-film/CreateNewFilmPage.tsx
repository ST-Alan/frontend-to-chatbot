import { useRef, useState } from "react"
import { GptMessage, MyMessage, TypingLoader } from "../../components";
import { crearHistioriaGuardarEnDB} from "../../../core/use-cases";
import { TextMessageBoxSwapi } from "../../components/chat-input-boxes/TextMessageBoxSwapi";
import { Data } from "../../../interfaces/nuevoFilm.response";

interface Message{
  text:Data | string;
  isGpt:boolean;
}

const idFilm = [
  { id: '1', text:1 },
  { id: '2', text:2 },
  { id: '3', text:3 },
  { id: '4', text:4 },
  { id: '5', text:5 },
  { id: '6', text:6 },
  { id: '7', text:7 },
];

export const CreateNewFilmPage = () => {

  const abortController = useRef(new AbortController())
  const isRunning = useRef(false)

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async(idFilm:number,idPerson:string,idPlanet:string,idSpecies:string,idStarship:string,idVehicle:string,emocion:string,) =>{

    if(isRunning.current){
      abortController.current.abort()
      abortController.current = new AbortController()
    }


    setIsLoading(true)
    isRunning.current = true;

    const newMessage = `Busca en SWAPI 
     el film que tenga el id:"${ idFilm }"
     el id:${ idPerson } para obtener un personaje,
     el id:${ idPlanet } para obtener un planeta,
     el id:${ idSpecies } para obtener una especie,
     el id:${ idStarship } para obtener una starship,
     el id:${ idVehicle } para obtener un vehículo,
     una vez obtenidos estos datos, toma la emoción ${emocion} y crea un resumen de una nueva saga de la película, basada en estos datos que te estoy brindando
     `
    // Defino preview como los mensajes anteriores y tengo uno donde el texto es igual al texto y isGpt en False
    setMessages((prev)=> [...prev, {text:newMessage, isGpt:false}])

 
    const { success,nuevoFilm } = await crearHistioriaGuardarEnDB( idFilm,idPerson,idPlanet,idSpecies,idStarship,idVehicle,emocion, abortController.current.signal ) 

    console.log('nuevoFilm',nuevoFilm)
    console.log('success',success)

    setIsLoading(false);
    if (!success || nuevoFilm === null) {
      console.error("Error:", nuevoFilm);
      return;
    }

    setMessages((messages)=>[...messages, {text:nuevoFilm, isGpt:true}]);



    isRunning.current = false;



  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Mensaje de Bienvenida */}
          <GptMessage text={"¿Qué historia crearemos juntos?"} />

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
          {
            isLoading &&(
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader />
              </div>
            )
          }

           


        </div>
      </div>


    <TextMessageBoxSwapi
        onSendMessage={handlePost}
        placeHolder="Escribe una emoción o una trama: Amor, Acción, Trama de Romeo y Julieta"
        pHIdPerson="Escribe el id de Personaje"
        pHIdPlanet="Escribe el id de Planeta"
        pHIdSpecies="Escribe el id de Especie"
        pHIdStarship="Escribe el id de Starship"
        pHIdVehicle="Escribe el id de Vehiculo"
        disableCorrections options={idFilm}    />

    </div>
  )
}
