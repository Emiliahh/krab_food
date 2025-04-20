import OrderDetailModal from "@/components/admin/detailModal";
import OrderStatusModal from "@/components/admin/updateStatusModal";
import { DatePickerDemo } from "@/components/layout/datePicker";
import { getOrder, updateOrderStatus } from "@/services/orderService";
import { OrderStatus, statusLabel } from "@/types/orderTypes";
import { formatCurrency } from "@/util/currencyFormater";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
const OrderPage = () => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(
    null
  );
  console.log(Object.values(OrderStatus));
  const { data: product, refetch } = useQuery({
    queryKey: ["orderList"],
    queryFn: () => getOrder(),
  });
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const handleUpdate = async (id: string, status: number) => {
    try {
      // 1: pending, 2: delivering, 3: delivered, 4: cancel
      const isValid = status in OrderStatus;
      if (!isValid) {
        toast.error("Trạng thái không hợp lệ");
        return;
      }
      const res = await updateOrderStatus(id, status);
      if (res) {
        toast.success("Cập nhật trạng thái thành công");
        refetch();
      } else {
        toast.error("Failed to update order status:");
      }
    } catch (e) {
      console.error("Error updating order status:", e);
      throw e;
    }
  };
  return (
    <div className="flex flex-col items-center p-2 gap-10">
      {/* add search bar */}

      <div className="flex w-full max-w-6xl items-center gap-6 ">
        <select className="bg-gray-100 text-black rounded px-4 py-2">
          <option value="">Tất cả</option>
          <option value="1">Đang chờ</option>
          <option value="2">Đang giao</option>
          <option value="3">Đã giao</option>
          <option value="4">Đã hủy</option>
        </select>
        <div className="flex items-center bg-gray-100 rounded px-4 py-2 flex-2/3 ">
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng..."
            className="bg-transparent outline-none w-full text-black"
          />
        </div>
        <label>Từ</label>
        <DatePickerDemo date={fromDate || new Date()} setDate={setFromDate} />
        <label>Đến</label>
        <DatePickerDemo date={toDate || new Date()} setDate={setToDate} />
      </div>
      <div className="flex flex-row gap-2 w-full max-w-6xl items-center">
        <button
          key="all"
          onClick={() => setSelectedStatus(null)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedStatus === null
              ? "bg-closet text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Tất cả
        </button>

        {Object.values(OrderStatus)
          .filter((v) => typeof v === "string")
          .map((statusKey) => {
            const status = OrderStatus[statusKey as keyof typeof OrderStatus]; 
            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedStatus === status
                    ? "bg-closet text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {statusLabel[status]}
              </button>
            );
          })}
      </div>
      <div className="overflow-x-auto w-full max-w-6xl rounded-box border border-base-content/10 bg-base-100 p-2">
        <table className="table table-sm ">
          <thead className="border-b border-base-content/10">
            <tr>
              <th>STT</th>
              <th>Mã đơn hàng</th>
              <th>Khách hàng</th>
              <th>Thời gian đặt</th>
              <th>Trạng thái</th>
              <th>Tổng tiền</th>
              <th>Thanh toán</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {product?.map((item, index) => (
              <tr
                key={item.id}
                className={`hover:bg-base-300 ${
                  index !== product?.length - 1
                    ? "border-b border-base-content/10"
                    : ""
                }`}
              >
                <td>{index + 1}</td>
                <th>{item.id}</th>
                <td>{item.customerName}</td>
                <td>{new Date(item.orderTime).toLocaleString()}</td>
                <td>
                  <div className="flex items-center justify-between gap-2 w-full">
                    <div className={`badge p-2 flex-1 text-center text-xs`}>
                      {statusLabel[item.status]}
                    </div>
                    <OrderStatusModal
                      defaultStatus={item.status}
                      handleSave={(newStatus: number) => {
                        handleUpdate(item.id, newStatus);
                      }}
                    />
                  </div>
                </td>
                <td>{formatCurrency(item.totalPrice)}</td>
                <td>{item.isPaid ? "có" : "chưa"}</td>
                <td>
                  <OrderDetailModal data={item}></OrderDetailModal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrderPage;
