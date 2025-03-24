import { createSlice } from "@reduxjs/toolkit";
import { InterestItemText } from "../../enums/interestItem";
import { MotivationItemText } from "../../enums/motivationItem";
import { GoalsObj } from "../../types/goalsObj";
import { loginUser } from "../thunks/userThunk";

interface UserState {
  username: string;
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
  username: "",
  //  avatar: null,
  //  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state = action.payload.user;
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
