import Markdown from "react-markdown"
import { GetIDFilm } from "../../../interfaces";


interface Props{
    text: GetIDFilm | string;
}

export const GptMessageGetId = ({text}:Props) => {
  const displayText = typeof text === 'string' 
    ? text 
    : `Estos son los datos de la película:
     Nombre de la película: ${JSON.stringify(text.titulo,null,2)}\n
     Episodio:${JSON.stringify(text.episodio,null,2)}\n
     Texto de apertura:\n
     ${text.texto_apertura}\n     
     Director: ${JSON.stringify(text.director,null,2)}"\n     
     Productor:${JSON.stringify(text.productor,null,2)}:\n     
     Fecha de estreno: ${JSON.stringify(text.fecha_estreno,null,2)}\n     
     Personajes: ${JSON.stringify(text.personajes,null,"\n")}     
     Planetas: ${JSON.stringify(text.planetas,null,"\n")}\n     
     Naves Estelares: ${JSON.stringify(text.naves_estelares,null,"\n")}\n     
     Vehículos: ${JSON.stringify(text.vehiculos,null,"\n")}\n     
     Especies: ${JSON.stringify(text.especies,null,"\n")}\n     
     URL: ${JSON.stringify(text.url,null,2)}\n     
     Creado: ${JSON.stringify(text.creado,null,2)}\n     
     Editado: ${JSON.stringify(text.editado,null,2)}\n
    
    }
    `;
  return (
    <div className="col-start-1 col-end-11 p-3 rounded-lg">
        <div className="flex flex-row items-start">
            <div className="flex items-center justify-center h-10 w-auto p-4 rounded-full bg-green-600 flex-shrink-0">
               Swapi Chatbot
            </div>
            <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 px-4 pb-3 shadow rounded-xl">
                <Markdown>{displayText}</Markdown>
            </div>
        </div>
    </div>
  )
}