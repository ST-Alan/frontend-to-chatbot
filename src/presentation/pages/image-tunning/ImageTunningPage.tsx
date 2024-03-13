import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBox,  GptMessageSelectableImage } from "../../components";
import { imageGenerationUseCase, imageVariationUseCase } from "../../../core/use-cases";

interface Message{
  text:string;
  isGpt:boolean;
  info?:{
    imageUrl: string;
    alt: string;
  }
}


export const ImageTunningPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Imagen Base',
      isGpt:true,
      info: {
        imageUrl: 'http://localhost:3000/gpt/image-generation/1710338732469.png',
        alt: 'Imagen base',
      }
    }
  ])

  const [originalImageAndMask, setOriginalImageAndMask] = useState({
    original: undefined as string | undefined,
    mask: undefined as string | undefined
  })


  const handleVariation = async() =>{ //Este es el que mandamos a llamar con el boton de Generar Variacion
    setIsLoading(true)
    const resp = await imageVariationUseCase(originalImageAndMask.original!)
    setIsLoading(false);

    if(!resp) return;

    setMessages((prev)=>[
      ...prev,
      {
        text:'Variacion', 
        isGpt: true, 
        info:{ 
          imageUrl: resp.url, 
          alt: resp.alt
        } 
      }])



  }





  const handlePost = async(text:string) =>{
    setIsLoading(true)
    // Defino preview como los mensajes anteriores y tengo uno donde el texto es igual al texto y isGpt en False
    setMessages((prev)=> [...prev, {text:text, isGpt:false}])

    const {original, mask} = originalImageAndMask



    //TODO Desde aca mandar a llamar el UseCase
    const imageInfo = await imageGenerationUseCase(text, original, mask);
    setIsLoading(false);

    if(!imageInfo){
      return setMessages((prev)=>[...prev,{text:'No se pudo generar la imagen -|- src/presentation/pages/image-generation/ImageGenerationPage.tsx', isGpt:true}])
    }


    setMessages((prev)=>[...prev,{text:text, isGpt:true,info:{imageUrl:imageInfo.url,alt:imageInfo.alt}}])


    // TODO: Agregar el mensaje de isGPT en true

  }


  return (
    <>

    {
      originalImageAndMask.original && (
        <div className="fixed flex flex-col items-center top-10 right-10 z-10 fade-in">
              <span>Editando</span>
              <img
              className="border rounded-xl w-36 h-36 object-contain"
               src={originalImageAndMask.mask ?? originalImageAndMask.original}
               alt="Texto alternativo"
              />
              <button onClick={ handleVariation } className="btn-primary mt-2">Generar Variacion</button>
        </div>
      )
    }


      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2">
            {/* Mensaje de Bienvenida */}
            <GptMessage text={"Hola, ¿Qué imagen quieres generar hoy?"} />

            {
              messages.map((message, index)=>(
                message.isGpt
                ? (
                  //<GptMessageImage
                  <GptMessageSelectableImage
                    key={index}
                    text={message.text} 
                    imageUrl={message.info?.imageUrl!}
                    alt={message.info?.alt!}
                    onImageSelected={(maskImageUrl)=>setOriginalImageAndMask({
                      original:message.info?.imageUrl,
                      mask:maskImageUrl
                    })}
                  />
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
    </>
  )
}

