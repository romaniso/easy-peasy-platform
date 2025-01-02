import { ExerciseUnit } from "../../interfaces/exerciseUnit";
import { UserResult } from "../../types/userResult";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { OrderUnit } from "../common/OrderUnit";
import { WaveFormPlayer } from "../common/WaveFormPlayer";
import { FillInUnit } from "./FillInUnit";
import { UserResultEnums } from "../../enums/userResult";
import className from "classnames";

interface ExerciseListenAndTypeProps {
  questions: ExerciseUnit[];
  results: UserResult[] | null;
  onChange(index: number, event: string): void;
}
export const ExerciseListenAndType = ({
  questions,
  results,
  onChange,
}: ExerciseListenAndTypeProps): JSX.Element => {
  const renderedExerciseFill = (
    <ul>
      {questions.map((item, index) => {
        const feedbackIcon =
          results &&
          (results[index] === UserResultEnums.Success ? (
            <FaRegThumbsUp className="inline-block text-green-500 ml-2" />
          ) : (
            <FaRegThumbsDown className="inline-block ml-2 text-red-400" />
          ));

        const { question, audioUrl } = item;
        const inputDivClasses = className(
          "border dark:border-indigo-50/20 p-3 md:p-5 rounded-md md:leading-loose bg-indigo-50 dark:bg-stone-800 shadow-sm text-base md:text-lg",
          {
            "shadow-green-400/50 border-green-300 bg-green-50":
              results && results[index] === UserResultEnums.Success,
            "shadow-red-400/50 border-red-300 bg-red-50":
              results && results[index] === UserResultEnums.Failure,
          }
        );
        const renderedQuestion = (
          <li
            className="text-indigo-900 dark:text-indigo-200 mb-10 flex items-start flex-wrap mt-2 md:mt-10"
            key={index}
          >
            <OrderUnit orderNumber={index + 1} />
            <WaveFormPlayer
              audioUrl={audioUrl as string}
              className="md:w-1/3 mb-8 mx-5 -mt-2 flex-grow md:flex-grow-0"
            />
            <div className="-mt-2 w-full basis-full">
              <div className={inputDivClasses}>
                <FillInUnit unit={question} index={index} onChange={onChange} />
                {feedbackIcon}
              </div>
            </div>
          </li>
        );

        return renderedQuestion;
      })}
    </ul>
  );
  return renderedExerciseFill;
};
