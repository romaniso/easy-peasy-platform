import React from "react";
import { BsSearch } from "react-icons/bs";

export const GlossaryHeader: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-between">
      <div className="basis-full md:basis-1/4">
        <div className="flex w-full items-center rounded-md dark:bg-black/40 border dark:border-indigo-500/50 border-indigo-100 py-1.5 px-3 shadow-inner">
          <BsSearch className="dark:text-indigo-300 text-indigo-800 text-lg block float-left cursor-pointer mr-2" />
          <input
            placeholder="Search words"
            type="search"
            className="text-base bg-transparent w-full text-indigo-900 dark:text-indigo-200 placeholder:dark:text-indigo-300/50 placeholder:text-indigo-900/50 focus:outline-none"
          />
        </div>
      </div>
      <div className="bg-gray-400">Filter bar</div>
    </div>
  );
};
