import React from "react";
import { ExerciseUnit } from "../../interfaces/exerciseUnit";
import { UserResult } from "../../types/userResult";
import { v4 as uuid } from "uuid";
import { Icon, IconType } from "../common/icon/Icon";

interface ExerciseDropdownProps {
  questions: ExerciseUnit[];
  results: UserResult[] | null;
  selections: string[];
  onChange(index: number, event: string): void;
}

export const ExerciseDropdown = ({
  questions,
  results,
  selections,
  onChange,
}: ExerciseDropdownProps): JSX.Element => {
  const renderedDropdown = (
    <ul>
      {questions.map((item, index) => {
        const feedbackIcon =
          results &&
          (results[index] === "Same" ? (
            <Icon
              className="inline-block text-green-500 ml-2"
              type={IconType.ThumbsUp}
            />
          ) : (
            <Icon
              className="inline-block ml-2 text-red-400"
              type={IconType.ThumbsDown}
            />
          ));

        const { question, options } = item;
        const questionKey = uuid(); // Generate a unique key for the question
        const renderedQuestion = (
          <li
            className="text-indigo-900 dark:text-indigo-200 text-xl mb-8"
            key={questionKey}
          >
            {question.split("***").map((part, partIndex) => {
              const uniqueKey = uuid(); // Generate a unique key for each part
              // Conditional Render
              const inputPart =
                partIndex === 1 ? (
                  <React.Fragment key={uniqueKey}>
                    <select
                      className="text-xl p-1 border dark:bg-stone-800 dark:border-gray-500 rounded-md shadow-inner text-indigo-800 dark:text-indigo-200 cursor-pointer outline-none"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        onChange(index, e.target.value)
                      }
                      value={selections[index] || ""}
                    >
                      <option disabled value=""></option>
                      {options?.map((option) => (
                        <option
                          className="hover:bg-orange-200"
                          data-correct={option.isCorrect}
                          value={option.text}
                          key={uuid()}
                        >
                          {option.text}
                        </option>
                      ))}
                    </select>
                    {part}
                    {feedbackIcon}
                  </React.Fragment>
                ) : (
                  <span key={uuid()}>{part}</span>
                );
              return inputPart;
            })}
          </li>
        );

        return renderedQuestion;
      })}
    </ul>
  );

  return renderedDropdown;
};
