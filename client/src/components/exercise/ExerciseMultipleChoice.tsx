import React from 'react';
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import {ExerciseUnit} from "../../interfaces/exerciseUnit";
import {UserResult} from "../../types/userResult";
interface ExerciseMultipleChoiceProps {
    questions: ExerciseUnit[];
    results: UserResult[] | null;
    selections: string[];
    onChange(
        index: number,
        event: React.ChangeEvent<HTMLInputElement> | string
    ): void;
}
const ExerciseMultipleChoice: React.FC<ExerciseMultipleChoiceProps> = ({ questions, results, selections, onChange }) => {
    const renderedMultipleChoice = (
        <ul>
            {questions.map(({ question, options }, index) => {
                const feedbackIcon =
                    results &&
                    (results[index] === "Same" ? (
                        <FaRegThumbsUp className="inline-block text-green-500 ml-2" key={`thumbs-up-${index}`} />
                    ) : (
                        <FaRegThumbsDown className="inline-block ml-2 text-red-400" key={`thumbs-down-${index}`} />
                    ));

                const choiceLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

                const renderedSentence = (
                    <div className="text-indigo-900 dark:text-indigo-200 text-xl mb-4" key={`sentence-${index}`}>
            <span className="mr-1 bg-indigo-400 text-white py-[2px] md:py-1 px-2 md:px-2 rounded-lg text-base shadow" key={`number-${index}`}>
              {index + 1}
            </span>
                        {question.split("***").map((part, partIndex) => {
                            // Conditional Render
                            const emptyPart = (
                                <React.Fragment key={`empty-part-${index}`}>
                  <span
                      className="text-base md:text-xl h-6 min-w-[100px] md:h-8 md:min-w-[120px] mr-1 border dark:border-gray-500 rounded-md shadow-inner text-indigo-800 dark:text-indigo-200 transition-colors duration-700 align-bottom p-1 inline-flex items-center font-bold"
                      key={`selection-${index}`}
                  >
                    {selections[index]}
                  </span>
                                    {part}
                                    {feedbackIcon}
                                </React.Fragment>
                            );
                            return partIndex === 1 ? emptyPart : <span key={`part-${index}-${partIndex}`}>{part}</span>;
                        })}
                    </div>
                );

                const renderedChoices = (
                    <ul className="mb-8 md:ml-8 text-base md:text-lg text-orange-600 dark:text-indigo-200 md:grid md:grid-cols-4 md:gap-8" key={`choices-${index}`}>
                        {options?.map((option, optionIndex) => {
                            if (optionIndex >= choiceLetters.length) {
                                throw new Error("Too many options");
                            }

                            const choiceLetter = choiceLetters[optionIndex];
                            return (
                                <li key={`choice-${index}-${optionIndex}`} className='flex gap-2 m-2 md:m-0'>
                                    {choiceLetter}){" "}
                                    <span
                                        onClick={() => onChange(index, option.text)}
                                        className={`w-full block leading-6 font-bold bg-indigo-50/50 dark:bg-stone-700  py-1 md:py-2 px-2 rounded-md hover:opacity-75 hover:dark:bg-[#323232] cursor-pointer ${
                                            selections[index] === option.text
                                                ? 'border border-orange-300 dark:border-orange-500 dark:text-orange-500 shadow-inner text-indigo-400'
                                                : 'text-indigo-800 dark:text-orange-500  shadow'
                                        }`}
                                        key={`choice-text-${index}-${optionIndex}`}
                                    >
                    {option.text}
                  </span>
                                </li>
                            );
                        })}
                    </ul>
                );

                return (
                    <li key={`question-${index}`}>
                        {renderedSentence}
                        {renderedChoices}
                    </li>
                );
            })}
        </ul>
    );

    return renderedMultipleChoice;
}

export default ExerciseMultipleChoice;
