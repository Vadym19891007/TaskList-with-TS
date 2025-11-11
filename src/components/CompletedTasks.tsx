import { useState, useContext } from "react";
import Task from "./Task";
import { TaskContext } from "@/app/page";

export default function CompletedTasks() {
  const [isOpen, setIsOpen] = useState(false);

  const taskContext = useContext(TaskContext);
  if (!taskContext) return null;
  const { tasks } = taskContext;

  const completedTasks = tasks.filter((task) => task.completed === true);

  return (
    <div
      className="m-auto w-[300px] h-auto bg-white border-none
         rounded-xl shadow-lg md:w-[400px]  lg:w-[500px]  relative p-4 mt-10"
    >
      <h1 className="text-lg font-bold pt-2 pl-2 md:text-xl lg:text-2xl ">
        Completed Tasks
      </h1>
      <span
        onClick={() => setIsOpen(!isOpen)}
        className={`block font-bold text-2xl text-center text-blue-700 absolute top-2 right-4 cursor-pointer  ${
          isOpen ? "rotate-45" : ""
        } transition-all`}
      >
        +
      </span>

      <hr className="my-5 border-gray-300" />
      {isOpen &&
        completedTasks.map((task) => <Task key={task.id} task={task} />)}
    </div>
  );
}
