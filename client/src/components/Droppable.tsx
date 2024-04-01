import React, { ReactElement } from "react";
import { useDroppable } from "@dnd-kit/core";
import className from "classnames";
import { UserResult } from "../types/userResult";

interface DroppableProps {
  children?: ReactElement;
  id: number;
  isFilled: string | null;
  results: UserResult[] | null;
}
const Droppable: React.FC<DroppableProps> = ({
  children,
  id,
  isFilled,
  results,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id.toString(),
    data: {
      accepts: id.toString(),
      type: "droppable",
    },
  });

  const droppableClasses = className(
    "border rounded-md w-[120px] md:w-[170px] inline-block h-[25px] md:h-[30px] transition-colors",
    {
      "bg-stone-200 dark:bg-[#323232] dark:border-gray-500 shadow-inner":
        !isFilled && !isOver,
      "bg-white dark:bg-[#202020] shadow text-base pl-2": !!isFilled,
      "bg-orange-200 dark:bg-[#202020]": isOver && !isFilled,
      "!bg-green-100 dark:!bg-green-500/30":
        results && results[id] === "Same" && !!isFilled,
      "!bg-red-100 dark:!bg-red-500/30":
        results && results[id] === "Different" && !!isFilled,
    }
  );
  return (
    <div ref={setNodeRef} className={droppableClasses}>
      {isFilled ? isFilled : children}
    </div>
  );
};

export default Droppable;
