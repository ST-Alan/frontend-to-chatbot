import { GetIDFilm } from "../../../interfaces";


export const getDataSwapi = async(id:string) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_GPT_API_SWAPI}get-films?id=${Number(id)}`)

    if (!resp.ok) throw new Error('No se pudo realizar la correcion');

    const data = await resp.json() as GetIDFilm 

    return{
        ok: true,
        data,
    }

  } catch (error) {
    return{
        ok: false,
        error,
    }
  }
}