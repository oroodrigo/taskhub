import { useTask } from "@/hooks/useTask";
import { PlusCircle } from "@phosphor-icons/react";

export function CreateTask() {
  const { openModal } = useTask();
  return (
    <div
      className="w-full h-[250px] flex flex-col items-center justify-center border-2 rounded-lg border-zinc-600 border-dashed cursor-pointer
      hover:border-solid hover:bg-zinc-800/70 transition-all
      "
      onClick={openModal}
    >
      <span className="text-lg font-semibold">Adicionar Tarefa</span>
      <PlusCircle size={35} />
    </div>
  );
}
