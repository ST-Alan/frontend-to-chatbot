import { useState } from "react"
import { TypingLoader, TextMessageBox, GptMessageGetId, MyMessageGetFilmId } from "../../components";
import { getDataSwapi } from "../../../core/use-cases";
import { GetIDFilm } from "../../../interfaces";


interface Message{
  text: GetIDFilm | string;
  isGpt:boolean;
}

export const GetFilmIdPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async(idFilm:string) =>{

    setIsLoading(true)

    if(Number(idFilm) > 1 && Number(idFilm) < 8){
      console.log('------------------------')
      console.log(idFilm)
      console.log('aquí estoy')
      const newMessage = `Busca en SWAPI 
      el film que tenga el id:"${ idFilm } y devuélveme todos sus datos"
      `
      setMessages((prev)=> [...prev, {text:newMessage, isGpt:false}])

  
      const { ok,data } = await getDataSwapi( idFilm ) 

      console.log('nuevoFilm',data)
      console.log('success',ok)

      setIsLoading(false);
      if (!data || data === null) {
        console.error("Error:", data);
        return;
      }

      setMessages((messages)=>[...messages, {text:data, isGpt:true}]);
    } else{
      const data =`El ID de la película ${ idFilm } no está disponible en la API. Solo se permiten id de Films con números entre 1 y 7.`
      setMessages((messages)=>[...messages, {text:data, isGpt:true}]);
      setIsLoading(false);
      if (!data || data === null) {
        console.error("Error:", data);
        return;
      }
    }


  }



  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Mensaje de Bienvenida */}
          <GptMessageGetId text={"Escribe el id de un film entre el 1 y el 7 para traerte todos sus datos"} />

          {
            messages.map((message, index)=>(
              message.isGpt
              ? (
                <GptMessageGetId key={index} text={message.text} />
              )
              : (
                <MyMessageGetFilmId key={index} text={ message.text } />
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
      placeHolder="Escribe un número entre el 1 y el 7 para extraer los datos de un film"
      disableCorrections
    />



    </div>
  )
}
