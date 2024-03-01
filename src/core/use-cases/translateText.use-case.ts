import { TranslateResponse } from "../../interfaces";

export const translateTexUsecase = async(prompt:string, lang:string) => {


    try {
        // De esta manera es una peticion get, pero como quiero una peticion post, le voy a agregar un objeto como segundo argumento
        // const resp = await fetch(`${import.meta.env.VITE_GPT_API}/orthography-check`);
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/translate`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({prompt, lang}),
        });

        if (!resp.ok) throw new Error('No se pudo realizar la traduccion');

        // const data= await resp.json() as TranslateResponse;
        // Desestructuro data y queda asi:
        const {message} = await resp.json() as TranslateResponse;

        // console.log(data)

        return {
            ok: true,
            message:message,
        }





    } catch (error) {
        console.log(error)

        return{
            ok: false,
            message: 'No se pudo traducir'
        }
    }




}
