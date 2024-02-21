import React from "react";
import { GlossaryItem } from "./GlossaryItem";

export const GlossaryList: React.FC = () => {
  return (
    <div className="flex-grow flex flex-col gap-3 h-full !overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-orange-300 dark:scrollbar-thumb-stone-800 scrollbar-track-white dark:scrollbar-track-stone-900">
      <GlossaryItem />
      <GlossaryItem />
      <GlossaryItem />
      <GlossaryItem />
      <GlossaryItem />
    </div>
  );
};
