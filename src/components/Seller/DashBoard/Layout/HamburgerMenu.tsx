import React from 'react';
import { X, CheckSquare, Inbox, Users, FileText, Package, FileCheck, MessageCircle, User, UserPlus, TrendingUp, Award } from 'lucide-react';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  if (!isOpen) return null;

  const menuItems = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, color: 'text-green-600' },
    { id: 'requests', label: 'Requests', icon: FileText, color: 'text-indigo-600' },
    { id: 'contracts', label: 'Contracts', icon: FileCheck, color: 'text-red-600' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, color: 'text-pink-600' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="bg-white w-64 h-full shadow-xl animate-slide-in-left">
        <div className="p-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-bold text-gray-900">Dashboard</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-0.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    console.log(`Navigate to ${item.id}`);
                    onClose();
                  }}
                  className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors text-left group"
                >
                  <div className={`p-2 rounded-lg bg-gray-100 mr-3 ${item.color} group-hover:bg-gray-200 transition-colors`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 group-hover:text-gray-700">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Join Storefront at bottom */}
          <div className="border-t border-gray-200 pt-3 mt-3">
            <button
              onClick={() => {
                console.log('Navigate to storefront');
                onClose();
              }}
              className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors text-left group"
            >
              <div className="p-2 rounded-lg bg-gray-100 mr-3 text-purple-600 group-hover:bg-gray-200 transition-colors">
                <Package className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-gray-900 group-hover:text-gray-700">Join Storefront</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}