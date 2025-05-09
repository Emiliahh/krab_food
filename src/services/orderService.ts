import { CreateOrderType, OrderStatus, OrderTypes } from "@/types/orderTypes";
import Authapi from "./protectedApi";
import PaginatedResponse from "@/types/paginatedRes";

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
const GetOrdeUser = async (id: number) => {
  try {
    if (id < 1 || id > 4) {
      throw new Error("Invalid order status ID");
    }
    const response = await Authapi.get<OrderTypes[]>(
      `/order/userOrder/?status=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};
const getOrder = async (
  id: number,
  page: number = 1,
  pageSize: number = 10,
  from?: Date,
  to?: Date
) => {
  try {
    const response = await Authapi.get<PaginatedResponse<OrderTypes>>(
      `order/`,
      {
        params: {
          status: id,
          page,
          pageSize,
          from: from?.toISOString() ?? null,
          to: to?.toISOString() ?? null,
        },
      }
    );
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
const UserCancelOrder = async (id: string) => {
  try {
    const response = await Authapi.post(`order/cancel`, null, {
      params: { orderId: id },
    });
    return response.data;
  } catch (e) {
    console.error("Error updating order status:", e);
    throw e;
  }
};

export {
  createOrder,
  getOrder,
  updateOrderStatus,
  GetOrdeUser,
  UserCancelOrder,
};
