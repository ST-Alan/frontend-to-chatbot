//Usualmente las interfaces van con un type para que no importe nada cuando estemos haciendo el build de produccion

import type { OrthographyResponse } from "../../interfaces";

export const orthographyUseCase = async(prompt:string)=>{


    try {
        // De esta manera es una peticion get, pero como quiero una peticion post, le voy a agregar un objeto como segundo argumento
        // const resp = await fetch(`${import.meta.env.VITE_GPT_API}/orthography-check`);
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/orthography-check`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({prompt})
        });

        if (!resp.ok) throw new Error('No se pudo realizar la correcion');

        const data = await resp.json() as OrthographyResponse

        // console.log(data)

        return{
            ok: true,
            ...data,
        }


    } catch (error) {
        return {
            ok:false,
            userScore:0,
            errors:[],
            message:'No se pudo realizar la correcion',
        }





    }


}