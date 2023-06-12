import { $host, $authHost } from "./index";
import jwt_decode from 'jwt-decode'

export const registration = async (email, password, role) => {
    const {data} = await $host.post('/api/user/registration', {email, password, role})

    localStorage.setItem('token', data.token) //save data about user in token into a local data storage 

    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('/api/user/login', {email, password})

    localStorage.setItem('token', data.token) //save data about user in token into a local data storage 

    return jwt_decode(data.token)
}

export const auth = async () => {
    const {data} = await $authHost.get('/api/user/auth')
    
    localStorage.setItem('token', data.newToken) //save data about user in token into a local data storage 

    return jwt_decode(data.newToken) //after recconecting user got a new jwt
}

export const updateUserRole = async ({userEmail, newUserRole}) => {

    try{
    const {data} = await $authHost.post('/api/user/updateUserRole', {userEmail, newUserRole})

    return data
    }

    catch(e){
        alert("An error occured: " + e.message);
    }
}