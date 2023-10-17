import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function Draggable({ children, id, title, isPulled }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id.toString(),
    data: {
      title,
      type: id.toString(),
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
}

export default Draggable;
