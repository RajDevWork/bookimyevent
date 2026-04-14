import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:3000/api/auth/",
    withCredentials:true
})

//handle login
export const login = async (email, password) => {
    const response = await api.post('/login', { email, password });
    return response.data;
};

//handle register

export const register = async (username,email,password)=>{
    const response = await api.post("/register",{username,email,password})
    return response.data
}


//verify account
export const VerifyMyAccount = async (email,otp)=>{
    const response = await api.post("verify-otp",{email,otp})
    return response.data
}