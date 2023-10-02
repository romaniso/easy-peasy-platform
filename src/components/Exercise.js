import React from "react";
import Panel from "./Panel";
import Button from "./Button";

//TODO: https://chat.openai.com/share/4a17c246-5c30-413d-8921-8926f895dae3
//TODO: solve same keys issue, maybe add id for each option/question

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
  const renderedExercise = questions.map(({ question, options }, index) => {
    const renderedQuestion = question.split("***").map((part, partIndex) => {
      if (partIndex === 1) {
        // Replace *** with the rendered options
        return (
          <>
            <select
              className="text-xl p-1 border rounded-md shadow-inner text-indigo-800 cursor-pointer outline-none"
              key={index}
            >
              <option disabled selected value></option>
              {options.map((option, optionIndex) => (
                <option
                  className="hover:bg-orange-200"
                  data-correct={option.isCorrect}
                  key={optionIndex}
                >
                  {option.text}
                </option>
              ))}
            </select>
            {part}
          </>
        );
      } else {
        // Keep the original text part
        return <span key={index}>{part}</span>;
      }
    });
    return (
      <li className="text-indigo-900 text-xl mb-10 " key={index}>
        {renderedQuestion}
      </li>
    );
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Submit");
        }}
      >
        <ul>{renderedExercise}</ul>
        <Button primary rounded className="w-1/5">
          Check out
        </Button>
      </form>
    </Panel>
  );
}
export default Exercise;
