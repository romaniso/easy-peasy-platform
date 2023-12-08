import React, {useState} from "react";
import {SingleExercise} from "../../interfaces/singleExercise";
import Exercise from "./Exercise";
import Tabs from "../Tabs";
interface ExerciseSetProps {
    exercises: SingleExercise[];
}

const ExerciseSet: React.FC<ExerciseSetProps> = ({ exercises }) => {
    const [activeExercise, setActiveExercise] = useState<number>(1);
    const renderedExercises = exercises.map(
        ({ instruction, title, type, data }, index) => {
            const exerciseNumber: number = index + 1;
            const  {units, text} = data;
            return (
                <Exercise
                    key={index}
                    active={activeExercise === exerciseNumber}
                    title={title}
                    type={type}
                    instruction={instruction}
                    questions={units}
                    text={text}
                />
            );
        }
    );

    return (
        <section>
            <Tabs
                items={exercises.length}
                activeExercise={activeExercise}
                setActiveItem={setActiveExercise}
            />
            {renderedExercises}
        </section>
    );
}

export default ExerciseSet;