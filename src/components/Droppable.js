import { useDroppable } from "@dnd-kit/core";
import className from "classnames";

function Droppable({ children, id, isFilled }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id.toString(),
    data: {
      accepts: id.toString(),
      type: "droppable",
    },
  });

  const droppableClasses = className(
    "border rounded-md w-[170px] inline-block h-[30px] transition-colors",
    {
      "bg-stone-200 shadow-inner": !isFilled && !isOver,
      "bg-white shadow text-base pl-2": !!isFilled,
      "bg-orange-200": !!isOver && !isFilled,
    }
  );
  return (
    <div ref={setNodeRef} className={droppableClasses}>
      {isFilled ? isFilled : children}
    </div>
  );
}

export default Droppable;
