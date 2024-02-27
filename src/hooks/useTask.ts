import { TaskContext } from "@/context/TaskContext";
import { useContext } from "react";

export const useTask = () => useContext(TaskContext);
