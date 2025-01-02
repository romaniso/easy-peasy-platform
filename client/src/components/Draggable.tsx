import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator } from "react-icons/md";

interface DraggableProps {
  id: number;
  title: string;
}

export const Draggable = ({ id, title }: DraggableProps): JSX.Element => {
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
      <div
        key={id}
        className="border py-1 px-2 min-w-[180px] text-center rounded-md text-indigo-900 dark:text-indigo-200 text-base shadow backdrop-blur flex justify-between items-center hover:shadow-lg  transition-colors"
      >
        <span>{title}</span>

        <MdDragIndicator />
      </div>
    </button>
  );
};
