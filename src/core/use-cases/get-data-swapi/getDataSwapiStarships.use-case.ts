import { GetIDStarships } from "../../../interfaces";

export const getDataSwapiStarships = async(id:string) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_GPT_API_SWAPI}get-starships?id=${Number(id)}`)

    if (!resp.ok) throw new Error('No se pudo realizar la correcion');

    const data = await resp.json() as GetIDStarships

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