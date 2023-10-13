import { useDraggable } from "@dnd-kit/core";

function Draggable({ children, id }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id + "",
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
}

export default Draggable;
