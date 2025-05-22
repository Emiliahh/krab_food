import {UserCancelOrder} from "@/services/orderService";
import {
    OrderStatus,
    OrderTypes,
    PaymentMethod,
    statusLabel,
} from "@/types/orderTypes";
import {useQueryClient} from "@tanstack/react-query";
import {ChevronDown, ChevronUp} from "lucide-react";
import React, {useState} from "react";
import {toast} from "react-toastify";

interface OrderCardProps {
    order: OrderTypes;
}

const formatCurrency = (num: number) =>
    num.toLocaleString("vi-VN", {style: "currency", currency: "VND"});

const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const getPaymentMethodLabel = (method: number): string => {
    return method === PaymentMethod.Cash ? "Tiền mặt" : "Thanh toán QR";
};

const getStatusColor = (status: OrderStatus): string => {
    switch (status) {
        case OrderStatus.Pending:
            return "bg-yellow-100 text-yellow-800";
        case OrderStatus.Delivering:
            return "bg-blue-100 text-blue-800";
        case OrderStatus.Delivered:
            return "bg-green-100 text-green-800";
        case OrderStatus.Cancel:
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const OrderCard: React.FC<OrderCardProps> = ({order}) => {
    const [expanded, setExpanded] = useState(false);
    const statusColorClass = getStatusColor(order.status);
    const queryClient = useQueryClient();
    const handleCancel = async () => {
        const res = await UserCancelOrder(order.id);
        if (res) {
            toast.success("Huỷ đơn hàng thành công");
            queryClient.invalidateQueries({queryKey: ["orders"]}).then();
        } else {
            toast.error("Huỷ đơn hàng thất bại");
        }
    };

    // Get product image URL with cache busting
    const getProductImage = (productId: string) => {
        return `http://localhost:5114/uploads/${productId}.jpg?t=${new Date().getTime()}`;
    };

    return (
        <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 p-4">
                <div>
                    <p className="text-xs text-gray-500">Mã đơn hàng</p>
                    <p className="font-medium">
                        {order.id.length > 8 ? `#${order.id.substring(0, 8)}...` : order.id}
                    </p>
                </div>
                <div
                    className={`rounded-full px-3 py-1 ${statusColorClass.split(" ")[0]}`}
                >
          <span className={statusColorClass.split(" ")[1]}>
            {statusLabel[order.status]}
          </span>
                </div>
            </div>

            {/* Order Details */}
            <div className="p-4">
                {/* Basic Order Info */}
                <div className="mb-3 flex justify-between">
                    <span className="text-gray-500">Thời gian đặt:</span>
                    <span>{formatDate(order.orderTime)}</span>
                </div>

                {order.deliveryTime && <div className="mb-3 flex justify-between">
                    <span className="text-gray-500">Thời gian nhận</span>
                    <span>{formatDate(order.deliveryTime)}</span>
                </div>}
                {order.internalNote && (
                    <div className="mb-3 flex justify-between">
                        <span className="text-gray-500">Ghi chú </span>
                        <span>{order.internalNote}</span>
                    </div>
                )}
                <div className="mb-3 flex">
                    <span className="w-24 text-gray-500">Địa chỉ:</span>
                    <span className="flex-1">{order.address}</span>
                </div>

                <div className="mb-3 flex justify-between">
                    <span className="text-gray-500">Phương thức thanh toán:</span>
                    <span>{getPaymentMethodLabel(order.paymentMethod)}</span>
                </div>

                {order.note && (
                    <div className="mb-4">
                        <span className="mb-1 block text-gray-500">Ghi chú:</span>
                        <p className="rounded bg-gray-50 p-2 text-sm">{order.note}</p>
                    </div>
                )}

                {/* First Order Detail Item with Image */}
                {order.orderDetails.length > 0 && (
                    <div className="mt-4 rounded-lg border border-gray-100 bg-gray-50 p-2">
                        <div className="flex items-center gap-x-4">
                            <img
                                src={getProductImage(order.orderDetails[0].productId)}
                                className="h-16 w-16 rounded-md object-cover"
                                alt={order.orderDetails[0].productName}
                            />
                            <div className="flex-1">
                                <p className="font-medium">
                                    {order.orderDetails[0].productName}
                                </p>
                                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    {formatCurrency(order.orderDetails[0].price)} x{" "}
                      {order.orderDetails[0].quantity}
                  </span>
                                    <span className="font-medium">
                    {formatCurrency(
                        order.orderDetails[0].price *
                        order.orderDetails[0].quantity
                    )}
                  </span>
                                </div>
                                {order.orderDetails[0].note && (
                                    <p className="mt-1 text-xs italic text-gray-500">
                                        Ghi chú: {order.orderDetails[0].note}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Expanded Additional Items with Images */}
                {expanded && order.orderDetails.length > 1 && (
                    <div className="mt-2 space-y-2">
                        {order.orderDetails.slice(1).map((detail, index) => (
                            <div
                                key={`${detail.productId}-${index}`}
                                className="rounded-lg border border-gray-100 bg-gray-50 p-2"
                            >
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={getProductImage(detail.productId)}
                                        className="h-16 w-16 rounded-md object-cover"
                                        alt={detail.productName}
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium">{detail.productName}</p>
                                        <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        {formatCurrency(detail.price)} x {detail.quantity}
                      </span>
                                            <span className="font-medium">
                        {formatCurrency(detail.price * detail.quantity)}
                      </span>
                                        </div>
                                        {detail.note && (
                                            <p className="mt-1 text-xs italic text-gray-500">
                                                Ghi chú: {detail.note}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Show More/Less Button */}
                {order.orderDetails.length > 1 && (
                    <button
                        className="mt-3 flex w-full items-center justify-center py-1"
                        onClick={() => setExpanded(!expanded)}
                    >
            <span className="mr-1 text-sm font-medium text-blue-600">
              {expanded
                  ? "Thu gọn"
                  : `Xem thêm ${order.orderDetails.length - 1} món`}
            </span>
                        {expanded ? (
                            <ChevronUp size={16} className="text-blue-600"/>
                        ) : (
                            <ChevronDown size={16} className="text-blue-600"/>
                        )}
                    </button>
                )}

                {/* Order Summary */}
                <div className="mt-4 border-t border-gray-100 pt-3">
                    <div className="flex justify-between py-1">
                        <span className="text-gray-500">Tiền hàng:</span>
                        <span>
              {formatCurrency(
                  order.orderDetails.reduce(
                      (sum, detail) => sum + detail.price * detail.quantity,
                      0
                  )
              )}
            </span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span className="text-gray-500">Phí giao hàng:</span>
                        <span>{formatCurrency(order.deliveryFee)}</span>
                    </div>
                    {order.discount && (
                        <div className="flex justify-between py-1">
                            <span className="text-gray-500">Giảm giá:</span>
                            <span className="text-red-500">-{order.discount}</span>
                        </div>
                    )}
                    <div className="mt-2 flex justify-between border-t border-gray-200 pt-2">
                        <span className="font-medium">Tổng cộng:</span>
                        <span className="text-lg font-bold text-red-600">
              {formatCurrency(order.totalPrice)}
            </span>
                    </div>
                </div>
            </div>

            {/* Footer - Payment Status */}
            <div className="flex items-center justify-between bg-gray-50 p-4">
                <span className="font-medium">Trạng thái thanh toán:</span>
                <div className="flex items-center gap-x-5">
                    <button
                        onClick={handleCancel}
                        disabled={order.status != OrderStatus.Pending}
                        className="btn btn-ghost"
                    >
                        Huỷ
                    </button>
                    <div
                        className={`rounded-full px-3 py-1 ${
                            order.isPaid ? "bg-green-100" : "bg-orange-100"
                        }`}
                    >
            <span
                className={`${
                    order.isPaid ? "text-green-800" : "text-orange-800"
                }`}
            >
              {order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
