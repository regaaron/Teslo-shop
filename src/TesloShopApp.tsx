import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { RouterProvider } from "react-router"
import { appRouter } from "./app.routeer"

const queryClient = new QueryClient()

export const TesloShopApp = () => {
    return (
        <QueryClientProvider client={queryClient}>
            {/* The rest of your application */}
            <RouterProvider router={appRouter} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
