import Button from "./Button";
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
    updatedValues[index] = event.target.value;
    onSelect(updatedValues);
  };
  const renderedExercise = questions.map((item, index) => {
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
          let inputPart;
          switch (exerciseType) {
            case "dropdown":
              inputPart = (
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
              break;
            case "fill-in":
              inputPart = (
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
              break;
            default:
              throw new Error("There is no such a exercise type");
          }
          return partIndex === 1 ? inputPart : <span key={index}>{part}</span>;
        })}
      </li>
    );

    return renderedQuestion;
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <ul>{renderedExercise}</ul>
        <Button primary rounded className="w-1/5" type="submit">
          {btnText}
        </Button>
      </form>
    </div>
  );
}

export default ExerciseBody;
