import { useEffect, useState } from "react";
import { FillInLetterUnit } from "./FillInLetterUnit";
import { ExerciseUnit } from "../../interfaces/exerciseUnit";
import { UserResult } from "../../types/userResult";
import { Icon, IconType } from "../common/icon/Icon";

interface ExerciseFillInLetterProps {
  questions: ExerciseUnit[];
  results: UserResult[] | null;
  onChange(index: number, event: string[]): void;
}
export const ExerciseFillInLetter = ({
  questions,
  onChange,
  results,
}: ExerciseFillInLetterProps): JSX.Element => {
  const [insertedWords, setInsertedWords] = useState<string[][]>([]);
  const [coveredIndexes, setCoveredIndexes] = useState<number[][]>([]);
  const randomizeIndex = (max: number) => Math.floor(Math.random() * max);
  const handleWord = (word: string, index: number): void => {
    const arrWord: string[] = word.split("");
    const visibleCount: number = Math.floor(arrWord.length / 2);
    const randomIndexes: Set<number> = new Set();

    const updatedCoveredLetterIndexes: number[][] = coveredIndexes;
    const coveredLetterIndexesForUnit: Set<number> = new Set();

    while (randomIndexes.size < visibleCount) {
      const randomIndex: number = randomizeIndex(arrWord.length);
      if (arrWord[randomIndex] !== " ") {
        randomIndexes.add(randomIndex);
      }
    }
    const newWord: string[] = [...arrWord];
    arrWord.map((char: string, index: number): void => {
      if (randomIndexes.has(index)) {
        newWord[index] = "*";
        coveredLetterIndexesForUnit.add(index);
      } else if (char === " ") {
        newWord[index] = " ";
      } else {
        newWord[index] = char;
      }
    });

    // Copy creation
    const updatedArr: string[][] = insertedWords;
    insertedWords[index] = newWord;
    const arrCoveredIndexes: number[] = Array.from(
      coveredLetterIndexesForUnit
    ).sort((a, b) => a - b);
    updatedCoveredLetterIndexes[index] = arrCoveredIndexes;

    //State updates
    setInsertedWords(updatedArr);
    setCoveredIndexes(updatedCoveredLetterIndexes);
  };

  useEffect(() => {
    const words = questions.map((word) => word.question);
    words.map((word, index) => handleWord(word, index));
  }, []);
  const handleSingleWordChange = (wordIndex: number, updatedWord: string[]) => {
    const newInsertedWords: string[][] = [...insertedWords];
    newInsertedWords[wordIndex] = updatedWord;
    setInsertedWords(newInsertedWords);

    // Notify parent about the change
    onChange(wordIndex, updatedWord);
  };

  const renderedExercise = insertedWords.map((word, wordIndex) => {
    const feedbackIcon =
      results &&
      (results[wordIndex] === "Same" ? (
        <Icon
          className="inline-block text-green-500 ml-2"
          type={IconType.ThumbsUp}
        />
      ) : (
        <Icon
          className="inline-block ml-2 text-red-400"
          type={IconType.ThumbsDown}
        />
      ));
    return (
      <div className="flex items-baseline gap-2" key={wordIndex}>
        <FillInLetterUnit
          key={wordIndex}
          word={word}
          wordIndex={wordIndex}
          onFill={handleSingleWordChange}
          coveredIndexes={coveredIndexes[wordIndex]}
          results={results}
        />
        {feedbackIcon}
      </div>
    );
  });

  return <div>{renderedExercise}</div>;
};
