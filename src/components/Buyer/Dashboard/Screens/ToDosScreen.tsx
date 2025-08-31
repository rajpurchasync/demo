import React, { useState } from "react";
import {
  Plus,
  Filter,
  ClipboardPlus,
  ClipboardList,
  UserCheck,
} from "lucide-react";
import { ToDoCard } from "../Cards/ToDoCard";
import { ToDoDetailModal } from "../Modals/ToDoDetailModal";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { Select } from "../UI/Select";
import { mockToDos, ToDo } from "../types/purchasync";

interface ToDosScreenProps {
  showCreateToDoModal: boolean;
  setShowCreateToDoModal: (show: boolean) => void;
}

export function ToDosScreen({
  showCreateToDoModal,
  setShowCreateToDoModal,
}: ToDosScreenProps) {
  const [statusFilter, setStatusFilter] = useState("earliest-due");
  const [showToDoDetailModal, setShowToDoDetailModal] = useState(false);
  const [selectedToDo, setSelectedToDo] = useState<ToDo | null>(null);

  const statusFilters = [
    { id: "earliest-due", label: "Earliest Due" },
    { id: "due-today", label: "Due Today" },
    { id: "due-this-week", label: "Due This Week" },
    { id: "ongoing", label: "Ongoing" },
    { id: "pending", label: "Pending" },
    { id: "completed", label: "Completed" },
    { id: "all", label: "All" },
  ];

  const taskQuickActions = [
    {
      id: "create-task",
      label: "Create Task",
      icon: ClipboardPlus,
      gradient: "from-blue-500 to-blue-600",
      action: () => {
        // onScreenChange("createTask");
        setShowCreateToDoModal(true);
      },
    },
    {
      id: "manage-task",
      label: "Manage Task",
      icon: ClipboardList,
      gradient: "from-purple-500 to-purple-600",
      action: () => {
        // onScreenChange("manageTask");
      },
    },
    {
      id: "assign-task",
      label: "Assign Task",
      icon: UserCheck,
      gradient: "from-green-500 to-green-600",
      action: () => {
        // onScreenChange("assignTask");
      },
    },
  ];
  const filteredToDos = mockToDos
    .filter((todo) => {
      if (statusFilter === "due-today") {
        const today = new Date().toDateString();
        return (
          new Date(todo.dueDate).toDateString() === today &&
          todo.status !== "completed"
        );
      }
      if (statusFilter === "due-this-week") {
        const today = new Date();
        const weekFromNow = new Date();
        weekFromNow.setDate(today.getDate() + 7);
        return (
          new Date(todo.dueDate) >= today &&
          new Date(todo.dueDate) <= weekFromNow &&
          todo.status !== "completed"
        );
      }
      if (statusFilter === "all" || statusFilter === "earliest-due") {
        return statusFilter === "earliest-due"
          ? todo.status !== "completed"
          : true;
      }
      return todo.status === statusFilter;
    })
    .sort((a, b) => {
      if (statusFilter === "earliest-due") {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return 0;
    });

  return (
    <div className="px-4 py-3 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">Task Management</h1>
        <span className="text-sm text-gray-500">
          {filteredToDos.length} tasks
        </span>
      </div>

      {/* Quick Actions CTAs */}
      <div>
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-1">
          {taskQuickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.action}
                className="grow group relative overflow-hidden bg-white hover:bg-gray-50 
                     rounded-xl p-2 py-3 transition-all duration-300 hover:scale-105 
                     hover:shadow-lg border border-gray-200 hover:border-gray-300 
                     flex-shrink-0 w-20"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`w-8 h-8 bg-gradient-to-r ${action.gradient} rounded-xl flex 
                          items-center justify-center shadow-md group-hover:shadow-lg 
                          transition-shadow duration-300`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                    {action.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-3">
        <Filter className="w-4 h-4 text-gray-500" />
        <div className="flex space-x-2 overflow-x-auto">
          {statusFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setStatusFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                statusFilter === filter.id
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* To-Dos List */}
      <div className="space-y-3">
        {filteredToDos.length > 0 ? (
          filteredToDos.map((todo) => (
            <ToDoCard
              key={todo.id}
              todo={todo}
              onClick={() => {
                setSelectedToDo(todo);
                setShowToDoDetailModal(true);
              }}
            />
          ))
        ) : (
          <div className="text-center py-16 text-gray-500">
            <div className="w-20 h-20 mx-auto mb-4 opacity-30">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="25" y="25" width="50" height="50" rx="8" />
                <path d="M35 50l8 8 16-16" />
              </svg>
            </div>
            <p className="text-base font-medium text-gray-900 mb-1">
              Nothing to see here
            </p>
            <p className="text-xs text-gray-500">
              No tasks match your current filter
            </p>
          </div>
        )}
      </div>

      {/* Create To-Do Modal */}
      {showCreateToDoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full max-w-md mx-auto rounded-t-2xl p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Create Task
              </h2>
              <button
                onClick={() => setShowCreateToDoModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <Input label="Task Title" placeholder="Enter task description" />

              <Select
                label="Type"
                options={[
                  { value: "", label: "Select type" },
                  { value: "rfq", label: "RFQ" },
                  { value: "sample", label: "Sample" },
                  { value: "contract", label: "Contract" },
                  { value: "approval", label: "Approval" },
                  { value: "task", label: "To-do Task" },
                ]}
              />

              <Select
                label="Assignee"
                options={[
                  { value: "", label: "Assign to" },
                  { value: "sarah", label: "Sarah Johnson (Me)" },
                  { value: "ahmed", label: "Ahmed Hassan" },
                  { value: "fatima", label: "Fatima Al-Zahra" },
                  { value: "omar", label: "Omar Abdullah" },
                ]}
              />

              <Select
                label="Priority"
                options={[
                  { value: "", label: "Select priority" },
                  { value: "high", label: "High" },
                  { value: "medium", label: "Medium" },
                  { value: "low", label: "Low" },
                ]}
              />

              <Input
                label="Tags (comma separated)"
                placeholder="e.g., urgent, follow-up, quality-check"
              />

              <div>
                {" "}
                <Input type="date" label="Due Date (optional)" />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => setShowCreateToDoModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  fullWidth
                  onClick={() => {
                    console.log("Create task");
                    setShowCreateToDoModal(false);
                  }}
                >
                  Create Task
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* To-Do Detail Modal */}
      <ToDoDetailModal
        isOpen={showToDoDetailModal}
        onClose={() => setShowToDoDetailModal(false)}
        todo={selectedToDo}
      />
    </div>
  );
}
