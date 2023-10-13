import { useDroppable } from "@dnd-kit/core";

function Droppable({ children, id, parent }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id + "",
  });

  //  const isParent = parent === id;
  return (
    <div
      ref={setNodeRef}
      className={
        isOver
          ? "border bg-orange-200 shadow-inner rounded-md w-[170px] inline-block h-[30px] transition-colors"
          : "border bg-stone-200 shadow-inner rounded-md w-[170px] inline-block h-[30px] transition-colors"
      }
    >
      {children}
    </div>
  );
}

export default Droppable;
