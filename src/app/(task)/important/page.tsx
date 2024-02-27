"use client";

import { CreateTask } from "@/components/ui/task/CreateTask";
import { Layout } from "@/components/ui/Layout";
import { TaskItem } from "@/components/ui/task/TaskItem";
import { useTask } from "@/hooks/useTask";
import { CreateTaskModal } from "@/components/ui/modals/CreateTaskModal";
import { TaskForm } from "@/components/forms/TaskForm";

export default function ImportantTasks() {
  const { modal, taskList } = useTask();

  const filteredTasks = taskList.filter((task) => task.isImportant);

  return (
    <Layout title="Tarefas Importantes">
      <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {modal && <CreateTaskModal content={<TaskForm />} />}

        {filteredTasks.map((task) => {
          return <TaskItem value={task} key={task.id} />;
        })}

        <CreateTask />
      </main>
    </Layout>
  );
}
