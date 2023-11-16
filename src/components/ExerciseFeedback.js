function ExerciseFeedback({ results, questionsNumber }) {
  return results ? (
    <p className="text-lg md:text-xl text-indigo-900 dark:text-indigo-200 bg-stone-50 dark:bg-[#484848] shadow-inner p-2 md:p-5 mb-4 rounded-lg inline-block">
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
      /<span className="text-indigo-500 dark:text-indigo-200 font-bold">{questionsNumber}</span>
    </p>
  ) : null;
}

export default ExerciseFeedback;
