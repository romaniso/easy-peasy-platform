import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { API_URL } from "../../api/endpoints";
import axios, { axiosPrivate } from "../../api/axios";
import { User } from "../../interfaces/user";

interface Credentials {
  username: string;
  password: string;
}

export type ResponseError = {
  errMsg: string;
};

export type LoginResponse = {
  accessToken: string;
  user: User;
};

export type UpdateResponse = {
  user: User;
};

export const loginUser = createAsyncThunk<
  LoginResponse,
  Credentials,
  { rejectValue: ResponseError }
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

export const updateUser = createAsyncThunk<
  UpdateResponse,
  User,
  { rejectValue: ResponseError }
>("user/update", async (updatedUser, { rejectWithValue }) => {
  try {
    const { data } = await axiosPrivate.put<UpdateResponse>(
      API_URL.users,
      updatedUser,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data) {
      const { message } = err.response.data;
      return rejectWithValue({
        errMsg: message || "Update failed",
      });
    } else {
      return rejectWithValue({
        errMsg: `An unexpected error occurred: ${(err as Error).message}`,
      });
    }
  }
});

//@TODO: add response type
export const logoutUser = createAsyncThunk("user/logout", async () => {
  try {
    await axios(API_URL.logout, {
      withCredentials: true,
    });
  } catch (err) {
    console.error(err);
  }
});
