import { useState } from "react"
import { TypingLoader, TextMessageBox, MyMessageStarships, GptMessageStarships } from "../../components";
import { GetIDStarships } from "../../../interfaces";
import { getDataSwapiStarships } from "../../../core/use-cases/get-data-swapi";

interface Message{
  text: GetIDStarships | string;
  isGpt:boolean;
}

export const GetStarshipsIdPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async(idStarships:string) =>{

    setIsLoading(true)

    const newMessage = `Busca en SWAPI 
     La nave que tenga el id:"${ idStarships }" y devuélveme todos sus datos
     `
    setMessages((prev)=> [...prev, {text:newMessage, isGpt:false}])

 
    const { ok,data } = await getDataSwapiStarships( idStarships ) 

    console.log('nuevoStarships',data)
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
          <GptMessageStarships text={"Vamos a buscar una nave en el universo de Star Wars"} />

          {
            messages.map((message, index)=>(
              message.isGpt
              ? (
                <GptMessageStarships key={index} text={message.text} />
              )
              : (
                <MyMessageStarships key={index} text={ message.text } />
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
      placeHolder="Escribe el id para ubicar una nave en SWAPI"
      disableCorrections
    />



    </div>
  )
}
