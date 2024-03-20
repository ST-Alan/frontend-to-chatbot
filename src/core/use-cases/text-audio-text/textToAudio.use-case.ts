//Usualmente las interfaces van con un type para que no importe nada cuando estemos haciendo el build de produccion
//el voice en el parametro de la linea de abajo es el voice
export const textToAudioUseCase = async(prompt:string, voice:string)=>{


    try {
        // De esta manera es una peticion get, pero como quiero una peticion post, le voy a agregar un objeto como segundo argumento
        // const resp = await fetch(`${import.meta.env.VITE_GPT_API}/orthography-check`);
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/text-to-audio`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({prompt, voice})
        });

        if (!resp.ok) throw new Error('No se pudo realizar la generacion del audio');

        // La data no viene como los demas en JSON, viene en mp3
        // const data = await resp.json() as OrthographyResponse //Esto es para los demas
        const audioFile = await resp.blob();
        //Ahora necesito generar un URL que se pueda colocar en un audio tag element o en un audio html element
        const audioUrl = URL.createObjectURL(audioFile)

        console.log({audioUrl})

        // console.log(data)

        // En la misma respuesta puedo colocar el prompt
        // Lo coloco en pares de valores para que se mire mas facil
        return{ok: true, message: prompt, audioUrl:audioUrl}


    } catch (error) {
        return {
            ok:false,
            message:'Catch - No se pudo realizar la generacion del audio',
        }





    }


}