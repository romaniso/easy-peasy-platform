function ExerciseFillInLetter({questions, onChange, results}){
    const renderedExercise = questions.map((word, index) => {
        return <div key={index}>{word}</div>
    })

    return <div>{renderedExercise}</div>
}

export default ExerciseFillInLetter;