import { useEffect, useState } from "react";
import { Icon, IconType } from "./common/icon/Icon";

interface ThemeToggleProps {
  className?: string;
  icons?: true;
}

export const ThemeToggle = ({
  className,
  icons,
}: ThemeToggleProps): JSX.Element => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    return (
      window.matchMedia("(prefers-color-scheme: dark)").matches ||
      localStorage.getItem("themeMode") !== "dark"
    );
  });

  useEffect(() => {
    if (isDarkTheme) {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [isDarkTheme]);
  const handleToggleTheme = () => {
    setIsDarkTheme((prevIsDarkTheme) => !prevIsDarkTheme);
    if (isDarkTheme) {
      localStorage.setItem("themeMode", "dark");
    } else {
      localStorage.setItem("themeMode", "light");
    }
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      {icons && (
        <span className="text-xl">
          <Icon
            type={IconType.Sun}
            className="text-orange-500 dark:text-indigo-400"
          />
        </span>
      )}
      <div className="p-1">
        <label className="relative inline-block w-11 h-6">
          <input
            type="checkbox"
            className="opacity-0 w-0 h-0"
            onChange={handleToggleTheme}
          />
          <span className="absolute cursor-pointer inset-0 rounded-2xl border dark:border-stone-700 bg-indigo-300 dark:bg-stone-900 transition-all before:[content: ''] before:h-5 before:absolute before:w-5 before:inline-block before:rounded-full before:left-[1px] dark:before:translate-x-5 before:bottom-[1px] before:bg-white dark:before:bg-indigo-200 before:transition-all"></span>
        </label>
      </div>
      {icons && (
        <span className="text-xl">
          <Icon
            type={IconType.Moon}
            className="text-stone-700 dark:text-stone-300"
          />
        </span>
      )}
    </div>
  );
};
