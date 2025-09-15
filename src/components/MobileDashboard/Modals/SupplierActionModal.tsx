import React from 'react';
import { X, MessageCircle, FileText, Package, Calendar, FileCheck, UserPlus } from 'lucide-react';

interface SupplierActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplierName: string;
  onAddContact: () => void;
  onRequestQuotation: () => void;
  onRequestSample: () => void;
  onRequestMeeting: () => void;
  onRequestDocument: () => void;
  onSendMessage: () => void;
}

export function SupplierActionModal({ 
  isOpen, 
  onClose, 
  supplierName,
  onAddContact,
  onRequestQuotation,
  onRequestSample,
  onRequestMeeting,
  onRequestDocument,
  onSendMessage
}: SupplierActionModalProps) {
  if (!isOpen) return null;

  const actionOptions = [
    { id: 'sample', label: 'Request Sample', icon: Package, color: 'text-purple-600', action: onRequestSample },
    { id: 'meeting', label: 'Request Meeting', icon: Calendar, color: 'text-orange-600', action: onRequestMeeting },
    { id: 'contact', label: 'Add Contact', icon: UserPlus, color: 'text-blue-600', action: onAddContact }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full max-w-md mx-auto rounded-t-2xl p-4 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Actions</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-2">
          {actionOptions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => {
                  action.action();
                  onClose();
                }}
                className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
              >
                <div className={`p-2 rounded-lg bg-gray-100 mr-3 ${action.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-medium text-gray-900">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}