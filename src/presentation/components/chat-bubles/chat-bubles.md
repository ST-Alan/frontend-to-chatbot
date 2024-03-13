# GptMessageImage
src/presentation/components/chat-bubles/GptMessageImage.tsx

El texto en 
 <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 px-4 pb-3 shadow rounded-xl">
 <span>{text}</span>
  <img
    src = {imageUrl}
    alt = {alt}
    className=" mt-2 rounded-xl w-96 h-96 object-cover"
              />
</div>
Lo comente porque solo repite el prompt encima de la imagen. De momento queda asi:
 <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 px-4 pb-3 shadow rounded-xl">
  {/* <span>{text}</span> */}
  <img
    src = {imageUrl}
    alt = {alt}
    className=" mt-2 rounded-xl w-96 h-96 object-cover"
              />
</div>
-------------------------------------------------------------------------------------------
Para mostrar la imagen que se esta editando en el dashboard en http://localhost:5173/image-tunning

Para eso, en src/presentation/components/chat-bubles/GptMessageImage.tsx

interface Props{
    text:string;
    imageUrl:string;
    alt: string; // Texto alternaitvo
    onImageSelected?: (imageUrl:string)=>void; // Creo esta propiedad.
}

// En la constante como no uso el texto lo borro de los parametros, y agrego la propiedad nueva dentro de los parametros
export const GptMessageImage = ({imageUrl, alt, onImageSelected}:Props) => {

Y agrego en la imagen una accion de click para llamar a la imagen si existe

  <img
    src = {imageUrl}
    alt = {alt}
    className="rounded-xl w-96 h-96 object-cover"
    onClick={()=> onImageSelected && onImageSelected(imageUrl)} // Si tengo onImageSelected, muestrame onImageSelected con el argumento imageUrl
  />
-------------------------------------------------------------------------------------------
Para hacer la edicion de una parte de la imagen, creo esto un nuevo componente de chat: src/presentation/components/chat-bubles/GptMessageSelectableImage.tsx, el cual lo duplico de src/presentation/components/chat-bubles/GptMessageImage.tsx

Para trabajar sobre el canva necesito varios states en GptMessageSelectableImage.tsx

El estado:
 
 originalImageRef
 
Es para retornar la imagen a su estado original, o revertir los cambios

El estado:

canvasRef es dnde vamos a editar

Esto lo iniciamos en nulo o elemento html:
const canvasRef = useRef<HTMLCanvasElement>(null)
-------------------------------------------------------------------------------------------
Se crea la etiqueta canvas

<canvas 
    ref={ canvasRef }
    width = {1024}
    height = {1024}
/>

Esto crea el espacio de donde se va a colocar la imagen
-------------------------------------------------------------------------------------------
Luego se crea un use effect que se va a disparar apenas nuestro componente se monte.
  useEffect(() => {
    first
  
    return () => {
      second
    }
  }, [])
  
  Como no va a tener ninguna dependencia, queda si:
    useEffect(() => {

  }, [])
  
  <h3>En este efecto, la idea es que construyamos el "canvasRef" sobre este efecto creado:</h3>

    const originalImageRef = useRef<HTMLImageElement>()
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {

    const canvas = canvasRef.current!; //De esta forma construimos sobre el canvasRef creado
    const ctx = canvas.getContext('2d'); // Esto es para mantener el contexto de donde se va a dibujar

//Las tres lineas de abajo es para crear la imagen en memoria
    const image = new Image();// Imagen html en la parte de JS
    image.crossOrigin = 'Anonymous'; // Anonymous para editar imagenes que no sean cross domain. Se debe tener habilitado el Cors o el cross Origin
    image.src = imageUrl; //es partr de image




    originalImageRef.current = image //Para mantener la referencia

    Una vez la imagen se carga: image.onload

    Vamos a mandar a llamar el procedimiento de contex draw image, donde tenemos la imagen, la posicion x en 0 y la posicion y en 0, luego se toma el width y el height



  }, [])


  Abajo del efecto se pgan las funciones de gist.
-------------------------------------------------------------------------------------------
Luego de las funciones del gist. En:
export const GptMessageSelectableImage = ({imageUrl}:Props) => {


  const originalImageRef = useRef<HTMLImageElement>()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  Se crean las siguientes funciones:
  const [isDrawing, setIsDrawing] = useState(false) // Esto indica si esta dibujando. Por defecto no estamos dibujando

  const [coords, setCoords] = useState({x:0,y:0}) // Esto es para las cordenadas del dibujo que voy a hacer sobre la imagen. En un principio esta en 0,0
-------------------------------------------------------------------------------------------
  PAra terminar de corregir los problemas:

  onImageSelected la desestructuro de las properties:

  export const GptMessageSelectableImage = ({imageUrl, onImageSelected}:Props) => {
-------------------------------------------------------------------------------------------
  El evento cuando se empieza a hacer el click para empezar a trazar el cuadrado o el rectangulo en el cual quiero editar, se llama:

  onMouseDown

  Esto toma las coordenadas de cuando empiezo a hacer click, es decir el punto inicial en x y en y en canva, y luego se establecen en las coordenadas
-------------------------------------------------------------------------------------------
  El evento cuando la persona suelta el click sostenido, es decir el espacio a editar, se llama:

  onMouseUp

  Aca, si se tienen la funcion onImageSelected, se va a emitir el URL
-------------------------------------------------------------------------------------------
  El evento para obtner las coordenadas si se esta dibujando, se llama:
  onMouseMove

  Aca, estas lineas son:

  ctx. fillRect(coords.x, coords.y, width, height); //Para que llene el rectangulo
  ctx.clearRect(coords.x, coords.y, width, height); //Para que limpie elrectangulo


    ctx. fillRect(coords.x, coords.y, width, height); // Devuelve la imagen con el area seleccionada rellena de color negro
    ctx.clearRect(coords.x, coords.y, width, height); // Devuelve la imagen con el area seleccionada cortada, con un hueco con transparencia como un png
-------------------------------------------------------------------------------------------
  Funcion para retornar a la imagen original:
  
  resetCanvas

-------------------------------------------------------------------------------------------

  Conectar esas funciones al canvas
  
  Asi queda:
  <canvas 
   ref={ canvasRef }
   width = {1024}
   height = {1024}
   onMouseDown={onMouseDown}
   onMouseUp={onMouseUp}
   onMouseMove={onMouseMove}
 />
 < 
   onClick={resetCanvas}
   className="btn-primary mt-2">
   Borrar seleccion
 </

-------------------------------------------------------------------------------------------
