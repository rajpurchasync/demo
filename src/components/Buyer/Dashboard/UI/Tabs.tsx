import React from "react";
import { cn } from "../utils/cn";

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex-1 py-2 px-2 font-medium transition-all duration-200 text-sm relative",
            activeTab === tab.id
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-600 hover:text-gray-800"
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span
              className={cn(
                "ml-1 px-1.5 py-0.5 rounded-full text-xs",
                activeTab === tab.id
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-200 text-gray-500"
              )}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
