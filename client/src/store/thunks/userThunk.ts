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

export const updateUser = createAsyncThunk(
  "user/update",
  async (updatedUser) => {
    try {
      const { data, status } = await axiosPrivate.put(
        API_URL.users,
        updatedUser,
        {
          withCredentials: true,
        }
      );
      if (status === 200) {
        //  dispatch(setUser(updatedUser));
        //@TODO: replace toasting to an InterestsForm:
        //  toast?.open(t("interests.toastMessage.success"), ToastType.Success);
        return data;
      }
    } catch (err) {
      console.error(err);
      //@TODO: replace toasting to an InterestsForm:
      //toast?.open(t("interests.toastMessage.failure"), ToastType.Failure);
    }
  }
);
