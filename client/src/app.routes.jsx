import {createBrowserRouter} from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Home from './features/event/pages/Home'
import EventDetails from './features/event/pages/EventDetails'
import AllEvents from './features/event/pages/AllEvents'
import CreateEvent from './features/event/pages/CreateEvent'
import AllBookings from './features/booking/pages/AllBookings'
import ProtectedRoute from './shared/routes/ProtectedRoute'
import AdminRoute from './shared/routes/AdminRoute'

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
        element: <AdminRoute><CreateEvent /></AdminRoute>
    },
    {
        path: '/event/:id',
        element: <EventDetails />
    },
    {
        path: '/bookings',
        element: <ProtectedRoute><AllBookings /></ProtectedRoute>
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
