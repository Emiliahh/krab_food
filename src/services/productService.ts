import { CartItemWithDetails } from "@/types/cartTypes";
import PaginatedResponse from "@/types/paginatedRes";
import { ProductType } from "@/types/productType";
import axios from "axios";

const ProductApi = axios.create({
  baseURL: `http://localhost:5114/api/Product`,
  headers: {
    "Content-Type": "application/json",
  },
});
const getFoodList = async (
  page: number = 1,
  pageSize: number = 10,
  desc: boolean,
  search: string = "",
  categoryId: string = "",
  from: number = 0,
  to: number = Infinity
): Promise<PaginatedResponse<ProductType> | null> => {
  try {
    const queryParams: string[] = [];
    queryParams.push(`page=${page}`);
    queryParams.push(`pageSize=${pageSize}`);
    queryParams.push(`desc=${desc}`);
    if (search.trim()) {
      queryParams.push(`search=${encodeURIComponent(search)}`);
    }
    if (categoryId.trim()) {
      queryParams.push(`categoryId=${encodeURIComponent(categoryId)}`);
    }
    if (from > 0) {
      queryParams.push(`from=${from}`);
    }
    if (to < Infinity) {
      queryParams.push(`to=${to}`);
    }
    const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";
    const response = await ProductApi.get<PaginatedResponse<ProductType>>(
      queryString
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching food list:", error);
    throw error;
  }
};
const getCardDetails = async (
  id: string[]
): Promise<CartItemWithDetails[] | null> => {
  //path is cart-display}
  try {
    const response = await ProductApi.post<CartItemWithDetails[]>(
      "/cart-display",
      id
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching food list:", error);
    throw error;
  }
};
export { getFoodList, getCardDetails };
