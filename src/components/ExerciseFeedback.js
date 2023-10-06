function ExerciseFeedback({ results, questionsNumber }) {
  if (!results) return null;

  const correctAnswers = results.filter((answer) => answer === "Same").length;
  return (
    <p className="text-xl text-indigo-900 bg-stone-50 shadow-inner p-5 mb-4 rounded-lg inline-block">
      Your score:{" "}
      <span
        className={
          correctAnswers ? "text-green-500 font-bold" : "text-red-500 font-bold"
        }
      >
        {correctAnswers}
      </span>
      /<span className="text-indigo-500 font-bold">{questionsNumber}</span>
    </p>
  );
}

export default ExerciseFeedback;
