import {ExerciseTypeName} from "../enums/exercise";
import {ExerciseUnit} from "../interfaces/exerciseUnit";

function generateKeySheet (type: ExerciseTypeName, questions: (ExerciseUnit)[]): (string | string[])[] {
    switch (type) {
        case ExerciseTypeName.Dropdown:
            return questions.map(
                (question) => (question.options?.find((option) => option.isCorrect)?.text) || ""
            );

        case ExerciseTypeName.FillIn:
        case ExerciseTypeName.DragAndDrop:
            return questions.map((question) => question.isCorrect?.toString() || "");

        case ExerciseTypeName.MultipleChoice:
            return questions.flatMap((question) =>
                question.options?.filter((option) => option.isCorrect).map((option) => option.text) || []
            );
        case ExerciseTypeName.FillBox:
            return (
                questions
                    .map((question) => [question.correctForm, question.correctPlace] as [string, number])
                    .sort((a, b) => Number(a[1]) - Number(b[1]))
                    .map((pair) => pair[0]?.toString() || "")
            );

        case ExerciseTypeName.FillInLetter:
            return questions.map(({question}) => question.split(""));

        default:
            throw new Error("There is no such an exercise type");
    }
}

export default generateKeySheet;