import React from "react";
import { Level } from "../../types/level";

interface Props {
  selectedLevel: Level | null;
  onSelect: (level: Level) => void;
}

export const LevelsButtons = ({ selectedLevel, onSelect }: Props) => {
  //TODO: selection logics with state here

  const levels: Level[] = ["A1", "A2", "B1", "B2", "C1", "C2", "All"];

  return (
    <div className="flex justify-end items-center mb-4">
      <div className="flex justify-center items-center border border-indigo-50 dark:border-indigo-500/50 bg-white dark:bg-black/30 rounded-lg text-indigo-900 dark:text-indigo-300 shadow-md overflow-hidden">
        {levels.map((level, index) => {
          if (index === levels.length - 1)
            return (
              <button
                key={level}
                className={`
                  ${
                    selectedLevel === level
                      ? "bg-indigo-500/20"
                      : "dark:hover:bg-black/50"
                  }
                  text-center px-2 py-1 hover:bg-indigo-100 transition-colors duration-200`}
                onClick={() => onSelect(level)}
              >
                {level}
              </button>
            );
          else
            return (
              <button
                key={level}
                className={`
                  border-r border-indigo-50 dark:border-indigo-500/50 text-center px-2 py-1 hover:bg-indigo-100 dark:hover:bg-black/50 transition-colors duration-200
                  ${
                    selectedLevel === level
                      ? "bg-indigo-500/20"
                      : "dark:hover:bg-black/50"
                  }
                  `}
                onClick={() => onSelect(level)}
              >
                {level}
              </button>
            );
        })}
      </div>
    </div>
  );
};
