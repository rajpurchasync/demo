import React from 'react';
import { 
  Search, 
  Plus, 
  Bell, 
  User, 
  ShoppingCart,
  Zap,
  ChevronDown,
  Settings,
  LogOut,
  UserCircle
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopBar = ({ activeView, onViewChange, enableSettings, setEnableSettings }: { activeView: string, onViewChange: (view: string) => void, enableSettings: boolean, setEnableSettings: (enable: boolean) => void }) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* Left Section */}
      <div className="flex items-center space-x-4" onClick={() => navigate('/')}>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900">Purchasync</span>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tasks, suppliers, RFQs, messages..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">⌘K</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3">
        <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1.5 rounded-lg font-medium transition-colors">
          Upgrade
        </button>
        
        <button className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded-lg font-medium transition-colors">
          <Plus className="w-4 h-4" />
          <span>Create</span>
        </button>

        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ShoppingCart className="w-5 h-5 text-gray-600" />
        </button>

        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative" onClick={() => onViewChange('notifications')}>
          <Bell className="w-5 h-5 text-gray-600" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </button>

        <div className="relative">
          <button 
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <User className="w-5 h-5 text-gray-600" />
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>
          
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <button className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => onViewChange('profile')}>
                <UserCircle className="w-4 h-4" />
                <span>Profile</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => {
                onViewChange('settings');
                setEnableSettings(true);
              }}>
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <hr className="my-1" />
              <button className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <LogOut className="w-4 h-4" />
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;