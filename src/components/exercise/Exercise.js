//#region imports
import React, {useState} from "react";
import ExerciseHeader from "./ExerciseHeader";
import ExerciseBody from "./ExerciseBody";
import ExerciseFeedback from "./ExerciseFeedback";
// Utils
import generateKeySheet from "../../utils/generateKeySheet";
import generateUserResults from "../../utils/generateUserResults";
//#endregion
function Exercise({
  active = false,
  instruction,
  title,
  type,
  text,
  questions,
}) {
  const [userSelections, setUserSelections] = useState(
    Array(questions.length).fill("")
  );
  const [userResults, setUserResults] = useState(null);

  //FIXME: Refactor is so a user may input two possible values. Refactor is also required in data, e.g isCorrect not a string but array of two possible options. It may be refactored as a hook, show info when a field is empty before submitting
  const validateUsersAnswers = (usersAnswers) => {
    if (
      !Array.isArray(usersAnswers) ||
      typeof usersAnswers.map !== "function"
    ) {
      return console.error("usersAnswers is not an array");
    }
    const results = generateUserResults(usersAnswers, generateKeySheet(type, questions), type);
    setUserResults(results);
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
