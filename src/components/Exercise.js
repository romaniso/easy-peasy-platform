import React, { useEffect, useState } from "react";
import Panel from "./Panel";
import Button from "./Button";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

//TODO: I need to consider descturturing it by creating ExerciseSet(component with different exercises), adding exerciseType prop, rerender it depending on a type of an exercise, create feedback logics and component

function Exercise({
  instruction = "Choose the correct or most appropriate future forms to complete the sentences below.",
  title = "Will / be going to / present continuous for future",
  questions = [
    {
      question: "I *** visit my grandmother tomorrow.",
      options: [
        { text: "will", isCorrect: false },
        { text: "am going to", isCorrect: true },
        { text: "am visiting", isCorrect: false },
      ],
    },
    {
      question:
        "They have tickets for the concert. They *** attend it tonight.",
      options: [
        { text: "will", isCorrect: false },
        { text: "are going to", isCorrect: true },
        { text: "are attending", isCorrect: false },
      ],
    },
    {
      question: "I think it *** rain later, so don't forget your umbrella.",
      options: [
        { text: "will", isCorrect: true },
        { text: "is going to", isCorrect: false },
        { text: "is raining", isCorrect: false },
      ],
    },
    {
      question: "She *** fly to Paris next week for a business meeting.",
      options: [
        { text: "will", isCorrect: false },
        { text: "is going to", isCorrect: true },
        { text: "is flying", isCorrect: false },
      ],
    },
    {
      question:
        "We *** have a picnic at the park on Saturday if the weather is nice.",
      options: [
        { text: "will", isCorrect: false },
        { text: "are going to", isCorrect: true },
        { text: "are having", isCorrect: false },
      ],
    },
  ],
}) {
  const [selectedValues, setSelectedValues] = useState(
    Array(questions.length).fill("")
  );
  const [userResults, setUserResults] = useState(null);

  useEffect(() => {
    // if (userResults !== null) {
    //   console.log(showFeedback(userResults));
    // }
  }, [userResults]);

  const handleSelectChange = (index, event) => {
    const updatedValues = [...selectedValues];
    updatedValues[index] = event.target.value;
    setSelectedValues(updatedValues);
  };

  const showFeedback = (results) => {
    if (!results) return null;

    const correctAnswers = results.filter((answer) => answer === "Same").length;
    const questionsNumber = questions.length;

    return (
      <p className="text-xl text-indigo-900 bg-stone-50 shadow-inner p-5 mb-4 rounded-lg inline-block">
        Your score:{" "}
        <span
          className={
            correctAnswers
              ? "text-green-500 font-bold"
              : "text-red-500 font-bold"
          }
        >
          {correctAnswers}
        </span>
        /<span className="text-indigo-500 font-bold">{questionsNumber}</span>
      </p>
    );
  };

  const validateUsersAnswers = (usersAnswers) => {
    const keySheet = questions.map((question) => {
      return question.options.find((option) => option.isCorrect).text;
    });

    const result = usersAnswers.map((answer, index) => {
      return answer === keySheet[index] ? "Same" : "Different";
    });

    setUserResults(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateUsersAnswers(selectedValues);
  };

  const renderedExercise = questions.map(({ question, options }, index) => {
    const feedbackIcon =
      userResults &&
      (userResults[index] === "Same" ? (
        <FaRegThumbsUp className="inline-block text-green-500 ml-2" />
      ) : (
        <FaRegThumbsDown className="inline-block ml-2 text-red-400" />
      ));

    const renderedQuestion = (
      <li className="text-indigo-900 text-xl mb-10" key={index}>
        {question.split("***").map((part, partIndex) => {
          return partIndex === 1 ? (
            <>
              <select
                className="text-xl p-1 border rounded-md shadow-inner text-indigo-800 cursor-pointer outline-none"
                key={index}
                onChange={(e) => handleSelectChange(index, e)}
                value={selectedValues[index] || ""}
              >
                <option disabled value=""></option>
                {options.map((option, optionIndex) => (
                  <option
                    className="hover:bg-orange-200"
                    data-correct={option.isCorrect}
                    value={option.text}
                    key={optionIndex}
                  >
                    {option.text}
                  </option>
                ))}
              </select>
              {part}
              {feedbackIcon}
            </>
          ) : (
            <span key={index}>{part}</span>
          );
        })}
      </li>
    );

    return renderedQuestion;
  });

  return (
    <Panel className="bg-white px-12 py-10">
      <h2 className="text-3xl font-bold text-indigo-800 mb-8">{title}</h2>
      <p className="text-2xl font-bold text-indigo-400 mb-4">
        Task Description
      </p>
      <p className="text-base text-orange-500 bg-stone-50 shadow-inner p-5 mb-4 rounded-lg">
        {instruction}
      </p>
      {userResults && showFeedback(userResults)}
      <form onSubmit={handleSubmit}>
        <ul>{renderedExercise}</ul>
        <Button primary rounded className="w-1/5" type="submit">
          Check out
        </Button>
      </form>
    </Panel>
  );
}
export default Exercise;
