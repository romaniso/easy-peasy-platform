import { useTranslation } from "react-i18next";
import { ThemeToggle } from "../ThemeToggle";
import { Icon, IconType } from "../common/icon/Icon";

export const ChangeTheme = (): JSX.Element => {
  const { t } = useTranslation("settings");

  return (
    <section className="border-t border-indigo-50 dark:border-indigo-500/50 pt-5 md:col-span-2 flex justify-between items-center">
      <div>
        <h2 className="text-lg md:text-2xl text-indigo-500 dark:text-indigo-200 font-bold drop-shadow flex items-center gap-1 mb-1">
          {t("subheadings.changeTheme")}
          <Icon type={IconType.ColorMode} />
        </h2>
        <p className="hidden md:block text-indigo-900 dark:text-indigo-300">
          {t("changeTheme.switcherDescription")}
        </p>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </section>
  );
};
