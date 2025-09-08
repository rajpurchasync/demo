import React from "react";
import { Calendar } from "lucide-react";
import { ToDo } from "../types/purchasync";
import { cn } from "../utils/cn";

interface ToDoCardProps {
  todo: ToDo;
  onClick?: () => void;
}

export function ToDoCard({ todo, onClick }: ToDoCardProps) {
  const getStatusColor = () => {
    switch (todo.status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "ongoing":
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getPriorityColor = () => {
    switch (todo.priority) {
      case "high":
        return "red-500";
      case "medium":
        return "yellow-500";
      case "low":
      default:
        return "green-500";
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const isOverdue =
    new Date(todo.dueDate) < new Date() && todo.status !== "completed";

  const getUrgencyIndicator = () => {
    const today = new Date().toDateString();
    const taskDate = new Date(todo.dueDate).toDateString();
    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);

    if (todo.status === "completed") {
      return { color: "bg-green-500", label: "Completed" };
    } else if (taskDate === today) {
      return { color: "bg-red-500", label: "Due Today" };
    } else if (new Date(todo.dueDate) <= weekFromNow) {
      return { color: "bg-yellow-500", label: "Due This Week" };
    }
    return null;
  };

  const urgencyIndicator = getUrgencyIndicator();

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-2 border-l-1 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm bg-white"
        // "border-l-" + getPriorityColor(),
        // isOverdue && "bg-red-50 border-red-200"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm">{todo.title}</h3>
          <div className="flex items-center mt-0.5 space-x-2">
            <span className="text-sm text-gray-500 capitalize">
              {todo.type}
            </span>
            <div
              className={cn(
                "flex items-center text-sm",
                isOverdue ? "text-red-600" : "text-gray-500"
              )}
            >
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(todo.dueDate)}
            </div>
          </div>
          {todo.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-0.5">
              {todo.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600"
                >
                  {tag}
                </span>
              ))}
              {todo.tags.length > 2 && (
                <span className="text-sm text-gray-500">
                  +{todo.tags.length - 2} more
                </span>
              )}
            </div>
          )}
        </div>
        <span
          className={cn(
            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ml-2",
            getStatusColor()
          )}
        >
          {todo.status}
        </span>
        {urgencyIndicator && (
          <div className="flex items-center ml-2">
            <div
              className={`w-2 h-2 rounded-full ${"bg-" + getPriorityColor()}`}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}
