import { useTask } from "@/hooks/useTask";
import { ReactNode } from "react";

type CreateTaskModalProps = {
  content: ReactNode;
};

export function CreateTaskModal({ content }: CreateTaskModalProps) {
  const { closeModal, setEditingTask } = useTask();

  function handleCloseModal() {
    setEditingTask(null);
    closeModal();
  }

  return (
    <section className="fixed top-0 left-0 z-10 w-full h-screen flex justify-center items-center px-4">
      <div
        className="absolute top-0 left-0 w-full h-screen bg-black/40 blur-sm"
        onClick={handleCloseModal}
      ></div>
      <div className="relative p-8 max-w-[630px] w-full z-10 bg-zinc-800 shadow-md rounded-lg">
        {content}
      </div>
    </section>
  );
}
