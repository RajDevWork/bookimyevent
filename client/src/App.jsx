import { RouterProvider } from "react-router"
import {router} from './app.routes'
import { AuthProvider } from "./features/auth/auth.context"
import { EventContextProvider } from "./features/event/event.context"

const App = () => {
  return (
    <AuthProvider>
      <EventContextProvider>
          <RouterProvider router={router} />
      </EventContextProvider>
    </AuthProvider>
  )
}

export default App