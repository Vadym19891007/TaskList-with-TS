"use client";

import { useState, createContext, useEffect } from "react";

import TaskList from "@/components/TaskList";
import Tasks from "@/components/Tasks";
import CompletedTasks from "@/components/CompletedTasks";

export interface ITask {
  title: string;
  priority: "High" | "Medium" | "Low";
  deadline: Date;
  completed: boolean;
  id: number;
}

interface IPriorityType {
  High: number;
  Medium: number;
  Low: number;
}

type VoidFunction = (id: number) => void;

interface ITaskContextType {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  toggleSortOrder: (type: string) => void;
  completedTask: VoidFunction;
  deleteTask: VoidFunction;
  sortTask: (tasks: ITask[]) => ITask[];
  sortOrder: string;
  sortType: string;
}

export const TaskContext = createContext<ITaskContextType | null>(null);

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const [sortType, setSortType] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      const storedTasks = JSON.parse(stored).map((task: ITask) => ({
        ...task,
        deadline: new Date(task.deadline),
      }));
      Promise.resolve()
        .then(() => setTasks(storedTasks))
        .then(() => setIsMounted(true));
    } else {
      () => setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isMounted]);

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

  function sortTask(tasks: ITask[]): ITask[] {
    return tasks.slice().sort((a, b) => {
      if (sortType === "priority") {
        const priorityOrder: IPriorityType = { High: 1, Medium: 2, Low: 3 };
        return sortOrder === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      } else {
        return sortOrder === "asc"
          ? a.deadline.getTime() - b.deadline.getTime()
          : b.deadline.getTime() - a.deadline.getTime();
      }
    });
  }

  function toggleSortOrder(type: string) {
    if (sortType === type) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortType(type);
      setSortOrder("asc");
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        completedTask,
        deleteTask,
        toggleSortOrder,
        sortTask,
        sortOrder,
        sortType,
      }}
    >
      <div className="bg-gray-100 min-h-screen p-4 ">
        <TaskList />
        <Tasks />
        <CompletedTasks />
      </div>
    </TaskContext.Provider>
  );
}
