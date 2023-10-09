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
