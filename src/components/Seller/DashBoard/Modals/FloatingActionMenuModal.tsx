import React from 'react';
import { X, FileText, UserPlus, CheckSquare } from 'lucide-react';

interface FloatingActionMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  setShowCreateRFQModal: (show: boolean) => void;
  setShowAddCustomerModal: (show: boolean) => void;
  setShowCreateToDoModal: (show: boolean) => void;
}

export function FloatingActionMenuModal({ 
  isOpen, 
  onClose,
  setShowCreateRFQModal,
  setShowAddCustomerModal,
  setShowCreateToDoModal
}: FloatingActionMenuModalProps) {
  if (!isOpen) return null;

  const menuOptions = [
    {
      id: 'quotation',
      label: 'Create Quotation',
      icon: FileText,
      color: 'text-blue-600',
      action: () => {
        setShowCreateRFQModal(true);
        onClose();
      }
    },
    {
      id: 'customer',
      label: 'Add Customer',
      icon: UserPlus,
      color: 'text-green-600',
      action: () => {
        setShowAddCustomerModal(true);
        onClose();
      }
    },
    {
      id: 'task',
      label: 'Create Task',
      icon: CheckSquare,
      color: 'text-purple-600',
      action: () => {
        setShowCreateToDoModal(true);
        onClose();
      }
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full max-w-md mx-auto rounded-t-2xl p-4 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-2">
          {menuOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={option.action}
                className="w-full flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors text-left border border-transparent hover:border-gray-200"
              >
                <div className={`p-3 rounded-lg bg-gray-100 mr-4 ${option.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-semibold text-gray-900 text-sm">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}