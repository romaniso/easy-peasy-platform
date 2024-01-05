import {ExerciseUnit} from "../../interfaces/exerciseUnit";
import {UserResult} from "../../types/userResult";
import React from "react";
import {FaRegThumbsDown, FaRegThumbsUp} from "react-icons/fa";
import OrderUnit from "../OrderUnit";
import WaveFormPlayer from "../WaveFormPlayer";
import FillInUnit from "./FillInUnit";

interface ExerciseListenAndTypeProps {
    questions: ExerciseUnit[];
    results: UserResult[] | null;
    onChange(index: number, event: string): void;
}
const ExerciseListenAndType: React.FC<ExerciseListenAndTypeProps> = ({questions, results, onChange }) => {
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

                const { question, audioUrl } = item;
                const renderedQuestion = (
                    <li className="text-indigo-900 dark:text-indigo-200 text-xl mb-10 flex items-start flex-wrap mt-10" key={index}>
                        <OrderUnit orderNumber={index + 1}/>
                        <WaveFormPlayer audioUrl={audioUrl as string} className='md:w-1/3 mb-8 mx-5 -mt-2 flex-grow md:flex-grow-0'/>
                        <div className='-mt-2 w-full basis-full'>
                            <div className='border dark:border-indigo-50/20 p-5 rounded-md leading-loose bg-indigo-50 dark:bg-stone-800 shadow-md text-lg'>
                                <FillInUnit unit={question} index={index} onChange={onChange}/>
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
}

export default ExerciseListenAndType;