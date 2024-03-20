export async function*  translateTexStreamGeneratorUseCase(prompt:string, lang:string, abortSignal:AbortSignal){


    try {
        // De esta manera es una peticion get, pero como quiero una peticion post, le voy a agregar un objeto como segundo argumento
        // const resp = await fetch(`${import.meta.env.VITE_GPT_API}/orthography-check`);
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/translate-stream`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({prompt, lang}),
            //TODO: abortSignal
            signal:abortSignal,
        });

        if (!resp.ok) throw new Error('No se pudo realizar la traduccion');


        // Cuando es con stream de esta forma se crea un reader
        const reader = resp.body?.getReader();
        if(!reader){
            console.log('No se pudo generar el reader')
            return null;
        }

        //El reader cuando se reciba, basicamente es para hacer el decoder y todo ese codigo que se hizo anteriormente

        // Para imprimir un mensaje en consola necesito un decodificador
        const decoder = new TextDecoder();
        
        let text = '';
        while( true ){
            // Aqui vamos a tomar 2 cosas del reader
            const {value, done} = await reader.read();
            // Cuando este el done, es decir cuando ya no hay mas informacion y se emitio nuestra respuesta
            // Esto va a otro ByteLengthQueuingStrategy, pero aqui src/core/use-cases/translateTextStream.use-case.ts permite ver los valores en consola
            if(done){
                break;
            }

            const decodedChunk = decoder.decode(value, {stream:true});
            text += decodedChunk;
            console.log(text)

            yield text;
        }



    } catch (error) {
        console.log(error)
        return null
    }




}
