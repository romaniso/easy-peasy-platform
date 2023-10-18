import Button from "./Button";
import ExerciseDraggable from "./ExerciseDraggable";
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
        <ul>
          {questions.map((item, index) => {
            const feedbackIcon =
              results &&
              (results[index] === "Same" ? (
                <FaRegThumbsUp className="inline-block text-green-500 ml-2" />
              ) : (
                <FaRegThumbsDown className="inline-block ml-2 text-red-400" />
              ));

            const { question, options } = item;
            const renderedQuestion = (
              <li className="text-indigo-900 text-xl mb-8" key={index}>
                {question.split("***").map((part, partIndex) => {
                  //Conditional Render
                  const inputPart = (
                    <>
                      <select
                        className="text-xl p-1 border rounded-md shadow-inner text-indigo-800 cursor-pointer outline-none"
                        key={index}
                        onChange={(e) => handleSelectChange(index, e)}
                        value={selections[index] || ""}
                      >
                        <option disabled value=""></option>
                        {options.map((option, optionIndex) => (
                          <option
                            className="hover:bg-orange-200"
                            data-correct={option.isCorrect}
                            value={option.text}
                            key={optionIndex}
                          >
                            {option.text}
                          </option>
                        ))}
                      </select>
                      {part}
                      {feedbackIcon}
                    </>
                  );
                  return partIndex === 1 ? (
                    inputPart
                  ) : (
                    <span key={index}>{part}</span>
                  );
                })}
              </li>
            );

            return renderedQuestion;
          })}
        </ul>
      );
      break;
    case "fill-in":
      renderedExercise = (
        <ul>
          {questions.map((item, index) => {
            const feedbackIcon =
              results &&
              (results[index] === "Same" ? (
                <FaRegThumbsUp className="inline-block text-green-500 ml-2" />
              ) : (
                <FaRegThumbsDown className="inline-block ml-2 text-red-400" />
              ));

            const { question } = item;
            const renderedQuestion = (
              <li className="text-indigo-900 text-xl mb-8" key={index}>
                {question.split("***").map((part, partIndex) => {
                  //Conditional Render
                  const inputPart = (
                    <>
                      <input
                        className="text-xl p-1 border rounded-md shadow-inner text-indigo-800 outline-none"
                        key={index}
                        name="selection"
                        type="text"
                        autoComplete="off"
                        onChange={(e) => handleSelectChange(index, e)}
                      />
                      {part}
                      {feedbackIcon}
                    </>
                  );
                  return partIndex === 1 ? (
                    inputPart
                  ) : (
                    <span key={index}>{part}</span>
                  );
                })}
              </li>
            );

            return renderedQuestion;
          })}
        </ul>
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
