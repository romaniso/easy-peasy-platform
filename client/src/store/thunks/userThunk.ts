import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../api/endpoints";
import axios from "../../api/axios";
import { UserRole } from "../../enums/userRole";
import { User } from "../../interfaces/user";
import { AxiosError } from "axios";

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
  message: string;
};

export const loginUser = createAsyncThunk<
  LoginResponse, // Return type
  LoginCredentials, // Argument type
  { rejectValue: LoginError } // Error type
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

    return data;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data) {
      const { message } = err.response.data;
      return rejectWithValue({
        message: message || "Login failed",
      });
    }
    return rejectWithValue({
      message: "An unexpected error occurred",
    });
  }
});
