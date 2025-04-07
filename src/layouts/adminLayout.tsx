import { Outlet } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { checkAdmin } from "@/services/authService";
import LoadingSpinner from "@/components/layout/loadingSpinner";
import { UnauthorizedAlertDialog } from "@/components/layout/unauthorizedBox";

const AdminLayout = () => {
  const { isLoading, error } = useQuery({
    queryKey: ["checkAdmin"],
    queryFn: () => checkAdmin(),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center min-h-svh items-center">
        <LoadingSpinner />
      </div>
    ); // You can style this or show a spinner
  }
  if (error) {
    return <UnauthorizedAlertDialog />;
  }
  return <Outlet />;
};

export default AdminLayout;
