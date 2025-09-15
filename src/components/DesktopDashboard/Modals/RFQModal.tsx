import React, { useState } from 'react';
import { X, FileText, Send, Package, Calendar } from 'lucide-react';

interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplierName: string;
}

const RFQModal: React.FC<RFQModalProps> = ({ isOpen, onClose, supplierName }) => {
  const [rfqTitle, setRfqTitle] = useState('');
  const [items, setItems] = useState('');
  const [deadline, setDeadline] = useState('');

  if (!isOpen) return null;

  const handleSendRFQ = () => {
    if (rfqTitle.trim() && items.trim() && deadline) {
      console.log(`Sending RFQ to ${supplierName}:`, { rfqTitle, items, deadline });
      // Simulate API call or state update
      onClose();
      setRfqTitle('');
      setItems('');
      setDeadline('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Send RFQ to {supplierName}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">RFQ Title</label>
            <input
              type="text"
              value={rfqTitle}
              onChange={(e) => setRfqTitle(e.target.value)}
              placeholder="e.g., Office Supplies Q3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Items/Description</label>
            <textarea
              value={items}
              onChange={(e) => setItems(e.target.value)}
              placeholder="List items or describe services needed"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSendRFQ}
            disabled={!rfqTitle.trim() || !items.trim() || !deadline}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4 mr-2" />
            Send RFQ
          </button>
        </div>
      </div>
    </div>
  );
};

export default RFQModal;