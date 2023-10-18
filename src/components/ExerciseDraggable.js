import { useEffect, useState } from "react";

import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { DndContext } from "@dnd-kit/core";

//TODO: This component definitely requires a lot of refactoring. A user can currently dnd in one way but cannot drag a draggable component backwards.

function ExerciseDraggable({ draggables, droppables, onSelect, results }) {
  //  const [shuffledDrags, setShuffledDrags] = useState([]);
  const [toDrags, setDraggables] = useState(draggables);
  const [toDrops, setDroppables] = useState(droppables);

  //FIXME: I need to shuffle the answers
  //  function shuffleArray(array) {
  //    for (let i = array.length - 1; i > 0; i--) {
  //      const j = Math.floor(Math.random() * (i + 1));
  //      [array[i], array[j]] = [array[j], array[i]];
  //    }
  //  }
  // Initialize the shuffledDrags when the component mounts
  //  useEffect(() => {
  //    const initialShuffledDrags = [...draggables]; // Create a copy of the draggable items
  //    shuffleArray(initialShuffledDrags); // Shuffle the copy
  //    setShuffledDrags(initialShuffledDrags); // Set the shuffled items as the initial state
  //  }, [draggables]); // Trigger the effect when draggable items change

  function handleDragEnd(event) {
    if (event.over && event.over.data.current.type === "droppable") {
      const droppableId = Number(event.over.id);
      const draggableId = Number(event.active.id);

      const updatedToDrags = toDrags.map((drag) => {
        if (drag.id === draggableId && !toDrops[droppableId].isFilled) {
          return { ...drag, isPulled: true };
        }
        return drag;
      });

      const updatedToDrops = toDrops.map((drop) => {
        if (drop.id === droppableId && !drop.isFilled) {
          return { ...drop, isFilled: toDrags[draggableId].title };
        }
        return drop;
      });

      setDraggables(updatedToDrags);
      setDroppables(updatedToDrops);
      onSelect(droppableId, toDrags[draggableId].title);
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
              results={results}
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
      <Draggable id={drag.id} title={drag.title} key={drag.id}></Draggable>
    )
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <section className="flex justify-between mb-8">
        <div>{drops}</div>
        <div className="flex flex-col justify-center gap-3">{drags}</div>
      </section>
    </DndContext>
  );
}
export default ExerciseDraggable;
