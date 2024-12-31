import { useTranslation } from "react-i18next";
interface OrderTabsProps {
  items: number;
  activeExercise: number;
  setActiveItem: (tab: number) => void;
}
export const OrderTabs = ({
  items,
  activeExercise,
  setActiveItem,
}: OrderTabsProps): JSX.Element => {
  const { t } = useTranslation("exercise");
  const handleTab = (tab: number): void => {
    setActiveItem(tab);
  };

  const renderedTabs = Array(items)
    .fill(0)
    .map((_, index) => {
      const tabNumber = index + 1;
      return (
        <div
          key={index}
          className={`px-4 py-2 md:px-6 md:py-3 text-indigo-900 dark:text-indigo-200 font-bold shadow border-t-4 ${
            activeExercise === tabNumber
              ? "border-orange-500"
              : "border-white dark:border-transparent hover:bg-indigo-50 hover:dark:bg-[#202020] hover:border-indigo-50 "
          } cursor-pointer transition-colors`}
          onClick={() => handleTab(tabNumber)}
        >
          {tabNumber}
        </div>
      );
    });

  return (
    <header className="flex border-b dark:border-b-gray-500 items-center px-2 md:px-4 ">
      <p className="text-sm md:text-base w-20 md:w-24 text-center text-indigo-900 dark:text-indigo-200 font-bold">
        {t("tabs")}:
      </p>
      {renderedTabs}
    </header>
  );
};
