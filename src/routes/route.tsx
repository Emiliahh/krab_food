import { createBrowserRouter } from "react-router";
import { RootLayout } from "../layouts/rootLayout";
import HomeLayout from "../layouts/homeLayout";
import Home from "../pages/homePage";
import LoginPage from "@/pages/loginPage";
import RegisterPage from "@/pages/registerPage";
import ProductPage from "@/pages/admin/productPage";
import CustomerPage from "@/pages/admin/customerPage";
import OrderPage from "@/pages/admin/orderPage";
import NotFound from "@/pages/notFound";
import StaticPage from "@/pages/admin/static";
import ProtectedLayout from "@/layouts/protected";
import AccountPage from "@/pages/accountPage";
import OrderHistory from "@/pages/orderHistory";
import ManagementLayout from "@/layouts/managementLayout";
import CheckOut from "@/pages/checkout";
import PromoPage from "@/pages/admin/promoPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <HomeLayout />,
        children: [{ index: true, element: <Home /> }, {
          element:<ProtectedLayout />,
          children: [
            {
              path:"profile",
              element:<AccountPage />
            },
            {
              path:"order",
              element:<OrderHistory />
            },
          ]
        }],
      },
      {
        path:"checkout",
        element:<CheckOut/>
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "admin",
        element: <ManagementLayout />,
        children: [
          {
            index: true,
            element: <ProductPage />,
          },
          {
            path: "order",
            element: <OrderPage />,
          },
          {
            path: "promo",
            element: <PromoPage />,
          },
          {
            path: "account",
            element: <CustomerPage />,
          },
          {
            path: "static",
            element: <StaticPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
