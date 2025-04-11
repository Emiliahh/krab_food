import LoadingSpinner from "@/components/layout/loadingSpinner";
import { UnauthorizedAlertDialog } from "@/components/layout/unauthorizedBox";
import { checkAdmin } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router"

const AdminLayout = ()=>{
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
        <Outlet />
    )
}
export default AdminLayout