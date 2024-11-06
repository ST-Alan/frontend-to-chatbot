import { useState } from "react"
import { TypingLoader, TextMessageBox, MyMessageVehicles, GptMessageVehicles } from "../../components";
import { GetIDVehiculos } from "../../../interfaces";
import { getDataSwapiVehicles } from "../../../core/use-cases/get-data-swapi";




interface Message{
  text: GetIDVehiculos | string;
  isGpt:boolean;
}

export const GetVehiclesIdPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async(idVehicles:string) =>{

    setIsLoading(true)

    if( Number(idVehicles) <= 3 ){
    const data =`El ID del vehiculo ${ idVehicles } no está disponible en la API. Desde el id 1 hasta el id 3 en vehiculos no están disponibles dentro SWAPI.`
    setMessages((messages)=>[...messages, {text:data, isGpt:true}]);
    setIsLoading(false);
    if (!data || data === null) {
      console.error("Error:", data);
      return;
    }
    }else{
    const newMessage = `Busca en SWAPI 
    el vehiculo que tenga el id:"${ idVehicles }" y devuélveme todos sus datos
    `
    setMessages((prev)=> [...prev, {text:newMessage, isGpt:false}])


    const { ok,data } = await getDataSwapiVehicles( idVehicles ) 

    console.log('nuevoVehicles',data)
    console.log('success',ok)

    setIsLoading(false);
    if (!data || data === null) {
      console.error("Error:", data);
      return;
    }

    setMessages((messages)=>[...messages, {text:data, isGpt:true}]);
    
  }

  }



  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Mensaje de Bienvenida */}
          <GptMessageVehicles text={`Vamos a buscar un vehiculo en el universo de Star Wars \n Del 1 al 3 no se encuentran disponibles en la API`} />

          {
            messages.map((message, index)=>(
              message.isGpt
              ? (
                <GptMessageVehicles key={index} text={message.text} />
              )
              : (
                <MyMessageVehicles key={index} text={ message.text } />
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


    <TextMessageBox
      onSendMessage={handlePost}
      placeHolder="Escribe el id para ubicar un vehiculo en SWAPI. Del 1 al 3 no se encuentran disponibles en la API"
      disableCorrections
    />



    </div>
  )
}

