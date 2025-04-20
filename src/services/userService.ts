import { User } from "@/types/userType";
import Authapi from "./protectedApi";

interface UpdateUser {
  fullname?: string;
  phone?: string;
  address?: string;
}
const UpdateUser = async ( data: UpdateUser) => {
  try {
    const respone = await Authapi.post<User>("user/update/", data);
    return respone.data;
  } catch (e) {
    console.error("Error updating user:", e);
    throw e;
  }
};
export { UpdateUser };
