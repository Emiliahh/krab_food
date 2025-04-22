import { Key } from "react";

interface User {
    id: Key | null | undefined;
    address?: string;
    fullname: string;
    phone: string;
    email?: string;
    roles: string[];
    status?: "active" | "blocked";
}
interface UserRegistration extends User {
  password: string;
}
interface UserUpdate extends User {
  password?: string;
  newPassword?: string;
}
export type { User, UserRegistration, UserUpdate };