import type { User } from '@/interfaces/user.interface'
import { create } from 'zustand'
import { loginAction } from '../actions/login.action'


type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking'
type AuthState = {
    //Properties

    user: User | null,
    token: string | null,
    authStatus: AuthStatus,
    //Actions
    login: (email: string, password: string) => Promise<boolean>
    logout: () => void

}

export const useAuthStore = create<AuthState>()((set) => ({
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
            set({user: data.user, token: data.token })
            return true;
        } catch (error) {
            set({user: null, token: null })
            localStorage.removeItem('token')
            console.error(error)
            return false
        }

    },
    
    logout: () =>{
        localStorage.removeItem('token')
        set({user: null, token: null })
    }
}))


