import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost/api/auth/",
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
