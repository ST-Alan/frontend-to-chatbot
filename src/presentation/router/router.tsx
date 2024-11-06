import { Navigate, createBrowserRouter } from "react-router-dom";
import {  CreateNewFilmPage, GetFilmIdPage, GetPeopleIdPage, GetPlanetIdPage, GetSpeciesIdPage, GetStarshipsIdPage, GetVehiclesIdPage, TextToAudioPage } from "../pages";
import { DashboardLayout } from "../layouts/DashboardLayout";


export const menuRoutes = [
    {
      to: "get-vehicles",
      icon: "fa-solid fa-car",
      title: "Get Vehicles by id",
      description: "Petición que ve los vehiculos en SWAPI",
      component: <GetVehiclesIdPage />
    },
    {
      to: "get-starships",
      icon: "fa-solid fa-rocket",
      title: "Get Starships by Id",
      description: "Petición a SWAPI para obtener las naves por id",
      component: <GetStarshipsIdPage />
    },
    {
      to: "get-species",
      icon: "fa-brands fa-canadian-maple-leaf",
      title: "Get Species by Id",
      description: "Petición a SWAPI para obtener las especies por id",
      component: <GetSpeciesIdPage />
    },
    {
      to: "get-planet",
      icon: "fa-solid fa-earth-americas",
      title: "Get Planet by Id",
      description: "Petición a SWAPI para obtener planetas por id",
      component: <GetPlanetIdPage />
    },
    {
      to: "get-people",
      icon: "fa-solid fa-user-astronaut",
      title: "Get People by id",
      description: "Petición a SWAPI para obtener las personas por id",
      component: <GetPeopleIdPage />
    },
    {
      to: "get-films",
      icon: "fa-solid fa-user-astronaut",
      title: "Get Film by id",
      description: "Petición SWAPI para obtener film por id",
      component: <GetFilmIdPage />
    },
    {
      to: "post-db-create-new-film",
      icon: "fa-solid fa-film",
      title: "Post - DB - Nuevo Films",
      description: "Obtiene los datos de SWAPI, lo envía a openAi para que cree una nueva saga, y guarda la nueva saga en la base de datos",
      component: <CreateNewFilmPage />
    },
    {
      to: "text-to-audio",
      icon: "fa-solid fa-podcast",
      title: "Texto a audio",
      description: "Convertir texto a audio",
      component: <TextToAudioPage />
    },
  ];


  export const router = createBrowserRouter([
    {
        path:"/",
        element:<DashboardLayout />,
        //Con el children de esta forma, puedo crear una nueva ruta y no debo repetirlo aqui
        children:[
          ...menuRoutes.map( route => ({
            path: route.to, //Ruta a la cual quiero ir
            element: route.component
          })),
          //Ahora voy a indicar que la ruta por defecto va a mostrar el elemento:
          {
            path:'',
            element: < Navigate to={menuRoutes[0].to} />
          }
        ],
    }
])