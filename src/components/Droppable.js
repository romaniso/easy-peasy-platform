import { useDroppable } from "@dnd-kit/core";

function Droppable({ children, id, isFilled }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id.toString(),
    data: {
      accepts: id.toString(),
      type: "droppable",
    },
  });

  //TODO: use classname library ;)

  let style;

  if (isOver && !isFilled) {
    style =
      "border bg-orange-200 shadow-inner rounded-md w-[170px] inline-block h-[30px] transition-colors";
  } else if (isFilled) {
    style =
      "border bg-white shadow text-base pl-2 rounded-md w-[170px] inline-block h-[30px] transition-colors";
  } else {
    style =
      "border bg-stone-200 shadow-inner rounded-md w-[170px] inline-block h-[30px] transition-colors";
  }

  return (
    <div ref={setNodeRef} className={style}>
      {isFilled ? isFilled : children}
    </div>
  );
}

export default Droppable;
