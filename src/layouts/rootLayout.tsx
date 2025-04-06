import useUserStore from "@/store/useUser";
import { useEffect } from "react";
import { Outlet } from "react-router";

// root layout for react-router
export const RootLayout = () => {
  const { validate } = useUserStore();
  useEffect(() => {
    validate();
  }, [validate]);

  return <Outlet />;
};
