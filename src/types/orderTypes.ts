interface CreateOrderType {
  paymentMethod: PaymentMethod;
  address: string;
  deliveryFee: number;
  promoCode?: string;
  note: string;
  createOrderDetailDtos: CreateOrderDetailType[];
}

interface CreateOrderDetailType {
  productId: string;
  quantity: number;
  note: string;
}

interface OrderTypes {
  id: string;
  paymentMethod: number;
  userId: string;
  status: OrderStatus;
  address: string;
  totalPrice: number;
  discount?: string;
  deliveryFee: number;
  orderTime: string;
  internalNote?: string;
  deliveryTime: string;
  note: string;
  customerName: string;
  isPaid: boolean;
  orderDetails: OrderDetail[];
}

interface OrderDetail {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  note: string;
}
enum OrderStatus {
  Pending = 1,
  Delivering = 2,
  Delivered = 3,
  Cancel = 4,
}
const statusLabel: Record<OrderStatus, string> = {
  [OrderStatus.Pending]: "Đang chờ",
  [OrderStatus.Delivering]: "Đang giao",
  [OrderStatus.Delivered]: "Đã giao",
  [OrderStatus.Cancel]: "Đã hủy",
};

enum PaymentMethod {
  Cash = 1,
  QR_Pay = 2,
}
export type { CreateOrderType, CreateOrderDetailType, OrderDetail, OrderTypes };
export { OrderStatus, PaymentMethod };
export { statusLabel };
