import React from 'react';
import { Home, Users, FileText, CheckSquare, Search } from 'lucide-react';

type Screen = 'home' | 'suppliers' | 'rfqs' | 'tasks' | 'marketplace';

interface BottomNavigationProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
  isLoggedIn: boolean;
}

export function BottomNavigation({ currentScreen, onScreenChange, isLoggedIn }: BottomNavigationProps) {
  if (!isLoggedIn) {
    return null; // Don't render bottom navigation if not logged in (landing page)
  }

  const navItems = [
    { id: 'home' as Screen, label: 'Home', icon: Home },
    { id: 'suppliers' as Screen, label: 'Suppliers', icon: Users },
    { id: 'rfqs' as Screen, label: 'RFQs', icon: FileText },
    { id: 'tasks' as Screen, label: 'Tasks', icon: CheckSquare },
    { id: 'marketplace' as Screen, label: 'Marketplace', icon: Search },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onScreenChange(item.id)}
                className={`flex flex-col items-center py-2 px-3 transition-colors ${
                  isActive 
                    ? 'text-purple-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}