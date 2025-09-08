export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  type: "Task" | "RFQ" | "Supplier Onboarding" | "Sample Request" | "Contract";
  priority: "High" | "Medium" | "Low";
  assignee: User;
  assignees?: User[];
  dueDate: string;
  status: "Open" | "In Progress" | "Completed" | "Closed";
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Subtask {
  id: string;
  title: string;
  assignee: User;
  dueDate: string;
  completed: boolean;
  createdAt: string;
}

export interface RFQ {
  id: string;
  title: string;
  purchaseType: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  assignee: User;
  paymentTerm: string;
  deliveryDate: string;
  message: string;
  attachments: string[];
  invitedSuppliers: string[];
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  category: string;
  rating: number;
  location: string;
}

export interface Contract {
  id: string;
  title: string;
  category: string;
  supplier: Supplier;
  attachments: string[];
  assignee: User;
  status:
    | "Draft"
    | "Under Review"
    | "Approved"
    | "Signed"
    | "Active"
    | "Expired";
  value: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface ActivityLogEntry {
  id: string;
  type:
    | "task_created"
    | "task_updated"
    | "assignee_changed"
    | "due_date_changed"
    | "comment_added"
    | "attachment_added"
    | "priority_changed"
    | "status_changed";
  taskId: string;
  user: User;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}
export interface UserType {
  id: string;
  name: string;
  email: string;
}

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
  onTaskClick: (task: Task) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskAction: (taskId: string, action: string) => void;
  users: UserType[];
  onActivityLog: (entry: ActivityLogEntry) => void;
}
import React, { act, useState } from "react";
import { format, isPast } from "date-fns";
import {
  Plus,
  Filter,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  X,
  Send,
  Clock,
  User,
  CheckCircle,
  MessageCircle,
  Edit3,
  CheckSquare,
  Paperclip,
  Calendar,
  Search,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar as CalendarComponent } from "../ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";

interface Task {
  id: string;
  title: string;
  description?: string;
  assignee: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low" | "No priority";
  status: "Open" | "Completed";
  type: string;
  createdBy: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
}

interface FilterState {
  type: string;
  status: string;
  dateFrom: string;
  dateTo: string;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

interface ActivityItem {
  id: string;
  type: "created" | "updated" | "assigned" | "completed" | "commented";
  author: string;
  avatar: string;
  description: string;
  timestamp: string;
  details?: string;
}

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    today: true,
    tomorrow: false,
    thisWeek: false,
    thisMonth: false,
    later: false,
  });
  const [filters, setFilters] = useState<FilterState>({
    type: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  });
  const [newComment, setNewComment] = useState("");

  // Sample tasks data
  const allTasks: Task[] = [
    {
      id: "1",
      title: "Invite a team member",
      description:
        'Share context and stay in sync, so you can move faster together.\n\nInvite your team members by visiting the "Members" settings page:\n\n1. Click on your profile picture on the bottom-left\n2. Click on "Invite members"\n3. Click on the "Invite member" button on the top-right',
      assignee: "Raj",
      dueDate: "2025-12-31",
      priority: "High",
      status: "Open",
      type: "Deal",
      createdBy: "Clarify",
      assignedTo: "Raj Dhakal",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T14:30:00Z",
    },
    {
      id: "2",
      title: "Add A Supplier",
      description: "Add new supplier to the system",
      assignee: "Raj",
      dueDate: "2025-12-31",
      priority: "Medium",
      status: "Open",
      type: "Sales",
      createdBy: "Admin",
      assignedTo: "Raj Dhakal",
      createdAt: "2024-01-15T09:00:00Z",
      updatedAt: "2024-01-15T13:00:00Z",
    },
    {
      id: "3",
      title: "Create a RFQ and invite Suppliers",
      description: "Create request for quotation",
      assignee: "Raj",
      dueDate: "2025-12-31",
      priority: "Medium",
      status: "Open",
      type: "Setup",
      createdBy: "Admin",
      assignedTo: "Raj Dhakal",
      createdAt: "2024-01-15T08:00:00Z",
      updatedAt: "2024-01-15T12:00:00Z",
    },
    {
      id: "4",
      title: "Complete the Profile",
      description: "Finish setting up user profile",
      assignee: "Raj",
      dueDate: "2025-12-31",
      priority: "Low",
      status: "Open",
      type: "Setup",
      createdBy: "Admin",
      assignedTo: "Raj Dhakal",
      createdAt: "2024-01-15T07:00:00Z",
      updatedAt: "2024-01-15T11:00:00Z",
    },
    {
      id: "5",
      title: "Use search with Ctrl+K or ⌘K",
      assignee: "Raj",
      dueDate: "2025-12-31",
      priority: "Low",
      status: "Open",
      type: "Training",
      createdBy: "Admin",
      assignedTo: "Raj Dhakal",
      createdAt: "2024-01-14T16:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "6",
      title: "Test Scribe",
      assignee: "Raj",
      dueDate: "2025-12-31",
      priority: "Medium",
      status: "Open",
      type: "Testing",
      createdBy: "Admin",
      assignedTo: "Raj Dhakal",
      createdAt: "2024-01-14T15:00:00Z",
      updatedAt: "2024-01-14T18:00:00Z",
    },
    {
      id: "7",
      title: "Review quarterly reports",
      assignee: "John",
      dueDate: "2025-12-31",
      priority: "High",
      status: "Open",
      type: "Review",
      createdBy: "John",
      assignedTo: "Jane",
      createdAt: "2024-01-14T14:00:00Z",
      updatedAt: "2024-01-15T09:00:00Z",
    },
    {
      id: "8",
      title: "Update client database",
      assignee: "M",
      dueDate: "2025-12-31",
      priority: "Medium",
      status: "Open",
      type: "Data",
      createdBy: "Mike",
      assignedTo: "Mary",
      createdAt: "2024-01-14T13:00:00Z",
      updatedAt: "2024-01-14T17:00:00Z",
    },
    {
      id: "9",
      title: "Finalize project documentation",
      assignee: "S",
      dueDate: "2025-12-31",
      priority: "High",
      status: "Completed",
      type: "Documentation",
      createdBy: "Sarah",
      assignedTo: "Sam",
      createdAt: "2024-01-13T10:00:00Z",
      updatedAt: "2024-01-14T16:00:00Z",
    },
    {
      id: "10",
      title: "Setup development environment",
      assignee: "A",
      dueDate: "2025-11-31",
      priority: "Medium",
      status: "Completed",
      type: "Setup",
      createdBy: "Alex",
      assignedTo: "Anna",
      createdAt: "2024-01-13T09:00:00Z",
      updatedAt: "2024-01-13T15:00:00Z",
    },
  ];

  const [tasks, setTasks] = useState(allTasks);

  // Sample comments data
  const sampleComments: Comment[] = [
    {
      id: "1",
      author: "John Doe",
      avatar: "J",
      content:
        "I think we should prioritize this task as it affects the entire team workflow.",
      timestamp: "2024-01-15T13:30:00Z",
    },
    {
      id: "2",
      author: "Sarah Wilson",
      avatar: "S",
      content:
        "Agreed! I can help with the implementation once the requirements are finalized.",
      timestamp: "2024-01-15T14:15:00Z",
    },
  ];

  // Sample activity data
  const sampleActivity: ActivityItem[] = [
    {
      id: "1",
      type: "created",
      author: "Clarify",
      avatar: "C",
      description: "created this task",
      timestamp: "2024-01-15T10:00:00Z",
      details: "Task was automatically created as part of onboarding process",
    },
    {
      id: "2",
      type: "assigned",
      author: "Admin",
      avatar: "A",
      description: "assigned this task to Raj Dhakal",
      timestamp: "2024-01-15T10:05:00Z",
      details: "Task assigned based on team member expertise",
    },
    {
      id: "3",
      type: "updated",
      author: "Raj Dhakal",
      avatar: "Raj",
      description: "updated the priority to High",
      timestamp: "2024-01-15T14:30:00Z",
      details:
        "Priority changed from Medium to High due to deadline requirements",
    },
  ];

  const [comments, setComments] = useState(sampleComments);
  const [activity, setActivity] = useState(sampleActivity);

  const filterTasks = (taskList: Task[]) => {
    let filtered = taskList;

    // Filter by tab
    if (activeTab === "assigned") {
      filtered = filtered.filter((task) => task.assignedTo === "Raj Dhakal");
    } else if (activeTab === "created") {
      filtered = filtered.filter((task) => task.createdBy === "Current User");
    } else if (activeTab === "completed") {
      filtered = filtered.filter((task) => task.status === "Completed");
    }

    // Apply filters
    if (filters.type) {
      filtered = filtered.filter((task) => task.type === filters.type);
    }
    if (filters.status) {
      filtered = filtered.filter((task) => {
        if (filters.status === "Open") return task.status === "Open";
        if (filters.status === "Completed") return task.status === "Completed";
        return true;
      });
    }

    return filtered;
  };

  const getTasksByTimeframe = (timeframe: string) => {
    const filtered = filterTasks(tasks);

    switch (timeframe) {
      case "today":
        const todayTasks = filtered.filter(
          (task) => task.dueDate === "Today" && task.status !== "Completed"
        );
        return todayTasks.slice(0, 4); // Show only 4 today tasks
      case "tomorrow":
        return filtered.filter(
          (task) => task.dueDate === "Tomorrow" && task.status !== "Completed"
        );
      case "thisWeek":
        return filtered.filter(
          (task) => task.dueDate === "This Week" && task.status !== "Completed"
        );
      case "thisMonth":
        return filtered.filter(
          (task) => task.dueDate === "This Month" && task.status !== "Completed"
        );
      case "later":
        return filtered.filter(
          (task) =>
            !["Today", "Tomorrow", "This Week", "This Month"].includes(
              task.dueDate
            ) && task.status !== "Completed"
        );
      default:
        return [];
    }
  };

  const getCompletedTasks = () => {
    return filterTasks(tasks).filter((task) => task.status === "Completed");
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  const updateTask = (taskId: string, field: string, value: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, [field]: value } : task
      )
    );

    // Update selected task if it's the one being edited
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask((prev) => (prev ? { ...prev, [field]: value } : null));
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowTaskDetail(true);
  };

  const handleTaskSelect = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleCloseTasks = () => {
    setTasks((prev) =>
      prev.map((task) =>
        selectedTasks.includes(task.id)
          ? { ...task, status: "Completed" as const }
          : task
      )
    );
    setSelectedTasks([]);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: "Current User",
        avatar: "U",
        content: newComment,
        timestamp: new Date().toISOString(),
      };
      setComments((prev) => [...prev, comment]);
      setNewComment("");

      // Add activity for comment
      const activityItem: ActivityItem = {
        id: Date.now().toString(),
        type: "commented",
        author: "Current User",
        avatar: "U",
        description: "added a comment",
        timestamp: new Date().toISOString(),
        details: newComment,
      };
      setActivity((prev) => [...prev, activityItem]);
    }
  };

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

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };
  const getTypeColor = (type: string) => {
    switch (type) {
      case "RFQ":
        return "bg-blue-100 text-blue-700";
      case "Supplier Onboarding":
        return "bg-purple-100 text-purple-700";
      case "Sample Request":
        return "bg-emerald-100 text-emerald-700";
      case "Contract":
        return "bg-indigo-100 text-indigo-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  const DatePicker = ({
    value,
    onSelect,
    className = "",
  }: {
    value: string;
    onSelect: (value: string) => void;
    className?: string;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    const today = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formatDate = (date: Date) => {
      const day = date.getDate();
      const month = monthNames[date.getMonth()];
      return `${month} ${day}`;
    };

    const isDateDisabled = (day: number) => {
      const date = new Date(currentYear, currentMonth, day);
      return date < today;
    };

    const handleDateSelect = (day: number) => {
      const selectedDate = new Date(currentYear, currentMonth, day);
      if (!isDateDisabled(day)) {
        onSelect(formatDate(selectedDate));
        setIsOpen(false);
      }
    };

    const navigateMonth = (direction: "prev" | "next") => {
      setCurrentDate((prev) => {
        const newDate = new Date(prev);
        if (direction === "prev") {
          newDate.setMonth(prev.getMonth() - 1);
        } else {
          newDate.setMonth(prev.getMonth() + 1);
        }
        return newDate;
      });
    };

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded transition-colors ${className}`}
        >
          {value}
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-20 min-w-[280px]">
              {/* Month/Year Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateMonth("prev")}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-medium">
                  {monthNames[currentMonth]} {currentYear}
                </span>
                <button
                  onClick={() => navigateMonth("next")}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div key={day} className="p-2 text-gray-500 font-medium">
                    {day}
                  </div>
                ))}

                {/* Empty cells for days before month starts */}
                {Array.from({ length: firstDayOfMonth }, (_, i) => (
                  <div key={`empty-${i}`} className="p-2"></div>
                ))}

                {/* Days of the month */}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const isDisabled = isDateDisabled(day);
                  const isToday =
                    today.getDate() === day &&
                    today.getMonth() === currentMonth &&
                    today.getFullYear() === currentYear;

                  return (
                    <button
                      key={day}
                      onClick={() => handleDateSelect(day)}
                      disabled={isDisabled}
                      className={`p-2 rounded hover:bg-blue-50 transition-colors ${
                        isDisabled
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-900 hover:text-blue-600"
                      } ${
                        isToday ? "bg-blue-100 text-blue-600 font-medium" : ""
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const EditableDropdown = ({
    value,
    options,
    onSelect,
    className = "",
    renderValue,
  }: {
    value: string;
    options: string[];
    onSelect: (value: string) => void;
    className?: string;
    renderValue?: (value: string) => React.ReactNode;
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded transition-colors ${className}`}
        >
          {renderValue ? renderValue(value) : value}
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 min-w-[120px]">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  const TaskItem = ({ task }: { task: Task }) => {
    const [showMenu, setShowMenu] = useState(false);

    const dueDateOptions = [
      "Today",
      "Tomorrow",
      "This Week",
      "This Month",
      "Next Month",
    ];
    const assigneeOptions = [
      "Raj Dhakal",
      "Jane Smith",
      "Mike Johnson",
      "Sarah Wilson",
      "Alex Brown",
      "Anna Davis",
    ];
    const priorityOptions = ["High", "Medium", "Low", "No priority"];

    return (
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-3 px-3 sm:px-4 hover:bg-gray-50 group cursor-pointer gap-2 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-3 w-[250px] min-w-0">
          <input
            type="checkbox"
            checked={selectedTasks.includes(task.id)}
            onChange={() => handleTaskSelect(task.id)}
            onClick={(e) => e.stopPropagation()}
            className="w-3 h-3 text-teal-600 border-gray-100  rounded focus:ring-teal-500 min-w-[16px] min-h-[16px] flex-shrink-0"
          />

          <div
            className="flex-1 cursor-pointer min-w-0"
            onClick={() => handleTaskClick(task)}
          >
            <span className="text-left hover:text-purple-600 font-medium text-sm text-heading sm:text-sm text-gray-900 truncate block">
              {task.title}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-2 w-[100px]">
          <Badge variant="secondary" className={getTypeColor(task.type)}>
            {task.type}
          </Badge>
        </div>
        <div className="w-[200px] flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {/* {(task.assignee || [task.assignee])
                  .slice(0, 2)
                  .map((assignee, index) => (
                    <div
                      key={assignee.id}
                      className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium border border-white"
                    >
                      {assignee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  ))} */}
                {(task.assignee?.length || 1) > 2 && (
                  <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium border border-white">
                    +{(task.assignee?.length || 1) - 2}
                  </div>
                )}
              </div>
              <span className="text-sm">
                {task.assignee && task.assignee.length > 1
                  ? `${task.assignee} +${task.assignee.length - 1}`
                  : task.assignee}
              </span>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="p-1 h-auto hover:bg-gray-100 text-gray-600"
              >
                <div className="flex items-center gap-1 cursor-pointer text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(task.dueDate), "MMM d")}
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              hi
              {/*               hi
              <DatePicker
                value={task.dueDate}
                onSelect={(value) => updateTask(task.id, "dueDate", value)}
                className="text-xs sm:text-sm text-green-600 font-medium"
              /> */}
              {/* <CalendarComponent
                mode="single"
                selected={new Date(task.dueDate)}
                onSelect={(date) =>
                  date && updateTask(task.id, "dueDate", string(date))
                }
                initialFocus
              /> */}
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-wrap sm:flex-nowrap ml-6 sm:ml-0">
          {/* <DatePicker
            value={task.dueDate}
            onSelect={(value) => updateTask(task.id, "dueDate", value)}
            className="text-xs sm:text-sm text-green-600 font-medium"
          /> */}

          <EditableDropdown
            value={task.priority}
            options={priorityOptions}
            onSelect={(value) => updateTask(task.id, "priority", value)}
            renderValue={(priority) => (
              <span
                className={`inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                  priority
                )}`}
              >
                {priority}
              </span>
            )}
          />

          <EditableDropdown
            value={task.assignedTo}
            options={assigneeOptions}
            onSelect={(value) => {
              updateTask(task.id, "assignee", value.charAt(0));
              updateTask(task.id, "assignedTo", value);
            }}
            renderValue={(assignee) => (
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                {task.assignee}
              </div>
            )}
          />

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="min-w-[36px] min-h-[36px] w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 min-w-[120px]">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Edit
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Close
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Duplicate
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };
  function TaskList({
    tasks,
    onTaskUpdate,
    onTaskClick,
    onTaskDelete,
    onTaskAction,
    users,
    onActivityLog,
  }: TaskListProps) {
    const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
    const [assigneeSelections, setAssigneeSelections] = useState<
      Record<string, string[]>
    >({});

    // Initialize assignee selections
    React.useEffect(() => {
      const selections: Record<string, string[]> = {};
      tasks.forEach((task) => {
        selections[task.id] = task.assignees?.map((a) => a.id) || [
          task.assignee.id,
        ];
      });
      setAssigneeSelections(selections);
    }, [tasks]);

    const toggleTaskExpanded = (taskId: string) => {
      const newExpanded = new Set(expandedTasks);
      if (newExpanded.has(taskId)) {
        newExpanded.delete(taskId);
      } else {
        newExpanded.add(taskId);
      }
      setExpandedTasks(newExpanded);
    };

    const handleSubtaskToggle = (
      taskId: string,
      subtaskId: string,
      completed: boolean
    ) => {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      const updatedSubtasks =
        task.subtasks?.map((st) =>
          st.id === subtaskId ? { ...st, completed } : st
        ) || [];

      onTaskUpdate(taskId, {
        subtasks: updatedSubtasks,
        updatedAt: new Date().toISOString(),
      });

      onActivityLog({
        id: Date.now().toString(),
        type: "task_updated",
        taskId,
        user: users[0], // Current user
        description: `${completed ? "Completed" : "Reopened"} subtask: ${
          task.subtasks?.find((st) => st.id === subtaskId)?.title
        }`,
        timestamp: new Date().toISOString(),
      });
    };

    const handlePriorityChange = (
      taskId: string,
      priority: "High" | "Medium" | "Low"
    ) => {
      onTaskUpdate(taskId, {
        priority,
        updatedAt: new Date().toISOString(),
      });

      onActivityLog({
        id: Date.now().toString(),
        type: "priority_changed",
        taskId,
        user: users[0],
        description: `Changed priority to ${priority}`,
        timestamp: new Date().toISOString(),
      });
    };

    const handleAssigneeChange = (taskId: string, assigneeIds: string[]) => {
      const assignees = assigneeIds
        .map((id) => users.find((u) => u.id === id))
        .filter(Boolean) as UserType[];
      const primaryAssignee = assignees[0] || users[0];

      onTaskUpdate(taskId, {
        assignee: primaryAssignee,
        assignees,
        updatedAt: new Date().toISOString(),
      });

      onActivityLog({
        id: Date.now().toString(),
        type: "assignee_changed",
        taskId,
        user: users[0],
        description:
          assignees.length === 1
            ? `Assigned to ${assignees[0]}`
            : `Assigned to ${assignees.map((a) => a).join(", ")}`,
        timestamp: new Date().toISOString(),
      });

      setAssigneeSelections((prev) => ({ ...prev, [taskId]: assigneeIds }));
    };

    const handleDueDateChange = (taskId: string, dueDate: Date) => {
      onTaskUpdate(taskId, {
        dueDate: dueDate.toISOString().split("T")[0],
        updatedAt: new Date().toISOString(),
      });

      onActivityLog({
        id: Date.now().toString(),
        type: "due_date_changed",
        taskId,
        user: users[0],
        description: `Changed due date to ${format(dueDate, "MMMM d, yyyy")}`,
        timestamp: new Date().toISOString(),
      });
    };

    const handleTaskAction = (taskId: string, action: string) => {
      switch (action) {
        case "duplicate":
          const taskToDuplicate = tasks.find((t) => t.id === taskId);
          if (taskToDuplicate) {
            const duplicatedTask = {
              ...taskToDuplicate,
              id:
                Date.now().toString() + Math.random().toString(36).substr(2, 9),
              title: `${taskToDuplicate.title} (Copy)`,
              status: "Open" as const,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            onTaskUpdate(duplicatedTask.id, duplicatedTask);
            onActivityLog({
              id: Date.now().toString(),
              type: "task_created",
              taskId: duplicatedTask.id,
              user: users[0],
              description: `Duplicated task "${taskToDuplicate.title}"`,
              timestamp: new Date().toISOString(),
            });
          }
          break;
        case "close":
          onTaskUpdate(taskId, {
            status: "Closed",
            updatedAt: new Date().toISOString(),
          });
          onActivityLog({
            id: Date.now().toString(),
            type: "status_changed",
            taskId,
            user: users[0],
            description: "Closed task",
            timestamp: new Date().toISOString(),
          });
          break;
        case "archive":
          onTaskDelete(taskId);
          break;
      }
    };

    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case "High":
          return "bg-red-100 text-red-700";
        case "Medium":
          return "bg-yellow-100 text-yellow-700";
        case "Low":
          return "bg-green-100 text-green-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    };

    const getTypeColor = (type: string) => {
      switch (type) {
        case "RFQ":
          return "bg-blue-100 text-blue-700";
        case "Supplier Onboarding":
          return "bg-purple-100 text-purple-700";
        case "Sample Request":
          return "bg-emerald-100 text-emerald-700";
        case "Contract":
          return "bg-indigo-100 text-indigo-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    };

    return (
      <div className="card-clickup">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr className="text-left !text-[14px] text-gray-500 tracking-wider">
                <th className="px-4 py-3  w-8"></th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Task Type</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Assignee</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3 w-12">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks.map((task) => {
                const isExpanded = expandedTasks.has(task.id);

                const isDuePast = isPast(new Date(task.dueDate));

                return (
                  <React.Fragment key={task.id}>
                    <tr className="hover:bg-gray-50 group">
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={selectedTasks.includes(task.id)}
                          onChange={() => handleTaskSelect(task.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="opacity-0 group-hover:opacity-100 w-3 h-3 text-teal-600 border-gray-100  rounded focus:ring-teal-500 min-w-[16px] min-h-[16px] flex-shrink-0"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => onTaskClick(task)}
                          className="text-left hover:text-purple-600 font-medium text-sm text-heading"
                        >
                          {task.title}
                        </button>
                      </td>
                      <td className="px-4 py-2">
                        <Badge
                          variant="secondary"
                          className={`${getTypeColor(
                            task.type
                          )} bg-transparent text-gray-500`}
                        >
                          {task.type}
                        </Badge>
                      </td>
                      <td className="px-4 py-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-0 h-auto"
                            >
                              <Badge
                                variant="secondary"
                                className={`${getPriorityColor(
                                  task.priority
                                )} `}
                              >
                                {task.priority}
                              </Badge>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="start"
                            className="z-50 bg-white"
                          >
                            <DropdownMenuItem
                              onClick={() =>
                                handlePriorityChange(task.id, "High")
                              }
                            >
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                                High
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handlePriorityChange(task.id, "Medium")
                              }
                            >
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                                Medium
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handlePriorityChange(task.id, "Low")
                              }
                            >
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                Low
                              </div>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                      <td className="px-4 py-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-2 h-auto hover:bg-gray-100 text-sm justify-start"
                            >
                              <div className="flex items-center gap-2">
                                <div className="flex -space-x-1">
                                  {task.assignee}
                                  {/* {(task.assignee?.length || 1) > 2 && (
                                    <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium border border-white">
                                      +{(task.assignee?.length || 1) - 2}
                                    </div>
                                  )} */}
                                </div>
                              </div>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            align="start"
                            className="w-72 p-0  bg-white"
                          >
                            <div className="p-3 border-b">
                              <h4 className="font-medium text-sm">
                                Select Assignees
                              </h4>
                            </div>
                            <ScrollArea className="max-h-48">
                              <div className="p-2">
                                {users.map((user) => (
                                  <div
                                    key={user.id}
                                    className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded"
                                  >
                                    <Checkbox
                                      checked={
                                        assigneeSelections[task.id]?.includes(
                                          user.id
                                        ) || false
                                      }
                                      onCheckedChange={(checked) => {
                                        const currentIds = assigneeSelections[
                                          task.id
                                        ] || [task.assignee.id];
                                        const newIds = checked
                                          ? [...currentIds, user.id]
                                          : currentIds.filter(
                                              (id) => id !== user.id
                                            );
                                        handleAssigneeChange(task.id, newIds);
                                      }}
                                    />
                                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">
                                      {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </div>
                                    <div className="flex-1">
                                      <div className="text-sm font-medium">
                                        {user.name}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {user.email}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>
                          </PopoverContent>
                        </Popover>
                      </td>
                      <td className="px-4 py-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-2 h-auto hover:bg-gray-100 text-gray-600"
                            >
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Calendar className="w-4 h-4" />
                                {format(new Date(task.dueDate), "MMM d")}
                              </div>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            {/*                             
                            <CalendarComponent
                              mode="single"
                              selected={new Date(task.dueDate)}
                              onSelect={(date) =>
                                date && handleDueDateChange(task.id, date)
                              }
                              initialFocus
                            /> */}

                            <div
                              className="absolute top-8 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {/* Calendar Header */}
                              <div className="flex items-center justify-between mb-4">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const newDate = new Date(task.dueDate);
                                    newDate.setMonth(newDate.getMonth() - 1);
                                    // setCurrentDate(newDate);
                                    // setCurrentDate(newDate);
                                    handleDueDateChange(task.id, newDate);
                                  }}
                                  className="p-1 hover:bg-gray-100 rounded"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 19l-7-7 7-7"
                                    />
                                  </svg>
                                </button>
                                <h4 className="text-sm font-medium text-gray-900">
                                  {new Date(task.dueDate).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "long",
                                      year: "numeric",
                                    }
                                  )}
                                </h4>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const newDate = new Date(task.dueDate);
                                    newDate.setMonth(newDate.getMonth() + 1);
                                    // setCurrentDate(newDate);
                                    handleDueDateChange(task.id, newDate);
                                  }}
                                  className="p-1 hover:bg-gray-100 rounded"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </button>
                              </div>

                              {/* Calendar Grid */}
                              <div className="grid grid-cols-7 gap-1 mb-4">
                                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                                  (day) => (
                                    <div
                                      key={day}
                                      className="text-center text-xs font-medium text-gray-500 py-2"
                                    >
                                      {day}
                                    </div>
                                  )
                                )}
                                {(() => {
                                  const year = new Date(
                                    task.dueDate
                                  ).getFullYear();
                                  const month = new Date(
                                    task.dueDate
                                  ).getMonth();
                                  const firstDay = new Date(year, month, 1);
                                  const lastDay = new Date(year, month + 1, 0);
                                  const today = new Date();

                                  const days = [];
                                  const startDate = new Date(firstDay);
                                  startDate.setDate(
                                    startDate.getDate() - firstDay.getDay()
                                  );

                                  for (let i = 0; i < 42; i++) {
                                    const date = new Date(startDate);
                                    date.setDate(startDate.getDate() + i);
                                    const isCurrentMonth =
                                      date.getMonth() === month;
                                    const isPast =
                                      date < today &&
                                      date.toDateString() !==
                                        today.toDateString();
                                    const isToday =
                                      date.toDateString() ===
                                      today.toDateString();

                                    days.push(
                                      <button
                                        key={i}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (!isPast) {
                                            // handleProjectDueDateChange(
                                            //   project.id,
                                            //   date.toLocaleDateString("en-US", {
                                            //     month: "short",
                                            //     day: "numeric",
                                            //   })
                                            // );
                                            handleDueDateChange(task.id, date);
                                            // setShowDatePicker(null);
                                          }
                                        }}
                                        className={`w-8 h-8 text-sm rounded hover:bg-blue-50 transition-colors ${
                                          isCurrentMonth
                                            ? "text-gray-900"
                                            : "text-gray-400"
                                        } ${
                                          isPast
                                            ? "text-gray-300 cursor-not-allowed"
                                            : "cursor-pointer"
                                        } ${
                                          isToday
                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                            : ""
                                        }`}
                                      >
                                        {date.getDate()}
                                      </button>
                                    );
                                  }
                                  return days;
                                })()}
                              </div>

                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // setShowDatePicker(null);
                                  }}
                                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </td>
                      <td className="px-4 py-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white">
                            <DropdownMenuItem
                              onClick={() =>
                                handleTaskAction(task.id, "duplicate")
                              }
                            >
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleTaskAction(task.id, "close")}
                            >
                              Close
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleTaskAction(task.id, "archive")
                              }
                            >
                              Archive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4 p-4">
          {tasks.map((task) => {
            return (
              <div
                key={task.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-2 flex-1">
                    <div className="flex-1">
                      <button
                        onClick={() => onTaskClick(task)}
                        className="text-left hover:text-blue-600 font-medium text-sm block mb-2"
                      >
                        {task.title}
                      </button>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge
                          variant="secondary"
                          className={getTypeColor(task.type)}
                        >
                          {task.type}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={getPriorityColor(task.priority)}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleTaskAction(task.id, "duplicate")}
                      >
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleTaskAction(task.id, "close")}
                      >
                        Close
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleTaskAction(task.id, "archive")}
                      >
                        Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        {task.assignee}
                        {(task.assignee?.length || 1) > 2 && (
                          <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium border border-white">
                            +{(task.assignee?.length || 1) - 2}
                          </div>
                        )}
                      </div>
                      <span className="text-sm">
                        {task.assignee && task.assignee.length > 1
                          ? `${task.assignee.split(" ")[0]}`
                          : task.assignee.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-auto hover:bg-gray-100 text-gray-600"
                      >
                        <div className="flex items-center gap-1 cursor-pointer text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(task.dueDate), "MMM d")}
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={new Date(task.dueDate)}
                        onSelect={(date) =>
                          date && handleDueDateChange(task.id, date)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const TaskSection = ({
    title,
    count,
    timeframe,
    tasks,
  }: {
    title: string;
    count: number;
    timeframe: string;
    tasks: Task[];
  }) => {
    const isExpanded =
      expandedSections[timeframe as keyof typeof expandedSections];

    return (
      <div className="border-b border-gray-100">
        <button
          onClick={() => toggleSection(timeframe)}
          className="w-full flex items-center justify-between py-2 sm:py-3 px-3 sm:px-4 hover:bg-gray-50"
        >
          <div className="flex items-center gap-1 sm:gap-2">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
            <span className="text-sm sm:text-base font-medium text-gray-900">
              {title}
            </span>
            <span className="text-xs sm:text-sm text-gray-500">{count}</span>
          </div>
          <Plus className="w-4 h-4 text-gray-400 hover:text-gray-600 min-w-[16px] min-h-[16px]" />
        </button>

        {isExpanded && (
          <div className="pb-1 sm:pb-2">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const FilterModal = () => {
    if (!showFilters) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-xs sm:max-w-sm max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
            <h2 className="text-base sm:text-lg font-medium text-gray-900">
              Filter
            </h2>
            <button
              onClick={() => setShowFilters(false)}
              className="min-w-[44px] min-h-[44px] w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Type
              </label>
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, type: e.target.value }))
                }
                className="w-full px-2 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
              >
                <option value="">All Types</option>
                <option value="Setup">Setup</option>
                <option value="Sales">Sales</option>
                <option value="Training">Training</option>
                <option value="Testing">Testing</option>
                <option value="Review">Review</option>
                <option value="Data">Data</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, status: e.target.value }))
                }
                className="w-full px-2 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
              >
                <option value="">All Statuses</option>
                <option value="Open">Open</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Date From
              </label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))
                }
                className="w-full px-2 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Date To
              </label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, dateTo: e.target.value }))
                }
                className="w-full px-2 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
              />
            </div>
          </div>

          <div className="flex gap-2 p-3 sm:p-4 border-t border-gray-200">
            <button
              onClick={() => {
                setFilters({ type: "", status: "", dateFrom: "", dateTo: "" });
                setShowFilters(false);
              }}
              className="flex-1 px-2 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors min-h-[36px] sm:min-h-[44px]"
            >
              Clear
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="flex-1 px-2 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors min-h-[36px] sm:min-h-[44px]"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    );
  };

  const TaskCreationModal = () => {
    const [taskData, setTaskData] = useState({
      title: "",
      description: "",
      assignee: "Raj Dhakal",
      dueDate: "Due date",
      priority: "No priority",
      status: "Open",
      type: "Setup",
    });
    const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
    const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    if (!showTaskModal) return null;

    const handleSubmit = () => {
      if (taskData.title.trim()) {
        const newTask: Task = {
          id: Date.now().toString(),
          title: taskData.title,
          description: taskData.description,
          assignee: taskData.assignee.charAt(0),
          dueDate: taskData.dueDate,
          priority: taskData.priority as
            | "High"
            | "Medium"
            | "Low"
            | "No priority",
          status: taskData.status as "Open" | "Completed",
          type: taskData.type,
          createdBy: "Current User",
          assignedTo: taskData.assignee,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setTasks((prev) => [...prev, newTask]);
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
                  value={taskData.dueDate}
                  onSelect={(value) =>
                    setTaskData((prev) => ({ ...prev, dueDate: value }))
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

  const TaskDetailModal = () => {
    if (!showTaskDetail || !selectedTask) return null;

    const dueDateOptions = [
      "Today",
      "Tomorrow",
      "This Week",
      "This Month",
      "Next Month",
    ];
    const assigneeOptions = [
      "Raj Dhakal",
      "Jane Smith",
      "Mike Johnson",
      "Sarah Wilson",
      "Alex Brown",
      "Anna Davis",
    ];
    const priorityOptions = ["High", "Medium", "Low", "No priority"];
    const typeOptions = [
      "Setup",
      "Sales",
      "Training",
      "Testing",
      "Review",
      "Data",
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-full sm:max-w-6xl max-h-[90vh] overflow-hidden flex flex-col lg:flex-row">
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-teal-500 rounded flex items-center justify-center flex-shrink-0">
                  <CheckSquare className="w-4 h-4 text-white" />
                </div>
                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 min-w-0">
                  <span>{selectedTask.type}</span>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-gray-900 truncate">
                    {selectedTask.title}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowTaskDetail(false)}
                className="min-w-[44px] min-h-[44px] w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Task Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-3 sm:p-4">
                {/* Title */}
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                  {selectedTask.title}
                </h1>

                {/* Task Properties */}
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                  <EditableDropdown
                    value={selectedTask.priority}
                    options={priorityOptions}
                    onSelect={(value) =>
                      updateTask(selectedTask.id, "priority", value)
                    }
                    renderValue={(priority) => (
                      <div
                        className={`flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm border ${getPriorityColor(
                          priority
                        )} min-h-[36px]`}
                      >
                        <div className="w-3 h-3 bg-current rounded opacity-60"></div>
                        {priority}
                      </div>
                    )}
                  />
                  <EditableDropdown
                    value={selectedTask.assignedTo}
                    options={assigneeOptions}
                    onSelect={(value) => {
                      updateTask(selectedTask.id, "assignee", value.charAt(0));
                      updateTask(selectedTask.id, "assignedTo", value);
                    }}
                    renderValue={(assignee) => (
                      <div className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-gray-100 rounded-lg text-xs sm:text-sm text-gray-700 min-h-[36px]">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs">
                          {selectedTask.assignee}
                        </div>
                        {assignee}
                      </div>
                    )}
                  />

                  <DatePicker
                    value={selectedTask.dueDate}
                    onSelect={(value) =>
                      updateTask(selectedTask.id, "dueDate", value)
                    }
                    className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-gray-100 rounded-lg text-xs sm:text-sm text-teal-600 min-h-[36px]"
                  />

                  {/* <EditableDropdown
                    value={selectedTask.type}
                    options={typeOptions}
                    onSelect={(value) =>
                      updateTask(selectedTask.id, "type", value)
                    }
                    renderValue={(type) => (
                      <div className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-blue-100 rounded-lg text-xs sm:text-sm text-blue-700 min-h-[36px]">
                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                        {type}
                      </div>
                    )}
                  /> */}
                  {/* Add Attachment */}
                  <button className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-gray-100 rounded-lg text-xs sm:text-sm text-gray-700 hover:bg-gray-200 transition-colors min-h-[36px]">
                    <Paperclip className="w-3 h-3" />
                    <span className="hidden sm:inline">Add attachment</span>
                  </button>
                </div>

                {/* Description */}
                {selectedTask.description && (
                  <div className="mb-4 sm:mb-6">
                    <div className="text-xs sm:text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                      {selectedTask.description}
                    </div>
                    {selectedTask.title === "Invite a team member" && (
                      <a
                        href="#"
                        className="text-teal-600 hover:text-teal-700 text-xs sm:text-sm mt-3 sm:mt-4 inline-block"
                      >
                        Learn more about managing members
                      </a>
                    )}
                  </div>
                )}

                {/* Comments Section */}
                <div className="border-t border-gray-200 pt-4 sm:pt-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                      U
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Leave a comment..."
                        className="w-full px-2 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                        rows={2}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleAddComment();
                          }
                        }}
                      />
                    </div>
                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="min-w-[36px] min-h-[36px] p-2 text-teal-600 hover:text-teal-700 disabled:text-gray-400 disabled:cursor-not-allowed flex-shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-3 sm:space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-2 sm:gap-3">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                          {comment.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1 sm:gap-2 mb-1">
                            <span className="text-xs sm:text-sm font-medium text-gray-900">
                              {comment.author}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-500">
                              {formatTimestamp(comment.timestamp)}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-700">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Sidebar */}
          <div className="lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-200 bg-gray-50 flex flex-col h-auto lg:h-full">
            <div className="p-3 sm:p-4 border-b border-gray-200">
              <h3 className="text-xs sm:text-sm font-medium text-gray-900">
                Activity
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              <div className="space-y-3 sm:space-y-4">
                {activity.map((item) => (
                  <div key={item.id} className="flex gap-2 sm:gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-teal-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                      {item.type === "created" && <Plus className="w-3 h-3" />}
                      {item.type === "assigned" && <User className="w-3 h-3" />}
                      {item.type === "updated" && <Edit3 className="w-3 h-3" />}
                      {item.type === "completed" && (
                        <CheckCircle className="w-3 h-3" />
                      )}
                      {item.type === "commented" && (
                        <MessageCircle className="w-3 h-3" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm">
                        <span className="text-xs sm:text-sm font-medium text-teal-600">
                          {item.author}
                        </span>
                        <span className="text-gray-700 ml-1">
                          {item.description}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {formatTimestamp(item.timestamp)}
                      </div>
                      {item.details && (
                        <div className="text-xs text-gray-600 mt-1 p-2 bg-white rounded border">
                          {item.details}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    );
  };
  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 py-3  lg:py-2 border-b border-gray-200">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-white rounded-sm"></div>
            </div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              Tasks
            </h1>
          </div>
        </div>

        <button
          onClick={() => setShowTaskModal(true)}
          className="bg-gray-900 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors text-xs sm:text-sm min-h-[16px]"
        >
          <span className="hidden sm:inline">Add task</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 px-3 sm:px-4 lg:px-6 py-1  border-b border-gray-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === "all"
              ? " "
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          } text-xs sm:text-sm min-h-[36px]`}
        >
          All
          {activeTab === "all" && (
            <hr className="border-black mt-1 border-[1.2px]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("assigned")}
          className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === "assigned"
              ? ""
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          } text-xs sm:text-sm min-h-[36px]`}
        >
          Assigned
          {activeTab === "assigned" && (
            <hr className="border-black mt-1 border-[1.2px]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("created")}
          className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === "created"
              ? ""
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          } text-xs sm:text-sm min-h-[36px]`}
        >
          Created
          {activeTab === "created" && (
            <hr className="border-black mt-1 border-[1.2px]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === "completed"
              ? " "
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          } text-xs sm:text-sm min-h-[36px]`}
        >
          Completed
          {activeTab === "completed" && (
            <hr className="border-black mt-1 border-[1.2px]" />
          )}
        </button>
        <div className="relative w-80 ml-auto ">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search anything..."
            // value={}
            // onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:bg-white focus:border-primary-300  transition-all duration-200 text-sm shadow-soft"
          />
        </div>
        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-1 sm:gap-2 px-2 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-h-[16px]"
        >
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">Filter</span>
        </button>
      </div>

      {/* Task Sections */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "completed" ? (
          <div className="p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">
              Completed Tasks
            </h3>
            <div className="space-y-2">
              {getCompletedTasks().map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>
        ) : (
          <>
            <TaskList
              tasks={tasks}
              onTaskUpdate={handleTaskUpdate}
              onTaskClick={handleTaskClick}
              onTaskDelete={() => {}}
              onTaskAction={() => {}}
              users={[]}
              onActivityLog={() => {}}
            />

            {/* <TaskSection
              title="Tomorrow"
              count={getTasksByTimeframe("tomorrow").length}
              timeframe="tomorrow"
              tasks={getTasksByTimeframe("tomorrow")}
            />

            <TaskSection
              title="This Week"
              count={getTasksByTimeframe("thisWeek").length}
              timeframe="thisWeek"
              tasks={getTasksByTimeframe("thisWeek")}
            />

            <TaskSection
              title="This Month"
              count={getTasksByTimeframe("thisMonth").length}
              timeframe="thisMonth"
              tasks={getTasksByTimeframe("thisMonth")}
            />

            <TaskSection
              title="Later"
              count={getTasksByTimeframe("later").length}
              timeframe="later"
              tasks={getTasksByTimeframe("later")}
            /> */}
          </>
        )}
      </div>

      <FilterModal />
      <TaskCreationModal />
      <TaskDetailModal />

      {/* Floating Action Bar */}
      {selectedTasks.length > 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-2">
          <div className="bg-gray-900 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-xl shadow-2xl flex items-center gap-2 sm:gap-4">
            <span className="text-xs sm:text-sm font-medium">
              {selectedTasks.length} selected
            </span>
            <button
              onClick={handleCloseTasks}
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors min-h-[32px] sm:min-h-[36px]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
