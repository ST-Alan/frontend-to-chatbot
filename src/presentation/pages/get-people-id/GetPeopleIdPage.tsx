import { useState } from "react"
import { TypingLoader, TextMessageBox, GptMessagePeople, MyMessageGetPeople } from "../../components";
import { GetIDPeople } from "../../../interfaces";
import { getDataSwapiPeople } from "../../../core/use-cases/get-data-swapi";



interface Message{
  text: GetIDPeople | string;
  isGpt:boolean;
}

export const GetPeopleIdPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async(idPeople:string) =>{

    setIsLoading(true)

    const newMessage = `Busca en SWAPI 
     el actor que tenga el id:"${ idPeople }" y devuélveme todos sus datos
     `
    setMessages((prev)=> [...prev, {text:newMessage, isGpt:false}])

 
    const { ok,data } = await getDataSwapiPeople( idPeople ) 

    console.log('nuevoPeople',data)
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
          <GptMessagePeople text={"Vamos a buscar una persona en el universo de Star Wars"} />

          {
            messages.map((message, index)=>(
              message.isGpt
              ? (
                <GptMessagePeople key={index} text={message.text} />
              )
              : (
                <MyMessageGetPeople key={index} text={ message.text } />
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
      placeHolder="Escribe el id para ubicar una persona en SWAPI"
      disableCorrections
    />



    </div>
  )
}
