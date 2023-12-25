//#region imports
import React, {useState} from "react";
import ExerciseHeader from "./ExerciseHeader";
import ExerciseBody from "./ExerciseBody";
import ExerciseFeedback from "./ExerciseFeedback";
import {ExerciseUnit} from "../../interfaces/exerciseUnit";
import {UserResult} from "../../types/userResult";
// Utils
import generateKeySheet from "../../utils/generateKeySheet";
import generateUserResults from "../../utils/generateUserResults";
import {ExerciseTypeName} from "../../enums/exercise";
//#endregion

//#region interfaces
interface ExerciseProps {
    active: boolean;
    instruction: string;
    title: string;
    type: ExerciseTypeName;
    text?: string;
    questions: (ExerciseUnit)[];
}
//#endregion
const Exercise: React.FC<ExerciseProps> = ({
                      active = false,
                      instruction,
                      title,
                      type,
                      text,
                      questions,
                  }) => {
    const [userSelections, setUserSelections] = useState<string[]>(
        Array(questions.length).fill("")
    );
    const [userResults, setUserResults] = useState<UserResult[] | null>(null);

    //FIXME: Refactor is so a user may input two possible values. Refactor is also required in data, e.g isCorrect not a string but array of two possible options. It may be refactored as a hook, show info when a field is empty before submitting
    const validateUsersAnswers = (usersAnswers: string[]): void => {
        setUserResults(generateUserResults(usersAnswers, generateKeySheet(type, questions), type));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        validateUsersAnswers(userSelections);
    };

    const handleSelectChange = (
        updatedValues: string[] | React.ChangeEvent<HTMLInputElement>[]
    ) => {
        setUserSelections(updatedValues as string[]);
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
                onSelect={handleSelectChange}
            />
        </section>
    );
}
export default Exercise;