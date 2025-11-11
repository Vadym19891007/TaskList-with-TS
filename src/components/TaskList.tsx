import { useState } from "react";
import { ITask, TaskContext } from "@/app/page";

import Form from "./Form";

type ListProps = {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
};

export default function TaskList() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="m-auto w-[300px] h-auto bg-white border-none
     rounded-xl shadow-lg md:w-[400px]  lg:w-[500px]  relative p-4 transition-all"
    >
      <h1 className="text-lg font-bold pt-2 pl-2 md:text-xl lg:text-2xl">
        Task List with Priority
      </h1>
      <span
        onClick={() => setIsOpen(!isOpen)}
        className={`block font-bold text-2xl text-center text-blue-700 absolute top-2 right-4 cursor-pointer  ${
          isOpen ? "rotate-45" : ""
        } transition-all`}
      >
        +
      </span>
      {isOpen && <Form />}
    </div>
  );
}
