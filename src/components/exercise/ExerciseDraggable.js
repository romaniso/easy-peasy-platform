import { useEffect, useState } from "react";
import useShuffle from "../../hooks/useShuffle";

import Draggable from "../Draggable";
import Droppable from "../Droppable";
import { DndContext } from "@dnd-kit/core";

//TODO: This component definitely requires a lot of refactoring. A user can currently dnd in one way but cannot drag a draggable component backwards.

function ExerciseDraggable({ draggables, droppables, onSelect, results }) {
  const [shuffledDrags, setShuffledDrags] = useState([]);
  const [toDrops, setDroppables] = useState(droppables);
  const { shuffleArray } = useShuffle();

  useEffect(() => {
    const initialShuffledDrags = [...draggables];
    shuffleArray(initialShuffledDrags);
    setShuffledDrags(
      initialShuffledDrags.map((drag, index) => ({ ...drag, id: index }))
    );
  }, []);

  function handleDragEnd(event) {
    if (event.over && event.over.data.current.type === "droppable") {
      const droppableId = Number(event.over.id);
      const draggableId = Number(event.active.id);

      const updatedToDrags = shuffledDrags.map((drag) => {
        if (drag.id === draggableId && !toDrops[droppableId].isFilled)
          return { ...drag, isPulled: true };
        return drag;
      });

      const updatedToDrops = toDrops.map((drop) => {
        if (drop.id === droppableId && !drop.isFilled)
          return { ...drop, isFilled: shuffledDrags[draggableId].title };
        return drop;
      });

      setShuffledDrags(updatedToDrags);
      setDroppables(updatedToDrops);
      onSelect(droppableId, shuffledDrags[draggableId].title);
    }
  }

  //Droppable
  const drops = toDrops.map((droppable, index) => {
    const renderedQuestion = droppable.title
      .split("***")
      .map((part, partIndex) =>
        partIndex === 1 ? (
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
        )
      );
    return (
      <div
        className="flex justify-start gap-2 items-center text-indigo-900 dark:text-indigo-200 text-xl [&:not(:last-child)]:mb-8"
        key={index}
      >
        {renderedQuestion}
      </div>
    );
  });
  //Draggable
  const drags = shuffledDrags.map((drag, index) =>
    drag.isPulled ? null : (
      <Draggable id={drag.id} title={drag.title} key={index}></Draggable>
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
