import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function ExerciseDraggable({ questions, onSelect, selections }) {
  const result = {
    draggableId: "0",
    type: "TYPE",
    reason: "DROP",
    source: {
      droppableId: "droppableID",
      index: 0,
    },
    destination: null,
  };

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
  };

  //Droppable
  const drops = questions.map(({ question }, index) => {
    const renderedQuestion = question.split("***").map((part, partIndex) => {
      return partIndex === 1 ? (
        <>
          <span className="border rounded-md w-[150px] inline-block h-[30px]"></span>
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
    <Draggable
      key={index}
      draggableId={index.toString()} // Each Draggable should have a unique draggableId
      index={index}
    >
      {(provided) => (
        <div
          className="border py-1 px-2 text-center rounded-md text-indigo-900 text-lg shadow backdrop-blur"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {question.isCorrect}
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <section className="flex justify-between">
        {/* container od drops */}
        <div>{drops}</div>
        {/* container od drags */}
        <Droppable droppableId="droppableID">
          {(provided) => (
            <div
              className="flex flex-col justify-center gap-2"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {drags}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </section>
    </DragDropContext>
  );
}

export default ExerciseDraggable;
