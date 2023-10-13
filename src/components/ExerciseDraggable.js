import { useState } from "react";
import { MdDragIndicator } from "react-icons/md";
import { DndContext } from "@dnd-kit/core";

import Draggable from "./Draggable";
import Droppable from "./Droppable";

function ExerciseDraggable({ questions, onSelect, selections }) {
  const [parent, setParent] = useState(null);
  let draggableMarkup = <Draggable>OK</Draggable>;

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over) {
      // Set the parent state to indicate the item has been dropped
      setParent(active.id);
    } else {
      // If the item wasn't dropped over a droppable, reset the parent state
      setParent(null);
    }
  };

  //Droppable
  const drops = questions.map(({ question }, index) => {
    const renderedQuestion = question.split("***").map((part, partIndex) => {
      return partIndex === 1 ? (
        <>
          <Droppable key={index} id={index + ""}>
            {parent ? draggableMarkup : "Drop here"}
          </Droppable>
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
  const drags = questions.map((question, index) => (
    <Draggable id={index + ""}>
      <div
        key={index}
        className="border py-1 px-2 min-w-[180px] text-center rounded-md text-indigo-900 text-base shadow backdrop-blur flex justify-between items-center"
      >
        <span>{question.isCorrect}</span>

        <MdDragIndicator />
      </div>
    </Draggable>
  ));

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <section className="flex justify-between mb-8">
        {parent === null ? draggableMarkup : null}
        {/* container od drops */}
        <div>{drops}</div>
        {/*container od drags*/}
        <div className="flex flex-col justify-center gap-3">{drags}</div>
      </section>
    </DndContext>
  );
}

export default ExerciseDraggable;
