import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { HomePage } from "./HomePage.jsx";
import { PageNotFound } from "./PageNotFound.jsx";
import { SignupPage } from "./SignupPage.jsx";
import { LoginPage } from "./LoginPage.jsx";
import { HeroSection } from "./HeroSection.jsx";
import { DashboardPage } from "./DashboardPage.jsx";

const routes = createBrowserRouter([
    {
        path : "/",
        Component : HomePage,
        errorElement : <PageNotFound></PageNotFound>,
        children : [
            {
                path : "/herosection",
                Component : HeroSection
            },
            {
                path : "/signup",
                
                Component : SignupPage
            },
            {
                path : "/login",
                Component : LoginPage
            },
            {
                path : "/dashboard",
                Component : DashboardPage
            }
        ]
    }
])

export function App(){
    return (
        <>
            <RouterProvider router={routes}></RouterProvider>
        </>
    )
}
