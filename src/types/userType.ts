interface User {
  address?: string;
  name: string;
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