import CircularProgressBar from "./CircularProgressBar";

function ExerciseFeedback({results, questionsNumber}) {
    return results ? (
        <section className='flex gap-4 items-center mb-4'>
            <p className="text-lg md:text-xl text-indigo-900 dark:text-indigo-200 bg-stone-50 dark:bg-[#484848] shadow-inner p-2 md:p-5 rounded-lg inline-block">
                Your score:{" "}
                <span
                    className={results.filter((answer) => answer === "Same").length ? "text-green-500 dark:text-green-400 font-bold" : "text-red-500 dark:text-red-400 font-bold"}
                >
                {results.filter((answer) => answer === "Same").length}
                </span>
                /
                <span className="text-indigo-500 dark:text-indigo-200 font-bold">{questionsNumber}</span>
            </p>
            <CircularProgressBar results={results}/>
        </section>) : null;
}

export default ExerciseFeedback;
