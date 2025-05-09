interface User {
  id?: string;
  address?: string;
  fullname: string;
  phone: string;
  email?: string;
  roles: string[];
  status?: "active" | "blocked";
}
interface RegisterDto {
  fullname: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
}
interface UserUpdate extends User {
  password?: string;
  newPassword?: string;
}
export type { User, RegisterDto, UserUpdate };
