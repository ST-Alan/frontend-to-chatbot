import Markdown from "react-markdown"
import { GetIDStarships } from "../../../interfaces";


interface Props{
    text:GetIDStarships | string;
}

export const GptMessageStarships = ({text}:Props) => {
  const displayText = typeof text === 'string' 
    ? text 
    : `Nombre: ${text.nombre}\n
    Modelo: ${JSON.stringify(text.modelo, null, 2)}\n
    Clase de nave: ${JSON.stringify(text.clase_nave, null, 2)}\n
    Fabricante: ${JSON.stringify(text.fabricante, null, 2)}\n
    Costo en créditos: ${JSON.stringify(text.costo_creditos, null, 2)}\n
    Longitud: ${JSON.stringify(text.longitud, null, 2)}\n
    Tripulación: ${JSON.stringify(text.tripulacion, null, 2)}\n
    Pasajeros: ${JSON.stringify(text.pasajeros, null, 2)}\n
    Velocidad máxima en atmósfera: ${JSON.stringify(text.velocidad_maxima_atmosfera, null, 2)}\n
    Hiperimpulsor clase: ${JSON.stringify(text.hiperimpulsor_clase, null, 2)}\n
    MGLT: ${JSON.stringify(text.MGLT, null, 2)}\n
    Capacidad de carga: ${JSON.stringify(text.capacidad_carga, null, 2)}\n
    Consumibles: ${JSON.stringify(text.consumibles, null, 2)}\n
    Películas: ${JSON.stringify(text.peliculas, null, 2)}\n
    Pilotos: ${JSON.stringify(text.pilotos, null, 2)}\n
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