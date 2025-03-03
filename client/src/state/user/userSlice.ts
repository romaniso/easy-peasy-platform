import { createSlice } from "@reduxjs/toolkit";
//import { InterestItemText } from "../../enums/interestItem";
//import { MotivationItemText } from "../../enums/motivationItem";
//import { GoalsObj } from "../../types/goalsObj";

interface UserState {
  username: string;
  //  avatar: string;
  //  email: string;
  //  firstName: string;
  //  lastName: string;
  //  birthday: string;
  //  likes: InterestItemText[];
  //  motivations: MotivationItemText[];
  //  goals: GoalsObj;
}

const initialState: UserState = {
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
