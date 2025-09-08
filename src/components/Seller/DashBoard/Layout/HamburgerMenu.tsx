import React from 'react';
import { X, CheckSquare, Inbox, Users, FileText, Package, FileCheck, MessageCircle, User, UserPlus, TrendingUp, Cat as Catalog } from 'lucide-react';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  if (!isOpen) return null;

  const menuItems = [
    { id: 'todos', label: 'To-Do\'s', icon: CheckSquare, color: 'text-blue-600' },
    { id: 'inbox', label: 'Inbox', icon: Inbox, color: 'text-green-600' },
    { id: 'customers', label: 'Customers', icon: Users, color: 'text-purple-600' },
    { id: 'leads', label: 'Leads', icon: TrendingUp, color: 'text-orange-600' },
    { id: 'requests', label: 'Requests', icon: FileText, color: 'text-indigo-600' },
    { id: 'contracts', label: 'Contracts', icon: FileCheck, color: 'text-red-600' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, color: 'text-pink-600' },
    { id: 'team', label: 'Team Management', icon: UserPlus, color: 'text-teal-600' },
    { id: 'profile', label: 'Profile', icon: User, color: 'text-gray-600' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="bg-white w-64 h-full shadow-xl animate-slide-in-left">
        <div className="p-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-500 rounded flex items-center justify-center">
                <Package className="w-3 h-3 text-white" />
              </div>
              <h2 className="text-sm font-bold text-gray-900">Dashboard</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    console.log(`Navigate to ${item.id}`);
                    onClose();
                  }}
                  className="w-full flex items-center p-2 hover:bg-gray-50 rounded transition-colors text-left group"
                >
                  <div className={`p-1 rounded bg-gray-100 mr-2 ${item.color} group-hover:bg-gray-200 transition-colors`}>
                    <Icon className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-medium text-gray-900 group-hover:text-gray-700">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}