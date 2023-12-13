import {ExerciseType} from "../types/exerciseType";
import {ExerciseUnit} from "../interfaces/exerciseUnit";

function generateKeySheet (type: ExerciseType, questions: (ExerciseUnit)[]): (string | string[])[] {
    switch (type) {
        case "dropdown":
            return questions.map(
                (question) => (question.options?.find((option) => option.isCorrect)?.text) || ""
            );

        case "fill-in":
        case "drag-&-drop":
            return questions.map((question) => question.isCorrect?.toString() || "");

        case "multiple-choice":
            return questions.flatMap((question) =>
                question.options?.filter((option) => option.isCorrect).map((option) => option.text) || []
            );
        case "fill-box":
            return (
                questions
                    .map((question) => [question.correctForm, question.correctPlace] as [string, number])
                    .sort((a, b) => Number(a[1]) - Number(b[1]))
                    .map((pair) => pair[0]?.toString() || "")
            );

        case "fill-in-letter":
            return questions.map(({question}) => question.split(""));

        default:
            throw new Error("There is no such an exercise type");
    }
}

export default generateKeySheet;