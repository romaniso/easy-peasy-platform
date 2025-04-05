import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InterestItemText } from "../../enums/interestItem";
import { MotivationItemText } from "../../enums/motivationItem";
import { GoalsObj } from "../../types/goalsObj";
import { loginUser, LoginResponse } from "../thunks/userThunk";
import { UserRole } from "../../enums/userRole";

interface UserProfile {
  avatar: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  birthday: string | null;
  likes: InterestItemText[];
  motivations: MotivationItemText[];
  goals: GoalsObj | null;
}

interface User {
  username: string;
  profile: UserProfile;
  roles: UserRole[];
  accessToken: string | null;
}

interface UserState {
  user: User;
  isLoading: boolean;
  errorMsg: string | null;
}

const initialState: UserState = {
  user: {
    username: "",
    profile: {
      avatar: null,
      email: null,
      firstName: null,
      lastName: null,
      birthday: null,
      likes: [],
      motivations: [],
      goals: null,
    },
    roles: [],
    accessToken: null,
  },
  isLoading: false,
  errorMsg: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.errorMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.user = {
            ...action.payload.user,
            accessToken: action.payload.accessToken,
          };
          state.isLoading = false;
          state.errorMsg = null;
        }
      )
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload?.errMsg || "Login failed";
      });
  },
});

export const { setUser, clearError } = userSlice.actions;

export default userSlice.reducer;
