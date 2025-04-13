import { CartItemWithDetails } from "@/types/cartTypes";
import PaginatedResponse from "@/types/paginatedRes";
import { Category, ProductType, UploadProductType } from "@/types/productType";
import axios from "axios";
import Authapi from "./protectedApi";

const ProductApi = axios.create({
  baseURL: `http://localhost:5114/api/Product`,
  headers: {
    "Content-Type": "application/json",
  },
});
// https://localhost:5114/api/Product/?page="page"&=pageSize="pageSize"&desc="desc"&search="search"&categoryId="categoryId"&from="from"&to="to"
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
const getCategoryList = async (): Promise<Category[] | null> => {
  try {
    const response = await ProductApi.get<Category[]>("/category");
    return response.data;
  } catch (error) {
    console.error("Error fetching category list:", error);
    throw error;
  }
};
const addProduct = async (product: UploadProductType) => {
  try {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price.toString());
    formData.append("description", product.description);
    formData.append("categoryId", product.categoryId);
    if (product.image) {
      formData.append("image", product.image);
    }
    const response = await Authapi.post<ProductType>("product/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Important for file upload
      },
    });
    return response;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

const upateProduct = async (product: UploadProductType, id: string) => {
  try {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price.toString());
    formData.append("description", product.description);
    formData.append("categoryId", product.categoryId);
    if (product.image) {
      formData.append("image", product.image);
    }
    const response = await Authapi.put<ProductType>(
      `product/update/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file upload
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export {
  getFoodList,
  getCardDetails,
  getCategoryList,
  addProduct,
  upateProduct,
};
