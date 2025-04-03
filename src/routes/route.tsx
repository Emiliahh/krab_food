import { createBrowserRouter } from "react-router";
import { RootLayout } from "../layouts/root";
import HomeLayout from "../layouts/home";
import  Home  from "../pages/home";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <HomeLayout />,
        children: [{ index: true, element: <Home /> }],
      },
    ],
  },
]);
