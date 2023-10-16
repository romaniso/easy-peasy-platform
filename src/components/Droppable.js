import { useDroppable } from "@dnd-kit/core";

function Droppable({ children, id, isFilled }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id.toString(),
    data: {
      accepts: id.toString(),
      type: "droppable",
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={
        isOver
          ? "border bg-orange-200 shadow-inner rounded-md w-[170px] inline-block h-[30px] transition-colors"
          : "border bg-stone-200 shadow-inner rounded-md w-[170px] inline-block h-[30px] transition-colors"
      }
    >
      {isFilled ? isFilled : children}
    </div>
  );
}

export default Droppable;
