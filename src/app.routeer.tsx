import { createBrowserRouter, Navigate } from "react-router";
import { ShopLayout } from "./shop/layout/ShopLayout";
import { HomePage } from "./shop/pages/HomePage";
import { ProductPage } from "./shop/product/ProductPage";
import { GenderPage } from "./shop/gender/GenderPage";
import { DashboardPage } from "./admin/pages/dashboard/DashboardPage";
import { AdminProductsPages } from "./admin/products/AdminProductsPages";
import { AdminProductPage } from "./admin/product/AdminProductPage";
import { lazy } from "react";
import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";

const AuthLayout = lazy(() => import("./auth/layout/AuthLayout"))
const AdminLayout = lazy(() => import("./admin/layout/AdminLayout"))

export const appRouter = createBrowserRouter([
    //main routes
    {
        path: "/",
        element: <ShopLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "product/:idSlug",
                element: <ProductPage />
            },
            {
                path: "gender/:gender",
                element: <GenderPage />
            }
        ]

    },

    //auth routes
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/auth/login" />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: "register",
                element: <RegisterPage />
            }
        ]
    },

    //admin routes
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <DashboardPage />
            },
            {
                path: "products",
                element: <AdminProductsPages />
            },
            {
                path: "products/:id",
                element: <AdminProductPage />
            }
        ]
    },

    {
        path: "*",
        element: <Navigate to="/" />
    }


])