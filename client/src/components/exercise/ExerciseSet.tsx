import {useState} from "react";
import Exercise from "./Exercise";
import Tabs from "../Tabs";

function ExerciseSet({ data }) {
  const [activeExercise, setActiveExercise] = useState(1);
  const exercises = data;
  const renderedExercises = exercises.map(
    ({ instruction, title, type, data }, index) => {
      const exerciseNumber = index + 1;
      const  {units, text}= data;
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
