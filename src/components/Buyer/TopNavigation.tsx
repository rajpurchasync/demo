import React from 'react';
import { User } from 'lucide-react';
import NotificationBell from './NotificationBell';

interface TopNavigationProps {
  onNotificationClick: () => void;
  unreadNotificationCount: number;
  onProfileClick: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ 
  onNotificationClick, 
  unreadNotificationCount,
  onProfileClick
}) => {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Logo/Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Purchasync
          </span>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-2">
          <NotificationBell 
            unreadCount={unreadNotificationCount}
            onClick={onNotificationClick}
          />
          
          <button 
            onClick={onProfileClick}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <User size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;