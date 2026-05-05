import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interface/auth.response";

export const ChechAuthAction = async ():Promise<AuthResponse> =>{
    const token = localStorage.getItem('token');
    if(!token) throw new Error('No token found');

    try{
        const {data} = await tesloApi.get<AuthResponse>('/auth/chech-status');
        localStorage.setItem('token',token);

        return data;
    } catch(error){
        localStorage.removeItem('token');
        console.log({error});
        throw new Error('Token expired or not valid');
        
    }
}