import {  NuevoFilmInterface } from "../../../interfaces/nuevoFilm.response";

export const crearHistioriaGuardarEnDB = async(idFilm:number,idPerson:string,idPlanet:string,idSpecies:string,idStarship:string,idVehicle:string,emocion:string,abortSignal:AbortSignal)=>{


    try {
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}new-film-with-swapi-data`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({idFilm,idPerson,idPlanet,idSpecies,idStarship,idVehicle,emocion}),
            //TODO: abortSignal
            signal:abortSignal,
        });

        if (!resp.ok) throw new Error('No se pudo realizar la traduccion');

        const { data } = await resp.json() as NuevoFilmInterface
        console.log('data',data)
        return {
            success :true,
            nuevoFilm:data
        }


    } catch (error) {
        console.log(error)
        return {
            success: false,
            nuevoFilm: null
        };
    }




}
