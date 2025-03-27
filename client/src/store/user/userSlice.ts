import { createSlice } from "@reduxjs/toolkit";
import { InterestItemText } from "../../enums/interestItem";
import { MotivationItemText } from "../../enums/motivationItem";
import { GoalsObj } from "../../types/goalsObj";
import { loginUser } from "../thunks/userThunk";

interface User {
  username: string;
}

interface UserState {
  user: User;
  isLoading: boolean;
  errorMsg: string | null;
}

interface UserStateWithProfile extends UserState {
  avatar: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  birthday: string | null;
  likes: InterestItemText[];
  motivations: MotivationItemText[];
  goals: GoalsObj | null;
}

const initialState: UserState = {
  user: {
    username: "",
  },
  //  avatar: null,
  //  email: null,
  isLoading: false,
  errorMsg: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.errorMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.username = action.payload.user.username;
        state.isLoading = false;
        state.errorMsg = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload?.message || "Login failed";
      });
  },
});

export const { setUser, clearError } = userSlice.actions;

export default userSlice.reducer;
