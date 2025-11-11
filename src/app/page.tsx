"use client";

import { useState, createContext } from "react";

import TaskList from "@/components/TaskList";
import Tasks from "@/components/Tasks";
import CompletedTasks from "@/components/CompletedTasks";

export interface ITask {
  title: string;
  priority: string;
  deadline: Date;
  completed: boolean;
  id: number;
}

type VoidFunction = (id: number) => void;

interface ITaskContextType {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  completedTask: VoidFunction;
  deleteTask: VoidFunction;
}

export const TaskContext = createContext<ITaskContextType | null>(null);

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const deleteTask = (id: number): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedTask = (id: number): void => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, completedTask, deleteTask }}
    >
      <div className="bg-gray-100 min-h-screen p-4 ">
        <TaskList />
        <Tasks />
        <CompletedTasks />
      </div>
    </TaskContext.Provider>
  );
}
