import { CreateOrderType, OrderTypes } from "@/types/orderTypes";
import Authapi from "./protectedApi";

const createOrder = async (data: CreateOrderType) => {
  try {
    const response = await Authapi.post<CreateOrderType>("order/create", data);
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
export { createOrder , getOrder };
