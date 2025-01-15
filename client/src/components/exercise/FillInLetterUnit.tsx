import React, { useEffect, useRef, useState } from "react";
import className from "classnames";
import { UserResult } from "../../types/userResult";

interface FillInLetterUnitProps {
  wordIndex: number;
  word: string[];
  onFill(wordIndex: number, updatedWord: string[]): void;
  coveredIndexes: number[];
  results: UserResult[] | null;
}

export const FillInLetterUnit = ({
  wordIndex,
  word,
  onFill,
  coveredIndexes,
  results,
}: FillInLetterUnitProps): JSX.Element => {
  const [activeInputIndex, setActiveInputIndex] = useState<number | null>(null);
  const [wordToComplete, setWord] = useState<string[]>(word);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    charIndex: number
  ): void => {
    const { value } = target;
    const newWord: string[] = [...wordToComplete];
    newWord[charIndex] = !value ? "*" : value.substring(value.length - 1);
    setWord(newWord);
  };

  useEffect(() => {
    if (activeInputIndex !== null && inputRefs.current) {
      const inputRef = inputRefs.current[activeInputIndex];
      if (inputRef) {
        inputRef.focus();
      }
    }
    onFill(wordIndex, wordToComplete);
  }, [activeInputIndex, wordToComplete, results]);

  const updateInput = (inputIndex: number): void => {
    if (inputIndex === word.length - 1) return;
    const newIndex: number = inputIndex + 1;
    if (!coveredIndexes.includes(newIndex) || word[newIndex] === " ") {
      updateInput(newIndex);
    } else {
      setActiveInputIndex(newIndex);
    }
  };

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    inputIndex: number
  ): void => {
    if (e.key === "Backspace") {
      e.preventDefault();

      let newIndex = inputIndex - 1;
      while (newIndex >= 0 && !coveredIndexes.includes(newIndex)) {
        newIndex = newIndex - 1;
      }
      const updatedWordWithRemovedChar = [...wordToComplete];
      updatedWordWithRemovedChar[inputIndex] = "*";
      setWord(updatedWordWithRemovedChar);
      setActiveInputIndex(newIndex);
    }
  };

  return (
    <div key={wordIndex}>
      <span className="mr-2 md:mr-4 bg-indigo-400 text-white py-[2px] md:py-1 px-2 md:px-2 rounded-lg text-sm md:text-base shadow">
        {wordIndex + 1}
      </span>
      <div className="inline-flex items-center gap-1 mb-6 md:mb-8">
        {word.map((char: string, charIndex: number) => {
          const inputClasses = className(
            "text-lg md:text-xl text-center md:p-1 border dark:border-gray-500 rounded-md shadow-inner text-indigo-800 dark:text-indigo-400 font-bold outline-none w-6 md:w-8 hover:scale-105 dark:bg-[#323232] focus:border-orange-300 focus:dark:border-orange-500 hover:border-orange-300 hover:dark:border-orange-500 transition-all duration-500",
            {
              "!bg-red-100 dark:!bg-red-500/30":
                results &&
                Array.from(results[wordIndex] as number[]).includes(charIndex),
              "!bg-green-100 !bg-green-500/30":
                results &&
                !Array.from(results[wordIndex] as number[]).includes(charIndex),
            }
          );
          if (coveredIndexes.includes(charIndex)) {
            return (
              <input
                ref={(el) => (inputRefs.current[charIndex] = el)}
                key={charIndex}
                className={inputClasses}
                name="letter"
                type="text"
                autoComplete="off"
                maxLength={1}
                value={
                  wordToComplete[charIndex] !== "*"
                    ? wordToComplete[charIndex]
                    : ""
                }
                onKeyDown={(e) => handleOnKeyDown(e, charIndex)}
                onChange={(e) => {
                  updateInput(charIndex);
                  handleChange(e, charIndex);
                }}
                onClick={() => setActiveInputIndex(charIndex)}
              />
            );
          } else if (word[charIndex] === " ") {
            return (
              <span key={charIndex} className="w-4 md:w-6">
                {char}
              </span>
            );
          } else if (!coveredIndexes.includes(charIndex)) {
            return (
              <span
                key={charIndex}
                className="text-indigo-900 dark:text-indigo-100 text-lg md:text-xl"
              >
                {word[charIndex]}
              </span>
            );
          }
        })}
      </div>
    </div>
  );
};
