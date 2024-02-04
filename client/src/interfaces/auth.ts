import {UserRole} from "../enums/userRole";

export interface Auth {
    password: string;
    refreshToken?: string;
    roles: UserRole[];
    username: string;
    __v: number;
    _id: string;
}