import { useEffect, useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from "../../components";
import { createThreadUseCase } from "../../../core/use-cases";
import { postQuestionUseCase } from "../../../core/use-cases/assistant/postQuestion.use-case";



interface Message{
  text:string;
  isGpt:boolean;
}


export const AssistantPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const [threadId, setThreadId] = useState<string>()

  // Obtener el threadId, y si no existe, crearlo.
//De momento lo voy a grabar en el local storage, pero deberia guardar un objeto con todos los threads y quizas tenerlo en una base de datos
useEffect(() => {
  const threadId = localStorage.getItem('threadId');

  if(threadId){
    setThreadId(threadId)
  } else{
    createThreadUseCase()
    .then(id=>{
      setThreadId(id);
      localStorage.setItem('threadId', id!)

    })
  }
}, [])

useEffect(() => {
  if(threadId){
    setMessages((prev)=> [...prev,{text:`Número de id de thread ${threadId}`, isGpt: true}])
  }
}, [threadId])




  const handlePost = async(text:string) =>{

    if(!threadId) return

    setIsLoading(true)
    // Defino preview como los mensajes anteriores y tengo uno donde el texto es igual al texto y isGpt en False
    setMessages((prev)=> [...prev, {text:text, isGpt:false}])

    //TODO Desde aca mandar a llamar el UseCase
    const replies = await postQuestionUseCase(threadId, text)

    setIsLoading(false);

    // TODO: Agregar el mensaje de isGPT en true

    for (const reply of replies) {
        for (const message of reply.content) {
            setMessages((prev)=>[
                ...prev,
                {text: message, isGpt:(reply.role === 'assistant'), info:reply}
            ])
        }
      
    }



  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Mensaje de Bienvenida */}
          <GptMessage text={"Buen día, soy Jarvis. ¿Me puedes decir tu nombre y en qué puedo ayudarte?"} />

          {
            messages.map((message, index)=>(
              message.isGpt
              ? (
                <GptMessage key={index} text={message.text}/>
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


    <TextMessageBox
      onSendMessage={handlePost}
      placeHolder="Escribe aqui tu mensaje"
      disableCorrections
    />



    </div>
  )
}
