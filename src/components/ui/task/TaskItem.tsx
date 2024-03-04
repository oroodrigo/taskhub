"use client";

import { TaskType } from "@/context/TaskContext";
import { useTask } from "@/hooks/useTask";
import { Pencil, Trash } from "@phosphor-icons/react";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TaskProps {
  value: TaskType;
}

export function TaskItem({ value }: TaskProps) {
  const { deleteTask, updateTask, setEditingTask, openModal } = useTask();
  const task = value;

  const taskDate = new Date(task.dateToComplete);
  const taskDateInUTC = taskDate.setHours(taskDate.getHours() + 3);

  const dateFormatted = format(taskDateInUTC, "dd'/'LL'/'yyyy");

  const dateTitle = format(taskDateInUTC, "d 'de' LLLL 'de' yyyy", {
    locale: ptBR,
  });

  const oneDayAfter = taskDate.setHours(taskDate.getHours() + 24);

  const late = new Date(oneDayAfter) < new Date();

  function handleUpdateTaskStatus() {
    updateTask(task);
  }
  function handleEditTask() {
    setEditingTask(task);
    openModal();
  }
  function handleDeleteTask() {
    deleteTask(task);
  }

  return (
    <div
      className={` min-h-[250px] xs:h-52 w-full flex flex-col justify-between p-3 border-2 rounded-lg bg-zinc-800/70 ${late && !task.isCompleted
          ? "border-orange-400"
          : "border-zinc-600 transition-colors"
        }`}
    >
      <h1 className="text-lg font-semibold mb-2">{task.title}</h1>
      <p className="xs:line-clamp-2">{task.description}</p>

      <time
        title={dateTitle}
        dateTime={task.dateToComplete}
        className="mt-4 text-lg"
      >
        {dateFormatted}
      </time>

      <div className="flex flex-col items-start justify-center xs:flex-row xs:items-center xs:justify-between gap-1 mt-2">
        {task.isCompleted ? (
          <button
            className="w-28 bg-green-600 rounded-full px-3 py-1 hover:bg-green-700 transition-colors cursor-pointer"
            onClick={handleUpdateTaskStatus}
          >
            Completa
          </button>
        ) : (
          <button
            className="w-28 bg-red-500 rounded-full px-3 py-1 hover:bg-red-600 transition-colors cursor-pointer"
            onClick={handleUpdateTaskStatus}
          >
            {late ? "Atrasada" : "A fazer"}
          </button>
        )}

        <div className="flex items-center gap-1">
          <button
            title="Editar Tarefa"
            className="flex items-center justify-center p-1.5 rounded-full transition-colors hover:bg-white/30"
            onClick={handleEditTask}
          >
            <Pencil size={25} />
          </button>
          <button
            title="Deletar Tarefa"
            className="flex items-center justify-center p-1.5 rounded-full transition-colors hover:bg-white/30"
            onClick={handleDeleteTask}
          >
            <Trash size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}
