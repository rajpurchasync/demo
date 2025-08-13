import React from 'react';
import { LayoutDashboard, MessageSquare, FileText, Bookmark, Bell } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'messages', label: 'Message', icon: MessageSquare },
    { id: 'rfq', label: 'RFQ', icon: FileText },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'alerts', label: 'Alerts', icon: Bell },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-5 h-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon size={20} />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;