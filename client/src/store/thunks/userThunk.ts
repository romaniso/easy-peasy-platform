import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../api/endpoints";
import axios from "../../api/axios";
import { UserRole } from "../../enums/userRole";
import { User } from "../../interfaces/user";

interface LoginCredentials {
  username: string;
  password: string;
}

export type LoginResponse = {
  accessToken: string;
  roles: UserRole[];
  user: User;
};

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ username, password }: LoginCredentials) => {
    const { data } = await axios.post<LoginResponse>(
      API_URL.login,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return data;
  }
);
