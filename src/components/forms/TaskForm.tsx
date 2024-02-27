import { TaskType } from "@/context/TaskContext";
import { useTask } from "@/hooks/useTask";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilSimpleLine, PlusCircle } from "@phosphor-icons/react";

import { useForm } from "react-hook-form";
import * as zod from "zod";

const TaskFormValidationSchema = zod.object({
  title: zod.string().min(4, "Infome a tarefa."),
  description: zod.string().nullable(),
  dateToComplete: zod.coerce.date().or(zod.string().datetime()),
  isImportant: zod.boolean(),
});

type TaskFormData = zod.infer<typeof TaskFormValidationSchema>;

export function TaskForm() {
  const { taskToEdit, editTask, closeModal, createNewTask } = useTask();

  const formattedDate = taskToEdit?.dateToComplete.split("T")[0];

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(TaskFormValidationSchema),
    defaultValues: taskToEdit
      ? {
          title: taskToEdit.title,
          description: taskToEdit.description,
          dateToComplete: formattedDate,
          isImportant: taskToEdit.isImportant,
        }
      : {
          title: "",
          description: "",
          dateToComplete: new Date().toISOString().split("T")[0],
          isImportant: false,
        },
  });

  function handleSubmitTaskForm(data: TaskFormData) {
    const ISODate = new Date(data.dateToComplete).toISOString();

    const dataWithNoTypeError = {
      ...data,
      dateToComplete: ISODate,
    };

    if (taskToEdit) {
      const editedTask: TaskType = {
        ...taskToEdit,
        ...dataWithNoTypeError,
      };

      editTask(editedTask);
    } else {
      createNewTask(dataWithNoTypeError);
    }

    closeModal();
    reset();
  }

  return (
    <form
      className="text-zinc-300 flex flex-col"
      onSubmit={handleSubmit(handleSubmitTaskForm)}
    >
      <fieldset className="mb-4">
        <label className="text-base font-semibold inline-block">Título</label>
        <input
          className="w-full border-none mb-2 p-4 resize-none bg-zinc-900 text-zinc-300 outline-none rounded-md"
          type="text"
          placeholder="Ex: Ir ao dentista"
          {...register("title")}
        />
        {errors.title && <span>{errors.title.message}</span>}
      </fieldset>
      <fieldset className="mb-4">
        <label className="text-base font-semibold inline-block">
          Descrição
        </label>
        <textarea
          className="w-full border-none p-4 resize-none bg-zinc-900 text-zinc-300 outline-none rounded-md"
          cols={30}
          rows={5}
          placeholder="(Opcional)"
          {...register("description")}
        ></textarea>
      </fieldset>
      <fieldset className="mb-6">
        <label className="text-base font-semibold inline-block">Data</label>
        <input
          className="w-full border-none p-4 mb-2 resize-none bg-zinc-900 text-zinc-300 outline-none rounded-md dark:[color-scheme:dark]"
          type="date"
          {...register("dateToComplete")}
        />
        {errors.dateToComplete && (
          <span className="mt-2">{errors.dateToComplete.message}</span>
        )}
      </fieldset>
      <fieldset className="mb-10 flex items-center justify-between gap-2">
        <label className="text-base font-semibold ">Importante</label>
        <input
          className="toggle-button"
          type="checkbox"
          {...register("isImportant")}
        />
      </fieldset>

      {taskToEdit ? (
        <button
          className="flex items-center justify-center self-end gap-2 w-1/4 h-12 border-none outline-none bg-green-600 py-2 px-4 text-lg rounded-md hover:bg-green-700 transition-colors"
          type="submit"
        >
          Editar
          <PencilSimpleLine size={25} weight="light" />
        </button>
      ) : (
        <button
          className="flex items-center justify-center self-end gap-2 w-1/4 h-12 border-none outline-none bg-green-600 py-2 px-4 text-lg rounded-md hover:bg-green-700 transition-colors"
          type="submit"
        >
          Criar
          <PlusCircle size={25} weight="light" />
        </button>
      )}
    </form>
  );
}
