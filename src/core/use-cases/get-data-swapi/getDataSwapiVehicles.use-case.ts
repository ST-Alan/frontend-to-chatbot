import { GetIDVehiculos } from "../../../interfaces";

export const getDataSwapiVehicles = async(id:string) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_GPT_API_SWAPI}get-vehicles?id=${id}`)

    if (!resp.ok) throw new Error('No se pudo realizar la correcion');

    const data = await resp.json() as GetIDVehiculos

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