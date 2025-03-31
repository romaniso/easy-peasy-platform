import { MotivationItemText } from "../enums/motivationItem";
import { InterestItemText } from "../enums/interestItem";
import { GoalsObj } from "../types/goalsObj";
import { UserRole } from "../enums/userRole";
export type User = {
  username: string;
  profile: {
    avatar: string;
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    likes: InterestItemText[];
    motivations: MotivationItemText[];
    goals: GoalsObj;
  };
  roles: UserRole[];
};
