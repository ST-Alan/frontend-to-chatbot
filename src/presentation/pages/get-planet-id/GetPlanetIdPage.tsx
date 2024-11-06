import { useState } from "react"
import { TypingLoader, TextMessageBox, GptMessagePlanet, MyMessagePlanet } from "../../components";
import {  GetIDPlanet } from "../../../interfaces";
import { getDataSwapiPlanet } from "../../../core/use-cases/get-data-swapi";





interface Message{
  text: GetIDPlanet | string;
  isGpt:boolean;
}

export const GetPlanetIdPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async(idPlanet:string) =>{

    setIsLoading(true)

    const newMessage = `Busca en SWAPI 
     el planeta que tenga el id:"${ idPlanet }" y devuélveme todos sus datos
     `
    setMessages((prev)=> [...prev, {text:newMessage, isGpt:false}])

 
    const { data } = await getDataSwapiPlanet( idPlanet ) 

    setIsLoading(false);
    if (!data || data === null) {
      console.error("Error:", data);
      return;
    }

    setMessages((messages)=>[...messages, {text:data, isGpt:true}]);



  }



  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Mensaje de Bienvenida */}
          <GptMessagePlanet text={"Vamos a buscar un planeta en el universo de Star Wars"} />

          {
            messages.map((message, index)=>(
              message.isGpt
              ? (
                <GptMessagePlanet key={index} text={message.text} />
              )
              : (
                <MyMessagePlanet key={index} text={ message.text } />
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
      placeHolder="Escribe el id para ubicar un planeta en SWAPI"
      disableCorrections
    />



    </div>
  )
}
