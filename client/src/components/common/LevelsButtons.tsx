import React from "react";
import { Level } from "../../types/level";

interface Props {
  selectedLevel: Level | null;
  onSelect: (level: Level | null) => void;
}

export const LevelsButtons = ({ selectedLevel, onSelect }: Props) => {
  //TODO: selection logics with state here
  return (
    <div className="flex justify-end items-center mb-4">
      <div className="flex justify-center items-center border border-indigo-50 dark:border-indigo-500/50 bg-white dark:bg-black/30 rounded-lg text-indigo-900 dark:text-indigo-300 shadow-md overflow-hidden">
        <button className="border-r border-indigo-50 dark:border-indigo-500/50 text-center px-2 py-1 hover:bg-indigo-100 dark:hover:bg-black/50 transition-colors duration-200" onClick={() => onSelect("A1")}>
          A1
        </button>
        <button className="border-r border-indigo-50 dark:border-indigo-500/50 text-center px-2 py-1 hover:bg-indigo-100 dark:hover:bg-black/50 transition-colors duration-200" onClick={() => onSelect("A2")}>
          A2
        </button>
        <button className="border-r border-indigo-50 dark:border-indigo-500/50 text-center px-2 py-1 hover:bg-indigo-100 dark:hover:bg-black/50 transition-colors duration-200" onClick={() => onSelect("B1")}>
          B1
        </button>
        <button className="border-r border-indigo-50 dark:border-indigo-500/50 text-center px-2 py-1 hover:bg-indigo-100 dark:hover:bg-black/50 transition-colors duration-200" onClick={() => onSelect("B2")}>
          B2
        </button>
        <button className="border-r border-indigo-50 dark:border-indigo-500/50 text-center px-2 py-1 hover:bg-indigo-100 dark:hover:bg-black/50 transition-colors duration-200" onClick={() => onSelect("C1")}>
          C1
        </button>
        <button className="border-r border-indigo-50 dark:border-indigo-500/50 text-center px-2 py-1 hover:bg-indigo-100 dark:hover:bg-black/50 transition-colors duration-200" onClick={() => onSelect("C2")}>
          C2
        </button>
        <button className="text-center px-2 py-1 hover:bg-indigo-100 dark:hover:bg-black/50 transition-colors duration-200" onClick={() => onSelect(null)}>
          All
        </button>
      </div>
    </div>
  );
};
