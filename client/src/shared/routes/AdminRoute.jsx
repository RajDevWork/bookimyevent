import React from 'react'
import { useAuth } from '../../features/auth/hooks/useAuth'
import { Navigate } from 'react-router'

const AdminRoute = ({children}) => {
    const {user} = useAuth()
    if(!user){
        return <Navigate to="/" />
    }
    if(user.role !=='admin'){
        return <Navigate to="/login"/>
    }
    return children
}

export default AdminRoute