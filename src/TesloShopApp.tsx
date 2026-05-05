import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { RouterProvider } from "react-router"
import { appRouter } from "./app.routeer"
import { Toaster } from "sonner"
import { ChechAuthAction } from "./auth/actions/chech-auth.action"
import { type PropsWithChildren } from "react"
import { CustomFullScreenLoading } from "./components/custom/CustomFullScreenLoading"

const queryClient = new QueryClient()

const CheckAuthProvider = ({children}:PropsWithChildren) => {
     const { isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: ChechAuthAction,
        retry: false,
        refetchInterval: 1000 * 60 * 60 * 1.5 
    })

    if(isLoading){
        return <CustomFullScreenLoading />
    }
    
    return children
};
export const TesloShopApp = () => {
   

    return (
        <QueryClientProvider client={queryClient}>
            {/* The rest of your application */}

            <Toaster />
            <CheckAuthProvider>
                <RouterProvider router={appRouter} />
            </CheckAuthProvider>
            
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
