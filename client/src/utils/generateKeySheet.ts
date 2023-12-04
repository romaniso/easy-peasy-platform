import Exercises from "../enums/Exercises";

function generateKeySheet (type: Exercises, questions) {
    switch (type) {
        case Exercises.Dropdown:
            return questions.map(
                (question) => question.options.find((option) => option.isCorrect).text
            );
        case Exercises.FillIn:
        case Exercises.DragAndDrop:
            return questions.map((question) => question.isCorrect);
        case Exercises.MultipleChoice:
            return questions.flatMap((question) =>
                question.options.filter((option) => option.isCorrect).map((option) => option.text)
            );
        case Exercises.FillBox:
            return questions
                .map((question) => [question.correctForm, question.correctPlace])
                .sort((a, b) => a[1] - b[1]);
        case Exercises.FillInLetter:
            return questions.map((question) => question.split(""));
        default:
            throw new Error("There is no such an exercise type");
    }
}

export default generateKeySheet;