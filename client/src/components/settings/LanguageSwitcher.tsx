import { TbWorld } from "react-icons/tb";
import { ReactElement, useState } from "react";
import PolandFlag from "../../assets/images/poland.png";
import UsaFlag from "../../assets/images/usa.png";
import UkraineFlag from "../../assets/images/ukraine.png";
import { Select } from "../common/Select";
import { Language } from "../../enums/lang";
import { useTranslation } from "react-i18next";
import { ToastType } from "../../enums/toast";
import { useToast } from "../../context/ToastContext";
import { IoLanguage } from "react-icons/io5";

interface LanguageSwitcherItem {
  value: Language;
  label: string;
  icon?: ReactElement;
}
interface Props {
  isHome?: true;
}
export const LanguageSwitcher = ({ isHome }: Props) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    (localStorage.getItem("i18nextLng") as Language) || Language.English
  );
  const toast = useToast();

  const { i18n } = useTranslation();
  const { t } = useTranslation("settings");

  const languages: LanguageSwitcherItem[] = [
    {
      value: Language.English,
      label: isHome ? "EN" : t("languages.en"),
      icon: isHome ? undefined : (
        <img src={UsaFlag} alt="American flag" className="w-7" />
      ),
    },
    {
      value: Language.Polish,
      label: isHome ? "PL" : t("languages.pl"),
      icon: isHome ? undefined : (
        <img src={PolandFlag} alt="Polish flag" className="w-7" />
      ),
    },
    {
      value: Language.Ukrainian,
      label: isHome ? "UA" : t("languages.ua"),
      icon: isHome ? undefined : (
        <img src={UkraineFlag} alt="Ukrainian flag" className="w-7" />
      ),
    },
  ];

  const handleSwitchLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
    const toastMessage = t("selectLanguage.toastMessage");
    if (toastMessage) {
      toast?.open(toastMessage, ToastType.Success);
    }
  };
  if (isHome)
    return (
      <section>
        <Select
          options={languages}
          onChange={handleSwitchLanguage}
          defaultText={
            <div className="flex justify-center items-center gap-2">
              <TbWorld className="text-xl" />
              <span className="uppercase">{selectedLanguage}</span>
            </div>
          }
          noBorders
          noArrows
        />
      </section>
    );

  return (
    <section>
      <h2 className="text-lg md:text-2xl text-indigo-500 dark:text-indigo-200 font-bold drop-shadow flex items-center gap-1 mb-3.5 md:mb-6">
        {t("subheadings.defaultLanguage")}
        <IoLanguage />
      </h2>
      <Select
        options={languages}
        onChange={handleSwitchLanguage}
        defaultText={t("selectLanguage.selectInputText")}
      />
    </section>
  );
};
