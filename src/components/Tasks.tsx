"use client";
import { ITask, TaskContext } from "@/app/page";
import { useContext, Activity } from "react";

import { useState } from "react";
import Button from "./Button";
import Task from "./Task";

export default function Tasks() {
  const [isOpen, setIsOpen] = useState(true);
  const taskContext = useContext(TaskContext);
  if (!taskContext) return null;
  const { tasks, toggleSortOrder, sortTask, sortOrder, sortType } = taskContext;

  const sorterdTasks = sortTask(tasks);
  return (
    <div
      className="m-auto w-[300px] h-auto bg-white border-none
       rounded-xl shadow-lg md:w-[400px]  lg:w-[500px]  relative p-4 mt-10"
    >
      <h1 className="text-lg font-bold pt-2 pl-2 md:text-xl lg:text-2xl ">
        Tasks:
      </h1>
      <span
        onClick={() => setIsOpen(!isOpen)}
        className={`block font-bold text-2xl text-center text-blue-700 absolute top-2 right-4 cursor-pointer  ${
          isOpen ? "rotate-45" : ""
        } transition-all`}
      >
        +
      </span>

      <div className="mt-5">
        <Button
          onClick={() => toggleSortOrder("date")}
          styles={`w-[100px] ${sortType === "date" ? "bg-blue-700" : ""}`}
        >
          By Date
          {sortType === "date" &&
            ` ${sortOrder === "asc" ? "\u2191" : "\u2193"}`}
        </Button>
        <Button
          onClick={() => toggleSortOrder("priority")}
          styles={`w-[100px] ml-2 ${
            sortType === "priority" ? "bg-blue-700" : ""
          }`}
        >
          By Priority
          {sortType === "priority" &&
            ` ${sortOrder === "asc" ? "\u2191" : "\u2193"}`}
        </Button>
      </div>
      <hr className="my-5 border-gray-300" />
      <Activity mode={isOpen ? "visible" : "hidden"}>
        <div className="mt-2">
          {sorterdTasks &&
            sorterdTasks.map(
              (task: ITask) =>
                !task.completed && <Task key={task.id} task={task} />
            )}
        </div>
      </Activity>
      {/* {isOpen && (
        <div className="mt-2">
          {sorterdTasks &&
            sorterdTasks.map(
              (task: ITask) =>
                !task.completed && <Task key={task.id} task={task} />
            )}
        </div>
      )} */}
    </div>
  );
}
