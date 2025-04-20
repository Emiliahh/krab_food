import { CreateOrderType, OrderStatus, OrderTypes } from "@/types/orderTypes";
import Authapi from "./protectedApi";

const createOrder = async (data: CreateOrderType) => {
  try {
    const response = await Authapi.post<{
      orderId: string;
      totalPrice: number;
    }>("order/create", data);
    return response.data;
  } catch (e) {
    console.error("Error creating order:", e);
    throw e;
  }
};
const getOrder = async () => {
  try {
    const response = await Authapi.get<OrderTypes[]>(`order/`);
    return response.data;
  } catch (e) {
    console.error("Error getting order:", e);
    throw e;
  }
};
const updateOrderStatus = async (id: string, status: number) => {
  try {
    // 1: pending, 2: delivering, 3: delivered, 4: cancel
    const isValid = status in OrderStatus;
    if (!isValid) {
      throw new Error("Invalid status");
    }
    const response = await Authapi.put(`order/update/${id}`, {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (e) {
    console.error("Error updating order status:", e);
    throw e;
  }
};

export { createOrder, getOrder , updateOrderStatus };
