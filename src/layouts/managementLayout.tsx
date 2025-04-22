import { Outlet } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { checkAcess } from "@/services/authService";
import LoadingSpinner from "@/components/layout/loadingSpinner";
import { UnauthorizedAlertDialog } from "@/components/layout/unauthorizedBox";
import SideTab from "@/components/admin/sideTab";
import { toast } from "react-toastify";
import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";

const ManagementLayout = () => {
    const { isLoading, error, refetch } = useQuery({
        queryKey: ["checkAccess"],
        queryFn: () => checkAcess(),
        retry: false,
        refetchOnWindowFocus: true,
        staleTime: 5 * 60 * 1000,
    });
    useEffect(() => {
        refetch();
    }, []);
    const queryClient = useQueryClient();
    useEffect(() => {
        if (error || isLoading) return;

        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5114/adminHub")
            .withAutomaticReconnect()
            .build();

        connection.on("OrderCreated", () => {
            toast.info("đơn hàng mới");
            queryClient.invalidateQueries({ queryKey: ["orderList"] });
        });
        connection.on("OrderUpdated", () => {
            toast.info("đơn hàng đã được cập nhật");
            queryClient.invalidateQueries({ queryKey: ["orderList"] });
        });

        connection
            .start()
            .then(() => {
                toast.success("Welcome!");
                console.log("SignalR connected successfully");
            })
            .catch((err) => {
                console.error("SignalR Error:", err);
                // toast.error("Không thể kết nối đến máy chủ thông báo");
            });

        return () => {
            connection.stop();
        };
    }, [isLoading, error, queryClient]);
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

export default ManagementLayout;
