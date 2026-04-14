import {createBrowserRouter} from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Home from './features/event/pages/Home'
import EventDetails from './features/event/pages/EventDetails'
import AllEvents from './features/event/pages/AllEvents'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/events',
        element: <AllEvents />
    },
    {
        path: '/event/:id',
        element: <EventDetails />
    },
    {
        path:'/login',
        element: <Login />
    },
    {
        path:'/register',
        element: <Register />
    }

])
