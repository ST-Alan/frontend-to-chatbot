export const textToAudioUseCase = async(selectedVoice:string,idFilm:number,idPerson:string,idPlanet:string,idSpecies:string,idStarship:string,idVehicle:string,emocion:string)=>{
console.log(`
    selectedVoice:${selectedVoice},
    idFilm:${idFilm},
    idPerson:${idPerson},
    idPlanet:${idPlanet},
    idSpecies:${idSpecies},
    idStarship:${idStarship},
    idVehicle:${idVehicle},
    emocion:${emocion}`
)

    try {
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}text-to-audio`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({selectedVoice,idFilm,idPerson,idPlanet,idSpecies,idStarship,idVehicle,emocion})
        });

        if (!resp.ok) throw new Error('No se pudo realizar la generacion del audio');

        const audioFile = await resp.blob();

        const audioUrl = URL.createObjectURL(audioFile)

        console.log(audioUrl)

        return{ok: true, message: 'Disfruta este audio', audioUrl:audioUrl}


    } catch (error) {
        return {
            ok:false,
            message:'Catch - No se pudo realizar la generacion del audio',
        }
    }


}