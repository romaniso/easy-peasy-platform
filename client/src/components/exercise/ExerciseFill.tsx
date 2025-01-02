import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { ExerciseUnit } from "../../interfaces/exerciseUnit";
import { UserResult } from "../../types/userResult";
import { OrderUnit } from "../common/OrderUnit";
import { FillInUnit } from "./FillInUnit";

interface ExerciseFillProps {
  questions: ExerciseUnit[];
  results: UserResult[] | null;
  onChange(index: number, event: string): void;
}
export const ExerciseFill = ({
  questions,
  results,
  onChange,
}: ExerciseFillProps): JSX.Element => {
  const renderedExerciseFill = (
    <ul>
      {questions.map((item, index) => {
        const feedbackIcon =
          results &&
          (results[index] === "Same" ? (
            <FaRegThumbsUp className="inline-block text-green-500 ml-2 self-center" />
          ) : (
            <FaRegThumbsDown className="inline-block ml-2 text-red-400 self-center" />
          ));

        const { question } = item;
        const renderedQuestion = (
          <li
            className="text-indigo-900 dark:text-indigo-200 text-xl mb-8 flex items-start"
            key={index}
          >
            <OrderUnit orderNumber={index + 1} />
            <FillInUnit unit={question} index={index} onChange={onChange} />
            {feedbackIcon}
          </li>
        );

        return renderedQuestion;
      })}
    </ul>
  );
  return renderedExerciseFill;
};
