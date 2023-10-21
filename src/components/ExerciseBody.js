import Button from "./Button";
import ExerciseDraggable from "./ExerciseDraggable";
import ExerciseDropdown from "./ExerciseDropdown";
import ExerciseFill from "./ExerciseFill";

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
  switch (exerciseType) {
    case "dropdown":
      renderedExercise = (
        <form onSubmit={onSubmit}>
          <ExerciseDropdown
            questions={questions}
            results={results}
            selections={selections}
            onChange={handleSelectChange}
          />
          <Button primary rounded className="w-1/5" type="submit">
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
          <Button primary rounded className="w-1/5" type="submit">
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
          <Button primary rounded className="w-1/5" onClick={onSubmit}>
            {btnText}
          </Button>
        </div>
      );
      break;
    default:
      throw new Error("There is no such an exercise type");
  }

  return renderedExercise;
}

export default ExerciseBody;
