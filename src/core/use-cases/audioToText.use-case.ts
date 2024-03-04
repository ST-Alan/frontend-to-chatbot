//Usualmente las interfaces van con un type para que no importe nada cuando estemos haciendo el build de produccion
import type { AudioToTextResponse } from "../../interfaces";

//Aca creo que primero va el text/message o el propmt
export const audioToTextUseCase = async(audioFile:File, prompt?:string)=>{


    try {

        // console.log({audioFile,prompt})
        //TODO - Para pasar el archivo y el texto es conveniente pasarlo como formData

        const formData = new FormData();

        // Luego le hacemos un append del file, porque en el backend le avisamos que le ibamos aesperar con el nombre file
        // El siguiente valor es lo que lel vamos a adjuntar, es decir el audioFile
        formData.append('file', audioFile)
        if(prompt){
            formData.append('prompt', prompt)
        }

        // De esta manera es una peticion get, pero como quiero una peticion post, le voy a agregar un objeto como segundo argumento
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/audio-to-text`,{
            method: 'POST',
            //En este caso los headers los podemos obviar
            // headers:{
            //     'Content-Type':'application/json'
            // },
            // body:JSON.stringify({prompt})
            body:formData
        });

        // Esto lo que va a obtener es la respuesta que devuelve el postman
        // const resp = await fetch(`${import.meta.env.VITE_GPT_API}/audio-to-text`,{
            // method: 'POST',
            // body:formData});
        //Para ello, me copio la respuesta del postman y me creo una interfaz: src/interfaces/audioToText.response.ts
        

        //Con resp peudo hacer lo siguiente:
        const data = await resp.json() as AudioToTextResponse
        //data es igual a un json que me lo va a tratar como la interfaz AudioToTextResponse

        //La data tiene todo lo que yo necesito, voy a hacer un return de la data

        return data

        // Esas dos lineas se peuden resumir en una sola: return await resp.json() as AudioToTextResponse

    } catch (error) {
        console.log(error);
        return null;



    }


}