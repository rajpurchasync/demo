import React, { useState } from "react";
import {
  Bell,
  FileText,
  Inbox,
  ChevronRight,
  UserPlus,
  Users,
  Check,
  X,
} from "lucide-react";
import { mockNotifications } from "../types/purchasync";

type Screen = "home" | "suppliers" | "rfqs" | "tasks" | "marketplace";

interface HomeScreenProps {
  onScreenChange: (screen: Screen) => void;
  setShowAddSupplierModal: (show: boolean) => void;
  setShowCreateRFQModal: (show: boolean) => void;
}

interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
}

export function HomeScreen({
  onScreenChange,
  setShowAddSupplierModal,
  setShowCreateRFQModal,
}: HomeScreenProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [timeFilter, setTimeFilter] = useState<
    "today" | "this week" | "this month" | "this year"
  >("this week");
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Add Supplier",
      dueDate: "10 Sep 2025",
      priority: "medium",
    },
    {
      id: "2",
      title: "Review quotes for RFQ #101",
      dueDate: "10 Sep 2025",
      priority: "high",
    },
  ]);

  const addNewTask = (task: Task) => {
    setTasks((prev) => [task, ...prev]);
  };

  // Mock inbox messages for unread count
  const mockMessages = [
    { id: "1", isRead: false },
    { id: "2", isRead: false },
    { id: "3", isRead: true },
    { id: "4", isRead: false },
    { id: "5", isRead: true },
  ];

  // Calculate unread counts
  const unreadActivityCount = mockNotifications.filter((n) => !n.isRead).length;
  const unreadInboxCount = mockMessages.filter((m) => !m.isRead).length;
  const quickActions = [
    {
      id: "activity",
      label: "Activity",
      icon: Bell,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      count: unreadActivityCount,
      action: () => {
        onScreenChange("activity");
      },
    },
    {
      id: "quotes",
      label: "Quotes",
      icon: FileText,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      count: 0,
      action: () => onScreenChange("rfqs"),
    },
    {
      id: "inbox",
      label: "Inbox",
      icon: Inbox,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      count: unreadInboxCount,
      action: () => {
        onScreenChange("inbox");
      },
    },
  ];

  const procurementReportCards = [
    {
      id: "rfq",
      title: "RFQ Status",
      metrics: [
        { label: "INVITED", value: "15" },
        { label: "ACCEPTED", value: "12" },
        { label: "RECEIVED", value: "8" },
      ],
    },
    {
      id: "messages",
      title: "Supplier Messages",
      metrics: [
        { label: "SENT", value: "12" },
        { label: "OPENED", value: "8" },
        { label: "REPLIES", value: "5" },
      ],
    },
    {
      id: "tasks",
      title: "Task Overview",
      metrics: [
        { label: "DUE TODAY", value: "1" },
        { label: "DUE THIS WEEK", value: "6" },
        { label: "OVERDUE", value: "0" },
      ],
    },
    {
      id: "requests",
      title: "Sample/Document Requests",
      metrics: [
        { label: "SENT", value: "4" },
        { label: "ACCEPTED", value: "3" },
        { label: "RECEIVED", value: "2" },
      ],
    },
  ];

  const handleCardSwipe = (
    direction: "left" | "right",
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    if (
      direction === "right" &&
      currentCardIndex < procurementReportCards.length - 1
    ) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else if (direction === "left" && currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleTaskComplete = (taskId: string) => {
    if (confirm("Mark this task as complete?")) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  const handleTaskClick = (taskId: string) => {
    onScreenChange("tasks");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-400";
      case "medium":
        return "bg-orange-400";
      case "low":
        return "bg-green-400";
      default:
        return "bg-gray-400";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Hi";
      case "medium":
        return "Med";
      case "low":
        return "Lo";
      default:
        return "Med";
    }
  };

  const getTimeFilterLabel = () => {
    switch (timeFilter) {
      case "today":
        return "Today";
      case "this week":
        return "This week";
      case "this month":
        return "This month";
      case "this year":
        return "This year";
      default:
        return "This week";
    }
  };

  const cycleTimeFilter = () => {
    const filters: Array<typeof timeFilter> = [
      "today",
      "this week",
      "this month",
      "this year",
    ];
    const currentIndex = filters.indexOf(timeFilter);
    const nextIndex = (currentIndex + 1) % filters.length;
    setTimeFilter(filters[nextIndex]);
  };

  return (
    <div className="px-4 py-2 space-y-3 bg-gray-50 min-h-screen">
      {/* Greeting */}
      <div className="py-1">
        <h1 className="text-lg font-semibold text-gray-900">
          Good afternoon, Sarah!
        </h1>
      </div>

      {/* Quick Actions - More compact and rectangular */}
      <div className="grid grid-cols-3 gap-2">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.action}
              className="bg-white rounded-lg p-2.5 border border-gray-200 transition-all duration-200 relative"
            >
              <div className="flex flex-col items-center space-y-1">
                <div
                  className={`w-7 h-7 ${action.bgColor} rounded-lg flex items-center justify-center`}
                >
                  <Icon className={`w-4 h-4 ${action.iconColor}`} />
                </div>
                <span className="text-xs font-medium text-gray-700">
                  {action.label}
                </span>
              </div>
              {action.count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                  {action.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Upcoming Tasks */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Your upcoming tasks
            </h2>
            <p className="text-sm text-gray-600">1 due today, 6 this week</p>
          </div>
          <button
            onClick={() => onScreenChange("tasks")}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View all
          </button>
        </div>

        <div className="space-y-0">
          {tasks.length > 0 ? (
            tasks.slice(0, 2).map((task, index) => (
              <div
                key={task.id}
                className={`bg-white p-3 border border-gray-200 flex items-center space-x-3 cursor-pointer transition-colors ${
                  index === 0 && tasks.length > 1
                    ? "rounded-t-lg border-b-0"
                    : index === tasks.length - 1 || tasks.length === 1
                    ? "rounded-b-lg"
                    : "border-b-0"
                }`}
                onClick={() => handleTaskClick(task.id)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTaskComplete(task.id);
                  }}
                  className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0 transition-colors flex items-center justify-center group"
                >
                  <Check className="w-3 h-3 text-green-500 opacity-0 transition-opacity" />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      {task.title}
                    </h3>
                    <span className="text-xs font-medium text-gray-500">
                      {getPriorityText(task.priority)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                    {task.dueDate}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                You do not have upcoming tasks. Nice work!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Procurement Report */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">
          Procurement Updates
        </h2>

        {/* Swipeable Cards Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentCardIndex * 100}%)` }}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            {procurementReportCards.map((card, index) => (
              <div key={card.id} className="w-full flex-shrink-0 pr-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        {card.title}
                      </h3>
                    </div>
                    <button
                      onClick={cycleTimeFilter}
                      className="text-xs text-gray-500 font-medium transition-colors"
                    >
                      {getTimeFilterLabel()}
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {card.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-500 font-medium uppercase">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Card Indicators */}
          <div className="flex justify-center space-x-1 mt-3">
            {procurementReportCards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCardIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentCardIndex ? "bg-gray-800" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Swipe Navigation Buttons */}
          {currentCardIndex > 0 && (
            <button
              onClick={(e) => handleCardSwipe("left", e)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-200"
            >
              <ChevronRight className="w-3 h-3 text-gray-600 rotate-180" />
            </button>
          )}

          {currentCardIndex < procurementReportCards.length - 1 && (
            <button
              onClick={(e) => handleCardSwipe("right", e)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-200"
            >
              <ChevronRight className="w-3 h-3 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="pt-4 space-y-3">
        <button
          onClick={() => setShowAddSupplierModal(true)}
          className="w-full bg-white rounded-lg p-4 border border-gray-200 transition-colors flex items-center justify-center space-x-2"
        >
          <UserPlus className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            Invite Supplier
          </span>
        </button>

        <button
          onClick={() => console.log("Add team member")}
          className="w-full bg-white rounded-lg p-4 border border-gray-200 transition-colors flex items-center justify-center space-x-2"
        >
          <Users className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Add a Team</span>
        </button>
      </div>
    </div>
  );
}
