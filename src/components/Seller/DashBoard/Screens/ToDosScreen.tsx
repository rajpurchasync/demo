import React, { useState } from "react";
import {
  Plus,
  Filter,
  ClipboardPlus,
  ClipboardList,
  UserCheck,
  Search,
} from "lucide-react";
import { ToDoCard } from "../Cards/ToDoCard";
import { ToDoDetailModal } from "../Modals/ToDoDetailModal";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { Select } from "../UI/Select";
import { DateInput } from "../UI/DateInput";
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
  const [typeFilter, setTypeFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
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

  const filteredToDos = mockToDos
    .filter((todo) => {
      // Search filter
      const matchesSearch =
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        (todo.assignee &&
          todo.assignee.toLowerCase().includes(searchQuery.toLowerCase()));

      // Date range filter
      const matchesDateRange =
        (!dateFromFilter ||
          new Date(todo.dueDate) >= new Date(dateFromFilter)) &&
        (!dateToFilter || new Date(todo.dueDate) <= new Date(dateToFilter));

      // Type filter
      const matchesType = typeFilter === "all" || todo.type === typeFilter;

      // Assignee filter
      const matchesAssignee =
        assigneeFilter === "all" || todo.assignee === assigneeFilter;

      if (statusFilter === "due-today") {
        const today = new Date().toDateString();
        return (
          new Date(todo.dueDate).toDateString() === today &&
          todo.status !== "completed" &&
          matchesSearch &&
          matchesDateRange &&
          matchesType &&
          matchesAssignee
        );
      }
      if (statusFilter === "due-this-week") {
        const today = new Date();
        const weekFromNow = new Date();
        weekFromNow.setDate(today.getDate() + 7);
        return (
          new Date(todo.dueDate) >= today &&
          new Date(todo.dueDate) <= weekFromNow &&
          todo.status !== "completed" &&
          matchesSearch &&
          matchesDateRange &&
          matchesType &&
          matchesAssignee
        );
      }
      if (statusFilter === "all" || statusFilter === "earliest-due") {
        return statusFilter === "earliest-due"
          ? todo.status !== "completed" &&
              matchesSearch &&
              matchesDateRange &&
              matchesType &&
              matchesAssignee
          : matchesSearch && matchesDateRange && matchesType && matchesAssignee;
      }
      return (
        todo.status === statusFilter &&
        matchesSearch &&
        matchesDateRange &&
        matchesType &&
        matchesAssignee
      );
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

      {/* Search Bar */}
      <div className="flex space-x-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-0 transition-colors text-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-3 py-2.5 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors flex items-center space-x-2"
        >
          <Filter className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <DateInput
              label="From Date"
              selected={dateFromFilter}
              onChange={setDateFromFilter}
            />
            <DateInput
              label="To Date"
              selected={dateToFilter}
              onChange={setDateToFilter}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Type"
              options={[
                { value: "all", label: "All Types" },
                { value: "rfq", label: "RFQ" },
                { value: "sample", label: "Sample" },
                { value: "contract", label: "Contract" },
                { value: "task", label: "Task" },
                { value: "approval", label: "Approval" },
              ]}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            />
            <Select
              label="Assignee"
              options={[
                { value: "all", label: "All Assignees" },
                { value: "Sarah Johnson", label: "Sarah Johnson" },
                { value: "Ahmed Hassan", label: "Ahmed Hassan" },
                { value: "Fatima Al-Zahra", label: "Fatima Al-Zahra" },
                { value: "Omar Abdullah", label: "Omar Abdullah" },
              ]}
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center space-x-2">
        <div className="flex space-x-2 overflow-x-auto">
          {statusFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setStatusFilter(filter.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap border ${
                statusFilter === filter.id
                  ? "bg-purple-100 text-purple-700 border-purple-200"
                  : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200 hover:border-gray-300"
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
