import { MotivationItemText } from "../enums/motivationItem";
import { InterestItemText } from "../enums/interestItem";
import { GoalsObj } from "../types/goalsObj";
import { UserRole } from "../enums/userRole";
export type User = {
  username: string;
  profile: {
    avatar: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    birthday: string | null;
    likes: InterestItemText[];
    motivations: MotivationItemText[];
    goals: GoalsObj | null;
  };
  roles: UserRole[];
  accessToken: string;
};
