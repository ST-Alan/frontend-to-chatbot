//Usualmente las interfaces van con un type para que no importe nada cuando estemos haciendo el build de produccion

import type { ProsConsResponse } from "../../../interfaces";

export const prosConsUseCase = async(prompt:string)=>{


    try {
        // De esta manera es una peticion get, pero como quiero una peticion post, le voy a agregar un objeto como segundo argumento
        // const resp = await fetch(`${import.meta.env.VITE_GPT_API}/orthography-check`);
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({prompt})
        });

        if (!resp.ok) throw new Error('No se pudo realizar la comparacion');

        const data = await resp.json() as ProsConsResponse

        // console.log(data)

        return{
            ok: true,
            ...data,
        }


    } catch (error) {
        return {
            ok:false,
            content: 'No se pudo realizar la comparacion'
        }





    }


}