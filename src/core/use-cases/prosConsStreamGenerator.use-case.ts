//Usualmente las interfaces van con un type para que no importe nada cuando estemos haciendo el build de produccion

export async function* prosConsStreamGeneratorUseCase(prompt:string, abortSignal:AbortSignal){


    try {
        // De esta manera es una peticion get, pero como quiero una peticion post, le voy a agregar un objeto como segundo argumento
        // const resp = await fetch(`${import.meta.env.VITE_GPT_API}/orthography-check`);
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({prompt}),
            //TODO: abortSignal
            signal:abortSignal,
        });

        if (!resp.ok) throw new Error('No se pudo realizar la comparacion');

        const reader = resp.body?.getReader();
        if(!reader){
            console.log('No se pudo generar el reader');
            return null;
        }



        const decoder = new TextDecoder();

        let text = '';
        while( true ){
            const { value, done } = await reader.read();
            if( done ) {
                break;
            }


            const decodedChunk = decoder.decode(value,{ stream:true });

            text += decodedChunk;

            console.log(text)

            yield text;


        }



    } catch (error) {
        console.log(error)
        return null;
    }


}