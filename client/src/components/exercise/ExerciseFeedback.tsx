import CircularProgressBar from "../CircularProgressBar";
import {useCallback, useEffect, useState} from "react";

function ExerciseFeedback({ results, questionsNumber }) {
    const [result, setResult] = useState(0);
    const [offset, setOffset] = useState(243);
    const calculateResultIntoPercentages = useCallback((results) => {
        if(!results) return;
        const numberOfPossibleAnswers = results.length;
        const correctAnswers = results.filter((result) => result === "Same").length;
        const percentage = (correctAnswers / numberOfPossibleAnswers) * 100;

        setResult(percentage);
        setOffset(Math.floor(243 - (percentage / 100) * 155));
    }, []);

  useEffect(() => {
    calculateResultIntoPercentages(results);
  }, [results, calculateResultIntoPercentages]);


  return results ? (
    <section className="flex gap-4 items-center mb-4">
      <p className="text-lg md:text-xl text-indigo-900 dark:text-indigo-200 bg-stone-50 dark:bg-[#484848] shadow-inner p-2 md:p-6 rounded-lg inline-block">
        Your score:{" "}
        <span
          className={
            results.filter((answer) => answer === "Same").length
              ? "text-green-500 dark:text-green-400 font-bold"
              : "text-red-500 dark:text-red-400 font-bold"
          }
        >
          {results.filter((answer) => answer === "Same").length}
        </span>
        /
        <span className="text-indigo-500 dark:text-indigo-200 font-bold">
          {questionsNumber}
        </span>
      </p>
      <CircularProgressBar percentage={result} offset={offset}/>
    </section>
  ) : null;
}

export default ExerciseFeedback;
