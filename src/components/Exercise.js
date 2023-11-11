import React, { useEffect, useState } from "react";
import ExerciseHeader from "./ExerciseHeader";
import ExerciseBody from "./ExerciseBody";
import ExerciseFeedback from "./ExerciseFeedback";

// Utils
import findDifferentIndexesInArrays from "../utils/findDifferentIndexesInArrays.";

//TODO: Implement Conditional Rendering based on a type prop

function Exercise({
  active = false,
  instruction,
  title,
  type,
  text,
  questions
}) {
  const [userSelections, setUserSelections] = useState(
    Array(questions.length).fill("")
  );
  const [userResults, setUserResults] = useState(null);
  useEffect(() => {}, [userResults]);

  //TODO: It may be refactored as a hook, show info when a field is empty before submitting
  //FIXME: Refactor is so a user may input two possible values. Refactor is also required in data, e.g isCorrect not a string but array of two possible options
  const validateUsersAnswers = (usersAnswers) => {
    // Check if usersAnswers is an array with a map method
    if (
      !Array.isArray(usersAnswers) ||
      typeof usersAnswers.map !== "function"
    ) {
      // Handle the case where usersAnswers is not an array
      console.error("usersAnswers is not an array");
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
      case "drag-&-drop":
        keySheet = questions.map((question) => question.isCorrect);
        break;
      case "multiple-choice":
          keySheet = [];
        questions.map((question) => question.options.filter((option) => {
          if(option.isCorrect) {
            keySheet.push(option.text);
          }
      }));
        break;
      case "fill-box":
        keySheet = questions.map((question) => [question.correctForm, question.correctPlace]).sort((a, b) => a[1] - b[1]);
        break;
      case "fill-in-letter":
        keySheet = questions.map(question => question.split(''));
        break;
      default:
        throw new Error("There is no such an exercise type");
    }

    const result = usersAnswers.map((answer, index) => {
      const arrAnswer = answer.split('');
      if(type === 'fill-box'){
        return answer.toLowerCase() === keySheet[index][0].toLowerCase()
            ? "Same"
            : "Different";
      }
      else if(type === 'fill-in-letter'){
        const results = findDifferentIndexesInArrays(keySheet[index], arrAnswer);
        return results.length ? results : 'Same';
      }
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
    <section className={active ? "px-3 py-5 md:px-12 md:py-10" : "hidden"}>
      <ExerciseHeader title={title} instruction={instruction} />
      <ExerciseFeedback
        results={userResults}
        questionsNumber={questions.length}
      />
      <ExerciseBody
        onSubmit={handleSubmit}
        exerciseType={type}
        questions={questions}
        text={text}
        results={userResults}
        selections={userSelections}
        onSelect={setUserSelections}
      />
    </section>
  );
}
export default Exercise;
