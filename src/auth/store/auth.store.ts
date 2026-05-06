import type { User } from '@/interfaces/user.interface'
import { create } from 'zustand'
import { loginAction } from '../actions/login.action'
import { ChechAuthAction } from '../actions/chech-auth.action'


type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking'
type AuthState = {
    //Properties

    user: User | null,
    token: string | null,
    authStatus: AuthStatus,

    //Getters
    isAdmin: () => boolean

    //Actions
    login: (email: string, password: string) => Promise<boolean>
    logout: () => void
    checkAuthStatus: () => Promise<boolean>

}

export const useAuthStore = create<AuthState>()((set,get) => ({
    //implementacion del store
    user: null,
    token: null,
    authStatus: 'checking',

    //Actions
    login: async (email: string, password: string) => {
        console.log({ email, password });
        try {
            const data = await loginAction(email, password)
            localStorage.setItem('token', data.token)
            set({user: data.user, token: data.token, authStatus: 'authenticated' })
            return true;
        } catch (error) {
            set({user: null, token: null, authStatus: 'not-authenticated' })
            localStorage.removeItem('token')
            console.error(error)
            return false
        }

    },
    
    logout: () =>{
        localStorage.removeItem('token')
        set({user: null, token: null, authStatus: 'not-authenticated' })
    },

    checkAuthStatus: async () =>{
        try{
            const {user,token} = await ChechAuthAction();
            set({
                user: user,
                token:token,
                authStatus: 'authenticated'
            })
            return true;
        }catch(error){
            set({
                user:null,
                token:null,
                authStatus: 'not-authenticated'
            })
            return false;
        }
    },

    isAdmin: () =>{
        const roles = get().user?.roles ?? []
        
        return roles.includes('admin')
    }
}))


