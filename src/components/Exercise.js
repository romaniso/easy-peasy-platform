import React from "react";
import Panel from "./Panel";

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
        { text: "will", isCorrect: false },
        { text: "is going to", isCorrect: true },
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
  //  const renderQuestion = (question, select) => {
  //    return question.replace("***", "_____");
  //  };

  const renderedExercise = questions.map(({ question, options }, index) => {
    const renderedOptions = options.map((option, index) => {
      return (
        <option data-correct={option.isCorrect} key={index}>
          {option.text}
        </option>
      );
    });

    const renderedQuestion = question.replace("***", renderedOptions);

    return <li key={index}>{renderedQuestion}</li>;
  });

  return (
    <Panel className="bg-white px-12 py-10">
      <h2 className="text-3xl font-bold text-indigo-800 mb-8">{title}</h2>
      <p className="text-2xl font-bold text-indigo-400 mb-4">
        Task Description
      </p>
      <p className="text-base text-indigo-300 bg-stone-700 shadow p-5 mb-4 rounded-lg">
        {instruction}
      </p>
      <section>
        <ul>{renderedExercise}</ul>
      </section>
    </Panel>
  );
}
export default Exercise;
