import { GetIDPeople } from "../../../interfaces";

export const getDataSwapiPeople = async(id:string) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_GPT_API_SWAPI}get-people?id=${Number(id)}`)

    if (!resp.ok) throw new Error('No se pudo realizar la correcion');

    const data = await resp.json() as GetIDPeople

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