import { Panel } from "../components/common/Panel";
import { ChangePassword } from "../components/settings/ChangePassword";
import { LanguageSwitcher } from "../components/settings/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { ChangeTheme } from "../components/settings/ChangeTheme";
import { DeleteAccount } from "../components/settings/DeleteAccount";
import { IoSettingsOutline } from "react-icons/io5";

export const SettingsPage = (): JSX.Element => {
  const { t } = useTranslation("settings");

  return (
    <div className="h-full md:p-12">
      <Panel className="bg-white flex flex-col !p-0 rounded-none md:rounded-md overflow-hidden h-full w-full">
        <header className="p-3 md:p-5 bg-gradient-to-r from-orange-500 to-orange-300 dark:from-stone-900 dark:to-stone-800">
          <h1 className="text-indigo-800 dark:text-indigo-300 font-extrabold drop-shadow text-center md:text-left text-3xl md:text-4xl flex items-center gap-2">
            {t("header.mainHeader")}
            <IoSettingsOutline />
          </h1>
        </header>
        <main className="py-3 px-3 md:px-5 grid grid-cols-1 md:grid-cols-2 gap-8">
          <ChangePassword />
          <LanguageSwitcher />
          <ChangeTheme />
          <DeleteAccount />
        </main>
      </Panel>
    </div>
  );
};
