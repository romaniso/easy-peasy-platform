import CircularProgressBar from "../CircularProgressBar";
import { Trans, useTranslation } from "react-i18next";

interface CircularChartProps {
  title: string;
  percentage: number;
  maxNumber?: number;
  // put a unit in a plural form, e.g. words, users, kilograms.
  unitNameInPlural?: string;
  usedUnits: number;
}
export const CircularChart = ({
  title,
  percentage,
  maxNumber,
  //  unitNameInPlural,
  usedUnits,
}: CircularChartProps): JSX.Element => {
  const { t } = useTranslation("dashboard");
  const calculateOffsetWithPercentage = (percentage: number): number => {
    return Math.floor(243 - (percentage / 100) * 147);
  };

  return (
    <article className="bg-white dark:bg-black/40 dark:border dark:border-stone-900 rounded-md p-3 shadow-lg h-full flex flex-col md:flex-row gap-1">
      <div className="basis-1/3 flex-1 flex flex-col md:gap-2 justify-between md:justify-evenly items-center">
        <h4 className="text-orange-500 font-bold text-xl md:text-3xl text-center drop-shadow">
          {title}
        </h4>
        <p className="text-3xl md:text-5xl text-indigo-500 drop-shadow font-bold">
          <span>{usedUnits}</span>
        </p>
        {maxNumber && (
          <p className="text-sm text-indigo-900 dark:text-indigo-300 md:text-center md:mb-2">
            <Trans
              defaults={t("addedWords.line1", { limit: maxNumber })}
              components={{ 1: <strong /> }}
            />
          </p>
        )}
      </div>
      <div className="basis-2/3 self-center flex flex-col justify-evenly items-center h-full">
        <div className="hidden md:block">
          {/*@TODO: I should create a util/hook for calculation percentage */}
          <CircularProgressBar
            percentage={percentage}
            offset={calculateOffsetWithPercentage(percentage)}
            lg
          />
        </div>
        <div className="flex md:flex-col items-center justify-center gap-1">
          <p className="text-xs md:text-sm text-indigo-900/50 dark:text-indigo-300 text-center md:mb-2">
            <Trans
              defaults={t("addedWords.line2", { percentage: percentage })}
              components={{ 1: <strong /> }}
            />
          </p>
          {/* TODO: implement it in the future, so a user can extend paid word limit */}
          {/*<span className="bg-indigo-500/70 rounded-md p-1 text-xs text-white hover:brightness-125 cursor-pointer transition-colors">
            Increase limit
          </span>*/}
          {/*<Button small secondary rounded  className='bg-indigo-500/70 text-xs'>*/}
          {/*    Increase the limit*/}
          {/*</Button>*/}
        </div>
      </div>
    </article>
  );
};
