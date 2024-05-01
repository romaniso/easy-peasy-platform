import React from "react";
import { UserResult } from "../../types/userResult";
import { ExerciseUnit } from "../../interfaces/exerciseUnit";
import OrderUnit from "../common/OrderUnit";

interface ExerciseFillBoxProps {
  questions: ExerciseUnit[];
  text: string;
  results: UserResult[] | null;
  onChange(index: number, e: string): void;
}
const ExerciseFillBox: React.FC<ExerciseFillBoxProps> = ({
  questions,
  text,
  results,
  onChange,
}) => {
  const handleText = (text: string) => {
    return text
      .split("***")
      .map((part: string, index: number, arr: string[]) => {
        let inputColor: string = "";
        if (results) {
          inputColor =
            results[index] === "Same"
              ? "bg-green-200 dark:bg-green-500/30 font-bold"
              : "bg-red-200 dark:bg-red-500/30 font-bold text-black";
        }
        return (
          <React.Fragment key={index}>
            <span>{part}</span>
            {index !== arr.length - 1 && (
              <span className="inline-block my-1.5" key={`input-${index}`}>
                <OrderUnit orderNumber={index + 1} accent />
                <input
                  className={`text-base md:text-xl h-6 w-28 md:h-8 md:w-36 p-1 mr-1 border dark:border-gray-500 dark:bg-[#323232] rounded-md shadow-inner text-indigo-800 dark:text-indigo-50 outline-none hover:border-orange-400 focus:border-orange-300 focus:dark:border-orange-500 hover:dark:border-orange-500 transition-colors duration-700 ${inputColor}`}
                  key={`input-field-${index}`}
                  name="selection"
                  type="text"
                  autoComplete="off"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(index, e.target.value)
                  }
                />
              </span>
            )}
          </React.Fragment>
        );
      });
  };

  const renderWords = questions.map(({ word }, index) => (
    <span
      key={index}
      className="text-base md:text-lg leading-8 font-bold text-indigo-700 dark:text-indigo-400"
    >
      {word}
    </span>
  ));
  const renderText = handleText(text);

  return (
    <div>
      <div className="border flex flex-wrap gap-x-3 dark:border-gray-500 rounded-md p-2 md:p-4 shadow mb-4 md:mb-6">
        {renderWords}
      </div>
      <p className="text-base md:text-xl text-indigo-900 dark:text-indigo-200 md:leading-loose mb-8 text-justify">
        {renderText}
      </p>
    </div>
  );
};

export default ExerciseFillBox;
