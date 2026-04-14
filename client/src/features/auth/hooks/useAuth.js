import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login,register,VerifyMyAccount } from './../services/auth.api';

export const useAuth = ()=>{

    const context = useContext(AuthContext)

    const {user,setUser,loading,setLoading} = context


    const handleLogin = async (email,password)=>{
        setLoading(true)
        const response = await login(email,password)
        setUser(response.user)
        setLoading(false)
    }

    const handleRegister = async (username,email,passowrd)=>{
        setLoading(true)
        const response = await register(username,email,passowrd)
        setUser(response.user)
        setLoading(false)
    }

    const handleVerifyAccount = async (email,otp)=>{
        setLoading(true)
        await VerifyMyAccount(email,otp)
        setLoading(false)
    }

    return {
        user, loading, handleLogin,handleRegister,handleVerifyAccount
    }

}
