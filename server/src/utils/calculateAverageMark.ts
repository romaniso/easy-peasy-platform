import { CompletedActivityEntity } from "../types/completedActivityEntity";

export const calculateAverageMark = (
  completedActivities: CompletedActivityEntity[]
) => {
  const sumOfAllMarks = completedActivities
    ?.map((activity) => activity.result)
    .reduce((a, b) => a + b, 0);
  const numberOfAllMarks = completedActivities?.length;
  if (!sumOfAllMarks || !numberOfAllMarks) return 0;

  return Math.round(sumOfAllMarks / numberOfAllMarks);
};
