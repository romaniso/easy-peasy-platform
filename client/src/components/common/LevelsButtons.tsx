import React from "react";

export default function LevelsButtons() {
  //TODO: selection logics with state here
  return (
    <div className="flex justify-end items-center mb-4">
      <div className="flex justify-center items-center border border-indigo-50 dark:border-indigo-500/50 bg-white dark:bg-black/30 rounded-lg text-indigo-900 dark:text-indigo-300 shadow-md overflow-hidden">
        <button className="border-r border-indigo-50 dark:border-indigo-500/50 text-center px-2 py-1 hover:bg-indigo-100 dark:hover:bg-black/50 transition-colors duration-200">
          A1
        </button>
        <button className="border-r border-indigo-50 dark:border-indigo-500/50 text-center px-2 py-1 hover:bg-indigo-100 dark:hover:bg-black/50 transition-colors duration-200">
          A2
        </button>
        <button className="border-r border-indigo-50 dark:border-indigo-500/50 text-center px-2 py-1 hover:bg-indigo-100 dark:hover:bg-black/50 transition-colors duration-200">
          B1
        </button>
        <button className="border-r border-indigo-50 dark:border-indigo-500/50 text-center px-2 py-1 hover:bg-indigo-100 dark:hover:bg-black/50 transition-colors duration-200">
          B2
        </button>
        <button className="border-r border-indigo-50 dark:border-indigo-500/50 text-center px-2 py-1 hover:bg-indigo-100 dark:hover:bg-black/50 transition-colors duration-200">
          C1
        </button>
        <button className="text-center px-2 py-1 hover:bg-indigo-100 dark:hover:bg-black/50 transition-colors duration-200">
          All
        </button>
      </div>
    </div>
  );
}
