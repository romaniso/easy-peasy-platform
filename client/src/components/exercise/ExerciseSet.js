import {useState} from "react";
import Exercise from "./Exercise";
import Tabs from "../Tabs";

function ExerciseSet({ data }) {
  const [activeExercise, setActiveExercise] = useState(1);
  const exercises = data;
  const renderedExercises = exercises.map(
    ({ instruction, title, type, data, text }, index) => {
      const exerciseNumber = index + 1;
      return (
        <Exercise
          key={index}
          active={activeExercise === exerciseNumber}
          title={title}
          type={type}
          instruction={instruction}
          questions={data}
          text={text}
        />
      );
    }
  );

  return (
    <section className="">
      <Tabs
        exercises={exercises}
        activeExercise={activeExercise}
        setSelection={setActiveExercise}
      />
      {renderedExercises}
    </section>
  );
}

export default ExerciseSet;
