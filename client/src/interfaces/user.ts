import {MotivationItemText} from "../enums/motivationItem";
import {InterestItemText} from "../enums/interestItem";

export type User = {
    username?: string;
    avatar?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    likes?: InterestItemText[];
    motivations?: MotivationItemText[];
}