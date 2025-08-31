import React from 'react';
import { X, CheckSquare, FileText, Users, Package, FileCheck, FileSignature } from 'lucide-react';

interface CreateMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateMenuModal({ isOpen, onClose }: CreateMenuModalProps) {
  if (!isOpen) return null;

  const createOptions = [
    { id: 'task', label: 'Create Task', icon: CheckSquare, color: 'text-blue-600' },
    { id: 'rfq', label: 'Create RFQ', icon: FileText, color: 'text-green-600' },
    { id: 'supplier', label: 'Add Supplier', icon: Users, color: 'text-purple-600' },
    { id: 'sample', label: 'Request Sample', icon: Package, color: 'text-orange-600' },
    { id: 'document', label: 'Request Document', icon: FileCheck, color: 'text-indigo-600' },
    { id: 'contract', label: 'New Contract', icon: FileSignature, color: 'text-red-600' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full max-w-md mx-auto rounded-t-2xl p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Create New</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-3">
          {createOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => {
                  // Handle create action
                  console.log(`Creating ${option.id}`);
                  onClose();
                }}
                className="w-full flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors text-left"
              >
                <div className={`p-2 rounded-lg bg-gray-100 mr-4 ${option.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-900">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}