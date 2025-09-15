import React, { useState } from "react";
import { Search, Filter, MoreHorizontal, X } from "lucide-react";

interface FilterState {
  category: string;
  label: string;
  country: string;
  type: string;
}

interface FilterBarProps {
  selectedCount: number;
  onDeleteSelected: () => void;
  onLabelSelected: () => void;
  onTagsSelected: () => void;
}

export default function FilterBar({
  selectedCount,
  onDeleteSelected,
  onLabelSelected,
  onTagsSelected,
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    label: "",
    country: "",
    type: "",
  });

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
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
              >
                <option value="">All Categories</option>
                <option value="Software">Software</option>
                <option value="Hardware">Hardware</option>
                <option value="Services">Services</option>
                <option value="Manufacturing">Manufacturing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
                Label
              </label>
              <select
                value={filters.label}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, label: e.target.value }))
                }
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
              >
                <option value="">All Labels</option>
                <option value="Approved">Approved</option>
                <option value="Credit">Credit</option>
                <option value="Prospective">Prospective</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
                Country
              </label>
              <select
                value={filters.country}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, country: e.target.value }))
                }
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
              >
                <option value="">All Countries</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
                Type
              </label>
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, type: e.target.value }))
                }
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
              >
                <option value="">All Types</option>
                <option value="Technology">Technology</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Services">Services</option>
                <option value="Retail">Retail</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3 p-4 sm:p-6 border-t border-gray-200">
            <button
              onClick={() => {
                setFilters({ category: "", label: "", country: "", type: "" });
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

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-3 py-1 sm:px-4 sm:py-1 lg:px-6 lg:py-1">
        <div className="flex items-center justify-between">
          {/* <button
                    onClick={() => setShowFilters(true)}
                    className="flex items-center gap-1 sm:gap-2 px-2 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-h-[16px]"
                  >
                    <Filter className="w-4 h-4" />
                    <span className="hidden sm:inline">Filter</span>
                  </button> */}
          {/* Right side - Search and controls */}
          <div className="flex-1 flex items-center gap-1 sm:gap-2 lg:gap-3 justify-between">
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
        </div>
      </div>

      {/* Floating Action Bar */}
      {selectedCount > 0 && (
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-2 sm:px-4">
          <div className="bg-gray-900 text-white px-3 sm:px-4 lg:px-6 py-3 sm:py-4 rounded-xl shadow-2xl flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-[250px] sm:min-w-[300px] lg:min-w-[400px]">
            <span className="text-xs sm:text-sm font-medium">
              {selectedCount} selected
            </span>
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-2">
              <button
                onClick={onDeleteSelected}
                className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-red-400 hover:bg-red-900/20 rounded-lg transition-colors min-h-[36px]"
              >
                Delete
              </button>
              <button
                onClick={onLabelSelected}
                className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-colors min-h-[36px]"
              >
                Label
              </button>
              <button
                onClick={onTagsSelected}
                className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-colors min-h-[36px]"
              >
                Tags
              </button>
            </div>
          </div>
        </div>
      )}

      <FilterModal />
    </>
  );
}
