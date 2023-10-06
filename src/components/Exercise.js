import React, { useEffect, useState } from "react";
import ExerciseHeader from "./ExerciseHeader";
import ExerciseBody from "./ExerciseBody";
import Panel from "./Panel";
import Button from "./Button";

//TODO: I need to consider descturturing it by creating ExerciseSet(component with different exercises), adding exerciseType prop, rerender it depending on a type of an exercise, create feedback logics and component

function Exercise({
  instruction = "Choose the correct or most appropriate future forms to complete the sentences below.",
  title = "Will / be going to / present continuous for future",
  type = "dropdown",
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
  useEffect(() => {}, [userResults]);

  const showFeedback = (results) => {
    if (!results) return null;

    const correctAnswers = results.filter((answer) => answer === "Same").length;
    const questionsNumber = questions.length;

    //FIXME: Create a separate React component here:
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

  return (
    <Panel className="bg-white px-12 py-10">
      <ExerciseHeader title={title} instruction={instruction} />
      {userResults && showFeedback(userResults)}
      <ExerciseBody
        onSubmit={handleSubmit}
        exerciseType={type}
        questions={questions}
        results={userResults}
        selections={selectedValues}
        onSelect={setSelectedValues}
      />
    </Panel>
  );
}
export default Exercise;
