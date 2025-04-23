import OrderCard from "@/components/home/history";
import LoadingSpinner from "@/components/layout/loadingSpinner";
import { GetOrdeUser } from "@/services/orderService";
import { OrderStatus, statusLabel } from "@/types/orderTypes";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const OrderHistory = () => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(
    OrderStatus.Pending
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders", selectedStatus],
    queryFn: () => GetOrdeUser(selectedStatus),
    refetchOnWindowFocus: false,
  });

  return (
    <div className="w-full p-5 flex justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center">Lịch sử đơn hàng</h1>

        <div className="flex flex-wrap gap-2 justify-center">
          {Object.values(OrderStatus)
            .filter((v) => typeof v === "string")
            .map((statusKey) => {
              const status = OrderStatus[statusKey as keyof typeof OrderStatus];
              return (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedStatus === status
                      ? "bg-closet text-white shadow-md"
                      : "bg-white border text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {statusLabel[status]}
                </button>
              );
            })}
        </div>

        {isLoading && <LoadingSpinner />}
        {isError && (
          <div className="alert alert-error shadow mt-4">
            <span>Đã có lỗi xảy ra trong quá trình tải đơn hàng.</span>
          </div>
        )}
        {!isLoading && data?.length === 0 && (
          <div className="alert alert-info shadow mt-4">
            <span>Không có đơn hàng nào trong trạng thái này.</span>
          </div>
        )}
        {data?.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
