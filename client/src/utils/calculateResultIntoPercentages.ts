import { UserResult } from "../types/userResult";

export const calculateResultIntoPercentage = (
  results: UserResult[]
): number => {
  const numberOfPossibleAnswers: number = results.length;
  const correctAnswers: number = results.filter(
    (result) => result === "Same"
  ).length;
  return Math.floor((correctAnswers / numberOfPossibleAnswers) * 100);
};
