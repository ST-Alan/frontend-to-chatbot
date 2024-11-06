import Markdown from "react-markdown"
import { GetIDPeople } from "../../../interfaces";


interface Props{
    text:GetIDPeople | string;
}

export const GptMessagePeople = ({text}:Props) => {
  const displayText = typeof text === 'string' 
    ? text 
    : `Nombre: ${text.nombre} \n
    Año de nacimiento: ${JSON.stringify(text.anio_nacimiento, null, 2)}\n
    Color de ojos: ${JSON.stringify(text.color_ojos, null, 2)}\n
    Género: ${JSON.stringify(text.genero, null, 2)}\n
    Color de cabello: ${JSON.stringify(text.color_cabello, null, 2)}\n
    Altura: ${JSON.stringify(text.altura, null, 2)}\n
    Peso: ${JSON.stringify(text.peso, null, 2)}\n
    Color de piel: ${JSON.stringify(text.color_piel, null, 2)}\n
    Mundo natal: ${JSON.stringify(text.mundo_natal, null, 2)}\n
    Películas: ${JSON.stringify(text.peliculas, null, 2)}\n
    Especies: ${JSON.stringify(text.especies, null, 2)}\n
    Naves: ${JSON.stringify(text.naves, null, 2)}\n
    Vehículos: ${JSON.stringify(text.vehiculos, null, 2)}\n
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