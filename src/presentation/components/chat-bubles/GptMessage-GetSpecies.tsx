import Markdown from "react-markdown"
import { GetIDSpecies } from "../../../interfaces";


interface Props{
    text:GetIDSpecies | string;
}

export const GptMessageSpecies = ({text}:Props) => {
  const displayText = typeof text === 'string' 
    ? text 
    : `Nombre: ${text.nombre}\n
    Clasificación: ${JSON.stringify(text.clasificacion, null, 2)}\n
    Designación: ${JSON.stringify(text.designacion, null, 2)}\n
    Altura promedio: ${JSON.stringify(text.altura_promedio, null, 2)}\n
    Esperanza de vida promedio: ${JSON.stringify(text.esperanza_vida_promedio, null, 2)}\n
    Colores de ojos: ${JSON.stringify(text.colores_ojos, null, 2)}\n
    Colores de cabello: ${JSON.stringify(text.colores_cabello, null, 2)}\n
    Colores de piel: ${JSON.stringify(text.colores_piel, null, 2)}\n
    Lenguaje: ${JSON.stringify(text.lenguaje, null, 2)}\n
    Planeta de origen: ${JSON.stringify(text.planeta_origen, null, 2)}\n
    Personas: ${JSON.stringify(text.personas, null, 2)}\n
    Películas: ${JSON.stringify(text.peliculas, null, 2)}\n
    URL: ${JSON.stringify(text.url, null, 2)}\n
    Creado: ${JSON.stringify(text.creado, null, 2)}\n
    Editado: ${JSON.stringify(text.editado, null, 2)}\n
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