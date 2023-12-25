import {Section} from "../types/section";
import {ExerciseUnit} from "./exerciseUnit";
import {ExerciseTypeName} from "../enums/exercise";

export interface SingleExercise {
    data: {
        units: ExerciseUnit[],
        text?: string;
    };
    instruction: string;
    setId: string;
    title: string;
    type: ExerciseTypeName;
    _id: string;
    section: Section;
}