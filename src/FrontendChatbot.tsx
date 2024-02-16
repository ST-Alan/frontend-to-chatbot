import { RouterProvider } from "react-router-dom"
import { router } from "./presentation/router/router"

export const FrontendChatbot = () => {
  return (
    <RouterProvider router={router} />
  )
}
