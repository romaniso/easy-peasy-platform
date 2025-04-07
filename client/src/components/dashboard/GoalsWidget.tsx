import { SyntheticEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { Icon, IconType } from "../common/Icon/Icon";
import { RadioGroup } from "../common/RadioGroup";
import { Button } from "../common/Button";
import { User } from "../../interfaces/user";
import { GoalsObj } from "../../types/goalsObj";
import { useToast } from "../../context/ToastContext";
import { ToastType } from "../../enums/toast";
import { AppDispatch, RootState, updateUser } from "../../store/store";

interface GoalsWidgetProps {
  title: string;
}

export const GoalsWidget = ({ title }: GoalsWidgetProps): JSX.Element => {
  const [wordsPerWeekValue, setWordsPerWeek] = useState<string | null>(null);
  const [tasksPerWeekValue, setTasksPerWeek] = useState<string | null>(null);
  const { user, isLoading } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  const toast = useToast();
  const { t } = useTranslation("profile");
  const { t: tDashboard } = useTranslation("dashboard");
  const { t: tCommon } = useTranslation("common");

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

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!user) {
      throw new Error("No user in a global state to update");
    }

    console.log(wordsPerWeekValue, tasksPerWeekValue);
    if (!wordsPerWeekValue && !tasksPerWeekValue) {
      return toast?.open(
        t("personalInfo.toastMessage.warning"),
        ToastType.Warning
      );
    }

    const goals = {
      wordsPerWeek:
        wordsPerWeekValue === "more" ? "more" : Number(wordsPerWeekValue),
      tasksPerWeek:
        tasksPerWeekValue === "more" ? "more" : Number(tasksPerWeekValue),
    };

    const updatedUser: User = {
      ...user,
      profile: {
        ...user.profile,
        goals: goals as GoalsObj,
      },
    };

    try {
      await dispatch(updateUser(updatedUser)).unwrap();
      toast?.open(t("personalInfo.toastMessage.success"), ToastType.Success);
    } catch (err) {
      console.error(err);
      toast?.open(t("personalInfo.toastMessage.failure"), ToastType.Failure);
    }
  };

  useEffect(() => {
    if (!user || !user.profile.goals) {
      throw new Error("No user in a global state to update");
    }
    if (user.profile.goals) {
      setTasksPerWeek(user.profile.goals.tasksPerWeek.toString());
      setWordsPerWeek(user.profile.goals.wordsPerWeek.toString());
    }
  }, []);
  return (
    <article className="bg-white dark:bg-black/40 dark:border dark:border-stone-900 rounded-md px-3 py-2 shadow-lg h-full">
      <div className="text-orange-500 dark:text-orange-500 font-bold text-xl md:text-3xl flex items-center gap-2 drop-shadow mb-1">
        <h4>{title}</h4>
        <Icon type={IconType.Goal} />
      </div>
      <form className="flex-1 flex flex-wrap" onSubmit={handleSubmit}>
        <fieldset className="basis-1/2 flex flex-col justify-between pr-1">
          <h4 className="text-sm text-indigo-900 dark:text-indigo-300 mb-2">
            {tDashboard("setYourGoals.line1")}
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
            {tDashboard("setYourGoals.line2")}
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
          submit
          secondary
          rounded
          className="mt-3 basis-full md:basis-auto"
          icon={<Icon className="inline ml-1.5" type={IconType.Save} />}
          loading={isLoading}
        >
          {tCommon("buttons.save")}
        </Button>
      </form>
    </article>
  );
};
