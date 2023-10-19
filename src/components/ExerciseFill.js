import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

function ExerciseFill({ questions, results, onChange }) {
  const renderedExerciseFill = (
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
                    onChange={(e) => onChange(index, e)}
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
  return renderedExerciseFill;
}

export default ExerciseFill;
