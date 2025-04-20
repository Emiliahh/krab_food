interface User {
  address?: string;
  fullname: string;
  phone: string;
  email?: string;
  roles :string[];
}
interface UserRegistration extends User {
  password: string;
}
interface UserUpdate extends User {
  password?: string;
  newPassword?: string;
}
export type { User, UserRegistration, UserUpdate };