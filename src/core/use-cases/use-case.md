## imageGeneration.use-case.ts

Nuestro endpoint en /Users/dev/Recursos/Apps/whatsappAPI/backend/nest-gpt/src/gpt/uses-cases/imageGeneration.use-case.ts

Va a recibir los parametros:

prompt, originalImage, maskImage

Esto en la linea de codigo:

export const imageGenerationUseCase = async(openai:OpenAI,{prompt, originalImage, maskImage}:Options) =>{
--------------------------------------------------------------------------------------------------------------

La interfce es para definir lo que queremos retornar

--------------------------------------------------------------------------------------------------------------
La respuesta de nuestro caso de uso puede ser de dos formas: de imagen o null:

type GeneratedImage = Image | null

--------------------------------------------------------------------------------------------------------------
Esto es una peticion get
const resp = await fetch(`${import.meta.env.VITE_GPT_API}/image-generation`)
Para transformarla en una peticion POST hay que hacer lo siguiente:

const resp = await fetch(`${import.meta.env.VITE_GPT_API}/image-generation`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                originalImage,
                maskImage,
            })
        });

Si todo sale bien en la peticion POST, se podria tomar el URL y el revise_prompt
Esto lo muestra el backend dentro del postman

Es decir, si tenemos una respuesta, tenemos un json con algo como esto:

{
    "url": "http://localhost:3000/gpt/image-generation/1710173168771.png",
    "openAIUrl": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-XGdMscGFdGewk4MDGMovdDGW/user-eZu7SckP33j0pJLV4gENpsQD/img-aNbwynEGLkBc99S4viXB37O0.png?st=2024-03-11T15%3A06%3A07Z&se=2024-03-11T17%3A06%3A07Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-11T14%3A17%3A24Z&ske=2024-03-12T14%3A17%3A24Z&sks=b&skv=2021-08-06&sig=NmovE3OAAbmuV3BCIe68FrbkKWjx6zkVtoibnYEfigQ%3D",
    "revised_prompt": "A realistic 3D image of a dragon shaped like a rock, with dazzling details. The dragon appears as if it has been carved from a large boulder. Its smooth, hardened surface gives an effect of antiquity, as if the dragon has existed since time immemorial. Glowing pearlescent speckles adorn its body, reflecting light in vibrant colors, adding an air of mystique. The dragon's features, such as its fangs, claws, and eyes, should be pronounced and striking, adding to its majestic aura."
}

Entonces puedo desestructurar el 
url
revised_prompt

Del response (resp) que hace el post.
--------------------------------------------------------------------------------------------------------------
  En esta linea se renombra el revised_prompt a alt
  
   const {url,revised_prompt:alt} = await resp.json()
  Justo aqui: revised_prompt:alt
--------------------------------------------------------------------------------------------------------------
que pasa sino coloco el .json()?
--------------------------------------------------------------------------------------------------------------
Luego de todo esto nos vamos a page, donde se hace el llamado al caso de uso, es decir:

En *imageGeneration.use-case.ts* se toma lo que vienen del backend y se manda al 

src/presentation/pages/image-generation/ImageGenerationPage.tsx

Por el handlePost:

  const handlePost = async(text:string) =>{
    setIsLoading(true)
    // Defino preview como los mensajes anteriores y tengo uno donde el texto es igual al texto y isGpt en False
    setMessages((prev)=> [...prev, {text:text, isGpt:false}])

    //TODO Desde aca mandar a llamar el UseCase
    const imageInfo = await imageGenerationUseCase(text);
    setIsLoading(false);



    // TODO: Agregar el mensaje de isGPT en true

  }



  Este text: imageGenerationUseCase(text);

  Viene a ser el prompt de export const imageGenerationUseCase = async (prompt: string, originalImage:string, maskImage:string):Promise<GeneratedImage> => {

    En  src/core/use-cases/imageGeneration.use-case.ts

--------------------------------------------------------------------------------------------------------------
La linea de:
    
     if(!imageInfo){

Es lo que ocurre cuando no encuentra la informacion de la imagen
--------------------------------------------------------------------------------------------------------------
La linea de:

setMessages((prev)=>[...prev,{text:text, isGpt:true,info:{imageUrl:imageInfo.url,alt:imageInfo.alt}}]) es lo que ocurre cuando si devuelve una imagen

Formateado podria verse asi:

setMessages((prev)=>
    [...prev,
        {
            text:text, 
            isGpt:true,
            info:{
                imageUrl:imageInfo.url,
                alt:imageInfo.alt
                }
        }
    ]
)
--------------------------------------------------------------------------------------------------------------

# imageVariation.use-case.ts

type GeneratedImage = Image | null

interface Image {
    url: string;
    alt: string;
}


export const imageVariationUseCase = async (originalImage:string):Promise<GeneratedImage> => { // Solo le pido la Imagen original, no viene el prompt ni la mascara
//El originalImage viene desde src/core/use-cases/imageGeneration.use-case.ts
// Especificamente en la linea: export const imageGenerationUseCase = async (prompt: string, originalImage?:string, maskImage?:string):Promise<GeneratedImage> => {


    try {
        
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/image-variation`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                baseImage: originalImage // En el backend el pide el baseImage asi que le asigno el nombre de originalImage a baseImage
            })
        });

        const {url,revised_prompt:alt} = await resp.json()

        console.log({url,alt})

        return {url, alt}


    } catch (error) {
        console.log(error)
        return null;
    }

}
//Salvo la constante imageVariationUseCase, y lo que se comento todo lo demas es igual a rc/core/use-cases/imageGeneration.use-case.ts
--------------------------------------------------------------------------------------------------------------
# Group
Agrupar los casos de uso por carpetas. 

Es lo mejor para que sea facil de mantener