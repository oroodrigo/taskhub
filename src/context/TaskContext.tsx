"use client";

import { useSession } from "next-auth/react";
import { ReactNode, createContext, useEffect, useState } from "react";

import {
  deleteTaskData,
  getTasks,
  editTaskData,
  updateTaskStatus,
  createNewTaskData,
} from "@/functions/task";

type TaskContextType = {
  taskList: TaskType[];
  modal: boolean;
  taskToEdit: TaskType | null;
  setEditingTask: (taskToEdit: TaskType | null) => void;
  openModal: () => void;
  closeModal: () => void;
  setTaskList: (newTaskList: TaskType[]) => void;
  updateTask: (taskToUpdate: TaskType) => Promise<void>;
  editTask: (taskToEdit: TaskType) => Promise<void>;
  deleteTask: (taskToDelete: TaskType) => Promise<void>;
  createNewTask: (data: TaskFormData) => Promise<void>;
};

export type TaskType = {
  id: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
  isImportant: boolean;
  dateToComplete: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type TaskFormData = {
  title: string;
  description: string | null;
  dateToComplete: string;
  isImportant: boolean;
};

export const TaskContext = createContext({} as TaskContextType);

type TaskContextProviderProps = {
  children: ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const { data: session } = useSession();
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<TaskType | null>(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      if (session) {
        const tasks = await getTasks();
        setTaskList(tasks);
      }
    }
    fetchTasks();
  }, [session]);

  function openModal() {
    setModal(true);
  }

  function closeModal() {
    setModal(false);
  }

  function setEditingTask(task: TaskType | null) {
    setTaskToEdit(task);
  }

  async function updateTask(taskToUpdate: TaskType) {
    try {
      const updatedList = await updateTaskStatus(taskToUpdate);

      setTaskList(updatedList);
    } catch (error) {
      console.error("Erro ao atualizar tarefas: ", error);
    }
  }

  async function deleteTask(taskToDelete: TaskType) {
    try {
      const updatedList = await deleteTaskData(taskToDelete);

      setTaskList(updatedList);
    } catch (error) {
      console.error("Erro ao deletar tarefa: ", error);
    }
  }

  async function editTask(taskToEdit: TaskType) {
    try {
      const { id } = taskToEdit;

      const taskData: TaskFormData = {
        title: taskToEdit.title,
        description: taskToEdit.description,
        dateToComplete: taskToEdit.dateToComplete,
        isImportant: taskToEdit.isImportant,
      };

      const updatedList = await editTaskData(taskData, id);

      setEditingTask(null);
      setTaskList(updatedList);
    } catch (error) {
      console.error("Erro ao editar tarefa: ", error);
    }
  }

  async function createNewTask(data: TaskFormData) {
    const updatedList = await createNewTaskData(data);

    setTaskList(updatedList);
  }

  return (
    <TaskContext.Provider
      value={{
        taskList,
        setTaskList,
        deleteTask,
        editTask,
        updateTask,
        modal,
        closeModal,
        openModal,
        setEditingTask,
        taskToEdit,
        createNewTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
