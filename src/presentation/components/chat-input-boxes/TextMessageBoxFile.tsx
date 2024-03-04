import { FormEvent, useRef, useState } from "react";

interface Props {
    onSendMessage:(message:string, file:File)=>void; // Aqui el file es el audio. File esta en node asi que no hay que importar nada
    placeHolder?: string;
    disableCorrections?: boolean;
    accept?: string; // Algo como image/*
}


// Si no viene el disableCorrections lo coloco en false
export const TextMessageBoxFile = ({onSendMessage,placeHolder,disableCorrections=false, accept}:Props) => {
  

    const[message, setMessage]=useState('');

    const [selectedFile, setSelectedFile] = useState<File | null>()
    const inputFileRef = useRef<HTMLInputElement>(null);



    const handleSendMessage = (event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();


        //Cuando mande el message quiero verificar si el largo del mensaje es mayor a cero, sino es mando un return para que no haga nada
        // if(message.trim().length === 0) return;// En audio to text, el texto es opcional, por lo que se comenta
        if( !selectedFile ) return; // Si el archivo seleccionado es nulo, no hagas nada
        //Si es mayor a cero
        onSendMessage(message, selectedFile) // Agrego el archivo selccionado
        setMessage('')
        setSelectedFile(null);

        // console.log('HandleSendMessage')
    }
  
    return (
        <form
            onSubmit={handleSendMessage}
            className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
        >

            <div className="mr-3">
                <button
                    type="button"
                    className="flex items-center justify-center text-gray-400 hover:text-gray-600"
                    onClick={()=>inputFileRef.current?.click()}
                >
                    <i className="fa-solid fa-paperclip text-xl"></i>

                </button>
                <input
                    type="file"
                    ref={inputFileRef}
                    accept={accept}
                    //Aca es posible agregar un muiltiselect
                    onChange={(e)=>setSelectedFile(e.target.files?.item(0))}
                    hidden
                />



            </div>



            <div className="flex-grow">
                <div className="relative w-full">

                    <input 
                        type="text"
                        autoFocus
                        name="message"
                        className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h10"
                        placeholder={placeHolder}
                        autoComplete={disableCorrections ? 'on' : 'off'}
                        autoCorrect={disableCorrections ? 'on' : 'off'}
                        spellCheck={disableCorrections ? 'true' : 'false'}
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                    />

                </div>
            </div>


            <div className="ml-4">
                <button 
                    className="btn-primary"
                    // disabled={!selectedFile} --Esta linea es para deshabilitar el boton sino se tienen ningun archivo seleccionado
                >
                    {
                        (!selectedFile)
                        ?<span className="mr-2">Enviar</span> 
                        : <span className="mr-2">{selectedFile.name.substring(0,15) + '...' }</span> 
                    }
                    <i className="fa-regular fa-paper-plane"></i>
                </button>

            </div>



        </form>
  )
}