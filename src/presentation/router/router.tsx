import { Navigate, createBrowserRouter } from "react-router-dom";
import { OrthographyPage, ProsConsPage, ProsConsStreamPage, TranslatePage, TextToAudioPage, ImageGenerationPage, ImageTunningPage, AudioToTextPage, AssistantPage, TranslateStreamPage, TranslateStreamGeneratorPage } from "../pages";
import { DashboardLayout } from "../layouts/DashboardLayout";


export const menuRoutes = [
    {
      to: "react/orthography",
      icon: "fa-solid fa-spell-check",
      title: "Ortografía",
      description: "Corregir ortografía",
      component: <OrthographyPage />
    },
    {
      to: "react/pros-cons",
      icon: "fa-solid fa-code-compare",
      title: "Pros & Cons",
      description: "Comparar pros y contras",
      component: <ProsConsPage />
    },
    {
      to: "react/pros-cons-stream",
      icon: "fa-solid fa-water",
      title: "Como stream",
      description: "Con stream de mensajes",
      component: <ProsConsStreamPage />
    },
    {
      to: "react/translate",
      icon: "fa-solid fa-language",
      title: "Traducir",
      description: "Textos a otros idiomas",
      component: <TranslatePage />
    },
    {
      to: "react/translate-stream",
      icon: "fa-solid fa-dumbbell",
      title: "Traducir Stream",
      description: "Textos a otros idiomas",
      component: <TranslateStreamPage />
    },
    {
      to: "react/translate-stream-function",
      icon: "fa-solid fa-user-astronaut",
      title: "Traducir con Stream y Funcion Generadora",
      description: "Textos a otros idiomas",
      component: <TranslateStreamGeneratorPage />
    },
    {
      to: "react/text-to-audio",
      icon: "fa-solid fa-podcast",
      title: "Texto a audio",
      description: "Convertir texto a audio",
      component: <TextToAudioPage />
    },
    {
      to: "react/audio-to-text",
      icon: "fa-solid fa-comment-dots",
      title: "Audio a texto",
      description: "Convertir audio a texto",
      component: <AudioToTextPage />
    },
    {
      to: "react/image-generation",
      icon: "fa-solid fa-image",
      title: "Imágenes",
      description: "Generar imágenes",
      component: <ImageGenerationPage />
    },
    {
      to: "react/image-tunning",
      icon: "fa-solid fa-wand-magic",
      title: "Editar imagen",
      description: "Generación continua",
      component: <ImageTunningPage />
    },
    {
      to: "react/assistant",
      icon: "fa-solid fa-user",
      title: "Asistente",
      description: "Información del asistente",
      component: <AssistantPage />
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