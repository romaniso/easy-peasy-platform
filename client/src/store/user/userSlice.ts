import { createSlice } from "@reduxjs/toolkit";
import { InterestItemText } from "../../enums/interestItem";
import { MotivationItemText } from "../../enums/motivationItem";
import { GoalsObj } from "../../types/goalsObj";
import { loginUser } from "../thunks/userThunk";
import { UserRole } from "../../enums/userRole";

interface User {
  username: string;
  profile: UserProfile;
  roles: UserRole[];
  accessToken: string | null;
}

interface UserState {
  user: User; // na poczatku moze musi byc null
  isLoading: boolean;
  errorMsg: string | null;
}

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
        state.user.profile.avatar = action.payload.user.avatar;
        state.user.profile.email = action.payload.user.email;
        state.user.profile.firstName = action.payload.user.firstName;
        state.user.profile.lastName = action.payload.user.lastName;
        state.user.profile.birthday = action.payload.user.birthday;
        state.user.profile.likes = action.payload.user.likes;
        state.user.profile.motivations = action.payload.user.motivations;
        state.user.roles = action.payload.roles;
        state.user.accessToken = action.payload.accessToken;
        state.isLoading = false;
        state.errorMsg = null;
      })
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
