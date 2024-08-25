import { Schema, model } from "mongoose";
import { RoleName } from "../enums/role";
import { InterestItemText } from "../enums/interestItem";
import { MotivationItemText } from "../enums/motivationItem";
import { GoalsObj } from "../types/goals";
import { VocabularyLimit } from "../enums/vocabularyLimit";
import { WordEntity } from "../types/wordEntity";
import { CompletedActivityEntity } from "../types/completedActivityEntity";

export interface IUser {
  username: string;
  password: string;
  roles: RoleName[];
  refreshToken?: string;
  //Profile values
  avatar?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  birthday?: string;
  likes?: InterestItemText[];
  motivations?: MotivationItemText[];
  // Performance values
  goals?: GoalsObj;
  vocabularyLimit: VocabularyLimit;
  addedVocabulary?: WordEntity[];
  completedActivities?: CompletedActivityEntity[];

  [key: string]:
    | string
    | string[]
    | WordEntity[]
    | CompletedActivityEntity[]
    | GoalsObj
    | VocabularyLimit
    | Date
    | undefined;
}

//@TODO: refactor it with actual arrays/objects structures
const userSchema = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
  refreshToken: { type: String, required: false },
  resetToken: { type: String, required: false },
  resetTokenExpiration: { type: String, required: false },
  avatar: { type: String, required: false },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: false },
  birthday: { type: String, required: false },
  motivations: [{ type: String, required: false }],
  likes: [{ type: String, required: false }],
  goals: { type: Object, required: false },
  vocabularyLimit: { type: Number, required: true },
  addedVocabulary: [{ type: Object, required: false }],
  completedActivities: [{ type: Object, required: false }],
});

export const User = model<IUser>("User", userSchema);
