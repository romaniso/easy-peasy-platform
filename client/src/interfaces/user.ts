import { MotivationItemText } from "../enums/motivationItem";
import { InterestItemText } from "../enums/interestItem";
import { GoalsObj } from "../types/goalsObj";

export type User = {
  username?: string;
  avatar?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  birthday?: string;
  likes?: InterestItemText[];
  motivations?: MotivationItemText[];
  goals?: GoalsObj;
};
