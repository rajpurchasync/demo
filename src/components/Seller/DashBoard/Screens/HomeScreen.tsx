import React, { useState } from "react";
import {
  Filter,
  Camera,
  FileText,
  Package,
  CheckSquare,
  Handshake,
  User,
} from "lucide-react";
import { Tabs } from "../UI/Tabs";
import { NotificationCard } from "../Cards/NotificationCard";
import { ToDoCard } from "../Cards/ToDoCard";
import { mockNotifications, mockToDos } from "../types/purchasync";

type Screen = "home" | "customers" | "rfqs" | "todos" | "profile";

interface HomeScreenProps {
  onScreenChange: (screen: Screen) => void;
  setShowAddCustomerModal: (show: boolean) => void;
  setShowCreateRFQModal: (show: boolean) => void;
}

export function HomeScreen({
  onScreenChange,
  setShowAddCustomerModal,
  setShowCreateRFQModal,
}: HomeScreenProps) {
  const [activeTab, setActiveTab] = useState("notifications");
  const [todoFilter, setTodoFilter] = useState("all");

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
      ? "Good afternoon"
      : "Good evening";

  // Mock marketplace joined status - in real app this would come from user profile/API
  const [isMarketplaceJoined, setIsMarketplaceJoined] = useState(false);

  // Calculate contextual data
  const newRequestsCount = 2; // This would come from actual data
  const pendingTasksToday = mockToDos.filter((todo) => {
    const today = new Date().toDateString();
    return (
      new Date(todo.dueDate).toDateString() === today &&
      todo.status !== "completed"
    );
  }).length;
  const quickActions = [
    {
      id: "tasks",
      label: "Tasks",
      icon: CheckSquare,
      iconColor: "bg-blue-600",
      color:
        "bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-600",
      action: () => {
        onScreenChange("todos");
      },
    },
    {
      id: "customers",
      label: "Customers",
      icon: Handshake,
      iconColor: "bg-green-600",
      color:
        "bg-white border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-700 hover:text-green-600",
      action: () => {
        onScreenChange("customers");
      },
    },
    {
      id: "requests",
      label: "Requests",
      icon: FileText,
      iconColor: "bg-purple-600",
      color:
        "bg-white border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-700 hover:text-purple-600",
      action: () => {
        onScreenChange("rfqs");
      },
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      iconColor: "bg-orange-600",
      color:
        "bg-white border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-gray-700 hover:text-orange-600",
      action: () => {
        onScreenChange("profile");
      },
    },
  ];

  const handleMarketplaceAction = () => {
    if (isMarketplaceJoined) {
      // Navigate to storefront management
      console.log("Navigate to storefront management");
    } else {
      setIsMarketplaceJoined(true);
      console.log("Join marketplace");
    }
  };

  const tabs = [
    {
      id: "notifications",
      label: "Latest Activities",
      count: mockNotifications.filter((n) => !n.isRead).length,
    },
  ];

  const filteredToDos = mockToDos
    .filter((todo) => {
      if (todo.status === "completed") return false;

      if (todoFilter === "due-today") {
        const today = new Date().toDateString();
        return new Date(todo.dueDate).toDateString() === today;
      }
      if (todoFilter === "due-this-week") {
        const today = new Date();
        const weekFromNow = new Date();
        weekFromNow.setDate(today.getDate() + 7);
        return (
          new Date(todo.dueDate) >= today &&
          new Date(todo.dueDate) <= weekFromNow
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (todoFilter === "earliest-due") {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return 0;
    });

  const getTaskUrgencyIndicator = (todo: any) => {
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

  return (
    <div className="px-4 py-2 space-y-2 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <div className="py-2">
        <h1 className="text-2xl font-bold text-gray-900 mb-0.5 tracking-tight">
          {greeting}, Matt
        </h1>
        <p className="text-sm text-gray-600">
          You have {newRequestsCount} new request
          {newRequestsCount !== 1 ? "s" : ""} and {pendingTasksToday} task
          {pendingTasksToday !== 1 ? "s" : ""} pending today
        </p>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3 px-1">
          Manage
        </h2>
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-1">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.action}
                className={`grow group relative overflow-hidden rounded-xl p-3 py-4 transition-all duration-200 shadow-sm hover:shadow-md flex-shrink-0 w-20 ${action.color}`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`w-8 h-8 ${action.iconColor} group-hover:bg-current group-hover:bg-opacity-10 rounded-lg flex items-center justify-center transition-colors`}
                  >
                    <Icon className={`text-white w-4 h-4 text-current `} />
                  </div>
                  <span className="text-xs font-medium text-current text-center leading-tight">
                    {action.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Marketplace Section */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3 px-1">
          Marketplace
        </h2>
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold mb-1">
                {isMarketplaceJoined ? "Manage Storefront" : "Join Marketplace"}
              </h3>
              <p className="text-xs opacity-90">
                {isMarketplaceJoined
                  ? "Manage your online presence"
                  : "Showcase your brand and grow business"}
              </p>
            </div>
            <button
              onClick={handleMarketplaceAction}
              className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-200 backdrop-blur-sm"
            >
              <span className="text-xs font-medium">
                {isMarketplaceJoined ? "Manage Store" : "Build Your Store"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3 px-1">
          Overview
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-3">
            <div className="text-xl font-bold text-blue-700 mb-1">
              {newRequestsCount}
            </div>
            <div className="text-xs font-medium text-black">New Requests</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-3">
            <div className="text-xl font-bold text-purple-700 mb-1">
              {pendingTasksToday}
            </div>
            <div className="text-xs font-medium text-black">
              Tasks for Today
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Notifications Tab */}
        <div className="mt-4 space-y-3">
          <div className="mt-4 space-y-3">
            {mockNotifications.length > 0 ? (
              mockNotifications.slice(0, 3).map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onClick={() => {
                    switch (notification.type) {
                      case "rfq":
                        onScreenChange("rfqs");
                        break;
                      case "customer":
                        onScreenChange("customers");
                        break;
                      default:
                        console.log("Open notification:", notification.id);
                    }
                  }}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="w-12 h-12 mx-auto mb-3 opacity-30">
                  <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="50" cy="50" r="40" />
                    <path d="M50 30v20l15 10" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500">No new notifications</p>
              </div>
            )}
            {mockNotifications.length > 3 && (
              <button
                onClick={() => {
                  // Navigate to full notifications page
                  window.location.hash = "#notifications";
                }}
                className="w-full mt-2 py-1.5 text-purple-600 font-medium hover:text-purple-700 transition-colors rounded-lg hover:bg-purple-50 text-xs"
              >
                View all notifications
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
