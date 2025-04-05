import { createBrowserRouter } from "react-router";
import { RootLayout } from "../layouts/rootLayout";
import HomeLayout from "../layouts/homeLayout";
import  Home  from "../pages/homePage";

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
