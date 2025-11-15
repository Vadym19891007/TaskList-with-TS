"use client";

import { useState, useContext } from "react";

import Button from "./Button";
import { TaskContext } from "@/app/page";

export default function Form() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState("");

  const taskContext = useContext(TaskContext);
  if (!taskContext) return null;
  const { tasks, setTasks } = taskContext;

  function addTask(e: React.FormEvent): void {
    e.preventDefault();
    if (title && priority && deadline) {
      const task = {
        title,
        priority,
        deadline: new Date(deadline),
        completed: false,
        id: Date.now(),
      };
      setTasks([...tasks, task]);
    }
    setTitle("");
    setDeadline("");
    setPriority("Low");
  }
  return (
    <form
      className="flex flex-col w-auto h-auto m-10  gap-4"
      onSubmit={(e) => addTask(e)}
    >
      <input
        className="p-2 border border-gray-300  rounded-xl"
        type="text"
        placeholder="Enter a task"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <select
        value={priority}
        className="p-2 border border-gray-300 rounded-xl"
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="" disabled>
          Select Priority
        </option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        className="p-2 border border-gray-300 rounded-xl"
        type="date"
        onChange={(e) => setDeadline(e.target.value)}
        value={deadline}
      />

      <Button styles="">Add Task</Button>
    </form>
  );
}
