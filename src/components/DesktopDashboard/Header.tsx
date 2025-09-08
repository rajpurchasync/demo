import React from "react";
import { Plus, Building2, Star } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddCompany: () => void;
  onMobileMenuToggle: () => void;
}

export default function Header({
  activeTab,
  onTabChange,
  onAddCompany,
  onMobileMenuToggle,
}: HeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-3 py-3 sm:px-4 sm:py-3 lg:px-6 lg:py-4">
        {/* Left side */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Mobile menu button */}
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden min-w-[44px] min-h-[44px] w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-400 rounded flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-base sm:text-lg font-semibold text-gray-900 hidden sm:block">
              Suppliers
            </span>

            <span className="text-gray-400 text-xs sm:text-sm">1</span>
          </div>
        </div>

        {/* Right side */}
        <button
          onClick={onAddCompany}
          className="bg-gray-900 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <span className="hidden sm:inline">Add Company</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </div>
  );
}
