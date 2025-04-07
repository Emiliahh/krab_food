import { Outlet } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { checkAdmin } from "@/services/authService";
import LoadingSpinner from "@/components/layout/loadingSpinner";
import { UnauthorizedAlertDialog } from "@/components/layout/unauthorizedBox";
import SideTab from "@/components/admin/sideTab";

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
      <div className="flex justify-center min-h-screen items-center">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <UnauthorizedAlertDialog />;
  }
  return (
    <div className="flex overflow-hidden h-screen">
      <div className="sticky top-0 z-10">
        <SideTab />
      </div>
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
