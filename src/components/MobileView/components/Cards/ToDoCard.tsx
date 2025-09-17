import React from "react";
import { Calendar, User } from "lucide-react";
import { ToDo } from "../../types/purchasync";
import { cn } from "../../utils/cn";

interface ToDoCardProps {
  todo: ToDo;
  onClick?: () => void;
}

export function ToDoCard({ todo, onClick }: ToDoCardProps) {

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

  const getTaskTypeColor = () => {
    switch (todo.type) {
      case "rfq":
        return "bg-blue-100 text-blue-800";
      case "sample":
        return "bg-purple-100 text-purple-800";
      case "contract":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  // Mock assignee initials
  const getAssigneeInitials = () => {
    return "SJ"; // Sarah Johnson
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm bg-white border-gray-200",
        isOverdue && "bg-red-50 border-red-200"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-semibold text-gray-900 text-sm flex-1">{todo.title}</h3>
            <div
              className={`w-3 h-3 rounded-full bg-${getPriorityColor()}`}
            ></div>
          </div>
          
          <div className="flex items-center space-x-3 text-xs">
            <span className={cn(
              "px-2 py-1 rounded-full font-medium uppercase",
              getTaskTypeColor()
            )}>
              {todo.type}
            </span>
            
            <div className="flex items-center text-gray-500">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(todo.dueDate)}
            </div>
            
            <div className="flex items-center text-gray-500">
              <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center mr-1">
                <span className="text-xs font-medium text-gray-600">
                  {getAssigneeInitials()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
