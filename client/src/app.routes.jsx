import {createBrowserRouter} from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Home from './features/event/pages/Home'
import EventDetails from './features/event/pages/EventDetails'
import AllEvents from './features/event/pages/AllEvents'
import CreateEvent from './features/event/pages/CreateEvent'
import AllBookings from './features/booking/pages/AllBookings'

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
        path: '/events-create',
        element: <CreateEvent />
    },
    {
        path: '/event/:id',
        element: <EventDetails />
    },
    {
        path: '/bookings',
        element: <AllBookings />
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
