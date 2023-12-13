import React from "react";
import Button from "../Button";
import ExerciseMultipleChoice from "./ExerciseMultipleChoice";
import ExerciseDropdown from "./ExerciseDropdown";
import ExerciseFill from "./ExerciseFill";
import ExerciseFillInLetter from "./ExerciseFillInLetter";
import ExerciseFillBox from "./ExerciseFillBox";
import ExerciseDraggable from "./ExerciseDraggable";
import Flashcard from "../Flashcard";
import { ExerciseType } from "../../types/exerciseType";
import { ExerciseUnit } from "../../interfaces/exerciseUnit";
import { UserResult } from "../../types/userResult";

interface ExerciseBodyProps {
    onSubmit(e: React.FormEvent<HTMLFormElement>): void;
    btnText?: string;
    exerciseType: ExerciseType;
    questions: ExerciseUnit[];
    results: UserResult[] | null;
    selections: string[];
    onSelect(updatedValues: (string | React.ChangeEvent<HTMLInputElement>)[]): void;
    text?: string;
}

const ExerciseBody: React.FC<ExerciseBodyProps> = ({
                                                       onSubmit,
                                                       btnText = "Check out",
                                                       exerciseType,
                                                       questions,
                                                       results,
                                                       selections,
                                                       onSelect,
                                                       text,
                                                   }): React.ReactElement => {
    const handleSelectChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement> | string | string[]
    ): void => {
        const updatedValues: (string | React.ChangeEvent<HTMLInputElement>)[] = [
            ...selections,
        ];
        if (exerciseType === "fill-in-letter") {
            updatedValues[index] = Array.isArray(event)
                ? event.join("")
                : (event as string);
            onSelect(updatedValues);
            return;
        }
        updatedValues[index] = event as string;


        onSelect(updatedValues);
    };

    let renderedExercise;

    switch (exerciseType) {
        case "multiple-choice":
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
        case "dropdown":
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
        case "fill-in":
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
        case "fill-in-letter":
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
        case "fill-box":
            renderedExercise = (
                <form onSubmit={onSubmit}>
                    <ExerciseFillBox
                        questions={questions}
                        results={results}
                        text={text as string}
                        onChange={handleSelectChange}
                    />
                    <Button primary rounded className="w-full md:w-1/5" type="submit">
                        {btnText}
                    </Button>
                </form>
            );
            break;
        case "drag-&-drop":
            renderedExercise = (
                <div>
                    <ExerciseDraggable
                        onSelect={handleSelectChange}
                        selections={selections}
                        results={results}
                        draggables={questions.map(({isCorrect }, index) => ({
                            title: isCorrect as string,
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
        case "flash-card":
            renderedExercise = (
                <div className="flex flex-wrap gap-10">
                    {questions.map(
                        ({question, isCorrect, cardImage, example}, index) => (
                            <Flashcard
                                question={question}
                                isCorrect={isCorrect as string}
                                cardImage={cardImage as string}
                                example={example as string}
                                key={index}
                            />
                        )
                    )}
                </div>);
            break;
        default:
            throw new Error("There is no such an exercise type");
    }

    return renderedExercise;
};

export default ExerciseBody;
