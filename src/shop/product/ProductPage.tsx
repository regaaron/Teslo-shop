import { useAuthStore } from "@/auth/store/auth.store"


export const ProductPage = () => {

    const {user,token} = useAuthStore();
    return (
        <>
            <p>ProductPage</p>
            <p>{JSON.stringify(user)}</p>
            <p>{token}</p>
        </>
    )
}
