import React, { SyntheticEvent, useState } from "react";
import { GoGoal } from "react-icons/go";
import { RadioGroup } from "../common/RadioGroup";
import Button from "../common/Button";

interface GoalsWidgetProps {
  title: string;
}
export const GoalsWidget: React.FC<GoalsWidgetProps> = ({ title }) => {
  const [wordsPerWeekValue, setWordsPerWeek] = useState<string | "more" | null>(
    null
  );
  const [tasksPerWeekValue, setTasksPerWeek] = useState<string | "more" | null>(
    null
  );

  const wordsPerWeekItems = [
    { name: "10 words", value: 10 },
    { name: "30 words", value: 30 },
    { name: "50 words", value: 50 },
    { name: "more words", value: "more" },
  ];
  const tasksPerWeekItems = [
    { name: "5 tasks", value: 5 },
    { name: "10 tasks", value: 10 },
    { name: "20 tasks", value: 20 },
    { name: "more tasks", value: "more" },
  ];

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
  };
  return (
    <article className="bg-white dark:bg-black/40 dark:border dark:border-stone-900 rounded-md px-3 py-2 shadow-lg h-full">
      <div className="text-orange-500 dark:text-orange-500 font-bold text-xl md:text-3xl flex items-center gap-2 drop-shadow mb-1">
        <h4>{title}</h4>
        <GoGoal />
      </div>
      <form className="flex-1 flex flex-wrap" onSubmit={handleSubmit}>
        <fieldset className="basis-1/2 flex flex-col justify-between pr-1">
          <h4 className="text-sm text-indigo-900 dark:text-indigo-300 mb-2">
            Words per week you want to learn:
          </h4>
          <div className="flex w-full flex-col justify-center items-center gap-1">
            <RadioGroup
              value={wordsPerWeekValue}
              name="wordsPerWeek"
              items={wordsPerWeekItems}
              onChange={setWordsPerWeek}
            />
          </div>
        </fieldset>
        <fieldset className="basis-1/2 flex flex-col justify-between pl-1">
          <h4 className="text-sm text-indigo-900 dark:text-indigo-300 mb-2">
            Exercises per week you want to do:
          </h4>
          <div className="flex w-full flex-col justify-center items-center gap-1">
            <RadioGroup
              value={tasksPerWeekValue}
              name="tasksPerWeek"
              items={tasksPerWeekItems}
              onChange={setTasksPerWeek}
            />
          </div>
        </fieldset>
        <Button
          save
          submit
          secondary
          small
          rounded
          className="mt-3 basis-full md:basis-auto"
        />
      </form>
    </article>
  );
};
