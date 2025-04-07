import { UnauthorizedAlertDialog } from "@/components/layout/unauthorizedBox";
import useUser from "@/store/useUser";
import { Outlet } from "react-router";

const ProtectedLayout = () => {
  const { isAuthenticated } = useUser();
  if (!isAuthenticated) {
    return <UnauthorizedAlertDialog />;
  }
  return <Outlet />;
};
export default ProtectedLayout;
