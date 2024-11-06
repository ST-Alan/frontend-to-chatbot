import Markdown from "react-markdown"
import { GetIDPlanet } from "../../../interfaces";


interface Props{
    text: GetIDPlanet | string;
}

export const GptMessagePlanet = ({text}:Props) => {
  const displayText = typeof text === 'string' 
    ? text 
    : `Nombre: ${text.nombre}\n
    Diámetro: ${JSON.stringify(text.diametro, null, 2)}\n
    Período de rotación: ${JSON.stringify(text.periodo_rotacion, null, 2)}\n
    Período orbital: ${JSON.stringify(text.periodo_orbital, null, 2)}\n
    Gravedad: ${JSON.stringify(text.gravedad, null, 2)}\n
    Población: ${JSON.stringify(text.poblacion, null, 2)}\n
    Clima: ${JSON.stringify(text.clima, null, 2)}\n
    Terreno: ${JSON.stringify(text.terreno, null, 2)}\n
    Superficie de agua: ${JSON.stringify(text.superficie_agua, null, 2)}\n
    Residentes: ${JSON.stringify(text.residentes, null, 2)}\n
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