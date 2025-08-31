import React from "react";
import { Home, Users, FileText, CheckSquare, User } from "lucide-react";
import { cn } from "../utils/cn";

type Screen = "home" | "suppliers" | "rfqs" | "todos" | "profile";

interface BottomNavigationProps {
  currentScreen: any;
  onScreenChange: (screen: Screen) => void;
}

export function BottomNavigation({
  currentScreen,
  onScreenChange,
}: BottomNavigationProps) {
  const navItems = [
    { id: "home" as Screen, label: "Home", icon: Home },
    { id: "suppliers" as Screen, label: "Suppliers", icon: Users },
    { id: "rfqs" as Screen, label: "RFQs", icon: FileText },
    { id: "todos" as Screen, label: "To-Do", icon: CheckSquare },
    { id: "profile" as Screen, label: "Profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 shadow-lg">
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className={cn(
                "flex flex-col items-center justify-center p-2.5 rounded-xl transition-all duration-300 min-w-0 relative",
                isActive
                  ? "text-purple-600 bg-purple-50 scale-105 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              )}
            >
              {isActive && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
              )}
              <Icon
                className={cn(
                  "w-5 h-5 mb-0.5 transition-transform duration-300",
                  isActive && "scale-110"
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium transition-all duration-300",
                  isActive ? "font-semibold" : "font-medium"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
