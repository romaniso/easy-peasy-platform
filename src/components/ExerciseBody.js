import Button from "./Button";
import ExerciseDraggable from "./ExerciseDraggable";
import ExerciseDropdown from "./ExerciseDropdown";
import ExerciseFill from "./ExerciseFill";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

function ExerciseBody({
  onSubmit,
  btnText = "Check out",
  exerciseType,
  questions,
  results,
  selections,
  onSelect,
}) {
  const handleSelectChange = (index, event) => {
    const updatedValues = [...selections];
    updatedValues[index] =
      exerciseType === "drag-&-drop" ? event : event.target.value;
    onSelect(updatedValues);
  };

  let renderedExercise;

  //TODO: It will be better to create separate components and render them depending on a exercise type: Maybe as a solution I will remove ExerciseBody and just replace it with various exerice type components

  switch (exerciseType) {
    case "dropdown":
      renderedExercise = (
        <ExerciseDropdown
          questions={questions}
          results={results}
          selections={selections}
          onChange={handleSelectChange}
        />
      );
      break;
    case "fill-in":
      renderedExercise = (
        <ExerciseFill
          questions={questions}
          results={results}
          onChange={handleSelectChange}
        />
      );
      break;
    case "drag-&-drop":
      renderedExercise = (
        <ExerciseDraggable
          onSelect={handleSelectChange}
          selections={selections}
          results={results}
          draggables={questions.map(({ isCorrect }, index) => ({
            title: isCorrect,
            id: index,
            isPulled: false,
          }))}
          droppables={questions.map(({ question }, index) => ({
            title: question,
            id: index,
            isFilled: null,
          }))}
        />
      );
      break;
    default:
      throw new Error("There is no such an exercise type");
  }

  return (
    <div>
      {exerciseType === "drag-&-drop" ? (
        <div>
          {renderedExercise}
          <Button primary rounded className="w-1/5" onClick={onSubmit}>
            {btnText}
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          {renderedExercise}
          <Button primary rounded className="w-1/5" type="submit">
            {btnText}
          </Button>
        </form>
      )}
    </div>
  );
}

export default ExerciseBody;
