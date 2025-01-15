import React, { ReactElement, useEffect, useState } from "react";

import { shuffleArray } from "../../utils/shuffleArray";
import { Draggable } from "../Draggable";
import { Droppable } from "../Droppable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { UserResult } from "../../types/userResult";

//TODO: This component definitely requires a lot of refactoring. A user can currently dnd in one way but cannot drag a draggable component backwards.
type draggable = {
  title: string;
  id: number;
  isPulled: boolean;
};
type droppable = {
  title: string;
  id: number;
  isFilled: null | string;
};
interface ExerciseDraggableProps {
  draggables: draggable[];
  droppables: droppable[];
  results: UserResult[] | null;
  selections: string[];
  onSelect(index: number, event: string): void;
}
export const ExerciseDraggable = ({
  draggables,
  droppables,
  onSelect,
  results,
}: ExerciseDraggableProps): JSX.Element => {
  const [shuffledDrags, setShuffledDrags] = useState<draggable[]>([]);
  const [toDrops, setDroppables] = useState<droppable[]>(droppables);

  useEffect(() => {
    const initialShuffledDrags: draggable[] = [...draggables];
    shuffleArray(initialShuffledDrags as []);
    setShuffledDrags(
      initialShuffledDrags.map(
        (drag: draggable, index: number): draggable => ({ ...drag, id: index })
      )
    );
  }, []);

  function handleDragEnd(event: DragEndEvent): void {
    if (event.over && event.over.data.current?.type === "droppable") {
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
  const drops: ReactElement[] = toDrops.map((droppable, index) => {
    const renderedQuestion = droppable.title
      .split("***")
      .map((part, partIndex) =>
        partIndex === 1 ? (
          <React.Fragment key={partIndex + index}>
            <Droppable
              id={droppable.id}
              key={droppable.id}
              isFilled={droppable.isFilled}
              results={results}
            ></Droppable>
            <span>{part}</span>
          </React.Fragment>
        ) : (
          <span key={index}>{part}</span>
        )
      );
    return (
      <div
        className="flex justify-start gap-2 items-center text-indigo-900 dark:text-indigo-200 md:text-xl [&:not(:last-child)]:mb-2 md:[&:not(:last-child)]:mb-8"
        key={index}
      >
        {renderedQuestion}
      </div>
    );
  });
  //Draggable
  const drags: (ReactElement | null)[] = shuffledDrags.map((drag, index) =>
    drag.isPulled ? null : (
      <Draggable id={drag.id} title={drag.title} key={index}></Draggable>
    )
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <section className="flex flex-wrap md:flex-nowrap justify-between mb-8 gap-6">
        <div>{drops}</div>
        <div className="-order-1 md:order-1 flex flex-col w-full md:w-auto justify-center gap-3">
          {drags}
        </div>
      </section>
    </DndContext>
  );
};
