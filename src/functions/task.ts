import { TaskFormData, TaskType } from "@/context/TaskContext";
import axios from "axios";

export async function getTasks() {
  try {
    const res = await axios.get("/api/tasks");

    const { tasks } = res.data;

    const sortedTasks: TaskType[] = tasks.sort((a: TaskType, b: TaskType) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    return sortedTasks;
  } catch (error) {
    console.log(error);
  }
}

export async function createNewTaskData(taskData: TaskFormData) {
  const { data } = await axios.post("/api/tasks", taskData);

  if (data.status === 201) {
    return await getTasks();
  }
}

export async function updateTaskStatus(task: TaskType) {
  const { data } = await axios.patch(`/api/tasks/${task.id}`);

  if (data.status === 204) {
    return await getTasks();
  }
}

export async function editTaskData(taskData: TaskFormData, id: string) {
  const { data } = await axios.put(`/api/tasks/${id}`, taskData);

  if (data.status === 201) {
    return await getTasks();
  }
}

export async function deleteTaskData(task: TaskType) {
  const { data } = await axios.delete(`/api/tasks/${task.id}`);

  if (data.status === 204) {
    return await getTasks();
  }
}
