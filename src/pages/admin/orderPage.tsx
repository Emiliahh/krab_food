import OrderDetailModal from "@/components/admin/detailModal";
import OrderStatusModal from "@/components/admin/updateStatusModal";
import { DatePickerDemo } from "@/components/layout/datePicker";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationPrevious,
//   PaginationLink,
//   PaginationEllipsis,
//   PaginationNext,
// } from "@/components/ui/pagination";
import usePaginateHook from "@/hooks/paginateHook";
import { getOrder, updateOrderStatus } from "@/services/orderService";
import { OrderStatus, statusLabel } from "@/types/orderTypes";
import { formatCurrency } from "@/util/currencyFormater";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { toast } from "react-toastify";
const OrderPage = () => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(
    OrderStatus.Pending
  );
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const { data: product, refetch } = useQuery({
    queryKey: ["orderList", selectedStatus, page],
    queryFn: () => getOrder(selectedStatus, Number.parseInt(page), 10),
  });
  const list = usePaginateHook({
    page: Number(page),
    totalPage: product?.totalPage ?? 0,
    range: 2,
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
    <div className="flex flex-col items-center p-2 gap-10 ">
      <div className="flex w-full max-w-6xl items-center gap-6 ">
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
      <div className="w-full max-w-6xl rounded-box border border-base-content/10 bg-base-100 p-2">
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
            {product?.data.map((item, index) => (
              <tr
                key={item.id}
                className={`hover:bg-base-300 ${
                  index !== product?.data.length - 1
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
      <div className="py-10 flex justify-center w-full">
        <nav className="flex items-center justify-center space-x-2">
          {/* Nút Previous */}
          <Link
            to={`${window.location.pathname}?page=${Math.max(
              1,
              Number(page) - 1
            )}`}
            className={`flex items-center justify-center px-3 py-2 rounded-md text-sm border border-gray-200 ${
              Number(page) <= 1
                ? "text-gray-400 pointer-events-none"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ChevronLeft size={16} className="mr-1" />
            Trước
          </Link>

          {/* Nếu trang đầu lớn hơn 1 thì hiện trang 1 và dấu ... */}
          {list[0] > 1 && (
            <>
              <Link
                to={`${window.location.pathname}?page=1`}
                className="flex items-center justify-center w-10 h-10 rounded-md text-sm border border-gray-200 text-gray-700 hover:bg-gray-100"
              >
                1
              </Link>
              <span className="flex items-center justify-center w-10 h-10 text-gray-500">
                ...
              </span>
            </>
          )}

          {/* Map số trang */}
          {list.map((p) => (
            <Link
              key={p}
              to={`${window.location.pathname}?page=${p}`}
              className={`flex items-center justify-center w-10 h-10 rounded-md text-sm ${
                Number(page) === p
                  ? "bg-closet text-white"
                  : "border border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {p}
            </Link>
          ))}

          {/* Nếu trang cuối nhỏ hơn tổng số trang thì hiện ... và trang cuối */}
          {list[list.length - 1] < (product?.totalPage ?? 1) && (
            <>
              <span className="flex items-center justify-center w-10 h-10 text-gray-500">
                ...
              </span>
              <Link
                to={`${window.location.pathname}?page=${product?.totalPage}`}
                className="flex items-center justify-center w-10 h-10 rounded-md text-sm border border-gray-200 text-gray-700 hover:bg-gray-100"
              >
                {product?.totalPage}
              </Link>
            </>
          )}

          {/* Nút Next */}
          <Link
            to={`${window.location.pathname}?page=${Math.min(
              Number(page) + 1,
              product?.totalPage ?? 1
            )}`}
            className={`flex items-center justify-center px-3 py-2 rounded-md text-sm border border-gray-200 ${
              Number(page) >= (product?.totalPage ?? 1)
                ? "text-gray-400 pointer-events-none"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Tiếp
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </nav>
      </div>
    </div>
  );
};
export default OrderPage;
