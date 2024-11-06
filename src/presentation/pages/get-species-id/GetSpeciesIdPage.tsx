import { useState } from "react"
import { TypingLoader, TextMessageBox, GptMessageSpecies, MyMessageSpecies  } from "../../components";
import { GetIDSpecies } from "../../../interfaces";
import { getDataSwapiSpecies } from "../../../core/use-cases/get-data-swapi";



interface Message{
  text: GetIDSpecies | string;
  isGpt:boolean;
}

export const GetSpeciesIdPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async(idSpecies:string) =>{

    setIsLoading(true)

    const newMessage = `Busca en SWAPI 
     la especie que tenga el id:"${ idSpecies }" y devuélveme todos sus datos
     `
    setMessages((prev)=> [...prev, {text:newMessage, isGpt:false}])

 
    const { ok,data } = await getDataSwapiSpecies( idSpecies ) 

    console.log('nuevoSpecies',data)
    console.log('success',ok)

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
          <GptMessageSpecies text={"Vamos a buscar una especie en el universo de Star Wars"} />

          {
            messages.map((message, index)=>(
              message.isGpt
              ? (
                <GptMessageSpecies key={index} text={message.text} />
              )
              : (
                <MyMessageSpecies key={index} text={ message.text } />
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
      placeHolder="Escribe el id para ubicar una especie en SWAPI"
      disableCorrections
    />



    </div>
  )
}
