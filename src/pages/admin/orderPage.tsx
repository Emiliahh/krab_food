import { getOrder } from "@/services/orderService";
import { OrderStatus, statusLabel } from "@/types/orderTypes";
import { formatCurrency } from "@/util/currencyFormater";
import { useQuery } from "@tanstack/react-query";
const OrderPage = () => {
  const { data: product } = useQuery({
    queryKey: ["orderList"],
    queryFn: () => getOrder(),
  });
  return (
    <div className="flex flex-col items-center p-2">
      <h1 className="text-2xl font-bold mb-4">Danh sách đơn hàng</h1>
      <div className="overflow-x-auto w-full max-w-6xl rounded-box border border-base-content/5 bg-base-100 py-2 px-3">
        <table className="table table-sm ">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Khách hàng</th>
              <th>Thời gian đặt</th>
              <th>Trạng thái</th>
              <th>Tổng tiền</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {product?.map((item) => (
              <tr key={item.id} className="hover:bg-base-300">
                <th>{item.id}</th>
                <td>{item.customerName}</td>
                <td>{new Date(item.orderTime).toLocaleString()}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div
                      className={`badge p-2 ${
                        item.status === OrderStatus.Delivered
                          ? "badge-info"
                          : "badge-accent"
                      }`}
                    >
                      {statusLabel[item.status]}
                    </div>
                    <button
                      className="btn btn-xs btn-outline btn-success"
                    >
                      Cập nhật
                    </button>
                  </div>
                </td>
                <td>{formatCurrency(item.totalPrice)}</td>
                <td>
                  <button className="btn btn-xs btn-primary">
                    Xem chi tiết
                  </button>
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
