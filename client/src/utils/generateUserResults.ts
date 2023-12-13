import findDifferentIndexesInArrays from "./findDifferentIndexesInArrays";
import {UserResult} from "../types/userResult";
import {ExerciseType} from "../types/exerciseType";

function generateUserResults (userAnswers: string[], keys: (string | string[])[], type: ExerciseType): UserResult[]  {
    return userAnswers.map((answer, index) => {
        const arrAnswer: string[] = answer.split("");
        if (type === "fill-in-letter") {
            const results: number[] = findDifferentIndexesInArrays(
                keys[index] as string[],
                arrAnswer
            );
            return results.length ? results : "Same";
        }
        return answer.toLowerCase() === (keys[index]).toString().toLowerCase()
            ? "Same"
            : "Different";
    });
}

export default generateUserResults;