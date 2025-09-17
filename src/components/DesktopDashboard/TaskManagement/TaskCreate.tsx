import { X, ChevronDown, Paperclip } from "lucide-react";
import { useState } from "react";
import { DatePicker } from "../../MobileDashboard/UI/DatePicker";
import { Task } from "../types";

const TaskCreate = ({
  showTaskModal,
  setShowTaskModal,
  tasks = [],
  setTasks = () => {},
}: {
  showTaskModal: boolean;
  setShowTaskModal: (show: boolean) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    assignee: "Raj Dhakal",
    dueDate: "Due date",
    priority: "No priority",
    status: "Open",
    type: "Setup",
    // assignee: "Raj Dhakal",
  });
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  if (!showTaskModal) return null;

  const handleSubmit = () => {
    if (taskData.title.trim()) {
      const newTask: Task = {
        sourceMessageId: "",
        id: Date.now().toString(),
        title: taskData.title,
        description: taskData.description,
        // assignee: taskData.assignee.charAt(0),
        dueDate: new Date(taskData.dueDate),
        priority: taskData.priority as
          | "high"
          | "medium"
          | "low",
        status: taskData.status as "todo" | "in-progress" | "completed",
        type: taskData.type,
        createdBy: "Current User",
        assignedTo: taskData.assignee,
        createdAt: new Date(),
        updatedAt: new Date().toISOString(),
      };

    //   setTasks((prev: Task[]) => [...prev, newTask]);
      setTaskData({
        title: "",
        description: "",
        assignee: "Raj Dhakal",
        dueDate: "Due date",
        priority: "No priority",
        status: "Open",
        type: "Setup",
      });
      setShowTaskModal(false);
    }
  };

  const priorityOptions = ["High", "Medium", "Low", "No priority"];
  const assigneeOptions = [
    "Raj Dhakal",
    "Jane Smith",
    "Mike Johnson",
    "Sarah Wilson",
  ];
  const typeOptions = [
    "Setup",
    "Sales",
    "Training",
    "Testing",
    "Review",
    "Data",
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-gray-100 text-gray-600 border-gray-200";
      case "No priority":
        return "bg-gray-50 text-gray-500 border-gray-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xs sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
          <input
            type="text"
            value={taskData.title}
            onChange={(e) =>
              setTaskData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Task title"
            className="text-base sm:text-lg font-medium text-gray-900 bg-transparent border-none outline-none flex-1"
          />
          <button
            onClick={() => setShowTaskModal(false)}
            className="min-w-[44px] min-h-[44px] w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 sm:p-4">
          <textarea
            value={taskData.description}
            onChange={(e) =>
              setTaskData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Add description..."
            className="w-full h-12 sm:h-16 text-xs sm:text-sm text-gray-600 bg-transparent border-none outline-none resize-none mb-3 sm:mb-4"
          />

          <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
            {/* Priority */}
            <div className="relative">
              <button
                onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                className={`flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm border ${getPriorityColor(
                  taskData.priority
                )} min-h-[36px]`}
              >
                <div className="w-3 h-3 bg-current rounded opacity-60"></div>
                {taskData.priority}
                <ChevronDown className="w-3 h-3" />
              </button>
              {showPriorityDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowPriorityDropdown(false)}
                  />
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 min-w-[120px]">
                    {priorityOptions.map((priority) => (
                      <button
                        key={priority}
                        onClick={() => {
                          setTaskData((prev) => ({ ...prev, priority }));
                          setShowPriorityDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50"
                      >
                        {priority}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Assignee */}
            <div className="relative">
              <button
                onClick={() => setShowAssigneeDropdown(!showAssigneeDropdown)}
                className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-gray-100 rounded-lg text-xs sm:text-sm text-gray-700 min-h-[36px]"
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs">
                  {taskData.assignee.charAt(0)}
                </div>
                {taskData.assignee}
                <ChevronDown className="w-3 h-3" />
              </button>
              {showAssigneeDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowAssigneeDropdown(false)}
                  />
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 min-w-[140px]">
                    {assigneeOptions.map((assignee) => (
                      <button
                        key={assignee}
                        onClick={() => {
                          setTaskData((prev) => ({ ...prev, assignee }));
                          setShowAssigneeDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <div className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs">
                          {assignee.charAt(0)}
                        </div>
                        {assignee}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Due Date */}
            <div className="relative">
              <DatePicker
                value={taskData.dueDate as Date}
                onSelect={(value: Date) =>
                  setTaskData((prev) => ({ ...prev, dueDate: value as Date }))
                }
                className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-gray-100 rounded-lg text-xs sm:text-sm text-teal-600 min-h-[36px]"
              />
            </div>

            {/* Type */}
            {/* <button className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-blue-100 rounded-lg text-xs sm:text-sm text-blue-700 min-h-[36px]">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                {taskData.type}
              </button> */}

            {/* Add Attachment */}
            <button className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-gray-100 rounded-lg text-xs sm:text-sm text-gray-700 hover:bg-gray-200 transition-colors min-h-[36px]">
              <Paperclip className="w-3 h-3" />
              <span className="hidden sm:inline">Add attachment</span>
            </button>
          </div>
        </div>

        <div className="flex justify-end p-3 sm:p-4 border-t border-gray-200">
          <button
            onClick={handleSubmit}
            className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors min-h-[36px] sm:min-h-[44px]"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCreate;
