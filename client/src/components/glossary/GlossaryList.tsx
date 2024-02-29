import React from "react";
import { GlossaryItem } from "./GlossaryItem";
import { Glossaryitem } from "../../enums/glossaryItem";

interface GlossaryListProps {
  data: Glossaryitem[];
}

export const GlossaryList: React.FC<GlossaryListProps> = ({ data }) => {
  const renderedGlossaryItems = data.map((item) => (
    <GlossaryItem
      key={item.id}
      word={item.word}
      definition={item.definition}
      audio={item.audio}
    />
  ));

  return (
    <div className="flex-grow flex flex-col gap-3 h-full !overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-orange-300 dark:scrollbar-thumb-stone-800 scrollbar-track-white dark:scrollbar-track-stone-900">
      {renderedGlossaryItems}
    </div>
  );
};
