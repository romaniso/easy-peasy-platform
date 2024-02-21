import React from "react";
import { PiMusicNotesFill } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import { FaRegTrashCan, FaStar } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";

export const GlossaryItem: React.FC = () => {
  return (
    <div className="flex-1 flex flex-wrap gap-2 border boder-indigo-50 dark:bg-black/40 dark:border-indigo-500/50 rounded-md py-2 px-3 shadow-sm">
      <div className="basis-full md:basis-1/6 flex flex-col relative">
        <strong className="text-lg text-orange-600 drop-shadow-sm flex items-center gap-1">
          placeholder
          <FaStar className="text-orange-300" />
        </strong>
        <span className="text-sm text-indigo-900 dark:text-indigo-300">
          /ˈpleɪsˌhoʊl.dɚ/
        </span>
        <div className="flex gap-2 text-sm">
          <span className="flex items-center gap-0.5 font-semibold text-indigo-900 dark:text-indigo-300 cursor-pointer hover:scale-110 transition-transform">
            UK <PiMusicNotesFill />
          </span>
          <span className="flex items-center gap-0.5 font-semibold text-indigo-900 dark:text-indigo-300 cursor-pointer hover:scale-110 transition-transform">
            US <PiMusicNotesFill />
          </span>
        </div>
        <button className="absolute right-0 top-0 translate-y-1/2 text-lg md:hidden text-orange-500">
          <HiOutlineDotsVertical />
        </button>
      </div>
      <div className="flex-1">
        <ol className="list-decimal pl-5 text-indigo-900 dark:text-indigo-300">
          <li className="mb-2">
            <span className="inline-block font-thin bg-indigo-50 dark:bg-indigo-500 dark:text-white px-1 py-0.5 rounded-md shadow-sm">
              MATHEMATICS
            </span>
            <span className="block">
              a significant zero in the decimal representation of a number.
            </span>
            <span className="italic">
              A placeholder variable p represents the result of a computation in
              progress.
            </span>
          </li>
          ...
          {/*<li>
            <span className="inline-block font-thin bg-indigo-50 px-1 py-0.5 rounded-md">
              LINGUISTICS
            </span>
            <span className="block">
              an element of a sentence that is required by syntactic constraints
              but carries little or no semantic information, for example the
              word it as a subject in it is a pity that she left, where the true
              subject is that she left.
            </span>
            <span className="italic">
              Currently we are using a stock image we found as a placeholder.
            </span>
          </li>*/}
        </ol>
      </div>
      <div className="flex-shrink basis-1/6 hidden md:flex justify-between items-start gap-1">
        <button className="flex items-center bg-red-500 text-white text-sm p-1 rounded-md shadow-sm gap-1">
          Remove <FaRegTrashCan />
        </button>
        <button className="flex items-center bg-indigo-500 text-white text-sm p-1 rounded-md shadow-sm gap-1">
          Edit <MdEdit />
        </button>
        <button className="flex items-center bg-orange-500 text-white text-sm p-1 rounded-md shadow-sm gap-1">
          Star <FaStar />
        </button>
        {/*<button className="">
          <HiDotsVertical />
        </button>*/}
      </div>
    </div>
  );
};
