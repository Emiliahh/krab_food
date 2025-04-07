import { createBrowserRouter } from "react-router";
import { RootLayout } from "../layouts/rootLayout";
import HomeLayout from "../layouts/homeLayout";
import Home from "../pages/homePage";
import LoginPage from "@/pages/loginPage";
import RegisterPage from "@/pages/registerPage";
import AdminLayout from "@/layouts/adminLayout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <HomeLayout />,
        children: [{ index: true, element: <Home /> }],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [{
          index: true,
          element: <div>Admin Page</div>,
        }]
      },
    ],
  },
]);
