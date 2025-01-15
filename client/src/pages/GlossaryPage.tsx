import { useState } from "react";
import { Panel } from "../components/common/Panel";
import { useTranslation } from "react-i18next";
import { GlossaryHeader } from "../components/glossary/GlossaryHeader";
import { GlossaryBody } from "../components/glossary/GlossaryBody";
import { Icon, IconType } from "../components/common/icon/Icon";

//const STATS_URL = "/glossary";
export const GlossaryPage = (): JSX.Element => {
  const { t } = useTranslation("glossary");
  //@TODO: turn strings into enums
  const [sorted, setSorted] = useState<null | string>(null);

  //Search
  const [searchPhrase, setSearchPhrase] = useState("");

  //  const { t } = useTranslation("dashboard");

  return (
    <div className="h-full md:p-12">
      <Panel className="bg-white flex flex-col !p-0 rounded-none md:rounded-md overflow-hidden h-full w-full">
        <header className="p-3 md:p-5 bg-gradient-to-r from-orange-500 to-orange-300 dark:from-stone-900 dark:to-stone-800 md:h-[15%]">
          <h1 className="text-indigo-800 dark:text-indigo-300 font-extrabold drop-shadow text-center md:text-left text-3xl md:text-4xl flex items-center gap-2">
            {t("header.mainHeader")}
            <Icon type={IconType.Glossary} />
          </h1>
        </header>
        <main className="flex flex-col gap-4 py-3 px-3 md:px-5 h-[90%]  md:h-[80%]">
          <GlossaryHeader onSort={setSorted} onSearh={setSearchPhrase} />
          <GlossaryBody sorted={sorted} search={searchPhrase} />
        </main>
      </Panel>
    </div>
  );
};
