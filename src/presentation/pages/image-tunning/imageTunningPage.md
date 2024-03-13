import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBox, GptMessageImage } from "../../components";
import { imageGenerationUseCase } from "../../../core/use-cases";

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
  const [messages, setMessages] = useState<Message[]>([])

  const [originalImageAndMask, setoriginalImageAndMask] = useState({
    original: 'http://localhost:3000/gpt/image-generation/1710173168771.png' as string | undefined,
    mask: undefined as string | undefined
  })

  const handlePost = async(text:string) =>{
    setIsLoading(true)
    // Defino preview como los mensajes anteriores y tengo uno donde el texto es igual al texto y isGpt en False
    setMessages((prev)=> [...prev, {text:text, isGpt:false}])

    //TODO Desde aca mandar a llamar el UseCase
    const imageInfo = await imageGenerationUseCase(text);
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
      originalImageAndMask.original && ( //Esto dice: Si nuestro originalImageAndMask.original existe (es verdadero) Entonces aplica lo de abajo
        
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
                  <GptMessageImage
                    key={index}
                    text={message.text} 
                    imageUrl={message.info?.imageUrl!}
                    alt={message.info?.alt!}
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
----------------------------------------------------------------------------------------------------------
Despues de modificar como se muestra el mensaje en src/presentation/components/chat-bubles/chat-bubles.md, Volvemos aca


Para tener o quitar la imagen por defecto se trabaja con esta linea de codigo:


export const ImageTunningPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const [originalImageAndMask, setoriginalImageAndMask] = useState({
    original: 'http://localhost:3000/gpt/image-generation/1710173168771.png' as string | undefined, 
    mask: undefined as string | undefined
  })

En esta linea:

original: 'http://localhost:3000/gpt/image-generation/1710173168771.png' as string | undefined, 

Se puede modificar la imagen que queremos que aparezca por defecto en la parte superior derecha cuando se va a editar.

Para este caso, lo voy a quitar, va a quedar asi:
original: undefined as string | undefined,
----------------------------------------------------------------------------------------------------------
De momento al hacer click en la imagen un console.log me muestra la url, porque asi lo tengo aca:
<GptMessageImage
  key={index}
  text={message.text} 
  imageUrl={message.info?.imageUrl!}
  alt={message.info?.alt!}
  onImageSelected={url=>console.log({url})} // En esta linea es donde muestro la url en el console.log al hacer click en la imagen
/>
----------------------------------------------------------------------------------------------------------
Para mostrar la imagen debo invocar a setOriginalImageAndMask y establecer que la imagen original es igual al url que me esta devolviendo, y la mascara undefined, porque todavia no la estoy usando. quedaria asi:

<GptMessageImage
  key={index}
  text={message.text} 
  imageUrl={message.info?.imageUrl!}
  alt={message.info?.alt!}
  onImageSelected={(url)=>setOriginalImageAndMask({
    original:url,
    mask:undefined
  })}
/>

Con ese codigo ya se muestra la imagen a la que le hago click como una miniatura en la parte superior derecha 

Tambien en este punto sirve la creacion de la variacion de imagen

----------------------------------------------------------------------------------------------------------
Ahopra voy a ver los mensajes:

En los mensajes no tengo ninguno todavia, asi que voy a crear uno. Asi esta ahorita:

export const ImageTunningPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([]) // Sin mensajes

Creo los mensajes, siguiendo la interface  Message:

interface Message{
  text:string;
  isGpt:boolean;
  info?:{
    imageUrl: string;
    alt: string;
  }
}

Me quedaria asi:
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

----------------------------------------------------------------------------------------------------------
En GptMessageSelectableImage, se cambia la propiedad original y mask de onImageSelected

Asi esta antes:
   <GptMessageSelectableImage
    key={index}
    text={message.text} 
    imageUrl={message.info?.imageUrl!}
    alt={message.info?.alt!}
    onImageSelected={(url)=>setOriginalImageAndMask({
      original:message.info?.,
      mask:undefined
    })}

Asi queda despues:
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
----------------------------------------------------------------------------------------------------------
Para mostrar la imagen con la mascara, validamos si esta la imagen con la mascara y mostramos eso, sino mostramos la imagen original.
 En el placeholder buscamos la clase que hace que la imagen este en posicion fija y flotante
Antes:
 {
      originalImageAndMask.original && (
        <div className="fixed flex flex-col items-center top-10 right-10 z-10 fade-in">
              <span>Editando</span>
              <img
              className="border rounded-xl w-36 h-36 object-contain"
               src={originalImageAndMask.original}
               alt="Texto alternativo"
              />
              <button onClick={ handleVariation } className="btn-primary mt-2">Generar Variacion</button>
        </div>
      )
    }

Despues:
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
----------------------------------------------------------------------------------------------------------
   
En el handlePost

Tengo a imageGenerationUseCase(text)

Ese archivo en src/core/use-cases/imageGeneration.use-case.ts tiene dentro de la funcion, los siguientes parametros:

export const imageGenerationUseCase = async (prompt: string, originalImage?:string, maskImage?:string):Promise<GeneratedImage> => {


Los cuales voy a mandar a llamar si los tengo


const {original, mask} = originalImageAndMask

Los llamo de originalImageAndMask por si estan en el estado

Y lo invoco desde el caso de uso


 //TODO Desde aca mandar a llamar el UseCase
 const imageInfo = await imageGenerationUseCase(text, original, mask);



