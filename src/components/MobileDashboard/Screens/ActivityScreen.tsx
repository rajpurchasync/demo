import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import { NotificationCard } from "../Cards/NotificationCard";
import { mockNotifications, Notification } from "../types/purchasync";

export function ActivityScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All", count: mockNotifications.length },
    {
      id: "supplier",
      label: "Supplier",
      count: mockNotifications.filter((n) => n.type === "supplier").length,
    },
    {
      id: "team",
      label: "Team",
      count: mockNotifications.filter((n) => n.type === "team").length,
    },
    {
      id: "inbox",
      label: "Inbox",
      count: mockNotifications.filter((n) => n.type === "inbox").length,
    },
  ];

  const filteredNotifications = mockNotifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === "all" || notification.type === activeTab;

    return matchesSearch && matchesTab;
  });

  return (
    <div className="px-4 py-3 space-y-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-2 font-medium text-sm flex items-center justify-center space-x-1 ${
              activeTab === tab.id
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-600"
            }`}
          >
            <span>{tab.label}</span>
            <span className="text-xs text-gray-500">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex space-x-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search activity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-0 transition-colors text-sm"
          />
        </div>
        <button className="px-3 py-2 border border-gray-200 rounded-lg transition-colors flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Activity List */}
      <div className="space-y-0">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification, index) => (
            <div
              key={notification.id}
              className={`${
                index === 0 && filteredNotifications.length > 1
                  ? "rounded-t-lg"
                  : index === filteredNotifications.length - 1 ||
                    filteredNotifications.length === 1
                  ? "rounded-b-lg"
                  : ""
              }`}
            >
              <NotificationCard
                notification={notification}
                onClick={() =>
                  console.log("Notification clicked:", notification.id)
                }
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
                <circle cx="50" cy="50" r="30" />
                <path d="M50 30v20l10 10" />
              </svg>
            </div>
            <p className="text-base font-medium text-gray-900 mb-1">
              No activity found
            </p>
            <p className="text-xs text-gray-500">
              No activity matches your current filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
