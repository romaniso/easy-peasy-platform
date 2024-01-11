import {Schema, model} from 'mongoose';
import {RoleName} from "../enums/role";

interface IUser {
    username: string;
    password: string;
    roles: RoleName;
}

const userSchema = new Schema<IUser>({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}]
})

export const User =  model<IUser>('User', userSchema);