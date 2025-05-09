import { LoginRes } from "@/types/loginRes";
import axios, { AxiosResponse } from "axios";
import Authapi from "./protectedApi";
import { RegisterDto, User } from "@/types/userType";
import { UserManager } from "@/pages/admin/customerPage";

const api = axios.create({
  baseURL: "http://localhost:5114/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});
const login = async (
  email: string,
  password: string
): Promise<AxiosResponse<LoginRes> | null> => {
  try {
    const response = await api.post<LoginRes>(
      "/login",
      { email, password },
      {
        withCredentials: true,
      }
    );
    console.log("Login response:", response);
    return response;
  } catch (error) {
    alert("Invalid email or password");
    throw error;
  }
};
const validate = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await Authapi.get<User>("auth/authorize", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
const checkAcess = async () => {
  try {
    // Calling the check-admin route secured with [Authorize(Roles = "Admin")]
    const response = await Authapi.get("auth/check-access", {
      withCredentials: true,
    });
    console.log("Check admin response:", response);
    return true;
  } catch {
    throw new Error("Unauthorized");
  }
};

const checkAdmin = async () => {
  try {
    // Calling the check-admin route secured with [Authorize(Roles = "Admin")]
    const response = await Authapi.get("auth/check-admin", {
      withCredentials: true,
    });
    console.log("Check admin response:", response);
    return true;
  } catch {
    throw new Error("Unauthorized");
  }
};

const logout = async () => {
  try {
    const response = await Authapi.get("auth/logout", {
      withCredentials: true,
    });
    console.log(response.status);
    return response.status;
  } catch (error) {
    console.error("Error logging out:", error);
    return null;
  }
};

// ➕ Thêm user (đăng ký)
const registerUser = async (user: RegisterDto) => {
  const res = await api.post("/register", user);
  return res;
};

const getUsers = async (): Promise<UserManager[]> => {
  const response = await Authapi.get<UserManager[]>("/User/getuser"); // endpoint API backend
  return response.data;
};

// const deleteUser = async (id: number) => {
//     const res = await axios.delete();
//     return res.data;
// };

export {
  login,
  validate,
  logout,
  checkAcess,
  checkAdmin,
  getUsers,
  registerUser,
};
