// TODO: This component will render an array of exercises. There will be a tab section at the top where depending on a selection, it will render a specific type of exercise
import { useState } from "react";
import Exercise from "./Exercise";
import Tabs from "./Tabs";

function ExerciseSet({ data }) {
  const [activeExercise, setActiveExercise] = useState(1);
  const renderedExercises = data.map(
    ({ instruction, title, type, questions }, index) => {
      const exerciseNumber = index + 1;
      return (
        <Exercise
          key={exerciseNumber}
          active={activeExercise === exerciseNumber ? true : false}
          title={title}
          type={type}
          instruction={instruction}
          questions={questions}
        />
      );
    }
  );

  return (
    <section className="flex-auto">
      <Tabs
        exercises={data}
        activeExercise={activeExercise}
        setSelection={setActiveExercise}
      />
      {renderedExercises}
    </section>
  );
}

export default ExerciseSet;
