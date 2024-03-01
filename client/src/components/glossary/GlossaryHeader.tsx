import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import Select from "../common/Select";
import { MdSort } from "react-icons/md";
import { FaSortAlphaDown } from "react-icons/fa";
import { PiClockCountdownLight } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";

interface GlossaryHeaderProps {
  onSort: (sortable: string) => void;
}

export const GlossaryHeader: React.FC<GlossaryHeaderProps> = ({ onSort }) => {
  const sortibles = [
    {
      value: "abc",
      label: "A-Z",
      icon: <FaSortAlphaDown />,
    },
    {
      value: "recent",
      label: "Recent",
      icon: <PiClockCountdownLight />,
    },
    {
      value: "marked",
      label: "Marked",
      icon: <FaStar />,
    },
  ];

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
      <Select
        defaultText={
          <span className="flex items-center gap-1">
            Sort by
            <MdSort />
          </span>
        }
        options={sortibles}
        onChange={onSort}
      />
    </div>
  );
};
