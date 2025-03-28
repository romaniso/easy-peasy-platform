import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

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

export type LoginError = {
  errMsg: string;
};

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: LoginError }
>("user/login", async ({ username, password }, { rejectWithValue }) => {
  try {
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
    console.log("data", data);

    return data;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data) {
      const { message } = err.response.data;
      return rejectWithValue({
        errMsg: message || "Login failed",
      });
    } else {
      return rejectWithValue({
        errMsg: `An unexpected error occurred: ${(err as Error).message}`,
      });
    }
  }
});
