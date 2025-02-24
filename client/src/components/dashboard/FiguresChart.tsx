import { Trans, useTranslation } from "react-i18next";
import { Icon, IconType } from "../common/icon/Icon";

interface FiguresChartProps {
  title: string;
  percentage: number;
  // put a unit in a plural form, e.g. words, users, kilograms.
  unitNameInPlural?: string;
}
export const FiguresChart = ({
  title,
  percentage,
}: //  unitNameInPlural,
FiguresChartProps): JSX.Element => {
  const { t } = useTranslation("dashboard");
  return (
    <article className="bg-white dark:bg-black/40 dark:border dark:border-stone-900 rounded-md p-3 shadow-lg h-full flex flex-col justify-between items-center gap-1">
      <div className="text-orange-500 dark:text-orange-500 font-bold text-xl md:text-3xl flex justify-center items-center gap-2 drop-shadow">
        <h4>{title}</h4>
        <Icon type={IconType.Achievement} />
      </div>
      <p className="text-3xl md:text-5xl text-indigo-500 drop-shadow font-bold relative">
        {percentage}%
        {/*<span className="bg-indigo-50 dark:bg-gray-950 shadow-sm rounded-xl py-0.5 px-1 absolute -top-2 -right-8 text-xs md:text-sm text-green-600 dark:text-green-300 inline-flex">+10% <FaArrowTrendUp/></span>*/}
      </p>
      <p className="text-xs md:text-sm text-indigo-900/50 dark:text-indigo-300 text-center">
        <Trans
          defaults={t("yourMarks.explanation")}
          components={{ 1: <strong /> }}
        />
      </p>
    </article>
  );
};
