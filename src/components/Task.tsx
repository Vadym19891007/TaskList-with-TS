import { ITask, TaskContext } from "@/app/page";
import Button from "./Button";
import { useContext } from "react";

interface ITaskProps {
  task: ITask;
  deleteTask?: (id: number) => void;
  completedTask?: (id: number) => void;
}

export default function Task({ task }: ITaskProps) {
  const taskBg = () => {
    switch (task.priority) {
      case "Low":
        return "bg-green-300";
      case "Medium":
        return "bg-yellow-500";
      case "High":
        return "bg-red-300";
      default:
        return "bg-green-300";
    }
  };

  const propsContext = useContext(TaskContext);
  if (!propsContext) return null;
  const { completedTask, deleteTask } = propsContext;
  return (
    <div
      className={`${taskBg()} min-h-[80px] w-auto rounded-md flex justify-between items-center p-4 mt-2`}
    >
      <div>
        <h2>
          {task.title} - <b>{task.priority}</b>
        </h2>
        <p>Due: {task.deadline.toLocaleDateString()}</p>
      </div>
      <div>
        {!task.completed && (
          <Button
            onClick={() => completedTask?.(task.id)}
            styles="block bg-green-500 hover:bg-green-400 min-w-[100px]"
          >
            Complete
          </Button>
        )}

        <Button
          onClick={() => task.id && deleteTask?.(task.id)}
          styles="block min-w-[100px] mt-2 bg-red-500 hover:bg-red-400"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
