import React, { useEffect, useState } from "react";
import Panel from "../components/common/Panel";
import { useTranslation } from "react-i18next";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useUser from "../hooks/useUser";
import { GlossaryHeader } from "../components/glossary/GlossaryHeader";
import { GlossaryBody } from "../components/glossary/GlossaryBody";
import { PiBookOpenTextBold } from "react-icons/pi";

//const STATS_URL = "/glossary";
export const GlossaryPage: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useUser();

  //  const { t } = useTranslation("dashboard");

  useEffect(() => {
    // const url = `${STATS_URL}/${user.username}`;
    // (async () => {
    //   try {
    //     const response = await axiosPrivate.get(url, {
    //       withCredentials: true,
    //     });
    //     const {
    //       averageMark,
    //       addedWords,
    //       vocabularyLimit,
    //       lastMonthActivitiesCount,
    //       vocabularyListUsedStorage,
    //     } = response.data.stats;
    //     setAverageMark(averageMark);
    //     setAddedWords(addedWords);
    //     setVocabularyLimit(vocabularyLimit);
    //     setLastMonthActivitiesCount(lastMonthActivitiesCount);
    //     setVocabularyListUsedStorage(vocabularyListUsedStorage);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // })();
  }, []);

  return (
    <div className="h-full md:p-12">
      <Panel className="bg-white flex flex-col !p-0 rounded-none md:rounded-md overflow-hidden h-full w-full">
        <header className="p-3 md:p-5 bg-gradient-to-r from-orange-500 to-orange-300 dark:from-stone-900 dark:to-stone-800 md:h-[15%]">
          <h1 className="text-indigo-800 dark:text-indigo-300 font-extrabold drop-shadow text-center md:text-left text-3xl md:text-4xl flex items-center gap-2">
            {/*{t("header.mainHeader")}*/}
            Glossary <PiBookOpenTextBold />
          </h1>
        </header>
        <main className="flex flex-col gap-4 py-3 px-3 md:px-5 h-[90%]  md:h-[80%]">
          <GlossaryHeader />
          <GlossaryBody />
        </main>
      </Panel>
    </div>
  );
};
