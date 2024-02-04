import {Schema, model} from 'mongoose';
import {RoleName} from "../enums/role";

export interface IUser {
    username: string;
    password: string;
    roles: RoleName[];
    refreshToken?: string;
    //NEW
    avatar?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    birthday?: Date;
    likes?:string[];
    motivations?:string[];
    [key: string]: string | string[] | Date | undefined;
}

const userSchema = new Schema<IUser>({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}],
    refreshToken: {type: String, required: false},
    avatar: {type: String, required: false},
    firstName: {type: String, required: false},
    lastName: {type: String, required: false},
    email: {type: String, required: false},
    birthday: {type: Date, required: false},
    motivations: [{type: String, required: false}],
    likes: [{type: String, required: false}],

})

export const User =  model<IUser>('User', userSchema);