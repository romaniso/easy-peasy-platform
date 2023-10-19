import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

function ExerciseDropdown({ questions, results, selections, onChange }) {
  const renderedDropdown = (
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
                    onChange={(e) => onChange(index, e)}
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

  return renderedDropdown;
}

export default ExerciseDropdown;
