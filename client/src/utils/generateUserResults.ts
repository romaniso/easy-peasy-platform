import findDifferentIndexesInArrays from "./findDifferentIndexesInArrays";
import {UserResult} from "../types/userResult";
import {ExerciseTypeName} from "../enums/exercise";

function generateUserResults (userAnswers: string[], keys: (string | string[])[], type: ExerciseTypeName): UserResult[]  {
    return userAnswers.map((answer, index) => {
        const arrAnswer: string[] = answer.split("");
        if (type === ExerciseTypeName.FillInLetter) {
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