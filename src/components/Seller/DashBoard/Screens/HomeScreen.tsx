import React, { useState } from "react";
import {
  Filter,
  Camera,
  FileText,
  Package,
  CheckSquare,
  Handshake,
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

  const quickActions = [
    {
      id: "manage-todo",
      label: "Manage To-Do List",
      icon: CheckSquare,
      gradient: "from-blue-500 to-blue-600",
      action: () => {
        onScreenChange("todos");
      },
    },
    {
      id: "respond-customer-requests",
      label: "Respond to Customer Requests",
      icon: FileText,
      gradient: "from-purple-500 to-purple-600",
      action: () => {
        onScreenChange("rfqs");
      },
    },
    {
      id: "update-catalog",
      label: "Update Catalogue",
      icon: Package,
      gradient: "from-green-500 to-green-600",
      action: () => {
        console.log("Update catalogue");
      },
    },
  ];

  // Mock marketplace joined status - in real app this would come from user profile/API
  const [isMarketplaceJoined, setIsMarketplaceJoined] = useState(false);

  const handleMarketplaceAction = () => {
    if (isMarketplaceJoined) {
      window.open("https://marketplace.purchasync.com/manage", "_blank");
    } else {
      setIsMarketplaceJoined(true);
      window.open("https://marketplace.purchasync.com/join", "_blank");
    }
  };

  const tabs = [
    {
      id: "notifications",
      label: "Notifications",
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
          {greeting}, Sarah
        </h1>
        <p className="text-xs text-gray-500">
          What would you like to do today?
        </p>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-1">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.action}
                className="grow group relative overflow-hidden bg-white hover:bg-gray-50 rounded-xl p-2  py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-200 hover:border-gray-300 flex-shrink-0 w-20"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`w-8 h-8 bg-gradient-to-r ${action.gradient} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300`}
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

      {/* Marketplace Section */}
      <div>
        <h2 className="text-base font-medium text-gray-900 mb-3 px-1">
          Marketplace
        </h2>
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold mb-1">
                Join Our Marketplace
              </h3>
              <p className="text-xs opacity-90">
                Connect with verified buyers and expand your business
              </p>
            </div>
            <button
              onClick={() => handleMarketplaceAction()}
              className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-200 backdrop-blur-sm"
            >
              <span className="text-xs font-medium">Join Marketplace</span>
              <span className="text-xs font-medium">
                {isMarketplaceJoined
                  ? "Manage Marketplace"
                  : "Join Marketplace"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div>
        <h2 className="text-base font-medium text-gray-900 mb-3 px-1">
          Overview
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-3">
            <div className="text-xl font-bold text-blue-700 mb-1">2</div>
            <div className="text-xs font-medium text-black">New Requests</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-3">
            <div className="text-xl font-bold text-purple-700 mb-1">4</div>
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
