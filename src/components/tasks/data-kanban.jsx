/* eslint-disable react/prop-types */
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useCallback, useEffect, useState } from "react";
import KanbanColumnHeader from "./KanbanColumnHeader";
import KanbanCard from "./KanbanCard";

export default function DataKanban({ data, onChange }) {
  const boards = ["BACKLOG", "TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"];
  const [tasks, setTasks] = useState(() => {
    const initialTasks = {
      BACKLOG: [],
      TODO: [],
      IN_PROGRESS: [],
      IN_REVIEW: [],
      DONE: [],
    };

    data.forEach((task) => {
      initialTasks[task.status].push(task);
    });

    Object.keys(initialTasks).forEach((status) => {
      initialTasks[status].sort((a, b) => a.position - b.position);
    });

    return initialTasks;
  });

  useEffect(() => {
    const newTask = {
      BACKLOG: [],
      TODO: [],
      IN_PROGRESS: [],
      IN_REVIEW: [],
      DONE: [],
    };

    data.forEach((task) => {
      newTask[task.status].push(task);
    });

    Object.keys(newTask).forEach((status) => {
      newTask[status].sort((a, b) => a.position - b.position);
    });

    setTasks(newTask);
  }, [data]);

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;
      const { source, destination } = result;
      const sourceStatus = source.droppableId;
      const destStatus = destination.droppableId;

      let updatesPayload = [];

      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks };
        const sourceColumn = [...newTasks[sourceStatus]];
        const [movedTask] = sourceColumn.splice(source.index, 1);

        if (!movedTask) {
          return prevTasks;
        }

        const updatedMovedTask =
          sourceStatus !== destStatus
            ? {
                ...movedTask,
                status: destStatus,
              }
            : movedTask;

        newTasks[sourceStatus] = sourceColumn;
        const destColumn = [...newTasks[destStatus]];
        destColumn.splice(destination.index, 0, updatedMovedTask);
        newTasks[destStatus] = destColumn;

        updatesPayload = [];
        updatesPayload.push({
          id: updatedMovedTask.id,
          status: destStatus,
          position: Math.min((destination.index + 1) * 1000, 1000000),
        });

        newTasks[destStatus].forEach((task, index) => {
          if (task && task.id !== updatedMovedTask.id) {
            const newPostion = Math.min((index + 1) * 1000, 1000000);
            if (task.position !== newPostion) {
              updatesPayload.push({
                id: task.id,
                position: newPostion,
                status: destStatus,
              });
            }
          }
        });

        if (sourceStatus !== destStatus) {
          newTasks[sourceStatus].forEach((task, index) => {
            if (task) {
              const newPostion = Math.min((index + 1) * 1000, 1000000);
              if (task.position !== newPostion) {
                updatesPayload.push({
                  id: task.id,
                  position: newPostion,
                  status: sourceStatus,
                });
              }
            }
          });
        }
        return newTasks;
      });

      onChange(updatesPayload);
    },
    [onChange]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex overflow-x-auto">
        {boards.map((board) => {
          return (
            <div
              key={board}
              className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]"
            >
              <KanbanColumnHeader
                board={board}
                taskCount={tasks[board].length}
              />
              <Droppable droppableId={board}>
                {(provided) => (
                  <div
                    className="min-h-[200px] py-1.5"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {tasks[board].map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <KanbanCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
