import { subDays, format } from "date-fns";
import { CompletedActivityEntity } from "../types/completedActivityEntity";

export const calculateActivityCountMonthly = (
  completedActivities: CompletedActivityEntity[] | []
) => {
  const lastMonthActivitiesCount = [];
  const currentDate = new Date();

  for (let i = 30; i >= 0; i--) {
    const date = subDays(currentDate, i); // Calculate date for each day in the last month
    const formattedDate = format(date, "yyyy-MM-dd");

    // Filter user's completed activities for the current date
    const activitiesForDate = completedActivities?.filter(
      (activity) => activity.date === formattedDate
    );

    // Count the number of completed activities for the current date
    const completedActivitiesCount = activitiesForDate.length;
    // Push an object containing the date and the number of completed activities to the array
    lastMonthActivitiesCount.push({
      date: formattedDate,
      completedActivities: completedActivitiesCount,
    });
  }

  return lastMonthActivitiesCount;
};
