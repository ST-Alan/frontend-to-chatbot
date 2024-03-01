import { FormEvent, useState } from "react";

interface Props {
    onSendMessage:(message:string,setSelectedOption:string)=>void;
    placeHolder?: string;
    disableCorrections?: boolean;
    options:Option[]
}

interface Option {
    id:string;
    text:string;
}

// Si no viene el disableCorrections lo coloco en false
export const TextMessageBoxSelect = ({onSendMessage,placeHolder,disableCorrections=false,options}:Props) => {
  

    const[message, setMessage]=useState('')
    const [selectedOption, setSelectedOption] = useState<string>('')



    const handleSendMessage = (event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();


        //Cuando mande el message quiero verificar si el largo del mensaje es mayor a cero, sino es mando un return para que no haga nada
        if(message.trim().length === 0) return;
        if(selectedOption === '') return;
        //Si es mayor a cero
        onSendMessage(message, selectedOption)
        setMessage('')

        // console.log('HandleSendMessage')
    }
  
    return (
        <form
            onSubmit={handleSendMessage}
            className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
        >
            <div className="flex-grow">
                <div className="flex">

                    <input 
                        type="text"
                        autoFocus
                        name="message"
                        className="w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h10"
                        placeholder={placeHolder}
                        autoComplete={disableCorrections ? 'on' : 'off'}
                        autoCorrect={disableCorrections ? 'on' : 'off'}
                        spellCheck={disableCorrections ? 'true' : 'false'}
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                    />

                    <select 
                        name="select"
                        className="w-2/5 ml-5 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        value={selectedOption}
                        onChange={e=>setSelectedOption(e.target.value)}
                    >
                        <option value=''>Seleccione</option>
                        {
                            // options.map((option)=>( // Mejor desestructuro
                            options.map(({id, text})=>(
                                <option key={id} value={id}>{text}</option>
                            ))
                        }
                    </select>

                </div>
            </div>


            <div className="ml-4">
                <button className="btn-primary">
                    <span className="mr-2">Enviar</span> 
                    <i className="fa-regular fa-paper-plane"></i>
                </button>

            </div>



        </form>
  )
}