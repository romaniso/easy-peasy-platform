import {FaRegThumbsDown, FaRegThumbsUp} from "react-icons/fa";

function ExerciseMultipleChoice({questions, results, selections, onChange}) {
    const renderedMultipleChoice = (
        <ul>
            {questions.map(({question, options}, index) => {
                const feedbackIcon =
                    results &&
                    (results[index] === "Same" ? (
                        <FaRegThumbsUp className="inline-block text-green-500 ml-2"/>
                    ) : (
                        <FaRegThumbsDown className="inline-block ml-2 text-red-400"/>
                    ));

                const choiceLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

                const renderedSentence = (
                    <div className="text-indigo-900 text-xl mb-4" key={index}>
            <span className="mr-1 bg-indigo-400 text-white py-[2px] md:py-1 px-2 md:px-2 rounded-lg text-base shadow">
              {index + 1}
            </span>
                        {question.split("***").map((part, partIndex) => {
                            // Conditional Render
                            const emptyPart = (
                                <>
                                    <span
                                        className="text-base md:text-xl h-6 w-32 md:h-8 md:w-40 mr-1 border rounded-md shadow-inner text-indigo-800 transition-colors duration-700 align-bottom p-1 inline-flex items-center font-bold"
                                        key={index}>{selections[index]}</span>
                                    {part}
                                    {feedbackIcon}
                                </>
                            );
                            return partIndex === 1 ? (
                                emptyPart
                            ) : (
                                <span key={index}>{part}</span>
                            );
                        })}
                    </div>
                );

                const renderedChoices = (
                    <ul className="mb-8 md:ml-8 text-base md:text-lg text-orange-600 md:flex md:gap-8">
                        {options.map((option, optionIndex) => {
                            if (optionIndex >= choiceLetters.length) {
                                throw new Error("Too many options");
                            }

                            const choiceLetter = choiceLetters[optionIndex];
                            return (
                                <li key={optionIndex} className="mb-3">
                                    {choiceLetter}){" "}
                                    <span
                                        onClick={() => onChange(index, option.text)}
                                        className={` font-bold bg-indigo-50 py-1 px-2 rounded-md hover:opacity-75 cursor-pointer ${selections[index] === option.text ? 'border border-orange-300 shadow-inner text-indigo-400' : 'text-indigo-800 shadow'}`}>
                    {option.text}
                  </span>
                                </li>
                            );
                        })}
                    </ul>
                );

                return (
                    <li key={index}>
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
