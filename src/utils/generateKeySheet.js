function generateKeySheet (type, questions) {
    switch (type) {
        case "dropdown":
            return questions.map(
                (question) => question.options.find((option) => option.isCorrect).text
            );
        case "fill-in":
        case "drag-&-drop":
            return questions.map((question) => question.isCorrect);
        case "multiple-choice":
            return questions.flatMap((question) =>
                question.options.filter((option) => option.isCorrect).map((option) => option.text)
            );
        case "fill-box":
            return questions
                .map((question) => [question.correctForm, question.correctPlace])
                .sort((a, b) => a[1] - b[1]);
        case "fill-in-letter":
            return questions.map((question) => question.split(""));
        default:
            throw new Error("There is no such an exercise type");
    }
}

export default generateKeySheet;