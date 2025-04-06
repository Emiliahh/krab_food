import { User } from "./userType";

interface LoginRes {
    token:string,
    user: User,
}
export type { LoginRes };