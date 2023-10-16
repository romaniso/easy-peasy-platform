import { useState } from "react";
import { MdDragIndicator } from "react-icons/md";

import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { DndContext } from "@dnd-kit/core";

//TODO: This component definitely requires a lot of refactoring. First, it needs to be validated and a feedback should be given. Next, a user can currently dnd in one way but cannot drag a draggable component backwards.

function ExerciseDraggable({
  questions,
  draggables,
  droppables,
  onSelect,
  selections,
}) {
  const [toDrags, setDraggables] = useState(draggables);
  const [toDrops, setDroppables] = useState(droppables);
  const [isDropped, setIsDropped] = useState(false);

  console.log(toDrags);
  console.log(toDrops);

  function handleDragEnd(event) {
    if (event.over && event.over.data.current.type === "droppable") {
      const droppableId = Number(event.over.id);
      const draggableId = Number(event.active.id);

      const updatedToDrags = toDrags.map((drag) => {
        if (drag.id === draggableId) {
          return { ...drag, isPulled: true };
        }
        return drag;
      });

      const updatedToDrops = toDrops.map((drop) => {
        if (drop.id === droppableId) {
          return { ...drop, isFilled: toDrags[draggableId].title };
        }
        return drop;
      });

      setDraggables(updatedToDrags);
      setDroppables(updatedToDrops);
    }
  }

  //Droppable
  const drops = toDrops.map((droppable, index) => {
    const renderedQuestion = droppable.title
      .split("***")
      .map((part, partIndex) => {
        return partIndex === 1 ? (
          <>
            <Droppable
              id={droppable.id}
              key={droppable.id}
              isFilled={droppable.isFilled}
            ></Droppable>
            <span>{part}</span>
          </>
        ) : (
          <span key={index}>{part}</span>
        );
      });
    return (
      <div
        className="flex justify-start gap-2 items-center text-indigo-900 text-xl [&:not(:last-child)]:mb-8"
        key={index}
      >
        {renderedQuestion}
      </div>
    );
  });
  //Draggable
  const drags = toDrags.map((drag) =>
    drag.isPulled ? null : (
      <Draggable id={drag.id} title={drag.title} key={drag.id}>
        <div
          key={drag.id}
          className="border py-1 px-2 min-w-[180px] text-center rounded-md text-indigo-900 text-base shadow backdrop-blur flex justify-between items-center hover:bg-orange-50 hover:shadow-lg transition-colors"
        >
          <span>{drag.title}</span>

          <MdDragIndicator />
        </div>
      </Draggable>
    )
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <section className="flex justify-between mb-8">
        {/* container od drops */}
        <div>{drops}</div>
        {/*container od drags*/}
        <div className="flex flex-col justify-center gap-3">{drags}</div>
      </section>
    </DndContext>
  );
}
export default ExerciseDraggable;
