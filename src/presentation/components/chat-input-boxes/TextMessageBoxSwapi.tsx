import { FormEvent, useState } from "react";

interface Props {
    onSendMessage:(setIdFilm:number,idPerson:string,idPlanet:string,idSpecies:string,idStarship:string,idVehicle:string,emocion:string)=>void;
    placeHolder: string;
    pHIdPerson: string;
    pHIdPlanet: string;
    pHIdSpecies: string;
    pHIdStarship: string;
    pHIdVehicle: string;
    disableCorrections?: boolean;
    options:Option[]
}

interface Option {
    id:string;
    text:number;
}

// Si no viene el disableCorrections lo coloco en false
export const TextMessageBoxSwapi = ({onSendMessage,placeHolder, pHIdPerson,pHIdPlanet,pHIdSpecies,pHIdStarship,pHIdVehicle,disableCorrections=false,options}:Props) => {
  

    const [emocion, setEmocion]=useState('')
    const [idPerson, setIdPerson]=useState('')
    const [idPlanet, setIdPlanet] = useState('')
    const [idSpecies, setIdSpecies] = useState('')
    const [idStarship, setIdStarship] = useState('')
    const [idVehicle, setIdVehicle] = useState('')
    const [idFilm, setIdFilm] = useState<string>('')



    const handleSendMessage = (event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();


        //Cuando mande la emoción quiero verificar si el largo del mensaje es mayor a cero, sino es mando un return para que no haga nada
        if(emocion.trim().length === 0) return;
        if(idFilm === '') return;
        //Si es mayor a cero
        onSendMessage(Number(idFilm),idPerson,idPlanet,idSpecies,idStarship,idVehicle,emocion)
        setEmocion('')

        // console.log('HandleSendMessage')
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
            <button className="btn-primary w-100">
                <span className="mr-2">Enviar</span> 
                <i className="fa-regular fa-paper-plane"></i>
            </button>
        </div>
    </div>
</form>
  )
}