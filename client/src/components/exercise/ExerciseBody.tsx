//#region imports
import React, {useEffect, useState} from "react";
import {useSpeechSynthesis} from "react-speech-kit";
import Button from "../Button";
// Exercise Types
import ExerciseDraggable from "./ExerciseDraggable";
import ExerciseDropdown from "./ExerciseDropdown";
import ExerciseFill from "./ExerciseFill";
import Flashcard from "../Flashcard";
import ExerciseFillBox from "./ExerciseFillBox";
import ExerciseMultipleChoice from "./ExerciseMultipleChoice";
import ExerciseFillInLetter from "./ExerciseFillInLetter";
import Exercises from "../../enums/Exercises";

//#endregion

interface ExerciseBodyProps {
    exerciseType: Exercises;
}

const ExerciseBody: React.FC<ExerciseBodyProps> = ({onSubmit, btnText = "Check out", exerciseType, questions, results, selections, onSelect, text}) => {
    const [generalAmericanVoice, setGeneralAmericanVoice] = useState(null);
    const {voices, speak} = useSpeechSynthesis();

    useEffect(() => {
        if (voices && voices.length > 0) {
            const voice = voices.find((v) => v.name === "Google US English");
            setGeneralAmericanVoice(voice);
        }
    }, [voices]);

    const handleSelectChange = (index, event) => {
        const updatedValues = [...selections];


        if(exerciseType === Exercises.FillInLetter) {
            updatedValues[index] = event.join('');
            onSelect(updatedValues);
            return;
        }
        //@todo: Maybe SWITCH?
        updatedValues[index] =
            exerciseType === Exercises.DragAndDrop || Exercises.MultipleChoice || Exercises.FillInLetter ? event : event.target.value;
        onSelect(updatedValues);
    };

    let renderedExercise;
    switch (exerciseType) {
        case Exercises.MultipleChoice:
            renderedExercise = (
                <form onSubmit={onSubmit}>
                    <ExerciseMultipleChoice
                        questions={questions}
                        results={results}
                        selections={selections}
                        onChange={handleSelectChange}
                    />
                    <Button primary rounded className="w-full md:w-1/5" type="submit">
                        {btnText}
                    </Button>
                </form>
            );
            break;
        case Exercises.Dropdown:
            renderedExercise = (
                <form onSubmit={onSubmit}>
                    <ExerciseDropdown
                        questions={questions}
                        results={results}
                        selections={selections}
                        onChange={handleSelectChange}
                    />
                    <Button primary rounded className="w-full md:w-1/5" type="submit">
                        {btnText}
                    </Button>
                </form>
            );
            break;
        case Exercises.FillIn:
            renderedExercise = (
                <form onSubmit={onSubmit}>
                    <ExerciseFill
                        questions={questions}
                        results={results}
                        onChange={handleSelectChange}
                    />
                    <Button primary rounded className="w-full md:w-1/5" type="submit">
                        {btnText}
                    </Button>
                </form>
            );
            break;
        case Exercises.FillInLetter:
            renderedExercise = (
                <form onSubmit={onSubmit}>
                    <ExerciseFillInLetter
                        questions={questions}
                        results={results}
                        onChange={handleSelectChange}
                    />
                    <Button primary rounded className="w-full md:w-2/5" type="submit">
                        {btnText}
                    </Button>
                </form>
            );
            break;
        case Exercises.FillBox:
            renderedExercise = (
                <form onSubmit={onSubmit}>
                    <ExerciseFillBox
                        questions={questions}
                        results={results}
                        text={text}
                        onChange={handleSelectChange}
                    />
                    <Button primary rounded className="w-full md:w-1/5" type="submit">
                        {btnText}
                    </Button>
                </form>
            );
            break;
        case Exercises.DragAndDrop:
            renderedExercise = (
                <div>
                    <ExerciseDraggable
                        onSelect={handleSelectChange}
                        selections={selections}
                        results={results}
                        draggables={questions.map(({isCorrect}, index) => ({
                            title: isCorrect,
                            id: index,
                            isPulled: false,
                        }))}
                        droppables={questions.map(({question}, index) => ({
                            title: question,
                            id: index,
                            isFilled: null,
                        }))}
                    />
                    <Button primary rounded className="w-full md:w-1/5" onClick={onSubmit}>
                        {btnText}
                    </Button>
                </div>
            );
            break;
        case Exercises.Flashcard:
            renderedExercise = (
                <div className="flex flex-wrap gap-10">
                    {questions.map(
                        ({question, isCorrect, cardImage, example}, index) => (
                            <Flashcard
                                question={question}
                                isCorrect={isCorrect}
                                cardImage={cardImage}
                                example={example}
                                voice={generalAmericanVoice}
                                speak={speak}
                                key={index}
                            />
                        )
                    )}
                </div>
            );
            break;
        default:
            throw new Error("There is no such an exercise type");
    }

    return renderedExercise;
}

export default ExerciseBody;
