import { GetIDSpecies } from "../../../interfaces";


export const getDataSwapiSpecies = async(id:string) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_GPT_API_SWAPI}get-species?id=${Number(id)}`)

    if (!resp.ok) throw new Error('No se pudo realizar la correcion');

    const data = await resp.json() as GetIDSpecies

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