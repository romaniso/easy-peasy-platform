import {Schema, model} from 'mongoose';
import {RoleName} from "../enums/role";

interface IUser {
    username: string;
    password: string;
    roles: RoleName[];
    refreshToken?: string;
}

const userSchema = new Schema<IUser>({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}],
    refreshToken: {type: String, unique: true},
})

export const User =  model<IUser>('User', userSchema);