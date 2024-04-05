import { Schema, model } from "mongoose";
import { RoleName } from "../enums/role.js";

interface IRole {
  value: string;
}

const roleSchema = new Schema<IRole>({
  value: { type: String, unique: true, default: RoleName.User },
});

export const Role = model<IRole>("Role", roleSchema);
