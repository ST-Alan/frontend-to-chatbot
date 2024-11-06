import Markdown from "react-markdown"
import { Data } from "../../../interfaces/nuevoFilm.response";

interface Props{
    text:Data | string;
}

export const GptMessage = ({text}:Props) => {
  const displayText = typeof text === 'string' 
    ? text 
    : `Este es un resumen de la nueva saga de ${text.nombreFilm}:
    ${text.nuevoFilm}\n
    El artista principal en esta saga fué:${text.persona}
    La emoción usada para crear esta saga fué:${text.emocion}
    La especie usada para crear esta saga fué:${text.especie}
    La nave principal en esta saga fué:${text.nave}
    El planeta principal fué:${text.planeta}
    El vehiculo principal fué:${text.vehiculo}
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