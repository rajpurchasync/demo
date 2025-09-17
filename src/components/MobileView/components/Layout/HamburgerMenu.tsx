import React from 'react';
import { X, CheckSquare, Inbox, Users, FileText, Package, FileCheck, MessageCircle, User, UserPlus, Settings, LogOut, Phone, Shield, ClipboardList, FileSignature, Archive } from 'lucide-react';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (screen: string) => void;
  onLogout: () => void;
}

export function HamburgerMenu({ isOpen, onClose, onNavigate, onLogout }: HamburgerMenuProps) {
  if (!isOpen) return null;

  const menuSections = [
    {
      title: "SRM",
      items: [
        { id: 'suppliers', label: 'Supplier', icon: Users, color: 'text-purple-600' },
        { id: 'contactsScreen', label: 'Contacts', icon: Phone, color: 'text-blue-600' },
        { id: 'messages', label: 'Messages', icon: MessageCircle, color: 'text-pink-600' },
        { id: 'Meeting', label: 'Meeting', icon: Shield, color: 'text-green-600' },
      ]
    },
    {
      title: "Procurement",
      items: [
        { id: 'rfq', label: 'RFQ', icon: FileText, color: 'text-orange-600' },
        { id: 'quotation', label: 'Quotation', icon: FileCheck, color: 'text-indigo-600' },
        { id: 'sample', label: 'Sample', icon: Package, color: 'text-teal-600' },
        { id: 'contract', label: 'Contract', icon: FileSignature, color: 'text-red-600' },
      ]
    },
    {
      title: "Workspace",
      items: [
        { id: 'tasks', label: 'Tasks', icon: CheckSquare, color: 'text-blue-600' },
        { id: 'inbox', label: 'Inbox', icon: Inbox, color: 'text-green-600' },
        { id: 'approvals', label: 'Approvals', icon: ClipboardList, color: 'text-yellow-600' },
        { id: 'templates', label: 'Templates', icon: Archive, color: 'text-gray-600' },
      ]
    },
    {
      title: "Profile & Settings",
      items: [
        { id: 'profile', label: 'Profile', icon: User, color: 'text-gray-600' },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="bg-white w-64 h-full shadow-xl animate-slide-in-left overflow-y-auto">
        <div className="p-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
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

          {/* User Info */}
          <div className="mb-4 p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-3 h-3 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">Sarah Johnson</p>
                <p className="text-xs text-gray-500">Procurement Manager</p>
              </div>
            </div>
          </div>

          {/* Menu Sections */}
          <div className="space-y-4">
            {menuSections.map((section, sectionIndex) => (
              <div key={section.title}>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (item.id === 'suppliers' || item.id === 'rfq' || item.id === 'tasks' || item.id === 'profile' || item.id === 'contactsScreen') {
                            onNavigate?.(item.id === 'rfq' ? 'rfqs' : item.id === 'contactsScreen' ? 'contacts' : item.id);
                          } else {
                            console.log(`Navigate to ${item.id}`);
                          }
                          onClose();
                        }}
                        className="w-full flex items-center p-2 hover:bg-gray-50 rounded transition-colors text-left group"
                      >
                        <div className={`p-1 rounded bg-gray-100 mr-2 ${item.color} group-hover:bg-gray-200 transition-colors`}>
                          <Icon className="w-3 h-3" />
                        </div>
                        <span className="text-xs font-medium text-gray-900 group-hover:text-gray-700">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-gray-200 mt-4 pt-3">
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full flex items-center p-2 hover:bg-red-50 rounded transition-colors text-left group"
            >
              <div className="p-1 rounded bg-gray-100 mr-2 text-red-600 group-hover:bg-red-100 transition-colors">
                <LogOut className="w-3 h-3" />
              </div>
              <span className="text-xs font-medium text-red-600">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}