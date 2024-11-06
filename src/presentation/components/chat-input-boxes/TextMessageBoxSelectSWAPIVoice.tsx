import { FormEvent, useState } from "react";

interface Props {
    onSendMessage:(selectedVoice:string,setIdFilm:string,idPerson:string,idPlanet:string,idSpecies:string,idStarship:string,idVehicle:string,emocion:string)=>void;
    placeHolder: string;
    pHIdPerson: string;
    pHIdPlanet: string;
    pHIdSpecies: string;
    pHIdStarship: string;
    pHIdVehicle: string;
    disableCorrections?: boolean;
    options:Option[];
    optionsVoice:OptionVoices[];
}

interface Option {
    id:string;
    text:number;
}

interface OptionVoices {
    id:string;
    text:string;
}
export const TextMessageBoxSelectSwapiVoice = ({onSendMessage,placeHolder,pHIdPerson,pHIdPlanet,pHIdSpecies,pHIdStarship,pHIdVehicle,disableCorrections=false,options,optionsVoice}:Props) => {
  

    const [emocion, setEmocion]=useState('')
    const [idPerson, setIdPerson]=useState('')
    const [idPlanet, setIdPlanet] = useState('')
    const [idSpecies, setIdSpecies] = useState('')
    const [idStarship, setIdStarship] = useState('')
    const [idVehicle, setIdVehicle] = useState('')
    const [idFilm, setIdFilm] = useState<string>('')
    const [selectedOption, setSelectedOption] = useState<string>('')

    const handleSendMessage = (event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();

        if(emocion.trim().length === 0) return;
        if(idPerson.trim().length === 0) return;
        if(idPlanet.trim().length === 0) return;
        if(idSpecies.trim().length === 0) return;
        if(idStarship.trim().length === 0) return;
        if(idVehicle.trim().length === 0) return;
        if(idFilm === '') return;
        if(selectedOption === '') return;
        
        onSendMessage(selectedOption,idFilm,idPerson,idPlanet,idSpecies,idStarship,idVehicle,emocion)
   

    }
  
    return (
            <form
                onSubmit={handleSendMessage}
                className="d-flex flex-column p-4 bg-white rounded"
            >
                <div className="row mb-3">
                    <div className="col-8">
                        <input 
                            type="text"
                            autoFocus
                            name="emocion"
                            className="w-100 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4"
                            placeholder={placeHolder}
                            autoComplete={disableCorrections ? 'on' : 'off'}
                            autoCorrect={disableCorrections ? 'on' : 'off'}
                            spellCheck={disableCorrections ? 'true' : 'false'}
                            value={emocion}
                            onChange={(e) => setEmocion(e.target.value)}
                        />
                    </div>
                    <div className="col-4">
                        <select 
                            name="select"
                            className="w-100 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4"
                            value={idFilm}
                            onChange={e => setIdFilm(e.target.value)}
                        >
                            <option value=''>Seleccione id del Film</option>
                            {
                                options.map(({ id, text }) => (
                                    <option key={id} value={id}>{text}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-4">
                        <input 
                            type="text"
                            autoFocus
                            name="idPerson"
                            className="w-100 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4"
                            placeholder={pHIdPerson}
                            autoComplete={disableCorrections ? 'on' : 'off'}
                            autoCorrect={disableCorrections ? 'on' : 'off'}
                            spellCheck={disableCorrections ? 'true' : 'false'}
                            value={idPerson}
                            onChange={(e) => setIdPerson(e.target.value)}
                        />
                    </div>
                    <div className="col-4">
                        <input 
                            type="text"
                            autoFocus
                            name="idPlanet"
                            className="w-100 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4"
                            placeholder={pHIdPlanet}
                            autoComplete={disableCorrections ? 'on' : 'off'}
                            autoCorrect={disableCorrections ? 'on' : 'off'}
                            spellCheck={disableCorrections ? 'true' : 'false'}
                            value={idPlanet}
                            onChange={(e) => setIdPlanet(e.target.value)}
                        />
                    </div>
                    <div className="col-4">
                        <input 
                            type="text"
                            autoFocus
                            name="idSpecies"
                            className="w-100 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4"
                            placeholder={pHIdSpecies}
                            autoComplete={disableCorrections ? 'on' : 'off'}
                            autoCorrect={disableCorrections ? 'on' : 'off'}
                            spellCheck={disableCorrections ? 'true' : 'false'}
                            value={idSpecies}
                            onChange={(e) => setIdSpecies(e.target.value)}
                        />
                    </div>
                </div>


                <div className="row">
                    <div className="col-4">
                        <input 
                            type="text"
                            autoFocus
                            name="idStarship"
                            className="w-100 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4"
                            placeholder={pHIdStarship}
                            autoComplete={disableCorrections ? 'on' : 'off'}
                            autoCorrect={disableCorrections ? 'on' : 'off'}
                            spellCheck={disableCorrections ? 'true' : 'false'}
                            value={idStarship}
                            onChange={(e) => setIdStarship(e.target.value)}
                        />
                    </div>
                    <div className="col-4">
                        <input 
                            type="text"
                            autoFocus
                            name="idVehicle"
                            className="w-100 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4"
                            placeholder={pHIdVehicle}
                            autoComplete={disableCorrections ? 'on' : 'off'}
                            autoCorrect={disableCorrections ? 'on' : 'off'}
                            spellCheck={disableCorrections ? 'true' : 'false'}
                            value={idVehicle}
                            onChange={(e) => setIdVehicle(e.target.value)}
                        />
                    </div>
                    <div className="col-4 d-flex align-items-end">
                        <select 
                            name="selectedVoice"
                            className="w-100 ml-5 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
                            value={selectedOption}
                            onChange={e=>setSelectedOption(e.target.value)}
                        >
                            <option value=''>Seleccione voz</option>
                            {
                                // options.map((option)=>( // Mejor desestructuro
                                optionsVoice.map(({id, text})=>(
                                    <option key={id} value={id}>{text}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 d-flex align-items-end">
                        <button className="btn-primary w-100">
                            <span className="mr-2">Enviar</span> 
                            <i className="fa-regular fa-paper-plane"></i>
                        </button>
                    </div>
                </div>                 
    </form>
  )
}