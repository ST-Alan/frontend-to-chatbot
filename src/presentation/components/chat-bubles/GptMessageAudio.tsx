import Markdown from "react-markdown"

interface Props{
    text:string;
    audio:string;
}

export const GptMessageAudio = ({text, audio}:Props) => {
  return (
    <div className="col-start-1 col-end-11 p-3 rounded-lg">
        <div className="flex flex-row items-start">
            <div className="flex items-center justify-center h-10 w-auto p-3 rounded-full bg-green-600 flex-shrink-0">
               AleximGPT 
            </div>
            <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 px-4 pb-3 shadow rounded-xl">
                <Markdown>{text}</Markdown>
                {/* El audio tag ya viene en los navegadores web */}
                <audio
                  controls
                  src={ audio }
                  className="w-full"
                  autoPlay
                />
            </div>
        </div>
    </div>
  )
}