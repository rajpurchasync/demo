import React, { useState } from "react";
import { Search, Calendar, Filter, X } from "lucide-react";

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: "all" | "email" | "whatsapp";
  onTabChange: (tab: "all" | "email" | "whatsapp") => void;
  fromDate: string;
  toDate: string;
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
  messageStats: {
    total: number;
    email: number;
    whatsapp: number;
  };
}

export const TopBar: React.FC<TopBarProps> = ({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  messageStats,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const FilterModal = () => {
    if (!showFilters) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-xs sm:max-w-sm max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Filter
            </h2>
            <button
              onClick={() => setShowFilters(false)}
              className="min-w-[44px] min-h-[44px] w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">From:</span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => onFromDateChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">To:</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => onToDateChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3 p-4 sm:p-6 border-t border-gray-200">
            <button
              onClick={() => {
                // setFilters({ category: "", label: "", country: "", type: "" });
                setShowFilters(false);
              }}
              className="flex-1 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium min-h-[44px]"
            >
              Clear
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="flex-1 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors font-medium min-h-[44px]"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    );
  };
  const tabs = [
    { id: "all" as const, label: "All", count: messageStats.total },
    { id: "email" as const, label: "Emails", count: messageStats.email },
    {
      id: "whatsapp" as const,
      label: "WhatsApp",
      count: messageStats.whatsapp,
    },
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Tabs */}
      <div className="px-6 py-4">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between space-x-4">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Date Filters */}
          <div className="flex flex-col space-y-3 ml-auto">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-1 sm:gap-2 px-2 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[44px] min-h-[44px]"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
          <FilterModal />
        </div>
      </div>
    </div>
  );
};
