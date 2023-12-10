import {ExerciseType} from "../types/exerciseType";
import {Section} from "../types/section";
import {ExerciseUnit} from "./exerciseUnit";

export interface SingleExercise {
    data: {
        units: ExerciseUnit[],
        text?: string;
    };
    instruction: string;
    setId: string;
    title: string;
    type: ExerciseType;
    _id: string;
    section: Section;
}