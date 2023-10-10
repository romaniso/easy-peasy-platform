import React, { useEffect, useState } from "react";
import ExerciseHeader from "./ExerciseHeader";
import ExerciseBody from "./ExerciseBody";
import ExerciseFeedback from "./ExerciseFeedback";

//TODO: Implement Conditional Rendering based on a type prop

function Exercise({
  active = false,
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
  ],
}) {
  const [userSelections, setUserSelections] = useState(
    Array(questions.length).fill("")
  );
  const [userResults, setUserResults] = useState(null);
  useEffect(() => {}, [userResults]);

  //TODO: It may be refactored as a hook, show info when a field is empty before submitting
  const validateUsersAnswers = (usersAnswers) => {
    // Check if usersAnswers is an array with a map method
    if (
      !Array.isArray(usersAnswers) ||
      typeof usersAnswers.map !== "function"
    ) {
      // Handle the case where usersAnswers is not an array
      console.error("usersAnswers is not an array");
      console.log("userAnswers:", usersAnswers);

      return;
    }

    let keySheet;
    switch (type) {
      case "dropdown":
        keySheet = questions.map(
          (question) => question.options.find((option) => option.isCorrect).text
        );
        break;
      case "fill-in":
        keySheet = questions.map((question) => question.isCorrect);
        break;
      default:
        throw new Error("There is no such a exercise type");
    }

    const result = usersAnswers.map((answer, index) => {
      return answer.toLowerCase() === keySheet[index].toLowerCase()
        ? "Same"
        : "Different";
    });

    setUserResults(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateUsersAnswers(userSelections);
  };

  return (
    <section className={active ? "px-12 py-10" : "hidden"}>
      <ExerciseHeader title={title} instruction={instruction} />
      <ExerciseFeedback
        results={userResults}
        questionsNumber={questions.length}
      />
      <ExerciseBody
        onSubmit={handleSubmit}
        exerciseType={type}
        questions={questions}
        results={userResults}
        selections={userSelections}
        onSelect={setUserSelections}
      />
    </section>
  );
}
export default Exercise;
