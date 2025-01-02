//#region imports
import React, { useRef, useState } from "react";
import { ExerciseHeader } from "./ExerciseHeader";
import { ExerciseBody } from "./ExerciseBody";
import { ExerciseFeedback } from "./ExerciseFeedback";
import { ExerciseUnit } from "../../interfaces/exerciseUnit";
import { UserResult } from "../../types/userResult";
// Utils
import generateKeySheet from "../../utils/generateKeySheet";
import generateUserResults from "../../utils/generateUserResults";
import { ExerciseTypeName } from "../../enums/exercise";
import { calculateResultIntoPercentage } from "../../utils/calculateResultIntoPercentages";
import useUser from "../../hooks/useUser";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
//#endregion

//#region interfaces
interface ExerciseProps {
  active: boolean;
  instruction: string;
  title: string;
  type: ExerciseTypeName;
  text?: string;
  questions: ExerciseUnit[];
}
//#endregion

const RECORD_ACTIVITY_URL = "/users/save";

export const Exercise = ({
  active = false,
  instruction,
  title,
  type,
  text,
  questions,
}: ExerciseProps): JSX.Element => {
  const [userSelections, setUserSelections] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [userResults, setUserResults] = useState<UserResult[] | null>(null);

  const { user } = useUser();
  const axiosPrivate = useAxiosPrivate();

  const feedbackRef = useRef<HTMLElement>(null);
  const assessUserAnswers = (usersAnswers: string[]): number => {
    const answers = generateUserResults(
      usersAnswers,
      generateKeySheet(type, questions),
      type
    );
    setUserResults(answers);
    return calculateResultIntoPercentage(answers);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    e.preventDefault();
    const result = assessUserAnswers(userSelections);
    if (user.username) {
      console.log("Logged in!");
      const { username } = user;
      try {
        const response = await axiosPrivate.post(
          RECORD_ACTIVITY_URL,
          { result, username },
          {
            withCredentials: true,
          }
        );
        if (response.status === 201) {
          console.log(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSelectChange = (
    updatedValues: string[] | React.ChangeEvent<HTMLInputElement>[]
  ) => {
    setUserSelections(updatedValues as string[]);
  };

  return (
    <section
      className={active ? "px-3 py-5 md:px-12 md:py-10 w-full" : "hidden"}
    >
      <ExerciseHeader
        title={title}
        instruction={instruction}
        ref={feedbackRef}
      />
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
        onSelect={handleSelectChange}
      />
    </section>
  );
};
