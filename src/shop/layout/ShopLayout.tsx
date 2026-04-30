import { Outlet } from "react-router"
import { CustomHeader } from "../components/CustomHeader"
import { CustomFotter } from "../components/CustomFotter"

export const ShopLayout = () => {
    return (
        <div className="min-h-screen bg-background">
            <CustomHeader />
            <Outlet />
            <CustomFotter />
        </div>
    )
}
