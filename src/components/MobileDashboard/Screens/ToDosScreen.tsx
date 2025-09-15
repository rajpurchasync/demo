import React, { useState } from "react";
import {
  Plus,
  Filter,
  Search,
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
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");
  const [showToDoDetailModal, setShowToDoDetailModal] = useState(false);
  const [selectedToDo, setSelectedToDo] = useState<ToDo | null>(null);

  const statusFilters = [
    { id: "all", label: "All", count: mockToDos.length },
    { id: "due-today", label: "Due Today", count: 1 },
    { id: "overdue", label: "Overdue", count: 0 },
    { id: "this-week", label: "This Week", count: 6 },
    { id: "later", label: "Later", count: 12 },
  ];

  const filteredToDos = mockToDos
    .filter((todo) => {
      // Search filter
      const matchesSearch =
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Date filter
      const matchesDateRange =
        (!dateFromFilter ||
          new Date(todo.dueDate) >= new Date(dateFromFilter)) &&
        (!dateToFilter || new Date(todo.dueDate) <= new Date(dateToFilter));

      if (statusFilter === "due-today") {
        const today = new Date().toDateString();
        return (
          new Date(todo.dueDate).toDateString() === today &&
          todo.status !== "completed" &&
          matchesSearch &&
          matchesDateRange
        );
      }
      if (statusFilter === "overdue") {
        const today = new Date();
        return (
          new Date(todo.dueDate) < today &&
          todo.status !== "completed" &&
          matchesSearch &&
          matchesDateRange
        );
      }
      if (statusFilter === "this-week") {
        const today = new Date();
        const weekFromNow = new Date();
        weekFromNow.setDate(today.getDate() + 7);
        return (
          new Date(todo.dueDate) >= today &&
          new Date(todo.dueDate) <= weekFromNow &&
          todo.status !== "completed" &&
          matchesSearch &&
          matchesDateRange
        );
      }
      if (statusFilter === "later") {
        const today = new Date();
        const weekFromNow = new Date();
        weekFromNow.setDate(today.getDate() + 7);
        return (
          new Date(todo.dueDate) > weekFromNow &&
          todo.status !== "completed" &&
          matchesSearch &&
          matchesDateRange
        );
      }
      if (statusFilter === "all") {
        return matchesSearch && matchesDateRange;
      }
      return todo.status === statusFilter && matchesSearch && matchesDateRange;
    })
    .sort((a, b) => {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });

  return (
    <div className="px-4 py-3 space-y-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {statusFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setStatusFilter(filter.id)}
            className={`flex-shrink-0 py-2 px-3 font-medium text-sm flex items-center space-x-1 ${
              statusFilter === filter.id
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <span>{filter.label}</span>
            <span className="text-xs text-gray-500">{filter.count}</span>
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex space-x-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-0 transition-colors text-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-3 py-2 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors flex items-center space-x-2"
        >
          <Filter className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Date
              </label>
              <input
                type="date"
                value={dateFromFilter}
                onChange={(e) => setDateFromFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Date
              </label>
              <input
                type="date"
                value={dateToFilter}
                onChange={(e) => setDateToFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* To-Dos List */}
      <div className="space-y-0">
        {filteredToDos.length > 0 ? (
          filteredToDos.map((todo) => (
            <div
              key={todo.id}
              className={`${
                filteredToDos.indexOf(todo) === 0 && filteredToDos.length > 1
                  ? "rounded-t-lg"
                  : filteredToDos.indexOf(todo) === filteredToDos.length - 1 ||
                    filteredToDos.length === 1
                  ? "rounded-b-lg"
                  : ""
              }`}
            >
              <ToDoCard
                todo={todo}
                onClick={() => {
                  setSelectedToDo(todo);
                  setShowToDoDetailModal(true);
                }}
              />
            </div>
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
